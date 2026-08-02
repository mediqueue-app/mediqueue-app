"""Appointment status transition rules (single source of truth).

Clinic "reject" currently maps to status ``cancelled`` (no separate rejected state).

Current conflict detection is date-level because appointments do not yet store
time slots.
"""

from __future__ import annotations

from app.models.appointment import AppointmentStatus

# Active appointments block duplicate bookings and doctor/date conflicts.
ACTIVE_APPOINTMENT_STATUSES: frozenset[str] = frozenset(
    {
        AppointmentStatus.PENDING,
        AppointmentStatus.CONFIRMED,
        AppointmentStatus.ALTERNATIVE_DATE,
        AppointmentStatus.ARRIVED,
    }
)

# Patient may cancel only from these non-terminal active-ish states.
PATIENT_CANCELLABLE_STATUSES: frozenset[str] = frozenset(
    {
        AppointmentStatus.PENDING,
        AppointmentStatus.ALTERNATIVE_DATE,
        AppointmentStatus.CONFIRMED,
    }
)

# Clinic rejection/cancellation is allowed from request states (and confirmed).
# Rejection is represented as ``cancelled``.
CLINIC_CANCELLABLE_STATUSES: frozenset[str] = frozenset(
    {
        AppointmentStatus.PENDING,
        AppointmentStatus.ALTERNATIVE_DATE,
        AppointmentStatus.CONFIRMED,
    }
)

ALLOWED_TRANSITIONS: dict[str, frozenset[str]] = {
    AppointmentStatus.PENDING: frozenset(
        {
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.ALTERNATIVE_DATE,
            AppointmentStatus.CANCELLED,
        }
    ),
    AppointmentStatus.ALTERNATIVE_DATE: frozenset(
        {
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.CANCELLED,
        }
    ),
    AppointmentStatus.CONFIRMED: frozenset(
        {
            AppointmentStatus.ARRIVED,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.NO_SHOW,
        }
    ),
    AppointmentStatus.ARRIVED: frozenset(
        {
            AppointmentStatus.COMPLETED,
            AppointmentStatus.NO_SHOW,
        }
    ),
    AppointmentStatus.COMPLETED: frozenset(),
    AppointmentStatus.CANCELLED: frozenset(),
    AppointmentStatus.NO_SHOW: frozenset(),
}


def can_transition(*, current_status: str, new_status: str) -> bool:
    """Return True when ``current_status`` may move to ``new_status``."""
    if current_status == new_status:
        return False
    allowed = ALLOWED_TRANSITIONS.get(current_status)
    if allowed is None:
        return False
    return new_status in allowed


def assert_valid_transition(*, current_status: str, new_status: str) -> None:
    """Raise ValueError with a clear message when the transition is invalid."""
    if not can_transition(current_status=current_status, new_status=new_status):
        raise ValueError(
            f"Invalid appointment status transition: "
            f"'{current_status}' → '{new_status}'"
        )
