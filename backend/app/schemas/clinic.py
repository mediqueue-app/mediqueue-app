from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


def _strip_or_none(value: str | None) -> str | None:
    if value is None:
        return None
    trimmed = value.strip()
    return trimmed or None


class ClinicUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    address: str | None = Field(default=None, max_length=500)
    phone: str | None = Field(default=None, max_length=50)
    city: str | None = Field(default=None, max_length=255)
    languages: list[str] | None = None

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str | None) -> str | None:
        if value is None:
            return None
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("name must not be empty")
        return trimmed

    @field_validator("description", "address", "phone", "city")
    @classmethod
    def normalize_optional_strings(cls, value: str | None) -> str | None:
        return _strip_or_none(value)

    @field_validator("languages")
    @classmethod
    def validate_languages(cls, value: list[str] | None) -> list[str] | None:
        if value is None:
            return None
        normalized: list[str] = []
        for language in value:
            trimmed = language.strip()
            if not trimmed:
                raise ValueError("languages must not contain empty values")
            normalized.append(trimmed)
        return normalized


class ClinicRead(BaseModel):
    id: int
    name: str
    description: str | None
    address: str | None
    phone: str | None
    city: str | None
    languages: list[str] | None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
