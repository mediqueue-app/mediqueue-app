"""add patients appointments and user links

Revision ID: 202607090001
Revises: 202607040007
Create Date: 2026-07-09 12:40:00
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "202607090001"
down_revision: Union[str, None] = "202607040007"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("clinic_id", sa.Integer(), nullable=True))
    op.add_column("users", sa.Column("doctor_id", sa.Integer(), nullable=True))
    op.create_index("ix_users_clinic_id", "users", ["clinic_id"], unique=False)
    op.create_index("ix_users_doctor_id", "users", ["doctor_id"], unique=False)
    op.create_foreign_key(
        "fk_users_clinic_id",
        "users",
        "clinics",
        ["clinic_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_foreign_key(
        "fk_users_doctor_id",
        "users",
        "doctors",
        ["doctor_id"],
        ["id"],
        ondelete="SET NULL",
    )

    op.add_column("clinics", sa.Column("city", sa.String(length=255), nullable=True))
    op.add_column(
        "clinics",
        sa.Column("languages", postgresql.ARRAY(sa.String()), nullable=True),
    )

    op.create_table(
        "patients",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("country", sa.String(length=100), nullable=True),
        sa.Column("country_code", sa.String(length=2), nullable=True),
        sa.Column("preferred_language", sa.String(length=50), nullable=True),
        sa.Column("health_history_encrypted", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_patients_user_id", "patients", ["user_id"], unique=True)

    op.create_table(
        "appointments",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("patient_id", sa.Integer(), nullable=False),
        sa.Column("clinic_id", sa.Integer(), nullable=False),
        sa.Column("doctor_id", sa.Integer(), nullable=True),
        sa.Column("branch", sa.String(length=255), nullable=False),
        sa.Column("requested_date", sa.Date(), nullable=False),
        sa.Column("alternative_date", sa.Date(), nullable=True),
        sa.Column("status", sa.String(length=50), server_default="pending", nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint(
            "status IN ('pending', 'confirmed', 'alternative_date', 'cancelled', 'arrived', 'completed')",
            name="ck_appointments_status_valid",
        ),
        sa.ForeignKeyConstraint(["patient_id"], ["patients.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["clinic_id"], ["clinics.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["doctor_id"], ["doctors.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_appointments_patient_id", "appointments", ["patient_id"], unique=False)
    op.create_index("ix_appointments_clinic_id", "appointments", ["clinic_id"], unique=False)
    op.create_index("ix_appointments_doctor_id", "appointments", ["doctor_id"], unique=False)
    op.create_index("ix_appointments_status", "appointments", ["status"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_appointments_status", table_name="appointments")
    op.drop_index("ix_appointments_doctor_id", table_name="appointments")
    op.drop_index("ix_appointments_clinic_id", table_name="appointments")
    op.drop_index("ix_appointments_patient_id", table_name="appointments")
    op.drop_table("appointments")

    op.drop_index("ix_patients_user_id", table_name="patients")
    op.drop_table("patients")

    op.drop_column("clinics", "languages")
    op.drop_column("clinics", "city")

    op.drop_constraint("fk_users_doctor_id", "users", type_="foreignkey")
    op.drop_constraint("fk_users_clinic_id", "users", type_="foreignkey")
    op.drop_index("ix_users_doctor_id", table_name="users")
    op.drop_index("ix_users_clinic_id", table_name="users")
    op.drop_column("users", "doctor_id")
    op.drop_column("users", "clinic_id")
