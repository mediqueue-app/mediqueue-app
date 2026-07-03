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


class MatchResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "matches": [
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
                },
                {
                    "matches": [],
                    "message": "Kriterlerinize uygun doktor bulunamadı, filtreleri genişletmeyi deneyin.",
                },
            ]
        }
    )

    matches: list[DoctorResponse] = Field(
        ...,
        description="Ranked list of matched doctors",
    )
    message: Optional[str] = Field(
        default=None,
        description="Informational message when no doctors match the criteria",
        examples=["Kriterlerinize uygun doktor bulunamadı, filtreleri genişletmeyi deneyin."],
    )
