from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.encryption import encrypt_health_history
from app.models.patient import Patient
from app.models.user import User
from app.schemas.patient import PatientCreate


def get_patient_by_id(db: Session, patient_id: int) -> Patient | None:
    return db.scalar(
        select(Patient).where(Patient.id == patient_id, Patient.is_active.is_(True))
    )


def get_patient_by_user_id(db: Session, user_id: int) -> Patient | None:
    return db.scalar(
        select(Patient).where(Patient.user_id == user_id, Patient.is_active.is_(True))
    )


def user_exists(db: Session, user_id: int) -> bool:
    return db.scalar(select(User.id).where(User.id == user_id, User.is_active.is_(True))) is not None


def upsert_patient_for_user(
    db: Session,
    *,
    user_id: int,
    patient_in: PatientCreate,
) -> Patient:
    patient = get_patient_by_user_id(db, user_id)
    encrypted_health_history = encrypt_health_history(patient_in.health_history)

    if patient is None:
        patient = Patient(
            user_id=user_id,
            full_name=patient_in.full_name,
            email=patient_in.email,
            phone=patient_in.phone,
            country=patient_in.country,
            country_code=patient_in.country_code,
            preferred_language=patient_in.preferred_language,
            health_history_encrypted=encrypted_health_history,
            is_active=True,
        )
        db.add(patient)
    else:
        patient.full_name = patient_in.full_name
        patient.email = patient_in.email
        patient.phone = patient_in.phone
        patient.country = patient_in.country
        patient.country_code = patient_in.country_code
        patient.preferred_language = patient_in.preferred_language
        if patient_in.health_history is not None:
            patient.health_history_encrypted = encrypted_health_history

    db.commit()
    db.refresh(patient)
    return patient


def create_manual_patient(
    db: Session,
    *,
    patient_in: PatientCreate,
    user_id: int | None,
) -> Patient:
    encrypted_health_history = encrypt_health_history(patient_in.health_history)
    patient = Patient(
        user_id=user_id,
        full_name=patient_in.full_name,
        email=patient_in.email,
        phone=patient_in.phone,
        country=patient_in.country,
        country_code=patient_in.country_code,
        preferred_language=patient_in.preferred_language,
        health_history_encrypted=encrypted_health_history,
        is_active=True,
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient
