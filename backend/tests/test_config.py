import pytest
from pydantic import ValidationError

from app.core.config import UNSAFE_DEV_SECRET_KEY, Settings


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
        )

        assert settings.SECRET_KEY == "a-secure-random-production-secret"
