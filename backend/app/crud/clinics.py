from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.doctor_clinic import DoctorClinic
from app.schemas.clinic import ClinicUpdate


def get_clinics(db: Session, skip: int = 0, limit: int = 100) -> list[Clinic]:
    stmt = (
        select(Clinic)
        .where(Clinic.is_active.is_(True))
        .order_by(Clinic.name)
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def get_clinic(db: Session, clinic_id: int) -> Clinic | None:
    stmt = select(Clinic).where(Clinic.id == clinic_id, Clinic.is_active.is_(True))
    return db.scalar(stmt)


def get_active_doctors_by_clinic(db: Session, clinic_id: int) -> list[Doctor]:
    stmt = (
        select(Doctor)
        .join(DoctorClinic, DoctorClinic.doctor_id == Doctor.id)
        .where(
            DoctorClinic.clinic_id == clinic_id,
            DoctorClinic.is_active.is_(True),
            Doctor.is_active.is_(True),
        )
        .order_by(Doctor.full_name)
    )
    return list(db.scalars(stmt).all())


def update_clinic(db: Session, *, clinic: Clinic, clinic_in: ClinicUpdate) -> Clinic:
    updates = clinic_in.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(clinic, field, value)
    db.commit()
    db.refresh(clinic)
    return clinic
