"""Patient↔clinic messaging scoped to an appointment.

Access policy:
- Patient: appointment.patient_id must belong to the authenticated patient profile.
- Clinic: appointment.clinic_id must match the authenticated user's clinic_id.
- Doctor: not allowed on these routes.
- Admin: allowed (existing project convention for operational access).

Cancelled/completed/no_show appointments remain readable; new messages may still
be sent for coordination. Messages are never auto-archived or deleted.
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.crud.appointment_messages import create_message, list_messages_for_appointment
from app.crud.appointments import get_appointment, get_patient_by_user_id
from app.db.session import get_db
from app.models.appointment_message import AppointmentMessageSenderRole
from app.models.user import User, UserRole
from app.schemas.appointment_message import AppointmentMessageCreate, AppointmentMessageRead

router = APIRouter(prefix="/appointments", tags=["appointment-messages"])


def _authorize_messaging_access(
    *,
    db: Session,
    appointment,
    current_user: User,
) -> str:
    """Return sender_role for the current user, or raise 403/404.

    Uses 403 for authenticated-but-unauthorized access to avoid leaking
    whether another tenant's appointment exists when ownership fails.
    """
    if appointment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found",
        )

    if current_user.role == UserRole.ADMIN.value:
        return AppointmentMessageSenderRole.ADMIN

    if current_user.role == UserRole.PATIENT.value:
        patient_profile = get_patient_by_user_id(db, current_user.id)
        if patient_profile is None or patient_profile.id != appointment.patient_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return AppointmentMessageSenderRole.PATIENT

    if current_user.role == UserRole.CLINIC.value:
        if current_user.clinic_id is None or current_user.clinic_id != appointment.clinic_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return AppointmentMessageSenderRole.CLINIC

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Not enough permissions",
    )


@router.get(
    "/{appointment_id}/messages",
    response_model=list[AppointmentMessageRead],
)
def get_appointment_messages(
    appointment_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles([UserRole.PATIENT, UserRole.CLINIC, UserRole.ADMIN])
    ),
) -> list[AppointmentMessageRead]:
    appointment = get_appointment(db, appointment_id)
    _authorize_messaging_access(db=db, appointment=appointment, current_user=current_user)
    messages = list_messages_for_appointment(
        db, appointment_id=appointment_id, skip=skip, limit=limit
    )
    return [AppointmentMessageRead.model_validate(item) for item in messages]


@router.post(
    "/{appointment_id}/messages",
    response_model=AppointmentMessageRead,
    status_code=status.HTTP_201_CREATED,
)
def post_appointment_message(
    appointment_id: int,
    message_in: AppointmentMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles([UserRole.PATIENT, UserRole.CLINIC, UserRole.ADMIN])
    ),
) -> AppointmentMessageRead:
    appointment = get_appointment(db, appointment_id)
    sender_role = _authorize_messaging_access(
        db=db, appointment=appointment, current_user=current_user
    )
    # Sender identity always comes from JWT — never from the request body.
    message = create_message(
        db,
        appointment_id=appointment_id,
        sender_user_id=current_user.id,
        sender_role=sender_role,
        body=message_in.body,
    )
    return AppointmentMessageRead.model_validate(message)
