from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.reviews import clinic_exists, create_review, get_doctor
from app.db.session import get_db
from app.models.review import Review
from app.models.user import User, UserRole
from app.schemas.review import ReviewCreate, ReviewRead


router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.post("", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
def create_patient_review(
    review_in: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.PATIENT])),
) -> Review:
    if review_in.clinic_id is not None:
        if not clinic_exists(db, review_in.clinic_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Clinic not found",
            )
    else:
        assert review_in.doctor_id is not None
        if get_doctor(db, review_in.doctor_id) is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found",
            )

    return create_review(db, review_in=review_in, patient_id=current_user.id)
