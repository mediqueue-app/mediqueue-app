"""Seed demo portal users for local Ay 1 smoke tests.

Prerequisites (from backend/):

    alembic upgrade head
    python -m scripts.seed_doctors_from_ai_json
    python -m scripts.seed_clinics_from_ai_json
    python -m scripts.seed_demo_users

Demo accounts (password for all: Demo1234!)

| Email                 | Role    | Portal        |
|-----------------------|---------|---------------|
| patient@mediqueue.com | patient | web-patient   |
| clinic@mediqueue.com  | clinic  | web-clinic    |
| doctor@mediqueue.com  | doctor  | web-doctor    |
| admin@mediqueue.com   | admin   | web-admin     |

Clinic/doctor rows must already exist so clinic_id / doctor_id can be linked.
"""

from __future__ import annotations

import sys

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError

from app.core.security import get_password_hash
from app.db.session import SessionLocal
from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.user import User, UserRole

DEMO_PASSWORD = "Demo1234!"


def _upsert_user(
    db,
    *,
    email: str,
    full_name: str,
    role: UserRole,
    clinic_id: int | None = None,
    doctor_id: int | None = None,
) -> tuple[User, bool]:
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        existing.full_name = full_name
        existing.role = role.value
        existing.clinic_id = clinic_id
        existing.doctor_id = doctor_id
        existing.hashed_password = get_password_hash(DEMO_PASSWORD)
        existing.is_active = True
        return existing, False

    user = User(
        email=email,
        hashed_password=get_password_hash(DEMO_PASSWORD),
        full_name=full_name,
        role=role.value,
        clinic_id=clinic_id,
        doctor_id=doctor_id,
        is_active=True,
    )
    db.add(user)
    return user, True


def main() -> int:
    db = SessionLocal()
    try:
        clinic = db.scalar(select(Clinic).where(Clinic.is_active.is_(True)).order_by(Clinic.id))
        doctor = db.scalar(select(Doctor).where(Doctor.is_active.is_(True)).order_by(Doctor.id))

        if clinic is None:
            print("ERROR: No clinics found. Run seed_clinics_from_ai_json first.")
            return 1
        if doctor is None:
            print("ERROR: No doctors found. Run seed_doctors_from_ai_json first.")
            return 1

        specs = [
            ("patient@mediqueue.com", "Demo Patient", UserRole.PATIENT, None, None),
            ("clinic@mediqueue.com", "Demo Clinic Admin", UserRole.CLINIC, clinic.id, None),
            ("doctor@mediqueue.com", "Demo Doctor", UserRole.DOCTOR, None, doctor.id),
            ("admin@mediqueue.com", "Demo Admin", UserRole.ADMIN, None, None),
        ]

        created = 0
        updated = 0
        for email, full_name, role, clinic_id, doctor_id in specs:
            _, was_created = _upsert_user(
                db,
                email=email,
                full_name=full_name,
                role=role,
                clinic_id=clinic_id,
                doctor_id=doctor_id,
            )
            if was_created:
                created += 1
            else:
                updated += 1

        db.commit()
    except SQLAlchemyError as exc:
        db.rollback()
        print(f"ERROR: Database operation failed: {exc.__class__.__name__}: {exc}")
        return 1
    finally:
        db.close()

    print("Demo users ready.")
    print(f"  Created: {created}")
    print(f"  Updated: {updated}")
    print(f"  Linked clinic_id: {clinic.id} ({clinic.name})")
    print(f"  Linked doctor_id: {doctor.id} ({doctor.full_name})")
    print()
    print(f"Password for all demo accounts: {DEMO_PASSWORD}")
    print("  patient@mediqueue.com  → web-patient :3002")
    print("  clinic@mediqueue.com   → web-clinic  :3000")
    print("  doctor@mediqueue.com   → web-doctor  :3001")
    print("  admin@mediqueue.com    → web-admin   :3003")
    return 0


if __name__ == "__main__":
    sys.exit(main())
