"""Tests for the draft feedback endpoint."""

from fastapi.testclient import TestClient


class TestFeedbackEndpoint:
    def test_feedback_accepts_valid_payload(self, client: TestClient) -> None:
        response = client.post(
            "/feedback",
            json={
                "match_request": {
                    "specialty": "Cardiology",
                    "language": "Turkish",
                    "budget": 3000,
                    "city": "Istanbul",
                },
                "selected_doctor_id": 1,
                "selected_clinic_id": 1,
                "rating": 5,
                "comment": "Useful results",
            },
        )

        assert response.status_code == 202
        assert response.json() == {"status": "received"}

    def test_feedback_accepts_minimal_payload(self, client: TestClient) -> None:
        response = client.post(
            "/feedback",
            json={
                "match_request": {
                    "specialty": "Dermatology",
                    "language": "English",
                    "budget": 1500,
                },
            },
        )

        assert response.status_code == 202
        assert response.json()["status"] == "received"

    def test_feedback_rejects_invalid_rating(self, client: TestClient) -> None:
        response = client.post(
            "/feedback",
            json={
                "match_request": {
                    "specialty": "Cardiology",
                    "language": "Turkish",
                    "budget": 3000,
                },
                "rating": 6,
            },
        )

        assert response.status_code == 422
