from datetime import datetime, timezone
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.models.clinic import Clinic
from app.models.doctor import Doctor


def _sample_clinic(**overrides: object) -> Clinic:
    now = datetime.now(timezone.utc)
    defaults = {
        "id": 1,
        "name": "MediQueue Clinic",
        "description": "International patient clinic",
        "address": "Istanbul",
        "phone": "+90 555 000 00 00",
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }
    defaults.update(overrides)
    return Clinic(**defaults)


def _sample_doctor(**overrides: object) -> Doctor:
    defaults = {
        "id": 1,
        "full_name": "Dr. Ayşe Yılmaz",
        "specialty": "Cardiology",
        "bio": None,
        "city": "İstanbul",
        "languages": ["Turkish", "English"],
        "price": 2800,
        "rating": 4.9,
        "experience": 18,
        "ai_source_id": 1,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    }
    defaults.update(overrides)
    return Doctor(**defaults)


class TestClinicsList:
    @patch("app.api.v1.clinics.get_clinics")
    def test_list_clinics_returns_list(
        self,
        mock_get_clinics,
        client: TestClient,
    ) -> None:
        mock_get_clinics.return_value = [_sample_clinic()]

        response = client.get("/v1/clinics")

        assert response.status_code == 200
        body = response.json()
        assert isinstance(body, list)
        assert len(body) == 1
        assert body[0]["name"] == "MediQueue Clinic"


class TestClinicDetail:
    @patch("app.api.v1.clinics.get_clinic")
    def test_get_clinic_detail_returns_clinic(
        self,
        mock_get_clinic,
        client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = _sample_clinic()

        response = client.get("/v1/clinics/1")

        assert response.status_code == 200
        body = response.json()
        assert body["id"] == 1
        assert body["name"] == "MediQueue Clinic"

    @patch("app.api.v1.clinics.get_clinic", return_value=None)
    def test_get_clinic_detail_returns_404_for_missing_clinic(
        self,
        _mock_get_clinic,
        client: TestClient,
    ) -> None:
        response = client.get("/v1/clinics/999")

        assert response.status_code == 404
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "NOT_FOUND"


class TestClinicDoctors:
    @patch("app.api.v1.clinics.get_active_doctors_by_clinic")
    @patch("app.api.v1.clinics.get_clinic")
    def test_list_clinic_doctors_works_with_jwt(
        self,
        mock_get_clinic,
        mock_get_doctors,
        authenticated_client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = _sample_clinic()
        mock_get_doctors.return_value = [_sample_doctor()]

        response = authenticated_client.get("/v1/clinics/1/doctors")

        assert response.status_code == 200
        body = response.json()
        assert len(body) == 1
        assert body[0]["full_name"] == "Dr. Ayşe Yılmaz"

    def test_list_clinic_doctors_returns_401_without_jwt(
        self,
        client: TestClient,
    ) -> None:
        response = client.get("/v1/clinics/1/doctors")

        assert response.status_code == 401
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "UNAUTHORIZED"
