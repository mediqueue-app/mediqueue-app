from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.doctor import Doctor
from app.models.doctor_clinic import DoctorClinic
from app.schemas.availability import AvailabilityDay, AvailabilityRead, AvailabilityUpdate
from app.schemas.doctor import DoctorCreate, DoctorUpdate

# Default weekly template when doctor has never saved availability.
DEFAULT_WEEKLY_AVAILABILITY: list[dict] = [
    {
        "day_of_week": 1,
        "label": "Pazartesi",
        "slots": [
            {"hour": "09:00", "available": True},
            {"hour": "10:00", "available": True},
            {"hour": "11:00", "available": False},
            {"hour": "14:00", "available": True},
            {"hour": "15:00", "available": True},
            {"hour": "16:00", "available": False},
        ],
    },
    {
        "day_of_week": 2,
        "label": "Salı",
        "slots": [
            {"hour": "09:00", "available": True},
            {"hour": "10:00", "available": False},
            {"hour": "11:00", "available": True},
            {"hour": "14:00", "available": True},
            {"hour": "15:00", "available": True},
        ],
    },
    {
        "day_of_week": 3,
        "label": "Çarşamba",
        "slots": [
            {"hour": "09:00", "available": True},
            {"hour": "10:00", "available": True},
            {"hour": "14:00", "available": False},
            {"hour": "15:00", "available": True},
        ],
    },
    {
        "day_of_week": 4,
        "label": "Perşembe",
        "slots": [
            {"hour": "09:00", "available": True},
            {"hour": "10:00", "available": True},
            {"hour": "11:00", "available": True},
            {"hour": "14:00", "available": True},
        ],
    },
    {
        "day_of_week": 5,
        "label": "Cuma",
        "slots": [
            {"hour": "09:00", "available": False},
            {"hour": "10:00", "available": True},
            {"hour": "11:00", "available": True},
        ],
    },
]


def create_doctor(db: Session, *, doctor_in: DoctorCreate) -> Doctor:
    doctor = Doctor(
        full_name=doctor_in.full_name,
        specialty=doctor_in.specialty,
        bio=doctor_in.bio,
        city=doctor_in.city,
        languages=doctor_in.languages,
        price=doctor_in.price,
        rating=doctor_in.rating,
        experience=doctor_in.experience,
        ai_source_id=doctor_in.ai_source_id,
        is_active=True,
    )
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor


def link_doctor_to_clinic(db: Session, *, doctor_id: int, clinic_id: int) -> DoctorClinic:
    existing = db.scalar(
        select(DoctorClinic).where(
            DoctorClinic.doctor_id == doctor_id,
            DoctorClinic.clinic_id == clinic_id,
        )
    )
    if existing is not None:
        if not existing.is_active:
            existing.is_active = True
            db.commit()
            db.refresh(existing)
        return existing

    link = DoctorClinic(
        doctor_id=doctor_id,
        clinic_id=clinic_id,
        is_active=True,
    )
    db.add(link)
    db.commit()
    db.refresh(link)
    return link


def get_doctor(db: Session, *, doctor_id: int) -> Doctor | None:
    return db.scalar(select(Doctor).where(Doctor.id == doctor_id, Doctor.is_active.is_(True)))


def doctor_linked_to_clinic(db: Session, *, doctor_id: int, clinic_id: int) -> bool:
    return db.scalar(
        select(DoctorClinic.id).where(
            DoctorClinic.doctor_id == doctor_id,
            DoctorClinic.clinic_id == clinic_id,
            DoctorClinic.is_active.is_(True),
        )
    ) is not None


def update_doctor(db: Session, *, doctor: Doctor, doctor_in: DoctorUpdate) -> Doctor:
    updates = doctor_in.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(doctor, field, value)
    db.commit()
    db.refresh(doctor)
    return doctor


def get_doctor_availability(db: Session, *, doctor_id: int) -> AvailabilityRead | None:
    doctor = get_doctor(db, doctor_id=doctor_id)
    if doctor is None:
        return None
    raw = doctor.weekly_availability
    if not raw:
        days = [AvailabilityDay.model_validate(item) for item in DEFAULT_WEEKLY_AVAILABILITY]
    else:
        days = [AvailabilityDay.model_validate(item) for item in raw]
    return AvailabilityRead(days=days)


def set_doctor_availability(
    db: Session,
    *,
    doctor: Doctor,
    availability_in: AvailabilityUpdate,
) -> AvailabilityRead:
    payload = [day.model_dump() for day in availability_in.days]
    doctor.weekly_availability = payload
    db.commit()
    db.refresh(doctor)
    return AvailabilityRead(days=availability_in.days)
