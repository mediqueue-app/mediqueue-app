from datetime import datetime, timezone
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.models.patient import Patient


def _sample_patient(**overrides: object) -> Patient:
    now = datetime.now(timezone.utc)
    defaults = {
        "id": 1,
        "user_id": 1,
        "full_name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+90 555 111 22 33",
        "country": "Turkey",
        "country_code": "TR",
        "preferred_language": "English",
        "health_history_encrypted": "encrypted",
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }
    defaults.update(overrides)
    return Patient(**defaults)


class TestCreatePatient:
    @patch("app.api.v1.patients.upsert_patient_for_user")
    def test_patient_role_upserts_own_profile(
        self,
        mock_upsert,
        authenticated_client: TestClient,
    ) -> None:
        mock_upsert.return_value = _sample_patient(user_id=1)

        response = authenticated_client.post(
            "/v1/patients",
            json={"full_name": "  Jane Doe  ", "health_history": "Diabetes"},
        )

        assert response.status_code == 201
        body = response.json()
        assert body["user_id"] == 1
        assert body["has_health_history"] is True
        _, kwargs = mock_upsert.call_args
        assert kwargs["user_id"] == 1
        assert kwargs["patient_in"].full_name == "Jane Doe"

    @patch("app.api.v1.patients.user_exists", return_value=True)
    @patch("app.api.v1.patients.create_manual_patient")
    def test_clinic_role_can_create_manual_patient(
        self,
        mock_create_manual,
        _mock_user_exists,
        clinic_client: TestClient,
    ) -> None:
        mock_create_manual.return_value = _sample_patient(user_id=None)
        response = clinic_client.post("/v1/patients", json={"full_name": "Lead Patient"})
        assert response.status_code == 201
        body = response.json()
        assert body["user_id"] is None

    def test_empty_full_name_rejected(self, authenticated_client: TestClient) -> None:
        response = authenticated_client.post("/v1/patients", json={"full_name": "   "})
        assert response.status_code == 422


class TestGetMyPatientProfile:
    @patch("app.api.v1.patients.get_patient_by_user_id")
    def test_returns_profile_when_exists(
        self,
        mock_get_patient,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient.return_value = _sample_patient()
        response = authenticated_client.get("/v1/patients/me")
        assert response.status_code == 200
        assert response.json()["id"] == 1

    @patch("app.api.v1.patients.get_patient_by_user_id", return_value=None)
    def test_returns_404_when_profile_missing(
        self,
        _mock_get_patient,
        authenticated_client: TestClient,
    ) -> None:
        response = authenticated_client.get("/v1/patients/me")
        assert response.status_code == 404


class TestGetMyAppointments:
    @patch("app.api.v1.patients.list_appointments_by_patient", return_value=[])
    @patch("app.api.v1.patients.get_patient_by_user_id")
    def test_returns_empty_list_when_no_appointments(
        self,
        mock_get_patient,
        _mock_list,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_patient.return_value = _sample_patient()
        response = authenticated_client.get("/v1/patients/me/appointments")
        assert response.status_code == 200
        assert response.json() == []
