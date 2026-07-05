"""Integration tests for FastAPI HTTP endpoints (routes.py and main.py)."""

from unittest.mock import patch

from fastapi.testclient import TestClient

from app.services.matcher import MatcherService


class TestHealthEndpoint:
    def test_health_returns_ok(self, client: TestClient) -> None:
        response = client.get("/health")

        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


class TestMatchEndpoint:
    def test_match_returns_ranked_doctors_and_clinics(self, client: TestClient) -> None:
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
        assert "doctors" in body
        assert "clinics" in body
        assert len(body["doctors"]) == 3
        assert len(body["clinics"]) == 2
        assert body["doctors"][0]["score"] >= body["doctors"][1]["score"]
        assert body["clinics"][0]["score"] >= body["clinics"][-1]["score"]

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
            "doctors": [],
            "clinics": [],
            "message": "Kriterlerinize uygun doktor veya klinik bulunamadı, filtreleri genişletmeyi deneyin.",
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
        body = response.json()
        doctor = body["doctors"][0]
        clinic = body["clinics"][0]
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
        assert {
            "id",
            "name",
            "description",
            "address",
            "phone",
            "score",
        } <= clinic.keys()


class TestMatchMessageBehavior:
    def test_clinics_only_match_returns_null_message(
        self,
        message_behavior_client: TestClient,
    ) -> None:
        response = message_behavior_client.post(
            "/match",
            json={
                "specialty": "Saç Ekimi",
                "language": "Turkish",
                "budget": 1000,
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert body["doctors"] == []
        assert len(body["clinics"]) >= 1
        assert body["message"] is None

    def test_doctors_only_match_returns_null_message(
        self,
        message_behavior_client: TestClient,
    ) -> None:
        response = message_behavior_client.post(
            "/match",
            json={
                "specialty": "Neurology",
                "language": "Turkish",
                "budget": 5000,
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert len(body["doctors"]) >= 1
        assert body["clinics"] == []
        assert body["message"] is None

    def test_both_empty_returns_informational_message(
        self,
        message_behavior_client: TestClient,
    ) -> None:
        response = message_behavior_client.post(
            "/match",
            json={
                "specialty": "Psychiatry",
                "language": "Turkish",
                "budget": 5000,
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert body["doctors"] == []
        assert body["clinics"] == []
        assert isinstance(body["message"], str)
        assert len(body["message"].strip()) > 0


class TestExceptionHandlers:
    def test_invalid_json_returns_400(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            content='{"specialty": "Cardiology", "language": "Turkish", "budget":',
            headers={"Content-Type": "application/json"},
        )

        assert response.status_code == 400
        assert response.json() == {"detail": "Invalid JSON payload"}

    def test_missing_required_field_returns_422(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "language": "Turkish",
                "budget": 1000,
            },
        )

        assert response.status_code == 422
        body = response.json()
        assert isinstance(body["detail"], list)
        assert len(body["detail"]) >= 1

        error = body["detail"][0]
        assert "loc" in error
        assert "msg" in error
        assert "type" in error
        assert "specialty" in error["loc"]

    def test_internal_error_returns_500_without_stack_trace(
        self,
        matcher_service: MatcherService,
    ) -> None:
        from app.core.dependencies import get_matcher_service
        from app.main import app

        app.dependency_overrides[get_matcher_service] = lambda: matcher_service
        get_matcher_service.cache_clear()
        try:
            with patch.object(
                matcher_service,
                "match",
                side_effect=RuntimeError("secret internal failure"),
            ):
                with TestClient(app, raise_server_exceptions=False) as error_client:
                    response = error_client.post(
                        "/match",
                        json={
                            "specialty": "Cardiology",
                            "language": "Turkish",
                            "budget": 1000,
                        },
                    )
        finally:
            app.dependency_overrides.pop(get_matcher_service, None)
            get_matcher_service.cache_clear()

        assert response.status_code == 500
        assert response.json() == {"detail": "Internal server error"}

        body_text = response.text
        assert "Traceback" not in body_text
        assert "RuntimeError" not in body_text
        assert "secret internal failure" not in body_text
        assert "File \"" not in body_text
        assert "matcher.py" not in body_text


class TestRootEndpoint:
    def test_root_returns_service_info(self, client: TestClient) -> None:
        response = client.get("/")

        assert response.status_code == 200
        body = response.json()
        assert body["service"] == "MediQueue AI Service"
        assert body["docs"] == "/docs"
