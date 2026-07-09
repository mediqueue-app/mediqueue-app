from datetime import date, datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

from fastapi.testclient import TestClient


def _appointment_obj(**overrides):
    now = datetime.now(timezone.utc)
    defaults = {
        "id": 9,
        "patient_id": 1,
        "clinic_id": 1,
        "doctor_id": 7,
        "branch": "Cardiology",
        "requested_date": date(2026, 7, 15),
        "alternative_date": None,
        "status": "pending",
        "notes": None,
        "created_at": now,
        "updated_at": now,
        "patient": SimpleNamespace(full_name="Jane Doe"),
        "doctor": SimpleNamespace(full_name="Dr. Smith"),
    }
    defaults.update(overrides)
    return SimpleNamespace(**defaults)


class TestCreateAppointment:
    @patch("app.api.v1.appointments.create_appointment")
    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.doctor_exists", return_value=True)
    @patch("app.api.v1.appointments.clinic_exists", return_value=True)
    @patch("app.api.v1.appointments.patient_exists", return_value=True)
    def test_patient_creates_own_appointment(
        self,
        _mock_patient_exists,
        _mock_clinic_exists,
        _mock_doctor_exists,
        mock_get_patient_by_user_id,
        mock_create_appointment,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient_by_user_id.return_value = SimpleNamespace(id=1)
        mock_create_appointment.return_value = _appointment_obj()

        response = authenticated_client.post(
            "/v1/appointments",
            json={
                "patient_id": 1,
                "clinic_id": 1,
                "doctor_id": 7,
                "branch": " Cardiology ",
                "requested_date": "2026-07-15",
            },
        )

        assert response.status_code == 201
        assert response.json()["status"] == "pending"

    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.doctor_exists", return_value=True)
    @patch("app.api.v1.appointments.clinic_exists", return_value=True)
    @patch("app.api.v1.appointments.patient_exists", return_value=True)
    def test_patient_cannot_create_for_other_profile(
        self,
        _mock_patient_exists,
        _mock_clinic_exists,
        _mock_doctor_exists,
        mock_get_patient_by_user_id,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient_by_user_id.return_value = SimpleNamespace(id=3)
        response = authenticated_client.post(
            "/v1/appointments",
            json={
                "patient_id": 1,
                "clinic_id": 1,
                "branch": "Cardiology",
                "requested_date": "2026-07-15",
            },
        )
        assert response.status_code == 403


class TestPatchAppointmentStatus:
    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_clinic_can_update_own_appointment(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        appointment = _appointment_obj(clinic_id=1)
        mock_get_appointment.return_value = appointment
        mock_update.return_value = _appointment_obj(status="confirmed", clinic_id=1)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "confirmed"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "confirmed"

    @patch("app.api.v1.appointments.get_appointment")
    def test_alternative_date_requires_date(
        self,
        mock_get_appointment,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "alternative_date"},
        )
        assert response.status_code == 422
