from __future__ import annotations

from datetime import date, datetime

from sqlalchemy import CheckConstraint, Date, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class AppointmentStatus:
    PENDING = "pending"
    CONFIRMED = "confirmed"
    ALTERNATIVE_DATE = "alternative_date"
    CANCELLED = "cancelled"
    ARRIVED = "arrived"
    COMPLETED = "completed"
    NO_SHOW = "no_show"


class Appointment(Base):
    __tablename__ = "appointments"
    __table_args__ = (
        CheckConstraint(
            "status IN ("
            "'pending', 'confirmed', 'alternative_date', 'cancelled', "
            "'arrived', 'completed', 'no_show'"
            ")",
            name="ck_appointments_status_valid",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    clinic_id: Mapped[int] = mapped_column(
        ForeignKey("clinics.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    doctor_id: Mapped[int | None] = mapped_column(
        ForeignKey("doctors.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    branch: Mapped[str] = mapped_column(String(255), nullable=False)
    requested_date: Mapped[date] = mapped_column(Date, nullable=False)
    alternative_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default=AppointmentStatus.PENDING,
        server_default=AppointmentStatus.PENDING,
        index=True,
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    patient: Mapped["Patient"] = relationship(back_populates="appointments")
    clinic: Mapped["Clinic"] = relationship(back_populates="appointments")
    doctor: Mapped["Doctor | None"] = relationship(back_populates="appointments")
    messages: Mapped[list["AppointmentMessage"]] = relationship(
        back_populates="appointment",
        cascade="all, delete-orphan",
    )
