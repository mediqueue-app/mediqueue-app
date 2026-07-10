"""Seed demo portal users for local Ay 1 smoke tests.

Run from the backend directory (after doctor and clinic seeds):

    alembic upgrade head
    python -m scripts.seed_doctors_from_ai_json
    python -m scripts.seed_clinics_from_ai_json
    python -m scripts.seed_demo_users

Requires:
- PostgreSQL running and DATABASE_URL configured in .env
- Alembic migrations applied
- At least one active clinic and one active doctor in the database

Idempotent: safe to run multiple times. Existing demo emails are updated in place.

Demo accounts (password for all: Demo1234!)

| Email                 | Role    | Portal        |
|-----------------------|---------|---------------|
| patient@mediqueue.com | patient | web-patient   |
| clinic@mediqueue.com  | clinic  | web-clinic    |
| doctor@mediqueue.com  | doctor  | web-doctor    |
| admin@mediqueue.com   | admin   | web-admin     |

Clinic and doctor rows are resolved dynamically (prefer doctor linked to demo clinic).
"""

from __future__ import annotations

import sys

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.doctor_clinic import DoctorClinic
from app.models.user import User, UserRole

DEMO_PASSWORD = "Demo1234!"

DEMO_USER_SPECS: list[dict[str, str | None]] = [
    {
        "email": "patient@mediqueue.com",
        "role": UserRole.PATIENT.value,
        "full_name": "Demo Patient",
    },
    {
        "email": "clinic@mediqueue.com",
        "role": UserRole.CLINIC.value,
        "full_name": "Demo Clinic Manager",
    },
    {
        "email": "doctor@mediqueue.com",
        "role": UserRole.DOCTOR.value,
        "full_name": "Demo Doctor",
    },
    {
        "email": "admin@mediqueue.com",
        "role": UserRole.ADMIN.value,
        "full_name": "Demo Admin",
    },
]


def _resolve_demo_clinic_id(db: Session) -> int:
    clinic_id = db.scalar(
        select(Clinic.id)
        .where(Clinic.is_active.is_(True))
        .order_by(Clinic.id)
        .limit(1)
    )
    if clinic_id is None:
        raise ValueError("No active clinic found. Run scripts.seed_clinics_from_ai_json first.")
    return clinic_id


def _resolve_demo_doctor_id(db: Session, *, clinic_id: int) -> int:
    linked_doctor_id = db.scalar(
        select(DoctorClinic.doctor_id)
        .join(Doctor, Doctor.id == DoctorClinic.doctor_id)
        .where(
            DoctorClinic.clinic_id == clinic_id,
            DoctorClinic.is_active.is_(True),
            Doctor.is_active.is_(True),
        )
        .order_by(DoctorClinic.doctor_id)
        .limit(1)
    )
    if linked_doctor_id is not None:
        return linked_doctor_id

    doctor_id = db.scalar(
        select(Doctor.id)
        .where(Doctor.is_active.is_(True))
        .order_by(Doctor.id)
        .limit(1)
    )
    if doctor_id is None:
        raise ValueError("No active doctor found. Run scripts.seed_doctors_from_ai_json first.")
    return doctor_id


def _upsert_demo_user(
    db: Session,
    *,
    email: str,
    role: str,
    full_name: str,
    password_hash: str,
    clinic_id: int | None,
    doctor_id: int | None,
) -> tuple[str, int]:
    user = db.scalar(select(User).where(User.email == email))
    if user is None:
        user = User(
            email=email,
            hashed_password=password_hash,
            full_name=full_name,
            role=role,
            clinic_id=clinic_id,
            doctor_id=doctor_id,
            is_active=True,
        )
        db.add(user)
        db.flush()
        return "inserted", user.id

    user.hashed_password = password_hash
    user.full_name = full_name
    user.role = role
    user.clinic_id = clinic_id
    user.doctor_id = doctor_id
    user.is_active = True
    db.flush()
    return "updated", user.id


def seed_demo_users(db: Session) -> dict[str, list[str] | dict[str, int | None]]:
    demo_clinic_id = _resolve_demo_clinic_id(db)
    demo_doctor_id = _resolve_demo_doctor_id(db, clinic_id=demo_clinic_id)
    password_hash = get_password_hash(DEMO_PASSWORD)

    inserted: list[str] = []
    updated: list[str] = []
    relationships: dict[str, int | None] = {
        "clinic_id": demo_clinic_id,
        "doctor_id": demo_doctor_id,
    }

    for spec in DEMO_USER_SPECS:
        role = str(spec["role"])
        clinic_id = demo_clinic_id if role == UserRole.CLINIC.value else None
        doctor_id = demo_doctor_id if role == UserRole.DOCTOR.value else None

        action, _user_id = _upsert_demo_user(
            db,
            email=str(spec["email"]),
            role=role,
            full_name=str(spec["full_name"]),
            password_hash=password_hash,
            clinic_id=clinic_id,
            doctor_id=doctor_id,
        )
        email = str(spec["email"])
        if action == "inserted":
            inserted.append(email)
        else:
            updated.append(email)

    return {
        "inserted": inserted,
        "updated": updated,
        "relationships": relationships,
    }


def main() -> int:
    db = SessionLocal()
    try:
        summary = seed_demo_users(db)
        db.commit()
    except (SQLAlchemyError, ValueError) as exc:
        db.rollback()
        print(f"ERROR: Database operation failed: {exc.__class__.__name__}: {exc}")
        return 1
    finally:
        db.close()

    relationships = summary["relationships"]
    print("Demo users ready.")
    print(f"  Inserted: {len(summary['inserted'])}")
    for email in summary["inserted"]:
        print(f"    - {email}")
    print(f"  Updated:  {len(summary['updated'])}")
    for email in summary["updated"]:
        print(f"    - {email}")
    print(f"  Demo clinic_id: {relationships['clinic_id']}")
    print(f"  Demo doctor_id: {relationships['doctor_id']}")
    print()
    print(f"Password for all demo accounts: {DEMO_PASSWORD}")
    print("  patient@mediqueue.com  -> web-patient :3002")
    print("  clinic@mediqueue.com   -> web-clinic  :3000")
    print("  doctor@mediqueue.com   -> web-doctor  :3001")
    print("  admin@mediqueue.com    -> web-admin   :3003")
    return 0


if __name__ == "__main__":
    sys.exit(main())
