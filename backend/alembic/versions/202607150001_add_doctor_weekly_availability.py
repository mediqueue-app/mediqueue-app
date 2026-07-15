"""add doctor weekly availability jsonb

Revision ID: 202607150001
Revises: 202607090001
Create Date: 2026-07-15 22:00:00
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "202607150001"
down_revision: Union[str, None] = "202607090001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "doctors",
        sa.Column(
            "weekly_availability",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=True,
        ),
    )


def downgrade() -> None:
    op.drop_column("doctors", "weekly_availability")
