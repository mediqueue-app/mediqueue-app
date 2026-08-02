import pytest
from pydantic import ValidationError

from app.core.config import UNSAFE_DEV_SECRET_KEY, Settings


class TestCorsOrigins:
    def test_default_includes_portal_localhost_and_loopback(self) -> None:
        settings = Settings(
            APP_ENV="development",
            SECRET_KEY=UNSAFE_DEV_SECRET_KEY,
            _env_file=None,
        )
        origins = settings.cors_origins
        for port in (3000, 3001, 3002, 3003):
            assert f"http://localhost:{port}" in origins
            assert f"http://127.0.0.1:{port}" in origins
        assert "*" not in origins


class TestSettingsSecurity:
    def test_allows_unsafe_secret_in_development(self) -> None:
        settings = Settings(APP_ENV="development", SECRET_KEY=UNSAFE_DEV_SECRET_KEY)

        assert settings.SECRET_KEY == UNSAFE_DEV_SECRET_KEY

    def test_rejects_unsafe_secret_in_production(self) -> None:
        with pytest.raises(ValidationError, match="SECRET_KEY must be set"):
            Settings(APP_ENV="production", SECRET_KEY=UNSAFE_DEV_SECRET_KEY)

    def test_rejects_unsafe_secret_in_staging(self) -> None:
        with pytest.raises(ValidationError, match="SECRET_KEY must be set"):
            Settings(APP_ENV="staging", SECRET_KEY=UNSAFE_DEV_SECRET_KEY)

    def test_allows_custom_secret_in_production(self) -> None:
        settings = Settings(
            APP_ENV="production",
            SECRET_KEY="a-secure-random-production-secret",
            ENCRYPTION_KEY="8sWf7I4vjns6NixJl16x2qxGn8UKA0fFAL0s8GF95VQ=",
        )

        assert settings.SECRET_KEY == "a-secure-random-production-secret"

    def test_rejects_missing_encryption_key_in_production(self) -> None:
        with pytest.raises(ValidationError, match="ENCRYPTION_KEY must be set"):
            Settings(
                APP_ENV="production",
                SECRET_KEY="a-secure-random-production-secret",
                ENCRYPTION_KEY="",
            )
