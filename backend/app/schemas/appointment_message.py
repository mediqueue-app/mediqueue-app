from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

MESSAGE_BODY_MAX_LENGTH = 2000


class AppointmentMessageCreate(BaseModel):
    body: str = Field(min_length=1, max_length=MESSAGE_BODY_MAX_LENGTH)

    @field_validator("body")
    @classmethod
    def normalize_body(cls, value: str) -> str:
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("body must not be empty")
        return trimmed


class AppointmentMessageRead(BaseModel):
    id: int
    appointment_id: int
    sender_user_id: int
    sender_role: str
    body: str
    created_at: datetime
    read_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
