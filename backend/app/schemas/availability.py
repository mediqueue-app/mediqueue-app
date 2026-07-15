from pydantic import BaseModel, Field


class HourSlot(BaseModel):
    hour: str = Field(min_length=4, max_length=5, examples=["09:00"])
    available: bool


class AvailabilityDay(BaseModel):
    day_of_week: int = Field(ge=1, le=7, description="1=Monday … 7=Sunday")
    label: str = Field(min_length=1, max_length=32)
    slots: list[HourSlot] = Field(min_length=1)


class AvailabilityRead(BaseModel):
    days: list[AvailabilityDay]


class AvailabilityUpdate(BaseModel):
    days: list[AvailabilityDay] = Field(min_length=1)
