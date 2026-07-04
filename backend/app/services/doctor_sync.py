"""One-way sync of AI doctors.json records into the backend doctors table."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.doctor import Doctor


@dataclass(frozen=True)
class AiDoctorRecord:
    ai_source_id: int
    full_name: str
    specialty: str
    city: str
    languages: list[str]
    price: int
    rating: float
    experience: int


@dataclass
class SyncSummary:
    inserted: int = 0
    updated: int = 0
    skipped: int = 0
    total_processed: int = 0
    errors: list[str] = field(default_factory=list)


def default_doctors_json_path() -> Path:
    backend_root = Path(__file__).resolve().parents[2]
    return backend_root.parent / "ai" / "app" / "data" / "doctors.json"


def load_doctors_json(path: Path) -> list[Any]:
    if not path.is_file():
        raise FileNotFoundError(f"Doctors JSON file not found: {path}")

    with path.open(encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("Doctors JSON must contain a top-level array")

    return data


def parse_ai_doctor(raw: dict[str, Any]) -> tuple[AiDoctorRecord | None, str | None]:
    if not isinstance(raw, dict):
        return None, "Record must be a JSON object"

    doctor_id = raw.get("id")
    if not isinstance(doctor_id, int) or doctor_id < 1:
        return None, "Field 'id' must be a positive integer"

    name = raw.get("name")
    if not isinstance(name, str) or not name.strip():
        return None, f"Doctor id={doctor_id}: field 'name' must be a non-empty string"

    specialty = raw.get("specialty")
    if not isinstance(specialty, str) or not specialty.strip():
        return None, f"Doctor id={doctor_id}: field 'specialty' must be a non-empty string"

    city = raw.get("city")
    if not isinstance(city, str) or not city.strip():
        return None, f"Doctor id={doctor_id}: field 'city' must be a non-empty string"

    languages = raw.get("languages")
    if languages is None:
        languages_list: list[str] = []
    elif not isinstance(languages, list) or not all(isinstance(item, str) for item in languages):
        return None, f"Doctor id={doctor_id}: field 'languages' must be a list of strings"
    else:
        languages_list = [language.strip() for language in languages if language.strip()]

    price = raw.get("price")
    if not isinstance(price, int) or price < 0:
        return None, f"Doctor id={doctor_id}: field 'price' must be a non-negative integer"

    rating = raw.get("rating")
    if not isinstance(rating, (int, float)) or rating < 0 or rating > 5:
        return None, f"Doctor id={doctor_id}: field 'rating' must be between 0 and 5"

    experience = raw.get("experience")
    if not isinstance(experience, int) or experience < 0:
        return None, f"Doctor id={doctor_id}: field 'experience' must be a non-negative integer"

    return (
        AiDoctorRecord(
            ai_source_id=doctor_id,
            full_name=name.strip(),
            specialty=specialty.strip(),
            city=city.strip(),
            languages=languages_list,
            price=price,
            rating=float(rating),
            experience=experience,
        ),
        None,
    )


def parse_ai_doctors(raw_doctors: list[Any]) -> tuple[list[AiDoctorRecord], list[str]]:
    parsed_records: list[AiDoctorRecord] = []
    errors: list[str] = []
    seen_ids: set[int] = set()

    for index, raw in enumerate(raw_doctors):
        if not isinstance(raw, dict):
            errors.append(f"Record at index {index} must be a JSON object")
            continue

        record, error = parse_ai_doctor(raw)
        if error:
            errors.append(error)
            continue

        assert record is not None
        if record.ai_source_id in seen_ids:
            errors.append(
                f"Duplicate AI id {record.ai_source_id} in doctors.json "
                f"({record.full_name})"
            )
            continue

        seen_ids.add(record.ai_source_id)
        parsed_records.append(record)

    return parsed_records, errors


def map_ai_record_to_doctor_fields(record: AiDoctorRecord) -> dict[str, Any]:
    return {
        "ai_source_id": record.ai_source_id,
        "full_name": record.full_name,
        "specialty": record.specialty,
        "city": record.city,
        "languages": record.languages or None,
        "price": record.price,
        "rating": record.rating,
        "experience": record.experience,
    }


def doctor_needs_update(doctor: Doctor, record: AiDoctorRecord) -> bool:
    return (
        doctor.ai_source_id != record.ai_source_id
        or doctor.full_name != record.full_name
        or doctor.specialty != record.specialty
        or doctor.city != record.city
        or (doctor.languages or []) != record.languages
        or doctor.price != record.price
        or doctor.rating != record.rating
        or doctor.experience != record.experience
    )


def apply_ai_record_to_doctor(doctor: Doctor, record: AiDoctorRecord) -> None:
    fields = map_ai_record_to_doctor_fields(record)
    for key, value in fields.items():
        setattr(doctor, key, value)


def find_existing_doctor(db: Session, record: AiDoctorRecord) -> Doctor | None:
    by_ai_id = db.scalar(
        select(Doctor).where(Doctor.ai_source_id == record.ai_source_id)
    )
    if by_ai_id is not None:
        return by_ai_id

    return db.scalar(
        select(Doctor).where(
            Doctor.full_name == record.full_name,
            Doctor.specialty == record.specialty,
            Doctor.city == record.city,
        )
    )


def sync_doctors_from_records(
    db: Session,
    records: list[AiDoctorRecord],
) -> SyncSummary:
    summary = SyncSummary(total_processed=len(records))

    for record in records:
        existing = find_existing_doctor(db, record)

        if existing is None:
            doctor = Doctor(
                **map_ai_record_to_doctor_fields(record),
                is_active=True,
            )
            db.add(doctor)
            summary.inserted += 1
            continue

        if (
            existing.ai_source_id is not None
            and existing.ai_source_id != record.ai_source_id
        ):
            summary.skipped += 1
            summary.errors.append(
                "Doctor conflict for "
                f"{record.full_name}/{record.specialty}/{record.city}: "
                f"existing ai_source_id={existing.ai_source_id}, "
                f"incoming ai_source_id={record.ai_source_id}"
            )
            continue

        if not doctor_needs_update(existing, record):
            summary.skipped += 1
            continue

        apply_ai_record_to_doctor(existing, record)
        summary.updated += 1

    return summary


def sync_doctors_from_json_file(
    db: Session,
    json_path: Path | None = None,
) -> SyncSummary:
    path = json_path or default_doctors_json_path()
    raw_doctors = load_doctors_json(path)
    records, parse_errors = parse_ai_doctors(raw_doctors)

    summary = sync_doctors_from_records(db, records)
    summary.errors = parse_errors + summary.errors
    summary.skipped += len(parse_errors)
    summary.total_processed = len(raw_doctors)
    return summary
