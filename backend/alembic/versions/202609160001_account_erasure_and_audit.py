"""account erasure columns and audit_events

Revision ID: 202609160001
Revises: 202608030002
Create Date: 2026-09-16 08:56:00
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "202609160001"
down_revision: Union[str, None] = "202608030002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("patients", sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("clinics", sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True))

    op.create_table(
        "audit_events",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("action", sa.String(length=80), nullable=False),
        sa.Column("actor_user_id", sa.Integer(), nullable=True),
        sa.Column("actor_role", sa.String(length=50), nullable=False),
        sa.Column("subject_type", sa.String(length=50), nullable=False),
        sa.Column("subject_id", sa.Integer(), nullable=False),
        sa.Column(
            "details",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column("ip_address", sa.String(length=64), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("note", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_audit_events_action", "audit_events", ["action"], unique=False)
    op.create_index(
        "ix_audit_events_actor_user_id",
        "audit_events",
        ["actor_user_id"],
        unique=False,
    )
    op.create_index(
        "ix_audit_events_created_at",
        "audit_events",
        ["created_at"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_audit_events_created_at", table_name="audit_events")
    op.drop_index("ix_audit_events_actor_user_id", table_name="audit_events")
    op.drop_index("ix_audit_events_action", table_name="audit_events")
    op.drop_table("audit_events")
    op.drop_column("clinics", "deleted_at")
    op.drop_column("patients", "deleted_at")
    op.drop_column("users", "deleted_at")
