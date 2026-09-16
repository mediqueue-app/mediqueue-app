from datetime import datetime

from pydantic import BaseModel


class AccountErasureRead(BaseModel):
    status: str = "erased"
    erased_at: datetime
    cancelled_appointments: int
    redacted_messages: int
