from types import SimpleNamespace
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.crud.doctors import DEFAULT_WEEKLY_AVAILABILITY
from app.schemas.availability import AvailabilityRead, AvailabilityDay


def _days_payload():
    return {"days": DEFAULT_WEEKLY_AVAILABILITY}


class TestDoctorAvailability:
    @patch("app.api.v1.doctors.get_doctor_availability")
    def test_doctor_gets_own_availability(
        self,
        mock_get,
        doctor_client: TestClient,
    ) -> None:
        mock_get.return_value = AvailabilityRead(
            days=[AvailabilityDay.model_validate(d) for d in DEFAULT_WEEKLY_AVAILABILITY]
        )
        response = doctor_client.get("/v1/doctors/7/availability")
        assert response.status_code == 200
        assert len(response.json()["days"]) == 5

    @patch("app.api.v1.doctors.get_doctor_availability")
    def test_doctor_cannot_read_other_availability(
        self,
        mock_get,
        doctor_client: TestClient,
    ) -> None:
        response = doctor_client.get("/v1/doctors/99/availability")
        assert response.status_code == 403
        mock_get.assert_not_called()

    def test_patient_forbidden(self, authenticated_client: TestClient) -> None:
        response = authenticated_client.get("/v1/doctors/7/availability")
        assert response.status_code == 403

    def test_unauthenticated(self, client: TestClient) -> None:
        response = client.get("/v1/doctors/7/availability")
        assert response.status_code == 401

    @patch("app.api.v1.doctors.set_doctor_availability")
    @patch("app.api.v1.doctors.get_doctor")
    def test_doctor_puts_own_availability(
        self,
        mock_get_doctor,
        mock_set,
        doctor_client: TestClient,
    ) -> None:
        mock_get_doctor.return_value = SimpleNamespace(id=7)
        mock_set.return_value = AvailabilityRead(
            days=[AvailabilityDay.model_validate(d) for d in DEFAULT_WEEKLY_AVAILABILITY]
        )
        response = doctor_client.put("/v1/doctors/7/availability", json=_days_payload())
        assert response.status_code == 200
        mock_set.assert_called_once()
