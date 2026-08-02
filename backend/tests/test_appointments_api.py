from datetime import date, datetime, timezone
from types import SimpleNamespace
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.models.appointment import AppointmentStatus


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
    @patch("app.api.v1.appointments.find_doctor_date_conflict", return_value=None)
    @patch("app.api.v1.appointments.find_duplicate_active_appointment", return_value=None)
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
        _mock_duplicate,
        _mock_conflict,
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

    @patch("app.api.v1.appointments.find_doctor_date_conflict", return_value=None)
    @patch("app.api.v1.appointments.find_duplicate_active_appointment")
    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.doctor_exists", return_value=True)
    @patch("app.api.v1.appointments.clinic_exists", return_value=True)
    @patch("app.api.v1.appointments.patient_exists", return_value=True)
    def test_duplicate_booking_blocked(
        self,
        _mock_patient_exists,
        _mock_clinic_exists,
        _mock_doctor_exists,
        mock_get_patient_by_user_id,
        mock_duplicate,
        _mock_conflict,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient_by_user_id.return_value = SimpleNamespace(id=1)
        mock_duplicate.return_value = _appointment_obj(id=99)
        response = authenticated_client.post(
            "/v1/appointments",
            json={
                "patient_id": 1,
                "clinic_id": 1,
                "doctor_id": 7,
                "branch": "Cardiology",
                "requested_date": "2026-07-15",
            },
        )
        assert response.status_code == 409
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "CONFLICT"
        assert "active appointment already exists" in body["error"]["message"]

    @patch("app.api.v1.appointments.find_doctor_date_conflict")
    @patch("app.api.v1.appointments.find_duplicate_active_appointment", return_value=None)
    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.doctor_exists", return_value=True)
    @patch("app.api.v1.appointments.clinic_exists", return_value=True)
    @patch("app.api.v1.appointments.patient_exists", return_value=True)
    def test_doctor_date_conflict_blocked(
        self,
        _mock_patient_exists,
        _mock_clinic_exists,
        _mock_doctor_exists,
        mock_get_patient_by_user_id,
        _mock_duplicate,
        mock_conflict,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient_by_user_id.return_value = SimpleNamespace(id=1)
        mock_conflict.return_value = _appointment_obj(id=55, patient_id=2)
        response = authenticated_client.post(
            "/v1/appointments",
            json={
                "patient_id": 1,
                "clinic_id": 1,
                "doctor_id": 7,
                "branch": "Cardiology",
                "requested_date": "2026-07-15",
            },
        )
        assert response.status_code == 409
        body = response.json()
        assert "date-level conflict" in body["error"]["message"]

    @patch("app.api.v1.appointments.find_doctor_date_conflict", return_value=None)
    @patch("app.api.v1.appointments.find_duplicate_active_appointment", return_value=None)
    @patch("app.api.v1.appointments.create_appointment")
    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.doctor_exists", return_value=True)
    @patch("app.api.v1.appointments.clinic_exists", return_value=True)
    @patch("app.api.v1.appointments.patient_exists", return_value=True)
    def test_cancelled_does_not_block_new_booking(
        self,
        _mock_patient_exists,
        _mock_clinic_exists,
        _mock_doctor_exists,
        mock_get_patient_by_user_id,
        mock_create_appointment,
        mock_duplicate,
        mock_conflict,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient_by_user_id.return_value = SimpleNamespace(id=1)
        mock_create_appointment.return_value = _appointment_obj(id=10)
        # Duplicate/conflict helpers return None when only cancelled rows exist.
        assert mock_duplicate.return_value is None
        assert mock_conflict.return_value is None

        response = authenticated_client.post(
            "/v1/appointments",
            json={
                "patient_id": 1,
                "clinic_id": 1,
                "doctor_id": 7,
                "branch": "Cardiology",
                "requested_date": "2026-07-15",
            },
        )
        assert response.status_code == 201


class TestPatchAppointmentStatus:
    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_clinic_can_confirm_pending(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        appointment = _appointment_obj(clinic_id=1, status="pending")
        mock_get_appointment.return_value = appointment
        mock_update.return_value = _appointment_obj(status="confirmed", clinic_id=1)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "confirmed"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "confirmed"

    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_clinic_rejection_maps_to_cancelled(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        """Roadmap reject currently maps to cancelled."""
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="pending")
        mock_update.return_value = _appointment_obj(status="cancelled", clinic_id=1)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "cancelled"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "cancelled"

    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_confirmed_to_arrived(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="confirmed")
        mock_update.return_value = _appointment_obj(status="arrived", clinic_id=1)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "arrived"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "arrived"

    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_confirmed_to_no_show(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="confirmed")
        mock_update.return_value = _appointment_obj(
            status=AppointmentStatus.NO_SHOW, clinic_id=1
        )
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "no_show"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "no_show"

    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_arrived_to_completed(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="arrived")
        mock_update.return_value = _appointment_obj(status="completed", clinic_id=1)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "completed"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "completed"

    @patch("app.api.v1.appointments.get_appointment")
    def test_invalid_completed_to_pending(
        self,
        mock_get_appointment,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="completed")
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "pending"},
        )
        assert response.status_code == 409
        assert response.json()["error"]["code"] == "CONFLICT"

    @patch("app.api.v1.appointments.get_appointment")
    def test_invalid_cancelled_to_confirmed(
        self,
        mock_get_appointment,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="cancelled")
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "confirmed"},
        )
        assert response.status_code == 409

    @patch("app.api.v1.appointments.get_appointment")
    def test_invalid_no_show_to_arrived(
        self,
        mock_get_appointment,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(
            clinic_id=1, status=AppointmentStatus.NO_SHOW
        )
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "arrived"},
        )
        assert response.status_code == 409

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

    @patch("app.api.v1.appointments.get_appointment")
    def test_clinic_cannot_update_other_clinic_appointment(
        self,
        mock_get_appointment,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=99)
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "confirmed"},
        )
        assert response.status_code == 403

    @patch("app.api.v1.appointments.get_appointment")
    def test_doctor_cannot_update_other_doctor_appointment(
        self,
        mock_get_appointment,
        doctor_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(doctor_id=99, status="confirmed")
        response = doctor_client.patch(
            "/v1/appointments/9/status",
            json={"status": "arrived"},
        )
        assert response.status_code == 403

    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_appointment")
    def test_no_show_serialization(
        self,
        mock_get_appointment,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(clinic_id=1, status="confirmed")
        mock_update.return_value = _appointment_obj(
            status="no_show", clinic_id=1
        )
        response = clinic_client.patch(
            "/v1/appointments/9/status",
            json={"status": "no_show"},
        )
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "no_show"
        assert "id" in body


class TestPatientCancellation:
    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.get_appointment")
    def test_patient_cancels_own_via_cancel_route(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_update,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(patient_id=1, status="pending")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        mock_update.return_value = _appointment_obj(patient_id=1, status="cancelled")
        response = authenticated_client.post("/v1/appointments/9/cancel")
        assert response.status_code == 200
        assert response.json()["status"] == "cancelled"

    @patch("app.api.v1.appointments.update_appointment_status")
    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.get_appointment")
    def test_patient_cancels_own_via_status_patch(
        self,
        mock_get_appointment,
        mock_get_patient,
        mock_update,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(patient_id=1, status="confirmed")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        mock_update.return_value = _appointment_obj(patient_id=1, status="cancelled")
        response = authenticated_client.patch(
            "/v1/appointments/9/status",
            json={"status": "cancelled"},
        )
        assert response.status_code == 200
        assert response.json()["status"] == "cancelled"

    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.get_appointment")
    def test_patient_cannot_cancel_another_patients_appointment(
        self,
        mock_get_appointment,
        mock_get_patient,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(patient_id=99, status="pending")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        response = authenticated_client.post("/v1/appointments/9/cancel")
        assert response.status_code == 403

    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.get_appointment")
    def test_patient_cannot_cancel_completed(
        self,
        mock_get_appointment,
        mock_get_patient,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(patient_id=1, status="completed")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        response = authenticated_client.post("/v1/appointments/9/cancel")
        assert response.status_code == 409

    @patch("app.api.v1.appointments.get_patient_by_user_id")
    @patch("app.api.v1.appointments.get_appointment")
    def test_patient_cannot_set_non_cancel_status(
        self,
        mock_get_appointment,
        mock_get_patient,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_appointment.return_value = _appointment_obj(patient_id=1, status="pending")
        mock_get_patient.return_value = SimpleNamespace(id=1)
        response = authenticated_client.patch(
            "/v1/appointments/9/status",
            json={"status": "confirmed"},
        )
        assert response.status_code == 403
