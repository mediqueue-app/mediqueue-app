from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.session import get_db
from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.user import User, UserRole
from app.schemas.admin import AdminSummary


router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/summary", response_model=AdminSummary)
def get_admin_summary(
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles([UserRole.ADMIN])),
) -> AdminSummary:
    """Return aggregate counts for administrators only."""
    return AdminSummary(
        users=db.scalar(select(func.count()).select_from(User)) or 0,
        clinics=db.scalar(select(func.count()).select_from(Clinic)) or 0,
        doctors=db.scalar(select(func.count()).select_from(Doctor)) or 0,
    )
