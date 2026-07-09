from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.appointments import list_appointments_by_patient
from app.crud.patients import (
    create_manual_patient,
    get_patient_by_user_id,
    upsert_patient_for_user,
    user_exists,
)
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.appointment import AppointmentRead
from app.schemas.patient import PatientCreate, PatientRead

router = APIRouter(prefix="/patients", tags=["patients"])


def _to_patient_read(patient) -> PatientRead:
    return PatientRead.model_validate(
        {
            "id": patient.id,
            "user_id": patient.user_id,
            "full_name": patient.full_name,
            "email": patient.email,
            "phone": patient.phone,
            "country": patient.country,
            "country_code": patient.country_code,
            "preferred_language": patient.preferred_language,
            "has_health_history": patient.health_history_encrypted is not None,
            "is_active": patient.is_active,
            "created_at": patient.created_at,
            "updated_at": patient.updated_at,
        }
    )


def _to_appointment_read(item) -> AppointmentRead:
    return AppointmentRead.model_validate(
        {
            "id": item.id,
            "patient_id": item.patient_id,
            "clinic_id": item.clinic_id,
            "doctor_id": item.doctor_id,
            "branch": item.branch,
            "requested_date": item.requested_date,
            "alternative_date": item.alternative_date,
            "status": item.status,
            "notes": item.notes,
            "patient_name": item.patient.full_name,
            "doctor_name": item.doctor.full_name if item.doctor is not None else None,
            "created_at": item.created_at,
            "updated_at": item.updated_at,
        }
    )


@router.post("", response_model=PatientRead, status_code=status.HTTP_201_CREATED)
def create_patient(
    patient_in: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.PATIENT, UserRole.CLINIC, UserRole.ADMIN])),
) -> PatientRead:
    try:
        if current_user.role == UserRole.PATIENT.value:
            patient = upsert_patient_for_user(
                db,
                user_id=current_user.id,
                patient_in=patient_in,
            )
            return _to_patient_read(patient)

        target_user_id = patient_in.user_id
        if target_user_id is not None and not user_exists(db, target_user_id):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        patient = create_manual_patient(db, patient_in=patient_in, user_id=target_user_id)
        return _to_patient_read(patient)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc


@router.get("/me", response_model=PatientRead)
def get_my_patient_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.PATIENT])),
) -> PatientRead:
    patient = get_patient_by_user_id(db, current_user.id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient profile not found",
        )
    return _to_patient_read(patient)


@router.get("/me/appointments", response_model=list[AppointmentRead])
def get_my_appointments(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.PATIENT])),
) -> list[AppointmentRead]:
    patient = get_patient_by_user_id(db, current_user.id)
    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient profile not found",
        )
    return [
        _to_appointment_read(item)
        for item in list_appointments_by_patient(db, patient_id=patient.id, skip=skip, limit=limit)
    ]
