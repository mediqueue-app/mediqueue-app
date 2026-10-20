from collections.abc import Generator
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import OperationalError

from app.db.session import get_db
from app.main import app


class _WorkingSession:
    def execute(self, *args: object, **kwargs: object) -> MagicMock:
        return MagicMock()


class _BrokenSession:
    def execute(self, *args: object, **kwargs: object) -> None:
        raise OperationalError("SELECT 1", {}, Exception("connection refused"))


@pytest.fixture
def healthy_db_client() -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_db] = lambda: _WorkingSession()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def unhealthy_db_client() -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_db] = lambda: _BrokenSession()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


class TestLiveness:
    def test_root_does_not_require_db(self, client: TestClient) -> None:
        """GET / must succeed even though no DB dependency/override exists here."""
        response = client.get("/")

        assert response.status_code == 200
        assert response.json()["status"] == "ok"


class TestReadiness:
    def test_health_returns_200_when_db_reachable(
        self, healthy_db_client: TestClient
    ) -> None:
        response = healthy_db_client.get("/health")

        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "ok"
        assert body["database"] == "ok"

    def test_health_returns_503_when_db_unreachable(
        self, unhealthy_db_client: TestClient
    ) -> None:
        response = unhealthy_db_client.get("/health")

        assert response.status_code == 503
        body = response.json()
        assert body["status"] == "error"
        assert body["database"] == "error"
