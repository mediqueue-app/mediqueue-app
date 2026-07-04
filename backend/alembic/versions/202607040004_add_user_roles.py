"""add user roles

Revision ID: 202607040004
Revises: 202607040003
Create Date: 2026-07-04 00:00:04
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "202607040004"
down_revision: Union[str, None] = "202607040003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "role",
            sa.String(length=50),
            server_default="patient",
            nullable=False,
        ),
    )
    op.create_check_constraint(
        "ck_users_role_valid",
        "users",
        "role IN ('admin', 'clinic', 'doctor', 'patient')",
    )


def downgrade() -> None:
    op.drop_constraint("ck_users_role_valid", "users", type_="check")
    op.drop_column("users", "role")
