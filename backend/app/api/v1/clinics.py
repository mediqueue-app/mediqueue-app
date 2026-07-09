from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.appointments import clinic_exists as clinic_exists_for_appointments
from app.crud.appointments import list_appointments_by_clinic
from app.crud.clinics import get_active_doctors_by_clinic, get_clinic, get_clinics, update_clinic
from app.crud.doctors import create_doctor, link_doctor_to_clinic
from app.crud.reviews import get_reviews_by_clinic
from app.db.session import get_db
from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.user import User, UserRole
from app.schemas.appointment import AppointmentRead
from app.schemas.clinic import ClinicRead, ClinicUpdate
from app.schemas.doctor import DoctorCreate
from app.schemas.doctor import DoctorRead
from app.schemas.review import ReviewRead


router = APIRouter(prefix="/clinics", tags=["clinics"])


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


@router.get("", response_model=list[ClinicRead])
def list_clinics(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
) -> list[Clinic]:
    return get_clinics(db, skip=skip, limit=limit)


@router.get("/{clinic_id}", response_model=ClinicRead)
def get_clinic_detail(clinic_id: int, db: Session = Depends(get_db)) -> Clinic:
    clinic = get_clinic(db, clinic_id=clinic_id)
    if clinic is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Clinic not found",
        )

    return clinic


@router.get("/{clinic_id}/doctors", response_model=list[DoctorRead])
def list_clinic_doctors(
    clinic_id: int,
    db: Session = Depends(get_db),
    _current_user: User = Depends(
        require_roles(
            [
                UserRole.ADMIN,
                UserRole.CLINIC,
                UserRole.DOCTOR,
                UserRole.PATIENT,
            ]
        )
    ),
) -> list[Doctor]:
    clinic = get_clinic(db, clinic_id=clinic_id)
    if clinic is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Clinic not found",
        )

    return get_active_doctors_by_clinic(db, clinic_id=clinic_id)


@router.get("/{clinic_id}/reviews", response_model=list[ReviewRead])
def list_clinic_reviews(
    clinic_id: int,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
) -> list[ReviewRead]:
    clinic = get_clinic(db, clinic_id=clinic_id)
    if clinic is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Clinic not found",
        )

    return get_reviews_by_clinic(db, clinic_id=clinic_id, skip=skip, limit=limit)


@router.patch("/{clinic_id}", response_model=ClinicRead)
def patch_clinic(
    clinic_id: int,
    clinic_in: ClinicUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.CLINIC, UserRole.ADMIN])),
) -> Clinic:
    clinic = get_clinic(db, clinic_id=clinic_id)
    if clinic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Clinic not found")
    if (
        current_user.role == UserRole.CLINIC.value
        and (current_user.clinic_id is None or current_user.clinic_id != clinic_id)
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return update_clinic(db, clinic=clinic, clinic_in=clinic_in)


@router.post("/{clinic_id}/doctors", response_model=DoctorRead, status_code=status.HTTP_201_CREATED)
def create_clinic_doctor(
    clinic_id: int,
    doctor_in: DoctorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.CLINIC, UserRole.ADMIN])),
) -> Doctor:
    clinic = get_clinic(db, clinic_id=clinic_id)
    if clinic is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Clinic not found")
    if (
        current_user.role == UserRole.CLINIC.value
        and (current_user.clinic_id is None or current_user.clinic_id != clinic_id)
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    doctor = create_doctor(db, doctor_in=doctor_in)
    link_doctor_to_clinic(db, doctor_id=doctor.id, clinic_id=clinic_id)
    return doctor


@router.get("/{clinic_id}/appointments", response_model=list[AppointmentRead])
def get_clinic_appointments(
    clinic_id: int,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.CLINIC, UserRole.ADMIN])),
) -> list[AppointmentRead]:
    if not clinic_exists_for_appointments(db, clinic_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Clinic not found")
    if (
        current_user.role == UserRole.CLINIC.value
        and (current_user.clinic_id is None or current_user.clinic_id != clinic_id)
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return [
        _to_appointment_read(item)
        for item in list_appointments_by_clinic(db, clinic_id=clinic_id, skip=skip, limit=limit)
    ]
