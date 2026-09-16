"""Seed backend clinics and doctor_clinics from AI clinics.json reference data."""

from __future__ import annotations

import json
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from sqlalchemy import select, text
from sqlalchemy.orm import Session

from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.models.doctor_clinic import DoctorClinic
from app.services.specialty_aliases import doctor_matches_clinic_specialties


@dataclass(frozen=True)
class AiClinicRecord:
    source_id: int
    name: str
    description: str | None
    address: str | None
    phone: str | None
    specialties: list[str]
    city: str


@dataclass
class ClinicSyncSummary:
    clinics_inserted: int = 0
    clinics_updated: int = 0
    clinics_skipped: int = 0
    relations_inserted: int = 0
    relations_skipped: int = 0
    total_clinics_processed: int = 0
    errors: list[str] = field(default_factory=list)


FALLBACK_CLINICS: list[dict[str, Any]] = [
    {
        "id": 1,
        "name": "Istanbul Hair Center",
        "description": "FUE ve DHI saç ekiminde uluslararası hasta merkezi. Danışmanlık Türkçe, İngilizce ve Arapça.",
        "address": "İstanbul, Türkiye",
        "phone": None,
        "specialty": ["Hair Transplant"],
        "city": "İstanbul",
        "languages": ["Turkish", "English", "Arabic"],
    }
]


def default_clinics_json_path() -> Path:
    backend_root = Path(__file__).resolve().parents[2]
    return backend_root.parent / "ai" / "app" / "data" / "clinics.json"


def _normalize_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value.strip().casefold())
    return "".join(char for char in normalized if not unicodedata.combining(char))


def cities_match(left: str | None, right: str | None) -> bool:
    if left is None or right is None:
        return False
    return _normalize_text(left) == _normalize_text(right)


def specialties_match(doctor_specialty: str | None, clinic_specialties: list[str]) -> bool:
    """Match doctor specialty to clinic specialties using alias-aware normalization."""
    return doctor_matches_clinic_specialties(doctor_specialty, clinic_specialties)


