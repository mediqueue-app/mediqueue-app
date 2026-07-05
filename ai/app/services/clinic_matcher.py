"""Rule-based clinic matching engine.

Klinik verisi (uzmanlık, dil, şehir, rating) bağlı doktorlardan türetilir;
``app/data/clinics.json`` içindeki ``min_price`` / ``max_price`` / ``rating`` /
``doctor_count`` alanları burada kullanılmaz (yalnızca backend seed referansı).
"""

from __future__ import annotations

import logging
from collections import defaultdict
from typing import TypedDict

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import BASE_SCORE, CITY_MATCH_BONUS
from app.models.clinic_db import ClinicDB
from app.models.doctor_clinic_db import DoctorClinicDB
from app.models.schemas import ClinicResponse, PatientRequest
from app.services.matcher import (
    DoctorRecord,
    _calculate_rating_bonus,
    _cities_match,
    _language_matches,
    _load_doctors,
    _specialties_match,
)

logger = logging.getLogger(__name__)

__all__ = [
    "ClinicRecord",
    "MatcherClinicResult",
    "_load_clinics",
    "match_clinics",
]


class ClinicRecord(TypedDict):
    id: int
    name: str
    description: str | None
    address: str | None
    phone: str | None
    specialties: list[str]
    languages: list[str]
    cities: list[str]
    rating: float | None


class MatcherClinicResult(TypedDict):
    clinics: list[ClinicResponse]


def _clinic_specialty_matches(patient_specialty: str, clinic_specialties: list[str]) -> bool:
    return any(_specialties_match(patient_specialty, specialty) for specialty in clinic_specialties)


def _calculate_clinic_city_bonus(patient: PatientRequest, clinic: ClinicRecord) -> float:
    if patient.city is None:
        return 0.0
    if any(_cities_match(patient.city, city) for city in clinic["cities"]):
        return CITY_MATCH_BONUS
    return 0.0


def _calculate_clinic_score(patient: PatientRequest, clinic: ClinicRecord) -> float:
    score = BASE_SCORE
    score += _calculate_clinic_city_bonus(patient, clinic)
    if clinic["rating"] is not None:
        score += _calculate_rating_bonus(clinic["rating"])
    return round(score)


def _passes_clinic_hard_filters(patient: PatientRequest, clinic: ClinicRecord) -> bool:
    if not _clinic_specialty_matches(patient.specialty, clinic["specialties"]):
        return False
    if not _language_matches(patient.language, clinic["languages"]):
        return False
    return True


def _to_clinic_response(clinic: ClinicRecord, score: float) -> ClinicResponse:
    return ClinicResponse(
        id=clinic["id"],
        name=clinic["name"],
        description=clinic["description"],
        address=clinic["address"],
        phone=clinic["phone"],
        score=score,
    )


def _clinic_db_to_record(
    clinic: ClinicDB,
    linked_doctors: list[DoctorRecord],
) -> ClinicRecord | None:
    if not linked_doctors:
        logger.warning(
            "Clinic id=%s excluded from matching: no active linked doctors",
            clinic.id,
        )
        return None

    specialties = sorted({doctor["specialty"] for doctor in linked_doctors})
    languages = sorted({language for doctor in linked_doctors for language in doctor["languages"]})
    cities = sorted({doctor["city"] for doctor in linked_doctors})
    ratings = [doctor["rating"] for doctor in linked_doctors]
    rating = sum(ratings) / len(ratings) if ratings else None

    return ClinicRecord(
        id=clinic.id,
        name=clinic.name,
        description=clinic.description,
        address=clinic.address,
        phone=clinic.phone,
        specialties=specialties,
        languages=languages,
        cities=cities,
        rating=rating,
    )


def _load_clinics(
    session: Session,
    doctors: list[DoctorRecord] | None = None,
) -> list[ClinicRecord]:
    clinic_rows = session.scalars(
        select(ClinicDB).where(ClinicDB.is_active.is_(True)).order_by(ClinicDB.id)
    ).all()
    link_rows = session.scalars(
        select(DoctorClinicDB).where(DoctorClinicDB.is_active.is_(True))
    ).all()
    doctor_records = doctors if doctors is not None else _load_doctors(session)
    doctors_by_id = {doctor["id"]: doctor for doctor in doctor_records}

    doctors_by_clinic: dict[int, list[DoctorRecord]] = defaultdict(list)
    for link in link_rows:
        doctor = doctors_by_id.get(link.doctor_id)
        if doctor is not None:
            doctors_by_clinic[link.clinic_id].append(doctor)

    records: list[ClinicRecord] = []
    for clinic in clinic_rows:
        record = _clinic_db_to_record(clinic, doctors_by_clinic.get(clinic.id, []))
        if record is not None:
            records.append(record)
    return records


def match_clinics(
    patient: PatientRequest,
    clinics: list[ClinicRecord],
) -> list[ClinicResponse]:
    """Filter clinics by hard rules, score survivors, and return ranked matches."""
    scored_clinics: list[tuple[ClinicRecord, float]] = []

    for clinic in clinics:
        if not _passes_clinic_hard_filters(patient, clinic):
            continue

        score = _calculate_clinic_score(patient, clinic)
        scored_clinics.append((clinic, score))

    scored_clinics.sort(key=lambda item: item[1], reverse=True)
    matches = [_to_clinic_response(clinic, score) for clinic, score in scored_clinics]
    if patient.max_clinics is not None:
        matches = matches[: patient.max_clinics]
    return matches
