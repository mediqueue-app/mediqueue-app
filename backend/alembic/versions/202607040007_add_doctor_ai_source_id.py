"""add doctor ai_source_id

Revision ID: 202607040007
Revises: 202607040006
Create Date: 2026-07-04 00:00:07
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "202607040007"
down_revision: Union[str, None] = "202607040006"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("doctors", sa.Column("ai_source_id", sa.Integer(), nullable=True))
    op.create_index("ix_doctors_ai_source_id", "doctors", ["ai_source_id"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_doctors_ai_source_id", table_name="doctors")
    op.drop_column("doctors", "ai_source_id")
