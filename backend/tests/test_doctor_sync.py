import json
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from app.models.doctor import Doctor
from app.services.doctor_sync import (
    AiDoctorRecord,
    default_doctors_json_path,
    doctor_needs_update,
    load_doctors_json,
    map_ai_record_to_doctor_fields,
    parse_ai_doctor,
    parse_ai_doctors,
    sync_doctors_from_records,
)


SAMPLE_RECORD = AiDoctorRecord(
    ai_source_id=1,
    full_name="Dr. Ayşe Yılmaz",
    specialty="Cardiology",
    city="İstanbul",
    languages=["Turkish", "English"],
    price=2800,
    rating=4.9,
    experience=18,
)

SAMPLE_RAW = {
    "id": 1,
    "name": "Dr. Ayşe Yılmaz",
    "specialty": "Cardiology",
    "city": "İstanbul",
    "languages": ["Turkish", "English"],
    "price": 2800,
    "rating": 4.9,
    "experience": 18,
}


class TestParseAiDoctor:
    def test_parses_valid_record(self) -> None:
        record, error = parse_ai_doctor(SAMPLE_RAW)

        assert error is None
        assert record == SAMPLE_RECORD

    def test_rejects_invalid_rating(self) -> None:
        invalid = {**SAMPLE_RAW, "rating": 6.0}
        record, error = parse_ai_doctor(invalid)

        assert record is None
        assert error is not None
        assert "rating" in error

    def test_rejects_missing_name(self) -> None:
        invalid = {**SAMPLE_RAW, "name": "   "}
        record, error = parse_ai_doctor(invalid)

        assert record is None
        assert "name" in error


class TestParseAiDoctors:
    def test_detects_duplicate_ai_ids(self) -> None:
        records, errors = parse_ai_doctors([SAMPLE_RAW, SAMPLE_RAW])

        assert len(records) == 1
        assert len(errors) == 1
        assert "Duplicate AI id 1" in errors[0]

    def test_loads_all_doctors_from_project_json(self) -> None:
        json_path = default_doctors_json_path()
        if not json_path.is_file():
            pytest.skip("AI doctors.json not available")

        raw_doctors = load_doctors_json(json_path)
        records, errors = parse_ai_doctors(raw_doctors)

        assert len(raw_doctors) == 44
        assert len(records) == 44
        assert errors == []


class TestMapping:
    def test_map_ai_record_to_doctor_fields(self) -> None:
        mapped = map_ai_record_to_doctor_fields(SAMPLE_RECORD)

        assert mapped["full_name"] == SAMPLE_RECORD.full_name
        assert mapped["ai_source_id"] == SAMPLE_RECORD.ai_source_id
        assert mapped["languages"] == SAMPLE_RECORD.languages


class TestDoctorNeedsUpdate:
    def test_detects_changed_rating(self) -> None:
        doctor = Doctor(
            ai_source_id=1,
            full_name=SAMPLE_RECORD.full_name,
            specialty=SAMPLE_RECORD.specialty,
            city=SAMPLE_RECORD.city,
            languages=SAMPLE_RECORD.languages,
            price=SAMPLE_RECORD.price,
            rating=1.0,
            experience=SAMPLE_RECORD.experience,
            is_active=True,
        )

        assert doctor_needs_update(doctor, SAMPLE_RECORD) is True

    def test_detects_no_changes(self) -> None:
        doctor = Doctor(
            ai_source_id=1,
            full_name=SAMPLE_RECORD.full_name,
            specialty=SAMPLE_RECORD.specialty,
            city=SAMPLE_RECORD.city,
            languages=SAMPLE_RECORD.languages,
            price=SAMPLE_RECORD.price,
            rating=SAMPLE_RECORD.rating,
            experience=SAMPLE_RECORD.experience,
            is_active=True,
        )

        assert doctor_needs_update(doctor, SAMPLE_RECORD) is False


