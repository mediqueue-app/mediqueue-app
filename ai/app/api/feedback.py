"""Draft feedback endpoint — not persisted to database yet."""

import logging

from fastapi import APIRouter, status

from app.models.schemas import FeedbackRequest, FeedbackResponse

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/feedback",
    response_model=FeedbackResponse,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Submit match feedback (draft)",
    description=(
        "**Draft — not persisted yet.** Accepts user feedback about match results for future "
        "model improvement. Data is logged only; database storage is planned for Phase 2."
    ),
    tags=["feedback"],
    responses={
        202: {
            "description": "Feedback accepted for processing",
            "content": {"application/json": {"example": {"status": "received"}}},
        },
        422: {"description": "Request body failed schema validation"},
    },
)
def submit_feedback(feedback: FeedbackRequest) -> FeedbackResponse:
    logger.info(
        "Match feedback received (draft, not persisted): doctor_id=%s clinic_id=%s rating=%s",
        feedback.selected_doctor_id,
        feedback.selected_clinic_id,
        feedback.rating,
    )
    # TODO: Bu geri bildirim şu an sadece loglanıyor, kalıcı olarak saklanmıyor.
    # Backend'de "reviews" tablosu ve API'si hazır olduğunda (bkz. backend/app/models/review.py),
    # bu feedback verisi review sistemi ile entegre edilip PostgreSQL'e kalıcı olarak yazılmalı.
    # Şu anki davranış: sadece log dosyasına düşer, uygulama yeniden başladığında kaybolur.
    # İlgili: backend reviews API tamamlanınca bu TODO'ya dönülmeli.
    return FeedbackResponse(status="received")
