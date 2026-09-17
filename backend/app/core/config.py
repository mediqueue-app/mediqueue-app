from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Local development only — override via SECRET_KEY in .env before any real deployment.
UNSAFE_DEV_SECRET_KEY = "UNSAFE-LOCAL-DEV-ONLY-do-not-use-in-production"
PROTECTED_ENVIRONMENTS = frozenset({"production", "staging"})


class Settings(BaseSettings):
    PROJECT_NAME: str = "MediQueue API"
    API_V1_PREFIX: str = "/v1"
    APP_ENV: str = Field(
        default="development",
        description="Runtime environment: development, staging, or production.",
    )

    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/mediqueue"

    SECRET_KEY: str = Field(
        default=UNSAFE_DEV_SECRET_KEY,
        description="JWT signing key. Must be set via SECRET_KEY env in production.",
    )
    ENCRYPTION_KEY: str = Field(
        default="",
        description=(
            "Fernet key for encrypting sensitive patient health history. "
            "Must be set in production/staging."
        ),
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    MEDIQUEUE_AI_BASE_URL: str = "http://localhost:8001"
    MEDIQUEUE_AI_TIMEOUT_SECONDS: float = 5.0

    ENABLE_API_DOCS: bool = Field(
        default=False,
        description=(
            "Explicit operational override to expose /docs, /redoc, and "
            "/openapi.json when APP_ENV is staging or production. Ignored "
            "(docs are always on) in development."
        ),
    )

    # Comma-separated origins. For staging, set BACKEND_CORS_ORIGINS via env
    # (do not use wildcard origins with credentials).
    BACKEND_CORS_ORIGINS: str = (
        "http://localhost:3000,http://localhost:3001,http://localhost:3002,"
        "http://localhost:3003,"
        "http://127.0.0.1:3000,http://127.0.0.1:3001,http://127.0.0.1:3002,"
        "http://127.0.0.1:3003,"
        "http://localhost:5173,http://localhost:8080"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

    @model_validator(mode="after")
    def validate_secret_key_for_environment(self) -> "Settings":
        env = self.APP_ENV.strip().lower()
        secret = self.SECRET_KEY.strip()
        encryption_key = self.ENCRYPTION_KEY.strip()

        if env in PROTECTED_ENVIRONMENTS and (
            not secret or secret == UNSAFE_DEV_SECRET_KEY
        ):
            raise ValueError(
                "SECRET_KEY must be set to a secure, non-default value when "
                f"APP_ENV is '{env}'. Set SECRET_KEY in the environment or .env file."
            )
        if env in PROTECTED_ENVIRONMENTS and not encryption_key:
            raise ValueError(
                "ENCRYPTION_KEY must be set when APP_ENV is "
                f"'{env}' to protect sensitive patient data."
            )

        return self

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.BACKEND_CORS_ORIGINS.split(",")
            if origin.strip()
        ]


settings = Settings()
