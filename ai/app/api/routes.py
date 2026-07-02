from fastapi import APIRouter, status

from app.models.schemas import (
    ErrorResponse,
    HealthResponse,
    MatchResponse,
    PatientRequest,
    ValidationErrorResponse,
)
from app.services.matcher import matcher_service

router = APIRouter()

MATCH_SUCCESS_EXAMPLE = {
    "matches": [
        {
            "id": 1,
            "name": "Dr. Ayşe Yılmaz",
            "specialty": "Cardiology",
            "city": "İstanbul",
            "languages": ["Turkish", "English"],
            "price": 2800,
            "rating": 4.9,
            "experience": 18,
            "score": 94,
        },
        {
            "id": 2,
            "name": "Dr. Mehmet Kaya",
            "specialty": "Cardiology",
            "city": "Ankara",
            "languages": ["Turkish", "English", "German"],
            "price": 2200,
            "rating": 4.7,
            "experience": 14,
            "score": 81,
        },
    ]
}

MATCH_EMPTY_EXAMPLE = {"matches": []}

BAD_REQUEST_EXAMPLE = {"detail": "Invalid JSON payload"}

VALIDATION_ERROR_EXAMPLE = {
    "detail": [
        {
            "type": "string_too_short",
            "loc": ["body", "specialty"],
            "msg": "String should have at least 1 character",
            "input": "",
        }
    ]
}

INTERNAL_ERROR_EXAMPLE = {"detail": "Internal server error"}


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Servisin ayakta olup olmadığını kontrol eder. Load balancer ve backend startup kontrollerinde kullanılır.",
    tags=["Health"],
    responses={
        200: {
            "description": "Service is healthy",
            "content": {"application/json": {"example": {"status": "ok"}}},
        },
    },
)
async def health_check() -> HealthResponse:
    return HealthResponse(status="ok")


@router.post(
    "/match",
    response_model=MatchResponse,
    status_code=status.HTTP_200_OK,
    summary="Match doctors for a patient",
    description=(
        "Hasta tercihlerine göre doktorları filtreler, skorlar ve skora göre sıralı liste döner. "
        "Eşleşme bulunamazsa `matches` boş dizi olarak döner."
    ),
    tags=["Matching"],
    responses={
        200: {
            "description": "Matching completed successfully",
            "content": {
                "application/json": {
                    "examples": {
                        "with_matches": {
                            "summary": "Matched doctors found",
                            "value": MATCH_SUCCESS_EXAMPLE,
                        },
                        "empty_matches": {
                            "summary": "No doctors matched filters",
                            "value": MATCH_EMPTY_EXAMPLE,
                        },
                    }
                }
            },
        },
        400: {
            "description": "Malformed JSON or unreadable request body",
            "model": ErrorResponse,
            "content": {"application/json": {"example": BAD_REQUEST_EXAMPLE}},
        },
        422: {
            "description": "Request body failed schema validation",
            "model": ValidationErrorResponse,
            "content": {"application/json": {"example": VALIDATION_ERROR_EXAMPLE}},
        },
        500: {
            "description": "Unexpected server error",
            "model": ErrorResponse,
            "content": {"application/json": {"example": INTERNAL_ERROR_EXAMPLE}},
        },
    },
)
def match_patient(patient: PatientRequest) -> MatchResponse:
    return matcher_service.match(patient)
