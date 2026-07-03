"""Rule-based doctor matching engine."""

import json
from functools import lru_cache
from pathlib import Path
from typing import TypedDict

from app.models.schemas import DoctorResponse, MatchResponse, PatientRequest
from app.core.config import (
    BASE_SCORE,
    CITY_MATCH_BONUS,
    DOCTORS_JSON_PATH,
    MAX_EXPERIENCE_BONUS,
    MAX_EXPERIENCE_YEARS,
    MAX_RATING,
    MAX_RATING_BONUS,
)

# Re-export scoring constants for tests and external callers.
__all__ = [
    "BASE_SCORE",
    "CITY_MATCH_BONUS",
    "DoctorRecord",
    "MatcherService",
    "match_doctors",
    "matcher_service",
]

# --- Raw specialty aliases (normalized at module load) ---
_RAW_SPECIALTY_ALIASES: dict[str, str] = {
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
    "hair transplant": "hair transplant",
    "sac ekimi": "hair transplant",
    "saç ekimi": "hair transplant",
    "fue": "hair transplant",
    "aesthetic": "aesthetic surgery",
    "aesthetic surgery": "aesthetic surgery",
    "estetik": "aesthetic surgery",
    "eye surgery": "eye surgery",
    "goz ameliyati": "eye surgery",
    "göz ameliyatı": "eye surgery",
    "lasik": "eye surgery",
    "dental": "dentistry",
    "dis": "dentistry",
    "diş": "dentistry",
    "obesity": "obesity surgery",
    "obesity surgery": "obesity surgery",
    "obezite": "obesity surgery",
    "bariatric": "obesity surgery",
}

# --- Raw language aliases (normalized at module load) ---
_RAW_LANGUAGE_ALIASES: dict[str, str] = {
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

# --- Raw city aliases (normalized at module load) ---
_RAW_CITY_ALIASES: dict[str, str] = {
    "istanbul": "istanbul",
    "ankara": "ankara",
    "izmir": "izmir",
    "antalya": "antalya",
    "bursa": "bursa",
}

COMBINING_DOT_ABOVE: str = "\u0307"
_TURKISH_TRANSLATION_TABLE = str.maketrans(
    {
        "ı": "i",
        "ş": "s",
        "ç": "c",
        "ğ": "g",
        "ö": "o",
        "ü": "u",
    }
)


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
    return (
        value.strip()
        .casefold()
        .replace(COMBINING_DOT_ABOVE, "")
        .translate(_TURKISH_TRANSLATION_TABLE)
    )


def _build_normalized_alias_map(raw_aliases: dict[str, str]) -> dict[str, str]:
    return {_normalize_text(key): canonical for key, canonical in raw_aliases.items()}


SPECIALTY_ALIASES: dict[str, str] = _build_normalized_alias_map(_RAW_SPECIALTY_ALIASES)
LANGUAGE_ALIASES: dict[str, str] = _build_normalized_alias_map(_RAW_LANGUAGE_ALIASES)
CITY_ALIASES: dict[str, str] = _build_normalized_alias_map(_RAW_CITY_ALIASES)


@lru_cache(maxsize=512)
def _resolve_specialty_alias(value: str) -> str:
    normalized = _normalize_text(value)
    return SPECIALTY_ALIASES.get(normalized, normalized)


@lru_cache(maxsize=512)
def _resolve_language_alias(value: str) -> str:
    normalized = _normalize_text(value)
    return LANGUAGE_ALIASES.get(normalized, normalized)


@lru_cache(maxsize=512)
def _resolve_city_alias(value: str) -> str:
    normalized = _normalize_text(value)
    return CITY_ALIASES.get(normalized, normalized)


def _specialties_match(patient_specialty: str, doctor_specialty: str) -> bool:
    return _resolve_specialty_alias(patient_specialty) == _resolve_specialty_alias(
        doctor_specialty
    )


def _language_matches(patient_language: str, doctor_languages: list[str]) -> bool:
    patient_lang = _resolve_language_alias(patient_language)
    doctor_langs = {_resolve_language_alias(lang) for lang in doctor_languages}
    return patient_lang in doctor_langs


def _cities_match(patient_city: str, doctor_city: str) -> bool:
    return _resolve_city_alias(patient_city) == _resolve_city_alias(doctor_city)


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
        self._doctors: list[DoctorRecord] = _load_doctors(self._doctors_path)

    def load_doctors(self) -> list[DoctorRecord]:
        return self._doctors

    def match(self, patient: PatientRequest) -> MatchResponse:
        return match_doctors(patient, self._doctors)


matcher_service = MatcherService()
