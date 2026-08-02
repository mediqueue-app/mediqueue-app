from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.appointment_message import AppointmentMessage


def create_message(
    db: Session,
    *,
    appointment_id: int,
    sender_user_id: int,
    sender_role: str,
    body: str,
) -> AppointmentMessage:
    message = AppointmentMessage(
        appointment_id=appointment_id,
        sender_user_id=sender_user_id,
        sender_role=sender_role,
        body=body,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def list_messages_for_appointment(
    db: Session,
    *,
    appointment_id: int,
    skip: int = 0,
    limit: int = 100,
) -> list[AppointmentMessage]:
    stmt = (
        select(AppointmentMessage)
        .where(AppointmentMessage.appointment_id == appointment_id)
        .order_by(AppointmentMessage.created_at.asc(), AppointmentMessage.id.asc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())
