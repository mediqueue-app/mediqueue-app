import os
from pathlib import Path
from typing import Final

from dotenv import load_dotenv

APP_DIR: Final[Path] = Path(__file__).resolve().parent.parent
AI_ROOT: Final[Path] = APP_DIR.parent

load_dotenv(AI_ROOT / ".env")

# --- Database (shared with backend) ---
DATABASE_URL: Final[str] = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@localhost:5432/mediqueue",
)

# --- Application ---
APP_NAME: Final[str] = os.getenv("APP_NAME", "MediQueue AI Service")
APP_VERSION: Final[str] = os.getenv("APP_VERSION", "1.0.0")
HOST: Final[str] = os.getenv("HOST", "0.0.0.0")
PORT: Final[int] = int(os.getenv("PORT", "8001"))
DEBUG: Final[bool] = os.getenv("DEBUG", "false").lower() in {"1", "true", "yes"}

# --- CORS ---
_DEFAULT_ALLOWED_ORIGINS: Final[list[str]] = [
    "http://localhost:3000",
    "http://localhost:8080",
]


def _parse_allowed_origins(value: str | None) -> list[str]:
    if not value or not value.strip():
        return list(_DEFAULT_ALLOWED_ORIGINS)
    origins = [origin.strip() for origin in value.split(",") if origin.strip()]
    return origins or list(_DEFAULT_ALLOWED_ORIGINS)


ALLOWED_ORIGINS: Final[list[str]] = _parse_allowed_origins(
    os.getenv("ALLOWED_ORIGINS")
)

# --- Scoring weights ---
BASE_SCORE: Final[float] = float(os.getenv("BASE_SCORE", "60.0"))
CITY_MATCH_BONUS: Final[float] = float(os.getenv("CITY_MATCH_BONUS", "15.0"))
MAX_RATING_BONUS: Final[float] = float(os.getenv("MAX_RATING_BONUS", "15.0"))
MAX_EXPERIENCE_BONUS: Final[float] = float(os.getenv("MAX_EXPERIENCE_BONUS", "10.0"))

# --- Normalization limits ---
MAX_RATING: Final[float] = float(os.getenv("MAX_RATING", "5.0"))
MAX_EXPERIENCE_YEARS: Final[int] = int(os.getenv("MAX_EXPERIENCE_YEARS", "20"))
