from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient

from app.core.security import verify_password
from app.models.appointment import AppointmentStatus
from app.models.audit_event import AuditEvent
from app.models.patient import Patient
from app.models.user import User
from app.services.account_erasure import (
    REDACTED,
    TOMBSTONE_NAME,
    erase_own_account,
    should_cancel_appointment,
    tombstone_email,
)


class _Scalars:
    def __init__(self, items: list) -> None:
        self._items = items

    def all(self) -> list:
        return self._items


class FakeSession:
    def __init__(
        self,
        *,
        scalar_value=None,
        scalars_queue: list[list] | None = None,
        get_value=None,
        execute_rowcount: int = 0,
    ) -> None:
        self._scalar_value = scalar_value
        self._scalars_queue = list(scalars_queue or [])
        self._get_value = get_value
        self.execute_rowcount = execute_rowcount
        self.added: list = []
        self.committed = False

    def scalar(self, _stmt):
        return self._scalar_value

    def scalars(self, _stmt):
        if not self._scalars_queue:
            return _Scalars([])
        return _Scalars(self._scalars_queue.pop(0))

    def get(self, _model, _ident):
        return self._get_value

    def execute(self, _stmt):
        result = MagicMock()
        result.rowcount = self.execute_rowcount
        return result

    def add(self, obj) -> None:
        self.added.append(obj)

    def commit(self) -> None:
        self.committed = True


def _user(**overrides: object) -> User:
    now = datetime.now(timezone.utc)
    defaults = {
        "id": 1,
        "email": "patient@example.com",
        "hashed_password": "hashed",
        "full_name": "Jane Doe",
        "role": "patient",
        "clinic_id": None,
        "doctor_id": None,
        "is_active": True,
        "deleted_at": None,
        "created_at": now,
    }
    defaults.update(overrides)
    return User(**defaults)


class TestErasureHelpers:
    def test_tombstone_email_is_unique_per_user(self) -> None:
        assert tombstone_email(9) == "erased.9@erased.invalid"

    def test_open_statuses_are_cancelled(self) -> None:
        assert should_cancel_appointment(AppointmentStatus.PENDING) is True
        assert should_cancel_appointment(AppointmentStatus.ARRIVED) is True
        assert should_cancel_appointment(AppointmentStatus.COMPLETED) is False
        assert should_cancel_appointment(AppointmentStatus.CANCELLED) is False

    def test_unusable_password_never_verifies(self) -> None:
        assert verify_password("anything", "!") is False
        assert verify_password("anything", "!hashed") is False


