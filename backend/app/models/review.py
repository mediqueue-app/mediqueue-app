from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, CheckConstraint, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (
        CheckConstraint("rating BETWEEN 1 AND 5", name="ck_reviews_rating_range"),
        CheckConstraint("length(trim(comment)) > 0", name="ck_reviews_comment_not_empty"),
        CheckConstraint(
            "(clinic_id IS NOT NULL AND doctor_id IS NULL) OR "
            "(clinic_id IS NULL AND doctor_id IS NOT NULL)",
            name="ck_reviews_exactly_one_target",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    clinic_id: Mapped[int | None] = mapped_column(
        ForeignKey("clinics.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    doctor_id: Mapped[int | None] = mapped_column(
        ForeignKey("doctors.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    patient_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    rating: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    comment: Mapped[str] = mapped_column(Text, nullable=False)
    sentiment_label: Mapped[str | None] = mapped_column(String(50), nullable=True)
    sentiment_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="true")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    clinic: Mapped["Clinic | None"] = relationship(back_populates="reviews")
    doctor: Mapped["Doctor | None"] = relationship(back_populates="reviews")
    patient: Mapped["User"] = relationship(back_populates="reviews")
