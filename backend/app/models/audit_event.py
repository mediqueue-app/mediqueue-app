from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class AuditEvent(Base):
    """Append-only trail for legally sensitive account actions.

    Do not store names, emails, phone numbers, or message bodies here.
    """

    __tablename__ = "audit_events"

    id: Mapped[int] = mapped_column(primary_key=True)
    action: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    actor_user_id: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    actor_role: Mapped[str] = mapped_column(String(50), nullable=False)
    subject_type: Mapped[str] = mapped_column(String(50), nullable=False)
    subject_id: Mapped[int] = mapped_column(Integer, nullable=False)
    details: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
