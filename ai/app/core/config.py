import os
from pathlib import Path
from typing import Final

from dotenv import load_dotenv

APP_DIR: Final[Path] = Path(__file__).resolve().parent.parent
AI_ROOT: Final[Path] = APP_DIR.parent
DATA_DIR: Final[Path] = APP_DIR / "data"

load_dotenv(AI_ROOT / ".env")

DOCTORS_JSON_PATH: Final[Path] = DATA_DIR / "doctors.json"
CLINICS_JSON_PATH: Final[Path] = DATA_DIR / "clinics.json"

# --- Application ---
APP_NAME: Final[str] = os.getenv("APP_NAME", "MediQueue AI Service")
APP_VERSION: Final[str] = os.getenv("APP_VERSION", "1.0.0")
HOST: Final[str] = os.getenv("HOST", "0.0.0.0")
PORT: Final[int] = int(os.getenv("PORT", "8001"))
DEBUG: Final[bool] = os.getenv("DEBUG", "false").lower() in {"1", "true", "yes"}

# --- CORS ---
CORS_ORIGINS: Final[list[str]] = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]

# --- Scoring weights ---
BASE_SCORE: Final[float] = 60.0
CITY_MATCH_BONUS: Final[float] = 15.0
MAX_RATING_BONUS: Final[float] = 15.0
MAX_EXPERIENCE_BONUS: Final[float] = 10.0

# --- Normalization limits ---
MAX_RATING: Final[float] = 5.0
MAX_EXPERIENCE_YEARS: Final[int] = 20
