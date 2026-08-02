import pytest

from app.models.appointment import AppointmentStatus
from app.services.appointment_transitions import (
    ACTIVE_APPOINTMENT_STATUSES,
    ALLOWED_TRANSITIONS,
    PATIENT_CANCELLABLE_STATUSES,
    assert_valid_transition,
    can_transition,
)


class TestTransitionMatrix:
    @pytest.mark.parametrize(
        ("current", "new"),
        [
            (AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED),
            (AppointmentStatus.PENDING, AppointmentStatus.CANCELLED),
            (AppointmentStatus.PENDING, AppointmentStatus.ALTERNATIVE_DATE),
            (AppointmentStatus.ALTERNATIVE_DATE, AppointmentStatus.CONFIRMED),
            (AppointmentStatus.ALTERNATIVE_DATE, AppointmentStatus.CANCELLED),
            (AppointmentStatus.CONFIRMED, AppointmentStatus.ARRIVED),
            (AppointmentStatus.CONFIRMED, AppointmentStatus.CANCELLED),
            (AppointmentStatus.CONFIRMED, AppointmentStatus.NO_SHOW),
            (AppointmentStatus.ARRIVED, AppointmentStatus.COMPLETED),
            (AppointmentStatus.ARRIVED, AppointmentStatus.NO_SHOW),
        ],
    )
    def test_valid_transitions(self, current: str, new: str) -> None:
        assert can_transition(current_status=current, new_status=new) is True
        assert_valid_transition(current_status=current, new_status=new)

    @pytest.mark.parametrize(
        ("current", "new"),
        [
            (AppointmentStatus.COMPLETED, AppointmentStatus.PENDING),
            (AppointmentStatus.CANCELLED, AppointmentStatus.CONFIRMED),
            (AppointmentStatus.NO_SHOW, AppointmentStatus.ARRIVED),
            (AppointmentStatus.ARRIVED, AppointmentStatus.PENDING),
            (AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED),
            (AppointmentStatus.PENDING, AppointmentStatus.ARRIVED),
            (AppointmentStatus.PENDING, AppointmentStatus.NO_SHOW),
            (AppointmentStatus.PENDING, AppointmentStatus.COMPLETED),
            (AppointmentStatus.CONFIRMED, AppointmentStatus.PENDING),
        ],
    )
    def test_invalid_transitions(self, current: str, new: str) -> None:
        assert can_transition(current_status=current, new_status=new) is False
        with pytest.raises(ValueError, match="Invalid appointment status transition"):
            assert_valid_transition(current_status=current, new_status=new)

    def test_terminal_states_have_no_exits(self) -> None:
        for status in (
            AppointmentStatus.COMPLETED,
            AppointmentStatus.CANCELLED,
            AppointmentStatus.NO_SHOW,
        ):
            assert ALLOWED_TRANSITIONS[status] == frozenset()

    def test_active_statuses_exclude_terminal(self) -> None:
        assert AppointmentStatus.CANCELLED not in ACTIVE_APPOINTMENT_STATUSES
        assert AppointmentStatus.COMPLETED not in ACTIVE_APPOINTMENT_STATUSES
        assert AppointmentStatus.NO_SHOW not in ACTIVE_APPOINTMENT_STATUSES
        assert AppointmentStatus.PENDING in ACTIVE_APPOINTMENT_STATUSES

    def test_patient_cancellable_statuses(self) -> None:
        assert AppointmentStatus.PENDING in PATIENT_CANCELLABLE_STATUSES
        assert AppointmentStatus.COMPLETED not in PATIENT_CANCELLABLE_STATUSES
        assert AppointmentStatus.NO_SHOW not in PATIENT_CANCELLABLE_STATUSES
