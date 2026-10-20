from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app

_STRONG_SECRET = "a-sufficiently-long-non-default-secret-key-for-tests"
_STRONG_ENCRYPTION_KEY = "8sWf7I4vjns6NixJl16x2qxGn8UKA0fFAL0s8GF95VQ="


def _protected_settings(app_env: str, **overrides: object) -> Settings:
    return Settings(
        APP_ENV=app_env,
        SECRET_KEY=_STRONG_SECRET,
        ENCRYPTION_KEY=_STRONG_ENCRYPTION_KEY,
        **overrides,
    )


class TestDevelopmentDocsOpen:
    def test_development_exposes_docs_redoc_and_openapi(self) -> None:
        dev_app = create_app(Settings(APP_ENV="development"))
        with TestClient(dev_app) as test_client:
            assert test_client.get("/docs").status_code == 200
            assert test_client.get("/redoc").status_code == 200
            assert test_client.get("/openapi.json").status_code == 200


class TestProtectedEnvironmentsLockDocsByDefault:
    def test_staging_hides_docs_by_default(self) -> None:
        staging_app = create_app(_protected_settings("staging"))
        with TestClient(staging_app) as test_client:
            assert test_client.get("/docs").status_code == 404
            assert test_client.get("/redoc").status_code == 404
            assert test_client.get("/openapi.json").status_code == 404

    def test_production_hides_docs_by_default(self) -> None:
        production_app = create_app(_protected_settings("production"))
        with TestClient(production_app) as test_client:
            assert test_client.get("/docs").status_code == 404
            assert test_client.get("/redoc").status_code == 404
            assert test_client.get("/openapi.json").status_code == 404


class TestEnableApiDocsOverride:
    def test_staging_override_enables_docs(self) -> None:
        staging_app = create_app(_protected_settings("staging", ENABLE_API_DOCS=True))
        with TestClient(staging_app) as test_client:
            assert test_client.get("/docs").status_code == 200
            assert test_client.get("/openapi.json").status_code == 200

    def test_production_override_enables_docs(self) -> None:
        production_app = create_app(
            _protected_settings("production", ENABLE_API_DOCS=True)
        )
        with TestClient(production_app) as test_client:
            assert test_client.get("/docs").status_code == 200
            assert test_client.get("/openapi.json").status_code == 200
