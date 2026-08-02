"""create appointment_messages table

Revision ID: 202608030002
Revises: 202608030001
Create Date: 2026-08-03 02:20:00
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "202608030002"
down_revision: Union[str, None] = "202608030001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "appointment_messages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("appointment_id", sa.Integer(), nullable=False),
        sa.Column("sender_user_id", sa.Integer(), nullable=False),
        sa.Column("sender_role", sa.String(length=50), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("read_at", sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint(
            "sender_role IN ('patient', 'clinic', 'admin')",
            name="ck_appointment_messages_sender_role_valid",
        ),
        sa.ForeignKeyConstraint(
            ["appointment_id"],
            ["appointments.id"],
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["sender_user_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_appointment_messages_appointment_id",
        "appointment_messages",
        ["appointment_id"],
        unique=False,
    )
    op.create_index(
        "ix_appointment_messages_sender_user_id",
        "appointment_messages",
        ["sender_user_id"],
        unique=False,
    )
    op.create_index(
        "ix_appointment_messages_appointment_id_created_at",
        "appointment_messages",
        ["appointment_id", "created_at"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_appointment_messages_appointment_id_created_at",
        table_name="appointment_messages",
    )
    op.drop_index(
        "ix_appointment_messages_sender_user_id",
        table_name="appointment_messages",
    )
    op.drop_index(
        "ix_appointment_messages_appointment_id",
        table_name="appointment_messages",
    )
    op.drop_table("appointment_messages")
