from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.crud.reviews import get_doctor, get_reviews_by_doctor
from app.db.session import get_db
from app.schemas.review import ReviewRead


router = APIRouter(prefix="/doctors", tags=["doctors"])


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
