from pydantic import BaseModel, Field


class MatchRequest(BaseModel):
    specialty: str = Field(min_length=1)
    language: str = Field(min_length=1)
    budget: int = Field(gt=0)
    city: str | None = None


class MatchDoctor(BaseModel):
    """AI match result doctor — uses ``name`` to mirror the AI service contract."""

    id: int
    name: str
    specialty: str
    city: str
    languages: list[str]
    price: int = Field(ge=0)
    rating: float = Field(ge=0.0, le=5.0)
    experience: int = Field(ge=0)
    score: float = Field(ge=0.0, le=100.0)


class MatchClinic(BaseModel):
    id: int
    name: str
    description: str | None = None
    address: str | None = None
    phone: str | None = None
    score: float = Field(ge=0.0, le=100.0)


class MatchResponse(BaseModel):
    doctors: list[MatchDoctor]
    clinics: list[MatchClinic]
    message: str | None = None
