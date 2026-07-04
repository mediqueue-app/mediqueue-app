"""create doctors and doctor clinics

Revision ID: 202607040003
Revises: 202607040002
Create Date: 2026-07-04 00:00:03
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "202607040003"
down_revision: Union[str, None] = "202607040002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "doctors",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("specialty", sa.String(length=255), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_doctors_full_name", "doctors", ["full_name"], unique=False)
    op.create_index("ix_doctors_specialty", "doctors", ["specialty"], unique=False)

    op.create_table(
        "doctor_clinics",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("doctor_id", sa.Integer(), nullable=False),
        sa.Column("clinic_id", sa.Integer(), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("position", sa.String(length=255), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["clinic_id"], ["clinics.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["doctor_id"], ["doctors.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("doctor_id", "clinic_id", name="uq_doctor_clinic"),
    )
    op.create_index("ix_doctor_clinics_clinic_id", "doctor_clinics", ["clinic_id"], unique=False)
    op.create_index("ix_doctor_clinics_doctor_id", "doctor_clinics", ["doctor_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_doctor_clinics_doctor_id", table_name="doctor_clinics")
    op.drop_index("ix_doctor_clinics_clinic_id", table_name="doctor_clinics")
    op.drop_table("doctor_clinics")

    op.drop_index("ix_doctors_specialty", table_name="doctors")
    op.drop_index("ix_doctors_full_name", table_name="doctors")
    op.drop_table("doctors")
