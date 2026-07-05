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
        assert body["error"]["code"] == "CONFLICT"


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
