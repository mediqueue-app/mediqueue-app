from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DoctorRead(BaseModel):
    id: int
    full_name: str
    specialty: str | None
    bio: str | None
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
