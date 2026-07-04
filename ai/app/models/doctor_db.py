"""Read-only SQLAlchemy mapping for the backend ``doctors`` table."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, JSON, String, Text, TypeDecorator, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class StringListType(TypeDecorator):
    """PostgreSQL ``text[]`` in production; JSON array in SQLite tests."""

    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(ARRAY(String))
        return dialect.type_descriptor(JSON())

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        return list(value)


class Base(DeclarativeBase):
    pass


class DoctorDB(Base):
    """Mirrors backend ``app.models.doctor.Doctor`` — read-only, no migrations."""

    __tablename__ = "doctors"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    specialty: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    languages: Mapped[list[str] | None] = mapped_column(StringListType, nullable=True)
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
