"""KVKK Art. 7 / GDPR Art. 17 self-service account erasure.

Retention vs purge (no payment table exists yet; when added, invoices stay):

Retain (legal / medical / accounting history, anonymised):
  - appointments rows (ids, dates, status, clinic_id, doctor_id, branch)
  - future payment / invoice rows

Cancel then retain:
  - open appointments (pending / confirmed / alternative_date / arrived)

Purge or anonymise (no longer needed to identify the person):
  - user email, name, password
  - patient profile PII and encrypted health history
  - clinic contact phone; listing taken off marketplace
  - review comments (rating kept, author is tombstone user)
  - appointment message bodies and free-text notes
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone

from sqlalchemy import select, update
from sqlalchemy.orm import Session

from app.core.security import UNUSABLE_PASSWORD_PREFIX
from app.models.appointment import Appointment, AppointmentStatus
from app.models.appointment_message import AppointmentMessage
from app.models.audit_event import AuditEvent
from app.models.clinic import Clinic
from app.models.doctor_clinic import DoctorClinic
from app.models.patient import Patient
from app.models.review import Review
from app.models.user import User, UserRole
from app.services.appointment_transitions import ACTIVE_APPOINTMENT_STATUSES

ACTION_ACCOUNT_ERASURE = "account.erasure"
REDACTED = "[redacted]"
TOMBSTONE_NAME = "Deleted account"
ERASURE_ROLES = frozenset({UserRole.PATIENT.value, UserRole.CLINIC.value})


class AccountErasureNotAllowed(ValueError):
    """Raised when the signed-in role cannot self-erase."""


@dataclass
class ErasureResult:
    erased_at: datetime
    cancelled_appointments: int = 0
    redacted_messages: int = 0
    redacted_reviews: int = 0
    deactivated_staff: int = 0
    deactivated_doctor_links: int = 0
    patient_id: int | None = None
    clinic_id: int | None = None
    retained: list[str] = field(default_factory=list)
    purged: list[str] = field(default_factory=list)


def tombstone_email(user_id: int) -> str:
    return f"erased.{user_id}@erased.invalid"


def should_cancel_appointment(status: str) -> bool:
    return status in ACTIVE_APPOINTMENT_STATUSES


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _cancel_open_appointments(appointments: list[Appointment]) -> int:
    count = 0
    for appointment in appointments:
        if should_cancel_appointment(appointment.status):
            appointment.status = AppointmentStatus.CANCELLED
            count += 1
        appointment.notes = None
    return count


def _redact_messages(db: Session, appointment_ids: list[int]) -> int:
    if not appointment_ids:
        return 0
    result = db.execute(
        update(AppointmentMessage)
        .where(AppointmentMessage.appointment_id.in_(appointment_ids))
        .values(body=REDACTED)
    )
    return int(result.rowcount or 0)


def _anonymise_user(user: User, *, now: datetime) -> None:
    user.email = tombstone_email(user.id)
    user.full_name = TOMBSTONE_NAME
    user.hashed_password = UNUSABLE_PASSWORD_PREFIX
    user.is_active = False
    user.deleted_at = now


def _anonymise_patient(patient: Patient, *, now: datetime) -> None:
    patient.full_name = TOMBSTONE_NAME
    patient.email = None
    patient.phone = None
    patient.country = None
    patient.country_code = None
    patient.preferred_language = None
    patient.health_history_encrypted = None
    patient.is_active = False
    patient.deleted_at = now


def _anonymise_clinic_listing(clinic: Clinic, *, now: datetime) -> None:
    clinic.phone = None
    clinic.address = None
    clinic.description = None
    clinic.languages = None
    clinic.is_active = False
    clinic.deleted_at = now


def _deactivate_clinic_doctor_links(db: Session, clinic_id: int) -> int:
    links = list(
        db.scalars(select(DoctorClinic).where(DoctorClinic.clinic_id == clinic_id)).all()
    )
    for link in links:
        link.is_active = False
    return len(links)


def _anonymise_clinic_staff(
    db: Session,
    *,
    clinic_id: int,
    actor_user_id: int,
    now: datetime,
) -> int:
    staff = list(
        db.scalars(
            select(User).where(
                User.clinic_id == clinic_id,
                User.role == UserRole.CLINIC.value,
                User.id != actor_user_id,
            )
        ).all()
    )
    for extra in staff:
        _anonymise_user(extra, now=now)
    return len(staff)


def erase_own_account(
    db: Session,
    *,
    user: User,
    ip_address: str | None = None,
) -> ErasureResult:
    if user.role not in ERASURE_ROLES:
        raise AccountErasureNotAllowed("This account type cannot self-erase")

    now = _utcnow()
    result = ErasureResult(
        erased_at=now,
        retained=[
            "appointments.identity_keys",
            "appointments.dates_status_branch",
            "payments_invoices_when_present",
        ],
        purged=[
            "user.email_name_password",
            "patient.pii_health_history",
            "appointment.notes",
            "appointment_messages.body",
            "reviews.comment",
        ],
    )

    appointment_ids: list[int] = []

    if user.role == UserRole.PATIENT.value:
        patient = db.scalar(select(Patient).where(Patient.user_id == user.id))
        if patient is not None:
            result.patient_id = patient.id
            appointments = list(
                db.scalars(
                    select(Appointment).where(Appointment.patient_id == patient.id)
                ).all()
            )
            result.cancelled_appointments = _cancel_open_appointments(appointments)
            appointment_ids = [item.id for item in appointments]
            _anonymise_patient(patient, now=now)

        reviews = list(db.scalars(select(Review).where(Review.patient_id == user.id)).all())
        for review in reviews:
            review.comment = REDACTED
            review.ai_summary = None
            review.is_active = False
        result.redacted_reviews = len(reviews)

    elif user.role == UserRole.CLINIC.value and user.clinic_id is not None:
        clinic = db.get(Clinic, user.clinic_id)
        if clinic is not None:
            result.clinic_id = clinic.id
            appointments = list(
                db.scalars(
                    select(Appointment).where(Appointment.clinic_id == clinic.id)
                ).all()
            )
            result.cancelled_appointments = _cancel_open_appointments(appointments)
            appointment_ids = [item.id for item in appointments]
            result.deactivated_doctor_links = _deactivate_clinic_doctor_links(
                db, clinic.id
            )
            result.deactivated_staff = _anonymise_clinic_staff(
                db,
                clinic_id=clinic.id,
                actor_user_id=user.id,
                now=now,
            )
            _anonymise_clinic_listing(clinic, now=now)
            result.purged.append("clinic.contact_and_listing")

    result.redacted_messages = _redact_messages(db, appointment_ids)
    _anonymise_user(user, now=now)

    db.add(
        AuditEvent(
            action=ACTION_ACCOUNT_ERASURE,
            actor_user_id=user.id,
            actor_role=user.role,
            subject_type="user",
            subject_id=user.id,
            details={
                "cancelled_appointments": result.cancelled_appointments,
                "redacted_messages": result.redacted_messages,
                "redacted_reviews": result.redacted_reviews,
                "deactivated_staff": result.deactivated_staff,
                "deactivated_doctor_links": result.deactivated_doctor_links,
                "patient_id": result.patient_id,
                "clinic_id": result.clinic_id,
                "retained": result.retained,
                "purged": result.purged,
            },
            ip_address=ip_address,
        )
    )
    db.commit()
    return result
