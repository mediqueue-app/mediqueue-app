"""add doctor ai fields

Revision ID: 202607040006
Revises: 202607040005
Create Date: 2026-07-04 00:00:06
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "202607040006"
down_revision: Union[str, None] = "202607040005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("doctors", sa.Column("city", sa.String(length=255), nullable=True))
    op.add_column(
        "doctors",
        sa.Column("languages", postgresql.ARRAY(sa.String()), nullable=True),
    )
    op.add_column("doctors", sa.Column("price", sa.Integer(), nullable=True))
    op.add_column("doctors", sa.Column("rating", sa.Float(), nullable=True))
    op.add_column("doctors", sa.Column("experience", sa.Integer(), nullable=True))
    op.create_index("ix_doctors_city", "doctors", ["city"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_doctors_city", table_name="doctors")
    op.drop_column("doctors", "experience")
    op.drop_column("doctors", "rating")
    op.drop_column("doctors", "price")
    op.drop_column("doctors", "languages")
    op.drop_column("doctors", "city")
