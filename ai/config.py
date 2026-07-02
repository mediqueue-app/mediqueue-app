import os
from pathlib import Path
from typing import Final

from dotenv import load_dotenv

load_dotenv()

BASE_DIR: Final[Path] = Path(__file__).resolve().parent
DOCTORS_JSON_PATH: Final[Path] = BASE_DIR / "app" / "data" / "doctors.json"

APP_NAME: Final[str] = os.getenv("APP_NAME", "MediQueue AI Service")
APP_VERSION: Final[str] = os.getenv("APP_VERSION", "1.0.0")
HOST: Final[str] = os.getenv("HOST", "0.0.0.0")
PORT: Final[int] = int(os.getenv("PORT", "8001"))
DEBUG: Final[bool] = os.getenv("DEBUG", "false").lower() in {"1", "true", "yes"}
