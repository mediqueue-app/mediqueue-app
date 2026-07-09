from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.appointments import (
    clinic_exists,
    create_appointment,
    doctor_exists,
    get_appointment,
    get_patient_by_user_id,
    patient_exists,
    update_appointment_status,
)
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.appointment import AppointmentCreate, AppointmentRead, AppointmentStatusUpdate

router = APIRouter(prefix="/appointments", tags=["appointments"])


def _to_read(item) -> AppointmentRead:
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


@router.post("", response_model=AppointmentRead, status_code=status.HTTP_201_CREATED)
def create_appointment_request(
    appointment_in: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.PATIENT, UserRole.CLINIC, UserRole.ADMIN])),
) -> AppointmentRead:
    if not patient_exists(db, appointment_in.patient_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    if not clinic_exists(db, appointment_in.clinic_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Clinic not found")
    if appointment_in.doctor_id is not None and not doctor_exists(db, appointment_in.doctor_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")

    if current_user.role == UserRole.PATIENT.value:
        patient_profile = get_patient_by_user_id(db, current_user.id)
        if patient_profile is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient profile not found")
        if patient_profile.id != appointment_in.patient_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    appointment = create_appointment(db, appointment_in=appointment_in)
    return _to_read(appointment)


@router.patch("/{appointment_id}/status", response_model=AppointmentRead)
def patch_appointment_status(
    appointment_id: int,
    status_in: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.CLINIC, UserRole.DOCTOR, UserRole.ADMIN])),
) -> AppointmentRead:
    appointment = get_appointment(db, appointment_id)
    if appointment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found")

    if current_user.role == UserRole.CLINIC.value:
        if current_user.clinic_id is None or current_user.clinic_id != appointment.clinic_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    elif current_user.role == UserRole.DOCTOR.value:
        if (
            current_user.doctor_id is None
            or appointment.doctor_id is None
            or current_user.doctor_id != appointment.doctor_id
        ):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    appointment = update_appointment_status(db, appointment=appointment, status_in=status_in)
    return _to_read(appointment)


