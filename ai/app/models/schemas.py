from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class HealthResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={"examples": [{"status": "ok"}]},
    )

    status: str = Field(default="ok", examples=["ok"])


class ErrorResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={"examples": [{"detail": "Invalid JSON payload"}]},
    )

    detail: str = Field(..., examples=["Invalid JSON payload"])


class ValidationErrorItem(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "type": "string_too_short",
                    "loc": ["body", "specialty"],
                    "msg": "String should have at least 1 character",
                    "input": "",
                }
            ]
        },
    )

    type: str
    loc: list[str | int]
    msg: str
    input: str | int | float | bool | None = None


class ValidationErrorResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "detail": [
                        {
                            "type": "string_too_short",
                            "loc": ["body", "specialty"],
                            "msg": "String should have at least 1 character",
                            "input": "",
                        }
                    ]
                }
            ]
        },
    )

    detail: list[ValidationErrorItem] | str


class PatientRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "specialty": "Cardiology",
                    "language": "Turkish",
                    "budget": 3000,
                    "city": "Istanbul",
                },
                {
                    "specialty": "Dermatology",
                    "language": "English",
                    "budget": 1500,
                },
            ]
        }
    )

    specialty: str = Field(
        ...,
        min_length=1,
        description="Requested medical specialty",
        examples=["Cardiology", "Dermatology", "Kardiyoloji"],
    )
    language: str = Field(
        ...,
        min_length=1,
        description="Preferred consultation language (code or full name)",
        examples=["Turkish", "English", "tr", "en"],
    )
    budget: int = Field(
        ...,
        gt=0,
        description="Maximum budget in TRY (must be a positive integer)",
        examples=[3000, 1500],
    )
    city: Optional[str] = Field(
        default=None,
        description="Preferred city (optional). Same-city doctors receive a score bonus.",
        examples=["Istanbul", "Ankara", "İstanbul"],
    )


class DoctorResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
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
                }
            ]
        }
    )

    id: int = Field(..., description="Unique doctor identifier", examples=[1])
    name: str = Field(..., description="Doctor full name", examples=["Dr. Ayşe Yılmaz"])
    specialty: str = Field(..., description="Medical specialty", examples=["Cardiology"])
    city: str = Field(..., description="City where the doctor practices", examples=["İstanbul"])
    languages: list[str] = Field(
        ...,
        description="Languages spoken by the doctor",
        examples=[["Turkish", "English"]],
    )
    price: int = Field(..., ge=0, description="Consultation price in TRY", examples=[2800])
    rating: float = Field(
        ...,
        ge=0.0,
        le=5.0,
        description="Average patient rating (0-5)",
        examples=[4.8],
    )
    experience: int = Field(
        ...,
        ge=0,
        description="Years of professional experience",
        examples=[12],
    )
    score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Rule-based match score (0-100)",
        examples=[92],
    )


class ClinicResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "id": 1,
                    "name": "MediQueue Heart Center",
                    "description": "Cardiology and internal medicine",
                    "address": "Nişantaşı, İstanbul",
                    "phone": "+90 212 555 0101",
                    "score": 88,
                }
            ]
        }
    )

    id: int = Field(..., description="Unique clinic identifier", examples=[1])
    name: str = Field(..., description="Clinic name", examples=["MediQueue Heart Center"])
    description: str | None = Field(
        default=None,
        description="Clinic description",
        examples=["Cardiology and internal medicine"],
    )
    address: str | None = Field(
        default=None,
        description="Clinic address",
        examples=["Nişantaşı, İstanbul"],
    )
    phone: str | None = Field(
        default=None,
        description="Contact phone number",
        examples=["+90 212 555 0101"],
    )
    score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Rule-based match score (0-100)",
        examples=[88],
    )


class DoctorMatchResult(BaseModel):
    matches: list[DoctorResponse] = Field(
        ...,
        description="Ranked list of matched doctors",
    )


class MatchResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "doctors": [
                        {
                            "id": 1,
                            "name": "Dr. Ayşe Yılmaz",
                            "specialty": "Kardiyoloji",
                            "city": "Istanbul",
                            "languages": ["tr", "en"],
                            "price": 1200,
                            "rating": 4.8,
                            "experience": 12,
                            "score": 92,
                        }
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
                },
                {
                    "doctors": [],
                    "clinics": [],
                    "message": "Kriterlerinize uygun doktor veya klinik bulunamadı, filtreleri genişletmeyi deneyin.",
                },
            ]
        }
    )

    doctors: list[DoctorResponse] = Field(
        ...,
        description="Ranked list of matched doctors",
    )
    clinics: list[ClinicResponse] = Field(
        ...,
        description="Ranked list of matched clinics",
    )
    message: Optional[str] = Field(
        default=None,
        description="Informational message when no doctors or clinics match the criteria",
        examples=[
            "Kriterlerinize uygun doktor veya klinik bulunamadı, filtreleri genişletmeyi deneyin."
        ],
    )


class FeedbackRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "match_request": {
                        "specialty": "Cardiology",
                        "language": "Turkish",
                        "budget": 3000,
                        "city": "Istanbul",
                    },
                    "selected_doctor_id": 1,
                    "selected_clinic_id": 1,
                    "rating": 5,
                    "comment": "Great match results",
                }
            ]
        }
    )

    match_request: PatientRequest
    selected_doctor_id: int | None = Field(default=None, ge=1)
    selected_clinic_id: int | None = Field(default=None, ge=1)
    rating: int | None = Field(default=None, ge=1, le=5)
    comment: str | None = Field(default=None, min_length=1)


class FeedbackResponse(BaseModel):
    status: str = Field(default="received", examples=["received"])
