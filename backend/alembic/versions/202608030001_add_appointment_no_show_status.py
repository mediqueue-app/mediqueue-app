"""add appointment no_show status

Revision ID: 202608030001
Revises: 202607150001
Create Date: 2026-08-03 02:10:00
"""
from typing import Sequence, Union

from alembic import op


revision: str = "202608030001"
down_revision: Union[str, None] = "202607150001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

OLD_STATUSES = (
    "pending",
    "confirmed",
    "alternative_date",
    "cancelled",
    "arrived",
    "completed",
)
NEW_STATUSES = OLD_STATUSES + ("no_show",)


def _status_in_clause(statuses: tuple[str, ...]) -> str:
    return ", ".join(f"'{status}'" for status in statuses)


def upgrade() -> None:
    op.drop_constraint("ck_appointments_status_valid", "appointments", type_="check")
    op.create_check_constraint(
        "ck_appointments_status_valid",
        "appointments",
        f"status IN ({_status_in_clause(NEW_STATUSES)})",
    )


def downgrade() -> None:
    # Move no_show rows back to a prior valid status before restoring the old check.
    op.execute(
        "UPDATE appointments SET status = 'cancelled' WHERE status = 'no_show'"
    )
    op.drop_constraint("ck_appointments_status_valid", "appointments", type_="check")
    op.create_check_constraint(
        "ck_appointments_status_valid",
        "appointments",
        f"status IN ({_status_in_clause(OLD_STATUSES)})",
    )
