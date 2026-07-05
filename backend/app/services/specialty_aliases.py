"""Specialty alias resolution for clinic–doctor sync (mirrors AI matcher logic).

Backend-only copy of ai/app/services/matcher.py specialty aliases.
Do not import from the ai/ package at runtime.
"""

from __future__ import annotations

from functools import lru_cache

COMBINING_DOT_ABOVE = "\u0307"
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

# Canonical keys are normalized lowercase English specialty slugs.
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
    "estetik cerrahi": "aesthetic surgery",
    "eye surgery": "eye surgery",
    "goz ameliyati": "eye surgery",
    "göz ameliyatı": "eye surgery",
    "goz cerrahisi": "eye surgery",
    "göz cerrahisi": "eye surgery",
    "lasik": "eye surgery",
    "dental": "dentistry",
    "dis": "dentistry",
    "diş": "dentistry",
    "obesity": "obesity surgery",
    "obesity surgery": "obesity surgery",
    "obezite": "obesity surgery",
    "bariatric": "obesity surgery",
}


def normalize_text(value: str) -> str:
    return (
        value.strip()
        .casefold()
        .replace(COMBINING_DOT_ABOVE, "")
        .translate(_TURKISH_TRANSLATION_TABLE)
    )


def _build_normalized_alias_map(raw_aliases: dict[str, str]) -> dict[str, str]:
    return {normalize_text(key): canonical for key, canonical in raw_aliases.items()}


SPECIALTY_ALIASES: dict[str, str] = _build_normalized_alias_map(_RAW_SPECIALTY_ALIASES)


@lru_cache(maxsize=512)
def resolve_specialty_canonical(value: str) -> str:
    normalized = normalize_text(value)
    return SPECIALTY_ALIASES.get(normalized, normalized)


def specialties_match(left: str, right: str) -> bool:
    """Return True when two specialty labels resolve to the same canonical key."""
    return resolve_specialty_canonical(left) == resolve_specialty_canonical(right)


def doctor_matches_clinic_specialties(
    doctor_specialty: str | None,
    clinic_specialties: list[str],
) -> bool:
    if not doctor_specialty:
        return False
    return any(specialties_match(doctor_specialty, specialty) for specialty in clinic_specialties)
