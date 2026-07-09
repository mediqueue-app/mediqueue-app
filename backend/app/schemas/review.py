from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class ReviewCreate(BaseModel):
    clinic_id: int | None = None
    doctor_id: int | None = None
    rating: int = Field(ge=1, le=5)
    comment: str = Field(min_length=1, max_length=2000)

    @field_validator("comment")
    @classmethod
    def validate_comment(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("comment must not be empty")
        return trimmed

    @model_validator(mode="after")
    def validate_exactly_one_target(self) -> "ReviewCreate":
        has_clinic = self.clinic_id is not None
        has_doctor = self.doctor_id is not None

        if not has_clinic and not has_doctor:
            raise ValueError("At least one of clinic_id or doctor_id must be provided")
        if has_clinic and has_doctor:
            raise ValueError("Provide either clinic_id or doctor_id, not both")

        return self


class ReviewRead(BaseModel):
    id: int
    patient_id: int
    clinic_id: int | None
    doctor_id: int | None
    rating: int
    comment: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
