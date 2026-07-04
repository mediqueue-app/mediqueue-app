"""create clinics

Revision ID: 202607040002
Revises: 202607040001
Create Date: 2026-07-04 00:00:02
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "202607040002"
down_revision: Union[str, None] = "202607040001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "clinics",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("address", sa.String(length=500), nullable=True),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_clinics_name", "clinics", ["name"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_clinics_name", table_name="clinics")
    op.drop_table("clinics")
