from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import SQLAlchemyError

from app.main import app


def assert_error_envelope(body: dict, *, code: str, message: str | None = None) -> None:
    assert body["success"] is False
    assert body["error"]["code"] == code
    if message is not None:
        assert body["error"]["message"] == message


class TestValidationErrorFormat:
    def test_validation_error_uses_standard_envelope(
        self,
        authenticated_client: TestClient,
    ) -> None:
        response = authenticated_client.post(
            "/v1/match",
            json={"specialty": "", "language": "Turkish", "budget": 1000},
        )

        assert response.status_code == 422
        body = response.json()
        assert_error_envelope(body, code="VALIDATION_ERROR", message="Request validation failed")
        assert isinstance(body["error"]["details"], list)
        assert body["error"]["details"][0]["loc"] == ["body", "specialty"]
        assert "input" not in body["error"]["details"][0]


class TestNotFoundErrorFormat:
    @patch("app.api.v1.clinics.get_clinic")
    def test_not_found_uses_standard_envelope(
        self,
        mock_get_clinic,
        client: TestClient,
    ) -> None:
        mock_get_clinic.return_value = None

        response = client.get("/v1/clinics/999")

        assert response.status_code == 404
        assert_error_envelope(
            response.json(),
            code="NOT_FOUND",
            message="Clinic not found",
        )


class TestDatabaseErrorFormat:
    @patch("app.api.v1.clinics.get_clinic")
    def test_database_error_uses_standard_envelope(
        self,
        mock_get_clinic,
        client: TestClient,
    ) -> None:
        mock_get_clinic.side_effect = SQLAlchemyError("connection failed")

        response = client.get("/v1/clinics/1")

        assert response.status_code == 500
        assert_error_envelope(
            response.json(),
            code="DATABASE_ERROR",
            message="A database error occurred",
        )


class TestUnexpectedExceptionFormat:
    @pytest.fixture(autouse=True)
    def register_test_route(self) -> None:
        route_path = "/__test__/internal-error"

        if not any(getattr(route, "path", None) == route_path for route in app.routes):

            @app.get(route_path, include_in_schema=False)
            def _trigger_internal_error() -> None:
                raise RuntimeError("test-only failure")

        yield

    def test_unexpected_exception_uses_standard_envelope(self, client: TestClient) -> None:
        with TestClient(app, raise_server_exceptions=False) as safe_client:
            response = safe_client.get("/__test__/internal-error")

        assert response.status_code == 500
        assert_error_envelope(
            response.json(),
            code="INTERNAL_SERVER_ERROR",
            message="An unexpected error occurred",
        )
        assert "traceback" not in response.text.lower()
        assert "test-only failure" not in response.text


class TestCorsHeaders:
    def test_allowed_origin_receives_cors_headers(self, client: TestClient) -> None:
        response = client.get(
            "/",
            headers={"Origin": "http://localhost:3000"},
        )

        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"
        assert response.headers.get("access-control-allow-credentials") == "true"

    def test_disallowed_origin_does_not_receive_allow_origin(self, client: TestClient) -> None:
        response = client.get(
            "/",
            headers={"Origin": "http://evil.example.com"},
        )

        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") is None
