from collections.abc import Generator
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

# Allow importing the FastAPI app in tests without a running PostgreSQL instance.
patch("sqlalchemy.create_engine", return_value=MagicMock()).start()

import pytest
from fastapi.testclient import TestClient

from app.api.deps import get_current_user
from app.api.v1.auth import LOGIN_RATE_LIMIT, REGISTER_RATE_LIMIT
from app.main import app
from app.models.user import User


@pytest.fixture(autouse=True)
def _reset_auth_rate_limits() -> Generator[None, None, None]:
    """Deterministic isolation: auth rate limiters are process-local module
    singletons, so every test starts and ends with a clean window."""
    LOGIN_RATE_LIMIT.reset()
    REGISTER_RATE_LIMIT.reset()
    yield
    LOGIN_RATE_LIMIT.reset()
    REGISTER_RATE_LIMIT.reset()


@pytest.fixture
def active_user() -> User:
    return User(
        id=1,
        email="patient@example.com",
        hashed_password="hashed",
        full_name="Test Patient",
        role="patient",
        clinic_id=None,
        doctor_id=None,
        is_active=True,
        deleted_at=None,
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
        clinic_id=None,
        doctor_id=None,
        is_active=True,
        deleted_at=None,
        created_at=datetime.now(timezone.utc),
    )


@pytest.fixture
def clinic_user() -> User:
    return User(
        id=3,
        email="clinic@example.com",
        hashed_password="hashed",
        full_name="Clinic User",
        role="clinic",
        clinic_id=1,
        doctor_id=None,
        is_active=True,
        deleted_at=None,
        created_at=datetime.now(timezone.utc),
    )


@pytest.fixture
def doctor_user() -> User:
    return User(
        id=4,
        email="doctor@example.com",
        hashed_password="hashed",
        full_name="Doctor User",
        role="doctor",
        clinic_id=None,
        doctor_id=7,
        is_active=True,
        deleted_at=None,
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


@pytest.fixture
def clinic_client(clinic_user: User) -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_current_user] = lambda: clinic_user
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


@pytest.fixture
def doctor_client(doctor_user: User) -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_current_user] = lambda: doctor_user
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()
