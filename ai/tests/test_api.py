"""Integration tests for FastAPI HTTP endpoints (routes.py and main.py)."""

from fastapi.testclient import TestClient


class TestHealthEndpoint:
    def test_health_returns_ok(self, client: TestClient) -> None:
        response = client.get("/health")

        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


class TestMatchEndpoint:
    def test_match_returns_ranked_doctors(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 5000,
                "city": "Istanbul",
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert "matches" in body
        assert len(body["matches"]) == 3
        assert body["matches"][0]["score"] >= body["matches"][1]["score"]

    def test_match_returns_empty_list_for_no_results(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Neurology",
                "language": "Turkish",
                "budget": 5000,
            },
        )

        assert response.status_code == 200
        assert response.json() == {
            "matches": [],
            "message": "Kriterlerinize uygun doktor bulunamadı, filtreleri genişletmeyi deneyin.",
        }

    def test_match_rejects_invalid_request(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "",
                "language": "Turkish",
                "budget": 1000,
            },
        )

        assert response.status_code == 422

    def test_match_rejects_negative_budget(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": -100,
            },
        )

        assert response.status_code == 422

    def test_match_rejects_invalid_json(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            content="{ invalid json",
            headers={"Content-Type": "application/json"},
        )

        assert response.status_code == 400
        assert response.json() == {"detail": "Invalid JSON payload"}

    def test_match_response_contains_required_fields(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Dermatology",
                "language": "Turkish",
                "budget": 2000,
            },
        )

        assert response.status_code == 200
        doctor = response.json()["matches"][0]
        assert {
            "id",
            "name",
            "specialty",
            "city",
            "languages",
            "price",
            "rating",
            "experience",
            "score",
        } <= doctor.keys()


class TestRootEndpoint:
    def test_root_returns_service_info(self, client: TestClient) -> None:
        response = client.get("/")

        assert response.status_code == 200
        body = response.json()
        assert body["service"] == "MediQueue AI Service"
        assert body["docs"] == "/docs"
