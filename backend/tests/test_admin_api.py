from unittest.mock import MagicMock

from fastapi.testclient import TestClient

from app.db.session import get_db
from app.main import app


class TestAdminSummary:
    def test_admin_summary_allowed_for_admin(self, admin_client: TestClient) -> None:
        mock_db = MagicMock()
        mock_db.scalar.side_effect = [3, 2, 5]

        def override_get_db():
            yield mock_db

        app.dependency_overrides[get_db] = override_get_db
        try:
            response = admin_client.get("/v1/admin/summary")
        finally:
            app.dependency_overrides.pop(get_db, None)

        assert response.status_code == 200
        body = response.json()
        assert body == {"users": 3, "clinics": 2, "doctors": 5}

    def test_admin_summary_denied_for_non_admin(
        self,
        authenticated_client: TestClient,
    ) -> None:
        response = authenticated_client.get("/v1/admin/summary")

        assert response.status_code == 403
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "FORBIDDEN"

    def test_admin_summary_requires_authentication(self, client: TestClient) -> None:
        response = client.get("/v1/admin/summary")

        assert response.status_code == 401
        body = response.json()
        assert body["success"] is False
        assert body["error"]["code"] == "UNAUTHORIZED"