class TestEraseOwnAccount:
    def test_patient_anonymises_profile_and_cancels_open_appointments(self) -> None:
        user = _user()
        patient = Patient(
            id=4,
            user_id=1,
            full_name="Jane Doe",
            email="jane@example.com",
            phone="555",
            country="TR",
            country_code="TR",
            preferred_language="en",
            health_history_encrypted="secret",
            is_active=True,
        )
        open_apt = SimpleNamespace(id=10, status=AppointmentStatus.PENDING, notes="allergy")
        done_apt = SimpleNamespace(id=11, status=AppointmentStatus.COMPLETED, notes="ok")
        review = SimpleNamespace(
            comment="Great clinic staff",
            ai_summary="positive",
            is_active=True,
        )
        db = FakeSession(
            scalar_value=patient,
            scalars_queue=[[open_apt, done_apt], [review]],
            execute_rowcount=2,
        )

        result = erase_own_account(db, user=user, ip_address="127.0.0.1")

        assert result.cancelled_appointments == 1
        assert result.redacted_messages == 2
        assert result.redacted_reviews == 1
        assert open_apt.status == AppointmentStatus.CANCELLED
        assert open_apt.notes is None
        assert done_apt.status == AppointmentStatus.COMPLETED
        assert done_apt.notes is None
        assert patient.full_name == TOMBSTONE_NAME
        assert patient.email is None
        assert patient.health_history_encrypted is None
        assert patient.is_active is False
        assert review.comment == REDACTED
        assert review.is_active is False
        assert user.email == tombstone_email(1)
        assert user.hashed_password == "!"
        assert user.is_active is False
        assert user.deleted_at is not None
        assert db.committed is True
        assert isinstance(db.added[0], AuditEvent)
        audit = db.added[0]
        assert audit.action == "account.erasure"
        assert audit.actor_user_id == 1
        assert "email" not in audit.details
        assert audit.ip_address == "127.0.0.1"

    def test_clinic_takes_listing_down_and_keeps_name_for_history(self) -> None:
        user = _user(id=3, role="clinic", clinic_id=8, email="clinic@example.com")
        clinic = SimpleNamespace(
            id=8,
            name="Istanbul Hair Center",
            description="About us",
            address="Nişantaşı",
            phone="212",
            city="İstanbul",
            is_active=True,
            deleted_at=None,
        )
        apt = SimpleNamespace(id=20, status=AppointmentStatus.CONFIRMED, notes="vip")
        link = SimpleNamespace(is_active=True)
        extra_staff = _user(
            id=9,
            role="clinic",
            clinic_id=8,
            email="staff@example.com",
            full_name="Desk Staff",
        )
        db = FakeSession(
            get_value=clinic,
            scalars_queue=[[apt], [link], [extra_staff]],
            execute_rowcount=1,
        )

        result = erase_own_account(db, user=user)

        assert result.clinic_id == 8
        assert result.cancelled_appointments == 1
        assert result.deactivated_doctor_links == 1
        assert result.deactivated_staff == 1
        assert clinic.is_active is False
        assert clinic.phone is None
        assert clinic.address is None
        assert clinic.languages is None
        assert clinic.name == "Istanbul Hair Center"
        assert link.is_active is False
        assert extra_staff.is_active is False
        assert extra_staff.email == tombstone_email(9)
        assert user.is_active is False
        assert user.email == tombstone_email(3)

    def test_doctor_cannot_self_erase(self) -> None:
        from app.services.account_erasure import AccountErasureNotAllowed

        db = FakeSession()
        try:
            erase_own_account(db, user=_user(role="doctor"))
            raise AssertionError("expected AccountErasureNotAllowed")
        except AccountErasureNotAllowed:
            assert db.committed is False


class TestErasureApi:
    @patch("app.api.v1.account.erase_own_account")
    def test_patient_can_erase(
        self,
        mock_erase,
        authenticated_client: TestClient,
    ) -> None:
        mock_erase.return_value = SimpleNamespace(
            erased_at=datetime.now(timezone.utc),
            cancelled_appointments=1,
            redacted_messages=0,
        )
        response = authenticated_client.post("/v1/account/erasure")
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "erased"
        assert body["cancelled_appointments"] == 1
        mock_erase.assert_called_once()

    def test_admin_forbidden(self, admin_client: TestClient) -> None:
        response = admin_client.post("/v1/account/erasure")
        assert response.status_code == 403

    def test_doctor_forbidden(self, doctor_client: TestClient) -> None:
        response = doctor_client.post("/v1/account/erasure")
        assert response.status_code == 403

    def test_unauthenticated(self, client: TestClient) -> None:
        response = client.post("/v1/account/erasure")
        assert response.status_code == 401

    @patch("app.api.v1.account.erase_own_account")
    def test_clinic_can_erase(
        self,
        mock_erase,
        clinic_client: TestClient,
    ) -> None:
        mock_erase.return_value = SimpleNamespace(
            erased_at=datetime.now(timezone.utc),
            cancelled_appointments=2,
            redacted_messages=4,
        )
        response = clinic_client.post("/v1/account/erasure")
        assert response.status_code == 200
        assert response.json()["status"] == "erased"
        mock_erase.assert_called_once()
