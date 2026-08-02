from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.models.appointment import AppointmentStatus

ALLOWED_APPOINTMENT_STATUSES = {
    AppointmentStatus.PENDING,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.ALTERNATIVE_DATE,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.ARRIVED,
    AppointmentStatus.COMPLETED,
    AppointmentStatus.NO_SHOW,
}


class AppointmentCreate(BaseModel):
    patient_id: int = Field(ge=1)
    clinic_id: int = Field(ge=1)
    doctor_id: int | None = Field(default=None, ge=1)
    branch: str = Field(min_length=1, max_length=255)
    requested_date: date
    alternative_date: date | None = None
    notes: str | None = None

    @field_validator("branch")
    @classmethod
    def normalize_branch(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("branch must not be empty")
        return trimmed

    @field_validator("notes")
    @classmethod
    def normalize_notes(cls, value: str | None) -> str | None:
        if value is None:
            return None
        trimmed = value.strip()
        return trimmed or None


class AppointmentStatusUpdate(BaseModel):
    status: str
    alternative_date: date | None = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in ALLOWED_APPOINTMENT_STATUSES:
            raise ValueError("Invalid appointment status")
        return normalized

    @model_validator(mode="after")
    def validate_alternative_date_requirement(self) -> "AppointmentStatusUpdate":
        if self.status == AppointmentStatus.ALTERNATIVE_DATE and self.alternative_date is None:
            raise ValueError("alternative_date is required when status is 'alternative_date'")
        return self


class AppointmentRead(BaseModel):
    id: int
    patient_id: int
    clinic_id: int
    doctor_id: int | None
    branch: str
    requested_date: date
    alternative_date: date | None
    status: str
    notes: str | None
    patient_name: str
    doctor_name: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