def load_clinics_json(path: Path) -> list[Any]:
    if not path.is_file():
        raise FileNotFoundError(f"Clinics JSON file not found: {path}")

    with path.open(encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("Clinics JSON must contain a top-level array")

    return data


def _build_description(raw: dict[str, Any], specialties: list[str], city: str) -> str | None:
    explicit = raw.get("description")
    if isinstance(explicit, str) and explicit.strip():
        return explicit.strip()

    if specialties:
        specialty_text = ", ".join(specialties)
        return f"{city} — {specialty_text}"

    return None


def parse_ai_clinic(raw: dict[str, Any]) -> tuple[AiClinicRecord | None, str | None]:
    clinic_id = raw.get("id")
    if not isinstance(clinic_id, int) or clinic_id < 1:
        return None, "Field 'id' must be a positive integer"

    name = raw.get("name")
    if not isinstance(name, str) or not name.strip():
        return None, f"Clinic id={clinic_id}: field 'name' must be a non-empty string"

    city = raw.get("city")
    if not isinstance(city, str) or not city.strip():
        return None, f"Clinic id={clinic_id}: field 'city' must be a non-empty string"

    specialties = raw.get("specialty", raw.get("specialties"))
    if specialties is None:
        specialties_list: list[str] = []
    elif isinstance(specialties, str):
        specialties_list = [specialties.strip()] if specialties.strip() else []
    elif isinstance(specialties, list) and all(isinstance(item, str) for item in specialties):
        specialties_list = [item.strip() for item in specialties if item.strip()]
    else:
        return None, f"Clinic id={clinic_id}: field 'specialty' must be a string or list of strings"

    phone = raw.get("phone")
    if phone is not None and not isinstance(phone, str):
        return None, f"Clinic id={clinic_id}: field 'phone' must be a string when provided"

    address = raw.get("address")
    if address is None:
        address = city.strip()
    elif not isinstance(address, str):
        return None, f"Clinic id={clinic_id}: field 'address' must be a string when provided"

    return (
        AiClinicRecord(
            source_id=clinic_id,
            name=name.strip(),
            description=_build_description(raw, specialties_list, city.strip()),
            address=address.strip() if isinstance(address, str) else None,
            phone=phone.strip() if isinstance(phone, str) and phone.strip() else None,
            specialties=specialties_list,
            city=city.strip(),
        ),
        None,
    )


def parse_ai_clinics(raw_clinics: list[Any]) -> tuple[list[AiClinicRecord], list[str]]:
    parsed_records: list[AiClinicRecord] = []
    errors: list[str] = []
    seen_ids: set[int] = set()

    for index, raw in enumerate(raw_clinics):
        if not isinstance(raw, dict):
            errors.append(f"Record at index {index} must be a JSON object")
            continue

        record, error = parse_ai_clinic(raw)
        if error:
            errors.append(error)
            continue

        assert record is not None
        if record.source_id in seen_ids:
            errors.append(f"Duplicate clinic id {record.source_id} in clinics data")
            continue

        seen_ids.add(record.source_id)
        parsed_records.append(record)

    return parsed_records, errors


def find_existing_clinic(db: Session, record: AiClinicRecord) -> Clinic | None:
    by_id = db.get(Clinic, record.source_id)
    if by_id is not None:
        return by_id

    return db.scalar(
        select(Clinic).where(
            Clinic.name == record.name,
            Clinic.deleted_at.is_(None),
        )
    )


def clinic_needs_update(clinic: Clinic, record: AiClinicRecord) -> bool:
    if clinic.deleted_at is not None:
        return False
    return (
        clinic.name != record.name
        or clinic.description != record.description
        or clinic.address != record.address
        or clinic.phone != record.phone
        or not clinic.is_active
    )


def apply_ai_record_to_clinic(clinic: Clinic, record: AiClinicRecord) -> None:
    clinic.name = record.name
    clinic.description = record.description
    clinic.address = record.address
    clinic.phone = record.phone
    clinic.is_active = True


def sync_clinics_from_records(
    db: Session,
    records: list[AiClinicRecord],
) -> tuple[dict[int, Clinic], int, int, int]:
    clinic_by_source_id: dict[int, Clinic] = {}
    inserted = 0
    updated = 0
    skipped = 0

    for record in records:
        existing = find_existing_clinic(db, record)

        if existing is None:
            clinic = Clinic(
                id=record.source_id,
                name=record.name,
                description=record.description,
                address=record.address,
                phone=record.phone,
                is_active=True,
            )
            db.add(clinic)
            db.flush()
            clinic_by_source_id[record.source_id] = clinic
            inserted += 1
            continue

        clinic_by_source_id[record.source_id] = existing
        if existing.id != record.source_id:
            skipped += 1
            continue

        if clinic_needs_update(existing, record):
            apply_ai_record_to_clinic(existing, record)
            updated += 1
        else:
            skipped += 1

    return clinic_by_source_id, inserted, updated, skipped


def _sync_clinic_id_sequence(db: Session) -> None:
    db.execute(
        text(
            "SELECT setval(pg_get_serial_sequence('clinics', 'id'), "
            "COALESCE((SELECT MAX(id) FROM clinics), 1), true)"
        )
    )


def find_matching_doctors(db: Session, record: AiClinicRecord) -> list[Doctor]:
    doctors = db.scalars(select(Doctor).where(Doctor.is_active.is_(True))).all()
    return [
        doctor
        for doctor in doctors
        if specialties_match(doctor.specialty, record.specialties)
        and cities_match(doctor.city, record.city)
    ]


def sync_doctor_clinic_relations(
    db: Session,
    records: list[AiClinicRecord],
    clinic_by_source_id: dict[int, Clinic],
) -> tuple[int, int]:
    inserted = 0
    skipped = 0

    for record in records:
        clinic = clinic_by_source_id.get(record.source_id)
        if clinic is None or clinic.deleted_at is not None:
            skipped += 1
            continue

        matching_doctors = find_matching_doctors(db, record)
        for doctor in matching_doctors:
            existing = db.scalar(
                select(DoctorClinic).where(
                    DoctorClinic.doctor_id == doctor.id,
                    DoctorClinic.clinic_id == clinic.id,
                )
            )
            if existing is not None:
                if not existing.is_active:
                    existing.is_active = True
                skipped += 1
                continue

            db.add(
                DoctorClinic(
                    doctor_id=doctor.id,
                    clinic_id=clinic.id,
                    is_active=True,
                )
            )
            inserted += 1

    return inserted, skipped


def sync_clinics_from_json_file(
    db: Session,
    json_path: Path | None = None,
) -> ClinicSyncSummary:
    path = json_path or default_clinics_json_path()
    if path.is_file():
        raw_clinics = load_clinics_json(path)
    else:
        raw_clinics = FALLBACK_CLINICS

    records, parse_errors = parse_ai_clinics(raw_clinics)
    summary = ClinicSyncSummary(
        total_clinics_processed=len(raw_clinics),
        errors=list(parse_errors),
    )

    clinic_by_source_id, inserted, updated, skipped = sync_clinics_from_records(db, records)
    db.flush()
    _sync_clinic_id_sequence(db)

    summary.clinics_inserted = inserted
    summary.clinics_updated = updated
    summary.clinics_skipped = skipped + len(parse_errors)

    relations_inserted, relations_skipped = sync_doctor_clinic_relations(
        db,
        records,
        clinic_by_source_id,
    )
    summary.relations_inserted = relations_inserted
    summary.relations_skipped = relations_skipped

    return summary
