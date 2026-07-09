from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


def _strip_or_none(value: str | None) -> str | None:
    if value is None:
        return None
    trimmed = value.strip()
    return trimmed or None


class PatientCreate(BaseModel):
    user_id: int | None = None
    full_name: str = Field(min_length=1, max_length=255)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    country: str | None = Field(default=None, max_length=100)
    country_code: str | None = Field(default=None, min_length=2, max_length=2)
    preferred_language: str | None = Field(default=None, max_length=50)
    health_history: str | None = None

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("full_name must not be empty")
        return trimmed

    @field_validator("phone", "country", "preferred_language", mode="before")
    @classmethod
    def normalize_optional_text(cls, value: str | None) -> str | None:
        return _strip_or_none(value)

    @field_validator("country_code")
    @classmethod
    def normalize_country_code(cls, value: str | None) -> str | None:
        normalized = _strip_or_none(value)
        if normalized is None:
            return None
        return normalized.upper()

    @field_validator("health_history")
    @classmethod
    def normalize_health_history(cls, value: str | None) -> str | None:
        return _strip_or_none(value)


class PatientRead(BaseModel):
    id: int
    user_id: int | None
    full_name: str
    email: EmailStr | None
    phone: str | None
    country: str | None
    country_code: str | None
    preferred_language: str | None
    has_health_history: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
