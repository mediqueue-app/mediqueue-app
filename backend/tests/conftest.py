from collections.abc import Generator
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

# Allow importing the FastAPI app in tests without a running PostgreSQL instance.
patch("sqlalchemy.create_engine", return_value=MagicMock()).start()

import pytest
from fastapi.testclient import TestClient

from app.api.deps import get_current_user
from app.main import app
from app.models.user import User


@pytest.fixture
def active_user() -> User:
    return User(
        id=1,
        email="patient@example.com",
        hashed_password="hashed",
        full_name="Test Patient",
        role="patient",
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )


@pytest.fixture
def admin_user() -> User:
    return User(
        id=2,
        email="admin@example.com",
        hashed_password="hashed",
        full_name="Test Admin",
        role="admin",
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )


@pytest.fixture
def authenticated_client(active_user: User) -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_current_user] = lambda: active_user
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


@pytest.fixture
def admin_client(admin_user: User) -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_current_user] = lambda: admin_user
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as client:
        yield client
