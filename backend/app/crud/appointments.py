from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.models.appointment import Appointment
from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.doctor_clinic import DoctorClinic
from app.models.patient import Patient
from app.schemas.appointment import AppointmentCreate, AppointmentStatusUpdate


def get_appointment(db: Session, appointment_id: int) -> Appointment | None:
    stmt = (
        select(Appointment)
        .where(Appointment.id == appointment_id)
        .options(joinedload(Appointment.patient), joinedload(Appointment.doctor))
    )
    return db.scalar(stmt)


def patient_exists(db: Session, patient_id: int) -> bool:
    return db.scalar(
        select(Patient.id).where(Patient.id == patient_id, Patient.is_active.is_(True))
    ) is not None


def clinic_exists(db: Session, clinic_id: int) -> bool:
    return db.scalar(
        select(Clinic.id).where(Clinic.id == clinic_id, Clinic.is_active.is_(True))
    ) is not None


def doctor_exists(db: Session, doctor_id: int) -> bool:
    return db.scalar(
        select(Doctor.id).where(Doctor.id == doctor_id, Doctor.is_active.is_(True))
    ) is not None


def get_patient_by_user_id(db: Session, user_id: int) -> Patient | None:
    return db.scalar(
        select(Patient).where(Patient.user_id == user_id, Patient.is_active.is_(True))
    )


def create_appointment(db: Session, *, appointment_in: AppointmentCreate) -> Appointment:
    appointment = Appointment(
        patient_id=appointment_in.patient_id,
        clinic_id=appointment_in.clinic_id,
        doctor_id=appointment_in.doctor_id,
        branch=appointment_in.branch,
        requested_date=appointment_in.requested_date,
        alternative_date=appointment_in.alternative_date,
        notes=appointment_in.notes,
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return get_appointment(db, appointment.id) or appointment


def update_appointment_status(
    db: Session,
    *,
    appointment: Appointment,
    status_in: AppointmentStatusUpdate,
) -> Appointment:
    appointment.status = status_in.status
    appointment.alternative_date = status_in.alternative_date
    db.commit()
    db.refresh(appointment)
    return get_appointment(db, appointment.id) or appointment


def list_appointments_by_clinic(
    db: Session,
    *,
    clinic_id: int,
    skip: int = 0,
    limit: int = 100,
) -> list[Appointment]:
    stmt = (
        select(Appointment)
        .where(Appointment.clinic_id == clinic_id)
        .options(joinedload(Appointment.patient), joinedload(Appointment.doctor))
        .order_by(Appointment.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def list_appointments_by_patient(
    db: Session,
    *,
    patient_id: int,
    skip: int = 0,
    limit: int = 100,
) -> list[Appointment]:
    stmt = (
        select(Appointment)
        .where(Appointment.patient_id == patient_id)
        .options(joinedload(Appointment.patient), joinedload(Appointment.doctor))
        .order_by(Appointment.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def list_appointments_by_doctor(
    db: Session,
    *,
    doctor_id: int,
    skip: int = 0,
    limit: int = 100,
) -> list[Appointment]:
    stmt = (
        select(Appointment)
        .where(Appointment.doctor_id == doctor_id)
        .options(joinedload(Appointment.patient), joinedload(Appointment.doctor))
        .order_by(Appointment.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def doctor_linked_to_clinic(db: Session, *, doctor_id: int, clinic_id: int) -> bool:
    return db.scalar(
        select(DoctorClinic.id).where(
            DoctorClinic.doctor_id == doctor_id,
            DoctorClinic.clinic_id == clinic_id,
            DoctorClinic.is_active.is_(True),
        )
    ) is not None
