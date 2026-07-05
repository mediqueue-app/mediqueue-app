from pydantic import BaseModel, Field


class AdminSummary(BaseModel):
    users: int = Field(ge=0)
    clinics: int = Field(ge=0)
    doctors: int = Field(ge=0)
