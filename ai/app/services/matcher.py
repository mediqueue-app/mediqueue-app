"""Rule-based doctor matching engine."""

import json
from pathlib import Path
from typing import TypedDict

from app.models.schemas import DoctorResponse, MatchResponse, PatientRequest
from config import DOCTORS_JSON_PATH

# --- Scoring weights ---
BASE_SCORE: float = 60.0
CITY_MATCH_BONUS: float = 15.0
MAX_RATING_BONUS: float = 15.0
MAX_EXPERIENCE_BONUS: float = 10.0

# --- Normalization limits ---
MAX_RATING: float = 5.0
MAX_EXPERIENCE_YEARS: int = 20

# --- Specialty aliases (normalized key -> canonical value) ---
SPECIALTY_ALIASES: dict[str, str] = {
    "cardiology": "cardiology",
    "kardiyoloji": "cardiology",
    "dermatology": "dermatology",
    "dermatoloji": "dermatology",
    "orthopedics": "orthopedics",
    "ortopedi": "orthopedics",
    "neurology": "neurology",
    "noroloji": "neurology",
    "nöroloji": "neurology",
    "psychiatry": "psychiatry",
    "psikiyatri": "psychiatry",
    "pediatrics": "pediatrics",
    "pediatri": "pediatrics",
    "gynecology": "gynecology",
    "jinekoloji": "gynecology",
    "dentistry": "dentistry",
    "dis hekimligi": "dentistry",
    "diş hekimliği": "dentistry",
    "plastic surgery": "plastic surgery",
    "plastik cerrahi": "plastic surgery",
}

# --- Language aliases (normalized key -> canonical value) ---
LANGUAGE_ALIASES: dict[str, str] = {
    "tr": "turkish",
    "turkish": "turkish",
    "turkce": "turkish",
    "türkçe": "turkish",
    "en": "english",
    "english": "english",
    "ingilizce": "english",
    "ar": "arabic",
    "arabic": "arabic",
    "arapca": "arabic",
    "arapça": "arabic",
    "ru": "russian",
    "russian": "russian",
    "rusca": "russian",
    "rusça": "russian",
    "de": "german",
    "german": "german",
    "almanca": "german",
}

# --- City aliases (normalized key -> canonical value) ---
CITY_ALIASES: dict[str, str] = {
    "istanbul": "istanbul",
    "ankara": "ankara",
    "izmir": "izmir",
    "antalya": "antalya",
    "bursa": "bursa",
}

TURKISH_CHAR_MAP: dict[str, str] = {
    "ı": "i",
    "ş": "s",
    "ç": "c",
    "ğ": "g",
    "ö": "o",
    "ü": "u",
}

COMBINING_DOT_ABOVE: str = "\u0307"


class DoctorRecord(TypedDict):
    id: int
    name: str
    specialty: str
    city: str
    languages: list[str]
    price: int
    rating: float
    experience: int


def _normalize_text(value: str) -> str:
    normalized = value.strip().casefold().replace(COMBINING_DOT_ABOVE, "")
    for turkish_char, latin_char in TURKISH_CHAR_MAP.items():
        normalized = normalized.replace(turkish_char, latin_char)
    return normalized


def _resolve_alias(value: str, aliases: dict[str, str]) -> str:
    return aliases.get(_normalize_text(value), _normalize_text(value))


def _specialties_match(patient_specialty: str, doctor_specialty: str) -> bool:
    return _resolve_alias(patient_specialty, SPECIALTY_ALIASES) == _resolve_alias(
        doctor_specialty, SPECIALTY_ALIASES
    )


def _language_matches(patient_language: str, doctor_languages: list[str]) -> bool:
    patient_lang = _resolve_alias(patient_language, LANGUAGE_ALIASES)
    doctor_langs = {_resolve_alias(lang, LANGUAGE_ALIASES) for lang in doctor_languages}
    return patient_lang in doctor_langs


def _cities_match(patient_city: str, doctor_city: str) -> bool:
    return _resolve_alias(patient_city, CITY_ALIASES) == _resolve_alias(
        doctor_city, CITY_ALIASES
    )


def _is_within_budget(doctor_price: int, patient_budget: int) -> bool:
    return doctor_price <= patient_budget


def _calculate_rating_bonus(rating: float) -> float:
    capped_rating = min(rating, MAX_RATING)
    return (capped_rating / MAX_RATING) * MAX_RATING_BONUS


def _calculate_experience_bonus(experience_years: int) -> float:
    capped_experience = min(experience_years, MAX_EXPERIENCE_YEARS)
    experience_ratio = capped_experience / MAX_EXPERIENCE_YEARS
    return experience_ratio * MAX_EXPERIENCE_BONUS


def _calculate_city_bonus(patient: PatientRequest, doctor: DoctorRecord) -> float:
    if patient.city is None:
        return 0.0
    if _cities_match(patient.city, doctor["city"]):
        return CITY_MATCH_BONUS
    return 0.0


def _calculate_score(patient: PatientRequest, doctor: DoctorRecord) -> float:
    score = BASE_SCORE
    score += _calculate_city_bonus(patient, doctor)
    score += _calculate_rating_bonus(doctor["rating"])
    score += _calculate_experience_bonus(doctor["experience"])
    return round(score)


def _passes_hard_filters(patient: PatientRequest, doctor: DoctorRecord) -> bool:
    if not _specialties_match(patient.specialty, doctor["specialty"]):
        return False
    if not _language_matches(patient.language, doctor["languages"]):
        return False
    if not _is_within_budget(doctor["price"], patient.budget):
        return False
    return True


def _to_doctor_response(doctor: DoctorRecord, score: float) -> DoctorResponse:
    return DoctorResponse(
        id=doctor["id"],
        name=doctor["name"],
        specialty=doctor["specialty"],
        city=doctor["city"],
        languages=doctor["languages"],
        price=doctor["price"],
        rating=doctor["rating"],
        experience=doctor["experience"],
        score=score,
    )


def match_doctors(
    patient: PatientRequest,
    doctors: list[DoctorRecord],
) -> MatchResponse:
    """Filter doctors by hard rules, score survivors, and return ranked matches."""
    scored_doctors: list[tuple[DoctorRecord, float]] = []

    for doctor in doctors:
        if not _passes_hard_filters(patient, doctor):
            continue

        score = _calculate_score(patient, doctor)
        scored_doctors.append((doctor, score))

    scored_doctors.sort(key=lambda item: item[1], reverse=True)

    matches = [_to_doctor_response(doctor, score) for doctor, score in scored_doctors]
    return MatchResponse(matches=matches)


def _load_doctors(doctors_path: Path) -> list[DoctorRecord]:
    with doctors_path.open(encoding="utf-8") as file:
        return json.load(file)


class MatcherService:
    """Orchestrates doctor data loading and rule-based matching."""

    def __init__(self, doctors_path: Path | None = None) -> None:
        self._doctors_path = doctors_path or DOCTORS_JSON_PATH

    def load_doctors(self) -> list[DoctorRecord]:
        return _load_doctors(self._doctors_path)

    def match(self, patient: PatientRequest) -> MatchResponse:
        doctors = self.load_doctors()
        return match_doctors(patient, doctors)


matcher_service = MatcherService()
