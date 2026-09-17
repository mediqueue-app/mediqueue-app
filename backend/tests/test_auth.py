from datetime import datetime, timezone
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.core.security import create_access_token
from app.models.user import User


REGISTER_PAYLOAD = {
    "email": "newuser@example.com",
    "password": "Password123",
    "full_name": "New User",
}


def _sample_user(**overrides: object) -> User:
    defaults = {
        "id": 10,
        "email": "newuser@example.com",
        "hashed_password": "hashed",
        "full_name": "New User",
        "role": "patient",
        "clinic_id": None,
        "doctor_id": None,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    }
    defaults.update(overrides)
    return User(**defaults)


class TestRegister:
    @patch("app.api.v1.auth.create_user")
    @patch("app.api.v1.auth.get_user_by_email", return_value=None)
    def test_register_success(
        self,
        _mock_get_user_by_email,
        mock_create_user,
        client: TestClient,
    ) -> None:
        mock_create_user.return_value = _sample_user()

        response = client.post("/v1/auth/register", json=REGISTER_PAYLOAD)

        assert response.status_code == 201
        body = response.json()
        assert body["email"] == REGISTER_PAYLOAD["email"]
        assert body["role"] == "patient"
        mock_create_user.assert_called_once()

    @patch("app.api.v1.auth.get_user_by_email")
    def test_register_duplicate_email_returns_conflict(
        self,
        mock_get_user_by_email,
        client: TestClient,
    ) -> None:
        mock_get_user_by_email.return_value = _sample_user()

        response = client.post("/v1/auth/register", json=REGISTER_PAYLOAD)

        assert response.status_code == 409
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "EMAIL_TAKEN"


