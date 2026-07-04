from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Local development only — override via SECRET_KEY in .env before any real deployment.
UNSAFE_DEV_SECRET_KEY = "UNSAFE-LOCAL-DEV-ONLY-do-not-use-in-production"


class Settings(BaseSettings):
    PROJECT_NAME: str = "MediQueue API"
    API_V1_PREFIX: str = "/v1"

    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/mediqueue"

    SECRET_KEY: str = Field(
        default=UNSAFE_DEV_SECRET_KEY,
        description="JWT signing key. Must be set via SECRET_KEY env in production.",
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    MEDIQUEUE_AI_BASE_URL: str = "http://localhost:8001"
    MEDIQUEUE_AI_TIMEOUT_SECONDS: float = 5.0

    BACKEND_CORS_ORIGINS: str = (
        "http://localhost:3000,http://localhost:5173,http://localhost:8080"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.BACKEND_CORS_ORIGINS.split(",")
            if origin.strip()
        ]


settings = Settings()
