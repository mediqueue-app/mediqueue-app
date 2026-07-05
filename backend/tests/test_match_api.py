from unittest.mock import patch

from fastapi.testclient import TestClient

from app.schemas.match import MatchClinic, MatchDoctor, MatchResponse


MATCH_PAYLOAD = {
    "specialty": "Cardiology",
    "language": "Turkish",
    "budget": 5000,
    "city": "Istanbul",
}

MATCH_RESULT = MatchResponse(
    doctors=[
        MatchDoctor(
            id=1,
            name="Dr. Ayşe Yılmaz",
            specialty="Cardiology",
            city="İstanbul",
            languages=["Turkish", "English"],
            price=2800,
            rating=4.9,
            experience=18,
            score=94,
        )
    ],
    clinics=[
        MatchClinic(
            id=1,
            name="MediQueue Clinic",
            description="International patient clinic",
            address="Istanbul",
            phone="+90 555 000 00 00",
            score=88.0,
        )
    ],
    message=None,
)


class TestMatchRoute:
    def test_match_requires_authentication(self, client: TestClient) -> None:
        response = client.post("/v1/match", json=MATCH_PAYLOAD)

        assert response.status_code == 401
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "UNAUTHORIZED"

    @patch("app.api.v1.match.call_match")
    def test_match_returns_ai_response(
        self,
        mock_call_match,
        authenticated_client: TestClient,
    ) -> None:
        mock_call_match.return_value = MATCH_RESULT

        response = authenticated_client.post("/v1/match", json=MATCH_PAYLOAD)

        assert response.status_code == 200
        body = response.json()
        assert len(body["doctors"]) == 1
        assert body["doctors"][0]["name"] == "Dr. Ayşe Yılmaz"
        assert body["doctors"][0]["score"] == 94
        assert len(body["clinics"]) == 1
        assert body["clinics"][0]["name"] == "MediQueue Clinic"
        assert body["clinics"][0]["score"] == 88.0
        assert body["message"] is None

    @patch("app.api.v1.match.call_match")
    def test_match_returns_service_error(
        self,
        mock_call_match,
        authenticated_client: TestClient,
    ) -> None:
        from app.services.ai_client import AIServiceError

        mock_call_match.side_effect = AIServiceError(
            "AI matching service is unavailable",
            status_code=503,
        )

        response = authenticated_client.post("/v1/match", json=MATCH_PAYLOAD)

        assert response.status_code == 503
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "SERVICE_UNAVAILABLE"
        assert body["error"]["message"] == "AI matching service is unavailable"

    def test_match_rejects_invalid_request(self, authenticated_client: TestClient) -> None:
        response = authenticated_client.post(
            "/v1/match",
            json={"specialty": "", "language": "Turkish", "budget": 1000},
        )

        assert response.status_code == 422
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "VALIDATION_ERROR"
