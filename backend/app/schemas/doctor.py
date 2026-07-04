from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class DoctorBase(BaseModel):
    full_name: str = Field(max_length=255)
    specialty: str | None = Field(default=None, max_length=255)
    bio: str | None = None
    city: str | None = Field(default=None, max_length=255)
    languages: list[str] | None = None
    price: int | None = Field(default=None, ge=0)
    rating: float | None = Field(default=None, ge=0.0, le=5.0)
    experience: int | None = Field(default=None, ge=0)
    ai_source_id: int | None = Field(default=None, ge=1)


class DoctorCreate(DoctorBase):
    pass


class DoctorRead(DoctorBase):
    id: int
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
