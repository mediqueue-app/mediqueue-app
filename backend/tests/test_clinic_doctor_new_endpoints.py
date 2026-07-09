from datetime import datetime, timezone
from types import SimpleNamespace
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
        "city": "Istanbul",
        "languages": ["English", "Turkish"],
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }
    defaults.update(overrides)
    return Clinic(**defaults)


def _sample_doctor(**overrides: object) -> Doctor:
    defaults = {
        "id": 7,
        "full_name": "Dr. Example",
        "specialty": "Cardiology",
        "bio": None,
        "city": "Istanbul",
        "languages": ["English"],
        "price": 2500,
        "rating": 4.8,
        "experience": 12,
        "ai_source_id": None,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    }
    defaults.update(overrides)
    return Doctor(**defaults)


def _appt_obj():
    now = datetime.now(timezone.utc)
    return SimpleNamespace(
        id=1,
        patient_id=1,
        clinic_id=1,
        doctor_id=7,
        branch="Cardiology",
        requested_date=datetime(2026, 7, 15).date(),
        alternative_date=None,
        status="pending",
        notes=None,
        patient=SimpleNamespace(full_name="Jane Doe"),
        doctor=SimpleNamespace(full_name="Dr. Example"),
        created_at=now,
        updated_at=now,
    )


class TestClinicPatchEndpoint:
    @patch("app.api.v1.clinics.update_clinic")
    @patch("app.api.v1.clinics.get_clinic")
    def test_clinic_can_patch_own_settings(
        self,
        mock_get_clinic,
        mock_update_clinic,
        clinic_client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = _sample_clinic()
        mock_update_clinic.return_value = _sample_clinic(name="Updated Name")
        response = clinic_client.patch("/v1/clinics/1", json={"name": " Updated Name "})
        assert response.status_code == 200
        assert response.json()["name"] == "Updated Name"


class TestClinicDoctorCreateEndpoint:
    @patch("app.api.v1.clinics.link_doctor_to_clinic")
    @patch("app.api.v1.clinics.create_doctor")
    @patch("app.api.v1.clinics.get_clinic")
    def test_clinic_can_create_doctor_for_own_clinic(
        self,
        mock_get_clinic,
        mock_create_doctor,
        _mock_link,
        clinic_client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = _sample_clinic()
        mock_create_doctor.return_value = _sample_doctor()
        response = clinic_client.post(
            "/v1/clinics/1/doctors",
            json={"full_name": "Dr. Example", "specialty": "Cardiology"},
        )
        assert response.status_code == 201
        assert response.json()["full_name"] == "Dr. Example"


class TestDoctorPatchEndpoint:
    @patch("app.api.v1.doctors.update_doctor")
    @patch("app.api.v1.doctors.doctor_linked_to_clinic", return_value=True)
    @patch("app.api.v1.doctors.get_doctor")
    def test_clinic_can_patch_linked_doctor(
        self,
        mock_get_doctor,
        _mock_linked,
        mock_update,
        clinic_client: TestClient,
    ) -> None:
        mock_get_doctor.return_value = _sample_doctor()
        mock_update.return_value = _sample_doctor(full_name="Dr. Updated")
        response = clinic_client.patch("/v1/doctors/7", json={"full_name": "Dr. Updated"})
        assert response.status_code == 200
        assert response.json()["full_name"] == "Dr. Updated"


class TestAppointmentsListEndpoints:
    @patch("app.api.v1.clinics.list_appointments_by_clinic")
    @patch("app.api.v1.clinics.clinic_exists_for_appointments", return_value=True)
    def test_list_clinic_appointments(
        self,
        _mock_clinic_exists,
        mock_list,
        clinic_client: TestClient,
    ) -> None:
        mock_list.return_value = [_appt_obj()]
        response = clinic_client.get("/v1/clinics/1/appointments")
        assert response.status_code == 200
        assert len(response.json()) == 1

    @patch("app.api.v1.doctors.list_appointments_by_doctor")
    @patch("app.api.v1.doctors.doctor_exists", return_value=True)
    def test_list_doctor_appointments(
        self,
        _mock_doctor_exists,
        mock_list,
        doctor_client: TestClient,
    ) -> None:
        mock_list.return_value = [_appt_obj()]
        response = doctor_client.get("/v1/doctors/7/appointments")
        assert response.status_code == 200
        assert len(response.json()) == 1
