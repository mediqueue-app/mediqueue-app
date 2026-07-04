"""create reviews

Revision ID: 202607040005
Revises: 202607040004
Create Date: 2026-07-04 00:00:05
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "202607040005"
down_revision: Union[str, None] = "202607040004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("clinic_id", sa.Integer(), nullable=True),
        sa.Column("doctor_id", sa.Integer(), nullable=True),
        sa.Column("patient_id", sa.Integer(), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("comment", sa.Text(), nullable=False),
        sa.Column("sentiment_label", sa.String(length=50), nullable=True),
        sa.Column("sentiment_score", sa.Float(), nullable=True),
        sa.Column("ai_summary", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.CheckConstraint("rating BETWEEN 1 AND 5", name="ck_reviews_rating_range"),
        sa.CheckConstraint("length(trim(comment)) > 0", name="ck_reviews_comment_not_empty"),
        sa.CheckConstraint(
            "(clinic_id IS NOT NULL AND doctor_id IS NULL) OR "
            "(clinic_id IS NULL AND doctor_id IS NOT NULL)",
            name="ck_reviews_exactly_one_target",
        ),
        sa.ForeignKeyConstraint(["clinic_id"], ["clinics.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["doctor_id"], ["doctors.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["patient_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_reviews_clinic_id", "reviews", ["clinic_id"], unique=False)
    op.create_index("ix_reviews_doctor_id", "reviews", ["doctor_id"], unique=False)
    op.create_index("ix_reviews_patient_id", "reviews", ["patient_id"], unique=False)
    op.create_index("ix_reviews_rating", "reviews", ["rating"], unique=False)
    op.create_index("ix_reviews_created_at", "reviews", ["created_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_reviews_created_at", table_name="reviews")
    op.drop_index("ix_reviews_rating", table_name="reviews")
    op.drop_index("ix_reviews_patient_id", table_name="reviews")
    op.drop_index("ix_reviews_doctor_id", table_name="reviews")
    op.drop_index("ix_reviews_clinic_id", table_name="reviews")
    op.drop_table("reviews")
