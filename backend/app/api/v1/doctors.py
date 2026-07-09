from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.appointments import doctor_exists, list_appointments_by_doctor
from app.crud.doctors import doctor_linked_to_clinic, update_doctor
from app.crud.reviews import get_doctor, get_reviews_by_doctor
from app.db.session import get_db
from app.models.doctor import Doctor
from app.models.user import User, UserRole
from app.schemas.appointment import AppointmentRead
from app.schemas.doctor import DoctorRead, DoctorUpdate
from app.schemas.review import ReviewRead


router = APIRouter(prefix="/doctors", tags=["doctors"])


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


@router.get("/{doctor_id}/reviews", response_model=list[ReviewRead])
def list_doctor_reviews(
    doctor_id: int,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
) -> list[ReviewRead]:
    if get_doctor(db, doctor_id) is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )

    return get_reviews_by_doctor(db, doctor_id=doctor_id, skip=skip, limit=limit)


@router.patch("/{doctor_id}", response_model=DoctorRead)
def patch_doctor(
    doctor_id: int,
    doctor_in: DoctorUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.CLINIC, UserRole.ADMIN])),
) -> Doctor:
    doctor = get_doctor(db, doctor_id)
    if doctor is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    if current_user.role == UserRole.CLINIC.value:
        if current_user.clinic_id is None or not doctor_linked_to_clinic(
            db, doctor_id=doctor_id, clinic_id=current_user.clinic_id
        ):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return update_doctor(db, doctor=doctor, doctor_in=doctor_in)


@router.get("/{doctor_id}/appointments", response_model=list[AppointmentRead])
def list_doctor_appointments(
    doctor_id: int,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.DOCTOR, UserRole.ADMIN])),
) -> list[AppointmentRead]:
    if not doctor_exists(db, doctor_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found")
    if (
        current_user.role == UserRole.DOCTOR.value
        and (current_user.doctor_id is None or current_user.doctor_id != doctor_id)
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return [_to_appointment_read(item) for item in list_appointments_by_doctor(db, doctor_id=doctor_id, skip=skip, limit=limit)]
