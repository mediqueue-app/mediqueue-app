from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    specialty: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    languages: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True)
    price: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rating: Mapped[float | None] = mapped_column(Float, nullable=True)
    experience: Mapped[int | None] = mapped_column(Integer, nullable=True)
    ai_source_id: Mapped[int | None] = mapped_column(Integer, nullable=True, unique=True, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="true")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    clinic_links: Mapped[list["DoctorClinic"]] = relationship(
        back_populates="doctor",
        cascade="all, delete-orphan",
    )
    clinics: Mapped[list["Clinic"]] = relationship(
        secondary="doctor_clinics",
        back_populates="doctors",
        viewonly=True,
    )
    reviews: Mapped[list["Review"]] = relationship(back_populates="doctor")
    appointments: Mapped[list["Appointment"]] = relationship(back_populates="doctor")
