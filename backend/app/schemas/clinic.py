from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ClinicRead(BaseModel):
    id: int
    name: str
    description: str | None
    address: str | None
    phone: str | None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
