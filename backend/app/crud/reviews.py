from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.review import Review
from app.schemas.review import ReviewCreate


def get_doctor(db: Session, doctor_id: int) -> Doctor | None:
    stmt = select(Doctor).where(Doctor.id == doctor_id, Doctor.is_active.is_(True))
    return db.scalar(stmt)


def create_review(db: Session, *, review_in: ReviewCreate, patient_id: int) -> Review:
    review = Review(
        clinic_id=review_in.clinic_id,
        doctor_id=review_in.doctor_id,
        patient_id=patient_id,
        rating=review_in.rating,
        comment=review_in.comment.strip(),
        is_active=True,
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def get_reviews_by_clinic(
    db: Session,
    *,
    clinic_id: int,
    skip: int = 0,
    limit: int = 100,
) -> list[Review]:
    stmt = (
        select(Review)
        .where(
            Review.clinic_id == clinic_id,
            Review.is_active.is_(True),
        )
        .order_by(Review.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def get_reviews_by_doctor(
    db: Session,
    *,
    doctor_id: int,
    skip: int = 0,
    limit: int = 100,
) -> list[Review]:
    stmt = (
        select(Review)
        .where(
            Review.doctor_id == doctor_id,
            Review.is_active.is_(True),
        )
        .order_by(Review.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def clinic_exists(db: Session, clinic_id: int) -> bool:
    return db.scalar(
        select(Clinic.id).where(Clinic.id == clinic_id, Clinic.is_active.is_(True))
    ) is not None