class TestLogin:
    @patch("app.api.v1.auth.authenticate_user")
    def test_login_success_returns_access_token(
        self,
        mock_authenticate_user,
        client: TestClient,
    ) -> None:
        mock_authenticate_user.return_value = _sample_user()

        response = client.post(
            "/v1/auth/login",
            data={
                "username": REGISTER_PAYLOAD["email"],
                "password": REGISTER_PAYLOAD["password"],
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert body["access_token"]
        assert body["token_type"] == "bearer"


class TestLoginRateLimit:
    @patch("app.api.v1.auth.authenticate_user")
    def test_ten_attempts_allowed_then_429_on_eleventh(
        self,
        mock_authenticate_user,
        client: TestClient,
    ) -> None:
        mock_authenticate_user.return_value = _sample_user()
        payload = {
            "username": REGISTER_PAYLOAD["email"],
            "password": REGISTER_PAYLOAD["password"],
        }

        for attempt in range(1, 11):
            response = client.post("/v1/auth/login", data=payload)
            assert response.status_code == 200, f"attempt {attempt} should be allowed"

        response = client.post("/v1/auth/login", data=payload)

        assert response.status_code == 429
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "RATE_LIMITED"
        retry_after = response.headers.get("retry-after")
        assert retry_after is not None
        assert int(retry_after) > 0

    @patch("app.api.v1.auth.authenticate_user", return_value=None)
    def test_failed_attempts_also_count_toward_the_limit(
        self,
        _mock_authenticate_user,
        client: TestClient,
    ) -> None:
        payload = {"username": "wrongpass@example.com", "password": "bad"}

        for _ in range(10):
            response = client.post("/v1/auth/login", data=payload)
            assert response.status_code == 401

        response = client.post("/v1/auth/login", data=payload)
        assert response.status_code == 429

    @patch("app.api.v1.auth.authenticate_user")
    def test_limit_is_scoped_per_email_for_the_same_client(
        self,
        mock_authenticate_user,
        client: TestClient,
    ) -> None:
        mock_authenticate_user.return_value = _sample_user()

        for _ in range(10):
            client.post(
                "/v1/auth/login",
                data={"username": "a@example.com", "password": "x"},
            )

        response = client.post(
            "/v1/auth/login",
            data={"username": "b@example.com", "password": "x"},
        )
        assert response.status_code == 200

    @patch("app.api.v1.auth.authenticate_user")
    def test_x_forwarded_for_first_hop_is_used_as_client_identity(
        self,
        mock_authenticate_user,
        client: TestClient,
    ) -> None:
        mock_authenticate_user.return_value = _sample_user()
        payload = {"username": "xff@example.com", "password": "x"}
        exhausted_hop = {"X-Forwarded-For": "203.0.113.10, 70.41.3.18"}
        other_hop = {"X-Forwarded-For": "203.0.113.99, 70.41.3.18"}

        for _ in range(10):
            response = client.post("/v1/auth/login", data=payload, headers=exhausted_hop)
            assert response.status_code == 200

        # A different first-hop IP for the same email must not be blocked.
        response = client.post("/v1/auth/login", data=payload, headers=other_hop)
        assert response.status_code == 200

        # The exhausted first-hop IP remains blocked.
        response = client.post("/v1/auth/login", data=payload, headers=exhausted_hop)
        assert response.status_code == 429

    @patch("app.api.v1.auth.authenticate_user")
    def test_falls_back_to_request_client_without_x_forwarded_for(
        self,
        mock_authenticate_user,
        client: TestClient,
    ) -> None:
        mock_authenticate_user.return_value = _sample_user()
        payload = {"username": "noxff@example.com", "password": "x"}

        for _ in range(10):
            response = client.post("/v1/auth/login", data=payload)
            assert response.status_code == 200

        response = client.post("/v1/auth/login", data=payload)
        assert response.status_code == 429


class TestRegisterRateLimit:
    @patch("app.api.v1.auth.create_user")
    @patch("app.api.v1.auth.get_user_by_email", return_value=None)
    def test_eight_attempts_allowed_then_429_on_ninth(
        self,
        _mock_get_user_by_email,
        mock_create_user,
        client: TestClient,
    ) -> None:
        mock_create_user.return_value = _sample_user()
        payload = {**REGISTER_PAYLOAD, "email": "repeat-register@example.com"}

        for attempt in range(1, 9):
            response = client.post("/v1/auth/register", json=payload)
            assert response.status_code == 201, f"attempt {attempt} should be allowed"

        response = client.post("/v1/auth/register", json=payload)

        assert response.status_code == 429
        assert response.headers.get("retry-after") is not None


class TestAuthErrorHeaders:
    def test_me_invalid_token_keeps_www_authenticate_header(
        self, client: TestClient
    ) -> None:
        response = client.get(
            "/v1/auth/me",
            headers={"Authorization": "Bearer invalid-token"},
        )

        assert response.status_code == 401
        assert response.headers.get("www-authenticate") == "Bearer"

    @patch("app.api.v1.auth.authenticate_user", return_value=None)
    def test_login_failure_keeps_www_authenticate_header(
        self,
        _mock_authenticate_user,
        client: TestClient,
    ) -> None:
        response = client.post(
            "/v1/auth/login",
            data={"username": "nope@example.com", "password": "x"},
        )

        assert response.status_code == 401
        assert response.headers.get("www-authenticate") == "Bearer"


class TestMe:
    @patch("app.api.deps.get_user_by_id")
    def test_me_works_with_bearer_token(
        self,
        mock_get_user_by_id,
        client: TestClient,
    ) -> None:
        user = _sample_user()
        mock_get_user_by_id.return_value = user
        token = create_access_token(subject=user.id)

        response = client.get(
            "/v1/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )

        assert response.status_code == 200
        body = response.json()
        assert body["email"] == user.email
        assert body["id"] == user.id

    def test_me_invalid_token_returns_401(self, client: TestClient) -> None:
        response = client.get(
            "/v1/auth/me",
            headers={"Authorization": "Bearer invalid-token"},
        )

        assert response.status_code == 401
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "UNAUTHORIZED"
