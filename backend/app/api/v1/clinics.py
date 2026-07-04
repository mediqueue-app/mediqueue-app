from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.clinics import get_active_doctors_by_clinic, get_clinic, get_clinics
from app.db.session import get_db
from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.user import User, UserRole
from app.schemas.clinic import ClinicRead
from app.schemas.doctor import DoctorRead


router = APIRouter(prefix="/clinics", tags=["clinics"])


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
