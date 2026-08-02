from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.schemas.appointment_message import MESSAGE_BODY_MAX_LENGTH


def _appointment(**overrides):
    defaults = {
        "id": 9,
        "patient_id": 1,
        "clinic_id": 1,
        "doctor_id": 7,
        "status": "confirmed",
    }
    defaults.update(overrides)
    return SimpleNamespace(**defaults)


def _message(**overrides):
    now = datetime.now(timezone.utc)
    defaults = {
        "id": 1,
        "appointment_id": 9,
        "sender_user_id": 1,
        "sender_role": "patient",
        "body": "Hello clinic",
        "created_at": now,
        "read_at": None,
    }
    defaults.update(overrides)
    return SimpleNamespace(**defaults)


class TestPostAppointmentMessage:
    @patch("app.api.v1.appointment_messages.create_message")
    @patch("app.api.v1.appointment_messages.get_patient_by_user_id")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_patient_sends_message(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_create,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(patient_id=1)
        mock_get_patient.return_value = SimpleNamespace(id=1)
        mock_create.return_value = _message()

        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={"body": "Hello clinic"},
        )
        assert response.status_code == 201
        body = response.json()
        assert body["body"] == "Hello clinic"
        assert body["sender_role"] == "patient"
        assert body["sender_user_id"] == 1
        mock_create.assert_called_once()
        kwargs = mock_create.call_args.kwargs
        assert kwargs["sender_user_id"] == 1
        assert kwargs["sender_role"] == "patient"
        assert kwargs["body"] == "Hello clinic"

    @patch("app.api.v1.appointment_messages.create_message")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_clinic_sends_reply(
        self,
        mock_get_appointment,
        mock_create,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(clinic_id=1)
        mock_create.return_value = _message(
            sender_user_id=3,
            sender_role="clinic",
            body="We confirmed your visit",
        )
        response = clinic_client.post(
            "/v1/appointments/9/messages",
            json={"body": "We confirmed your visit"},
        )
        assert response.status_code == 201
        assert response.json()["sender_role"] == "clinic"
        kwargs = mock_create.call_args.kwargs
        assert kwargs["sender_user_id"] == 3
        assert kwargs["sender_role"] == "clinic"

    def test_empty_message_rejected(self, authenticated_client: TestClient) -> None:
        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={"body": ""},
        )
        assert response.status_code == 422

    def test_whitespace_only_rejected(self, authenticated_client: TestClient) -> None:
        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={"body": "   \n\t  "},
        )
        assert response.status_code == 422

    def test_overlong_message_rejected(self, authenticated_client: TestClient) -> None:
        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={"body": "x" * (MESSAGE_BODY_MAX_LENGTH + 1)},
        )
        assert response.status_code == 422

    def test_unauthenticated_rejected(self, client: TestClient) -> None:
        response = client.post(
            "/v1/appointments/9/messages",
            json={"body": "Hello"},
        )
        assert response.status_code == 401

    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_doctor_cannot_use_messaging(
        self,
        mock_get_appointment,
        doctor_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment()
        response = doctor_client.post(
            "/v1/appointments/9/messages",
            json={"body": "Doctor trying to chat"},
        )
        assert response.status_code == 403

    @patch("app.api.v1.appointment_messages.get_patient_by_user_id")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_patient_cannot_access_other_patient_messages(
        self,
        mock_get_appointment,
        mock_get_patient,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(patient_id=99)
        mock_get_patient.return_value = SimpleNamespace(id=1)
        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={"body": "Intrusion attempt"},
        )
        assert response.status_code == 403

    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_clinic_cannot_access_other_clinic_messages(
        self,
        mock_get_appointment,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(clinic_id=99)
        response = clinic_client.post(
            "/v1/appointments/9/messages",
            json={"body": "Wrong clinic"},
        )
        assert response.status_code == 403

    @patch("app.api.v1.appointment_messages.get_appointment", return_value=None)
    def test_nonexistent_appointment(
        self,
        _mock_get,
        authenticated_client: TestClient,
    ) -> None:
        response = authenticated_client.post(
            "/v1/appointments/9999/messages",
            json={"body": "Hello"},
        )
        assert response.status_code == 404

    @patch("app.api.v1.appointment_messages.create_message")
    @patch("app.api.v1.appointment_messages.get_patient_by_user_id")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_sender_identity_cannot_be_forged(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_create,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(patient_id=1)
        mock_get_patient.return_value = SimpleNamespace(id=1)
        mock_create.return_value = _message(sender_user_id=1)

        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={
                "body": "Hello",
                "sender_user_id": 999,
                "sender_role": "clinic",
            },
        )
        # Extra fields ignored by Pydantic; sender still from JWT.
        assert response.status_code == 201
        kwargs = mock_create.call_args.kwargs
        assert kwargs["sender_user_id"] == 1
        assert kwargs["sender_role"] == "patient"


class TestListAppointmentMessages:
    @patch("app.api.v1.appointment_messages.list_messages_for_appointment")
    @patch("app.api.v1.appointment_messages.get_patient_by_user_id")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_patient_lists_messages_ordered(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_list,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(patient_id=1)
        mock_get_patient.return_value = SimpleNamespace(id=1)
        t1 = datetime(2026, 8, 1, 10, 0, tzinfo=timezone.utc)
        t2 = datetime(2026, 8, 1, 11, 0, tzinfo=timezone.utc)
        mock_list.return_value = [
            _message(id=1, body="First", created_at=t1),
            _message(id=2, body="Second", created_at=t2, sender_role="clinic", sender_user_id=3),
        ]
        response = authenticated_client.get("/v1/appointments/9/messages")
        assert response.status_code == 200
        body = response.json()
        assert [item["body"] for item in body] == ["First", "Second"]

    @patch("app.api.v1.appointment_messages.list_messages_for_appointment")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_clinic_lists_messages(
        self,
        mock_get_appointment,
        mock_list,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(clinic_id=1)
        mock_list.return_value = [_message()]
        response = clinic_client.get("/v1/appointments/9/messages")
        assert response.status_code == 200
        assert len(response.json()) == 1

    @patch("app.api.v1.appointment_messages.list_messages_for_appointment")
    @patch("app.api.v1.appointment_messages.get_patient_by_user_id")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_cancelled_appointment_messages_remain_readable(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_list,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(patient_id=1, status="cancelled")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        mock_list.return_value = [_message(body="Still here")]
        response = authenticated_client.get("/v1/appointments/9/messages")
        assert response.status_code == 200
        assert response.json()[0]["body"] == "Still here"

    @patch("app.api.v1.appointment_messages.create_message")
    @patch("app.api.v1.appointment_messages.get_patient_by_user_id")
    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_cancelled_appointment_still_accepts_messages(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_create,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment(patient_id=1, status="cancelled")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        mock_create.return_value = _message(body="Coordination note")
        response = authenticated_client.post(
            "/v1/appointments/9/messages",
            json={"body": "Coordination note"},
        )
        assert response.status_code == 201

    def test_list_unauthenticated_rejected(self, client: TestClient) -> None:
        response = client.get("/v1/appointments/9/messages")
        assert response.status_code == 401

    @patch("app.api.v1.appointment_messages.get_appointment")
    def test_doctor_cannot_list_messages(
        self,
        mock_get_appointment,
        doctor_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment()
        response = doctor_client.get("/v1/appointments/9/messages")
        assert response.status_code == 403
