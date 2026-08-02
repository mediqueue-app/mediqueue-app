from __future__ import annotations

from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class AppointmentMessageSenderRole:
    PATIENT = "patient"
    CLINIC = "clinic"
    ADMIN = "admin"


class AppointmentMessage(Base):
    """Patient↔clinic message scoped to a single appointment.

    Messaging remains readable after cancellation/completion/no_show.
    New messages may still be sent for coordination after those states.
    """

    __tablename__ = "appointment_messages"
    __table_args__ = (
        CheckConstraint(
            "sender_role IN ('patient', 'clinic', 'admin')",
            name="ck_appointment_messages_sender_role_valid",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    appointment_id: Mapped[int] = mapped_column(
        ForeignKey("appointments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    sender_user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    sender_role: Mapped[str] = mapped_column(String(50), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    read_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    appointment: Mapped["Appointment"] = relationship(back_populates="messages")
    sender: Mapped["User"] = relationship()
