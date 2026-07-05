from fastapi import APIRouter, Depends, status

from app.core.dependencies import get_matcher_service
from app.models.schemas import (
    ErrorResponse,
    HealthResponse,
    MatchResponse,
    PatientRequest,
    ValidationErrorResponse,
)
from app.services.matcher import MatcherService

router = APIRouter()

MATCH_SUCCESS_EXAMPLE = {
    "doctors": [
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
    ],
    "clinics": [
        {
            "id": 1,
            "name": "MediQueue Heart Center",
            "description": "Cardiology clinic",
            "address": "Nişantaşı, İstanbul",
            "phone": "+90 212 555 0101",
            "score": 88,
        }
    ],
}

MATCH_EMPTY_EXAMPLE = {
    "doctors": [],
    "clinics": [],
    "message": "Kriterlerinize uygun doktor veya klinik bulunamadı, filtreleri genişletmeyi deneyin.",
}

NO_MATCH_MESSAGE = (
    "Kriterlerinize uygun doktor veya klinik bulunamadı, filtreleri genişletmeyi deneyin."
)

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
    tags=["health"],
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
    summary="Match doctors and clinics for a patient",
    description=(
        "Hasta tercihlerine göre uygun **doktorları ve klinikleri** kural tabanlı filtreleme ve skorlama ile "
        "filtreler, skorlar ve skora göre sıralı listeler döner. Makine öğrenmesi veya LLM kullanılmaz.\n\n"
        "**Zorunlu alanlar:** `specialty`, `language`, `budget`\n"
        "**Opsiyonel alanlar:** `city`, `max_doctors`, `max_clinics`\n\n"
        "| Alan | Tip | Açıklama |\n"
        "|------|-----|----------|\n"
        "| `specialty` | string | Uzmanlık alanı. Örnek: `Cardiology`, `Kardiyoloji`, `Saç Ekimi`, `FUE`, `Dentistry` |\n"
        "| `language` | string | Tercih edilen dil. Örnek: `Turkish`, `English`, `tr`, `en`, `Arabic` |\n"
        "| `budget` | integer | Maksimum bütçe, **TL cinsinden tam sayı**. Doktor eşleşmesinde uygulanır. Örnek: `3000` |\n"
        "| `city` | string | Tercih edilen şehir. Örnek: `Istanbul`, `Ankara`, `İzmir` |\n"
        "| `max_doctors` | integer | Opsiyonel. Skor sırasına göre dönecek maksimum doktor sayısı (1–100). Verilmezse tüm eşleşmeler döner. |\n"
        "| `max_clinics` | integer | Opsiyonel. Skor sırasına göre dönecek maksimum klinik sayısı (1–100). Verilmezse tüm eşleşmeler döner. |\n\n"
        "Eşleşme bulunamazsa HTTP `200` döner; `doctors` ve `clinics` boş liste olur, bilgilendirme `message` alanında yer alır."
    ),
    tags=["matching"],
    responses={
        200: {
            "description": "Matching completed successfully",
            "content": {
                "application/json": {
                    "examples": {
                        "with_matches": {
                            "summary": "Matched doctors and clinics found",
                            "value": MATCH_SUCCESS_EXAMPLE,
                        },
                        "empty_matches": {
                            "summary": "No doctors or clinics matched filters",
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
def match_patient(
    patient: PatientRequest,
    matcher: MatcherService = Depends(get_matcher_service),
) -> MatchResponse:
    result = matcher.match(patient)
    if not result.doctors and not result.clinics:
        return result.model_copy(update={"message": NO_MATCH_MESSAGE})
    return result