class TestSyncDoctorsFromRecords:
    def test_inserts_missing_doctor(self) -> None:
        db = MagicMock()

        with patch("app.services.doctor_sync.find_existing_doctor", return_value=None):
            summary = sync_doctors_from_records(db, [SAMPLE_RECORD])

        assert summary.inserted == 1
        assert summary.updated == 0
        assert summary.skipped == 0
        db.add.assert_called_once()

    def test_skips_unchanged_doctor(self) -> None:
        db = MagicMock()
        existing = Doctor(
            ai_source_id=1,
            full_name=SAMPLE_RECORD.full_name,
            specialty=SAMPLE_RECORD.specialty,
            city=SAMPLE_RECORD.city,
            languages=SAMPLE_RECORD.languages,
            price=SAMPLE_RECORD.price,
            rating=SAMPLE_RECORD.rating,
            experience=SAMPLE_RECORD.experience,
            is_active=True,
        )

        with patch("app.services.doctor_sync.find_existing_doctor", return_value=existing):
            summary = sync_doctors_from_records(db, [SAMPLE_RECORD])

        assert summary.inserted == 0
        assert summary.updated == 0
        assert summary.skipped == 1
        db.add.assert_not_called()

    def test_updates_changed_doctor(self) -> None:
        db = MagicMock()
        existing = Doctor(
            ai_source_id=1,
            full_name=SAMPLE_RECORD.full_name,
            specialty=SAMPLE_RECORD.specialty,
            city=SAMPLE_RECORD.city,
            languages=SAMPLE_RECORD.languages,
            price=SAMPLE_RECORD.price,
            rating=1.0,
            experience=SAMPLE_RECORD.experience,
            is_active=True,
        )

        with patch("app.services.doctor_sync.find_existing_doctor", return_value=existing):
            summary = sync_doctors_from_records(db, [SAMPLE_RECORD])

        assert summary.updated == 1
        assert existing.rating == SAMPLE_RECORD.rating

    def test_skips_conflicting_ai_source_id(self) -> None:
        db = MagicMock()
        existing = Doctor(
            ai_source_id=999,
            full_name=SAMPLE_RECORD.full_name,
            specialty=SAMPLE_RECORD.specialty,
            city=SAMPLE_RECORD.city,
            languages=SAMPLE_RECORD.languages,
            price=SAMPLE_RECORD.price,
            rating=SAMPLE_RECORD.rating,
            experience=SAMPLE_RECORD.experience,
            is_active=True,
        )

        with patch("app.services.doctor_sync.find_existing_doctor", return_value=existing):
            summary = sync_doctors_from_records(db, [SAMPLE_RECORD])

        assert summary.skipped == 1
        assert summary.errors
        db.add.assert_not_called()

    def test_is_idempotent_when_unchanged(self) -> None:
        db = MagicMock()
        existing = Doctor(
            ai_source_id=1,
            full_name=SAMPLE_RECORD.full_name,
            specialty=SAMPLE_RECORD.specialty,
            city=SAMPLE_RECORD.city,
            languages=SAMPLE_RECORD.languages,
            price=SAMPLE_RECORD.price,
            rating=SAMPLE_RECORD.rating,
            experience=SAMPLE_RECORD.experience,
            is_active=True,
        )

        with patch("app.services.doctor_sync.find_existing_doctor", return_value=existing):
            first = sync_doctors_from_records(db, [SAMPLE_RECORD])
            second = sync_doctors_from_records(db, [SAMPLE_RECORD])

        assert first.skipped == 1
        assert second.skipped == 1
        db.add.assert_not_called()


class TestLoadDoctorsJson:
    def test_raises_for_missing_file(self, tmp_path: Path) -> None:
        missing = tmp_path / "missing.json"

        with pytest.raises(FileNotFoundError):
            load_doctors_json(missing)

    def test_raises_for_invalid_top_level(self, tmp_path: Path) -> None:
        invalid = tmp_path / "invalid.json"
        invalid.write_text(json.dumps({"id": 1}), encoding="utf-8")

        with pytest.raises(ValueError, match="top-level array"):
            load_doctors_json(invalid)
