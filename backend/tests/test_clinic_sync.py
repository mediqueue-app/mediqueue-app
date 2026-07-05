from unittest.mock import MagicMock, patch

import pytest

from app.models.clinic import Clinic
from app.models.doctor import Doctor
from app.services.clinic_sync import (
    AiClinicRecord,
    FALLBACK_CLINICS,
    clinic_needs_update,
    parse_ai_clinic,
    parse_ai_clinics,
    sync_clinics_from_json_file,
    sync_clinics_from_records,
    sync_doctor_clinic_relations,
)


SAMPLE_RECORD = AiClinicRecord(
    source_id=1,
    name="MediQueue Clinic",
    description="Cardiology services in Istanbul",
    address="Istanbul",
    phone="+90 555 000 00 00",
    specialties=["Cardiology"],
    city="Istanbul",
)

SAMPLE_RAW = {
    "id": 1,
    "name": "MediQueue Clinic",
    "specialty": ["Cardiology"],
    "city": "Istanbul",
    "languages": ["Turkish", "English"],
    "min_price": 1500,
    "max_price": 5000,
    "rating": 4.8,
    "doctor_count": 3,
}


class TestParseAiClinic:
    def test_parses_valid_record(self) -> None:
        record, error = parse_ai_clinic(SAMPLE_RAW)

        assert error is None
        assert record is not None
        assert record.source_id == 1
        assert record.name == "MediQueue Clinic"
        assert record.specialties == ["Cardiology"]

    def test_rejects_missing_name(self) -> None:
        invalid = {**SAMPLE_RAW, "name": "   "}
        record, error = parse_ai_clinic(invalid)

        assert record is None
        assert error is not None
        assert "name" in error


class TestParseAiClinics:
    def test_handles_empty_list(self) -> None:
        records, errors = parse_ai_clinics([])

        assert records == []
        assert errors == []

    def test_detects_duplicate_ids(self) -> None:
        records, errors = parse_ai_clinics([SAMPLE_RAW, SAMPLE_RAW])

        assert len(records) == 1
        assert len(errors) == 1
        assert "Duplicate clinic id 1" in errors[0]


class TestClinicNeedsUpdate:
    def test_detects_changed_description(self) -> None:
        clinic = Clinic(
            id=1,
            name=SAMPLE_RECORD.name,
            description="Old description",
            address=SAMPLE_RECORD.address,
            phone=SAMPLE_RECORD.phone,
            is_active=True,
        )

        assert clinic_needs_update(clinic, SAMPLE_RECORD) is True

    def test_detects_no_changes(self) -> None:
        clinic = Clinic(
            id=1,
            name=SAMPLE_RECORD.name,
            description=SAMPLE_RECORD.description,
            address=SAMPLE_RECORD.address,
            phone=SAMPLE_RECORD.phone,
            is_active=True,
        )

        assert clinic_needs_update(clinic, SAMPLE_RECORD) is False


class TestSyncClinicsFromRecords:
    def test_inserts_missing_clinic(self) -> None:
        db = MagicMock()

        with patch("app.services.clinic_sync.find_existing_clinic", return_value=None):
            clinic_by_source_id, inserted, updated, skipped = sync_clinics_from_records(
                db,
                [SAMPLE_RECORD],
            )

        assert inserted == 1
        assert updated == 0
        assert skipped == 0
        assert clinic_by_source_id[1] is not None
        db.add.assert_called_once()

    def test_skips_unchanged_clinic(self) -> None:
        db = MagicMock()
        existing = Clinic(
            id=1,
            name=SAMPLE_RECORD.name,
            description=SAMPLE_RECORD.description,
            address=SAMPLE_RECORD.address,
            phone=SAMPLE_RECORD.phone,
            is_active=True,
        )

        with patch("app.services.clinic_sync.find_existing_clinic", return_value=existing):
            _, inserted, updated, skipped = sync_clinics_from_records(db, [SAMPLE_RECORD])

        assert inserted == 0
        assert updated == 0
        assert skipped == 1
        db.add.assert_not_called()

    def test_updates_changed_clinic(self) -> None:
        db = MagicMock()
        existing = Clinic(
            id=1,
            name=SAMPLE_RECORD.name,
            description="Old description",
            address=SAMPLE_RECORD.address,
            phone=SAMPLE_RECORD.phone,
            is_active=True,
        )

        with patch("app.services.clinic_sync.find_existing_clinic", return_value=existing):
            _, inserted, updated, skipped = sync_clinics_from_records(db, [SAMPLE_RECORD])

        assert inserted == 0
        assert updated == 1
        assert skipped == 0
        assert existing.description == SAMPLE_RECORD.description

    def test_is_idempotent_when_unchanged(self) -> None:
        db = MagicMock()
        existing = Clinic(
            id=1,
            name=SAMPLE_RECORD.name,
            description=SAMPLE_RECORD.description,
            address=SAMPLE_RECORD.address,
            phone=SAMPLE_RECORD.phone,
            is_active=True,
        )

        with patch("app.services.clinic_sync.find_existing_clinic", return_value=existing):
            first = sync_clinics_from_records(db, [SAMPLE_RECORD])
            second = sync_clinics_from_records(db, [SAMPLE_RECORD])

        assert first[3] == 1
        assert second[3] == 1
        db.add.assert_not_called()


class TestSyncDoctorClinicRelations:
    def test_creates_doctor_clinic_links(self) -> None:
        db = MagicMock()
        clinic = Clinic(id=1, name=SAMPLE_RECORD.name, is_active=True)
        doctor = Doctor(
            id=5,
            full_name="Dr. Ayşe Yılmaz",
            specialty="Cardiology",
            city="Istanbul",
            is_active=True,
        )
        db.scalar.return_value = None

        with patch(
            "app.services.clinic_sync.find_matching_doctors",
            return_value=[doctor],
        ):
            inserted, skipped = sync_doctor_clinic_relations(
                db,
                [SAMPLE_RECORD],
                {1: clinic},
            )

        assert inserted == 1
        assert skipped == 0
        db.add.assert_called_once()

    def test_skips_existing_doctor_clinic_link(self) -> None:
        db = MagicMock()
        clinic = Clinic(id=1, name=SAMPLE_RECORD.name, is_active=True)
        doctor = Doctor(
            id=5,
            full_name="Dr. Ayşe Yılmaz",
            specialty="Cardiology",
            city="Istanbul",
            is_active=True,
        )
        db.scalar.return_value = MagicMock(is_active=True)

        with patch(
            "app.services.clinic_sync.find_matching_doctors",
            return_value=[doctor],
        ):
            first = sync_doctor_clinic_relations(db, [SAMPLE_RECORD], {1: clinic})
            second = sync_doctor_clinic_relations(db, [SAMPLE_RECORD], {1: clinic})

        assert first == (0, 1)
        assert second == (0, 1)
        db.add.assert_not_called()


class TestSyncClinicsFromJsonFile:
    def test_uses_fallback_when_json_missing(self, tmp_path) -> None:
        db = MagicMock()
        missing = tmp_path / "missing-clinics.json"

        with patch("app.services.clinic_sync.sync_clinics_from_records") as mock_sync:
            mock_sync.return_value = ({}, 0, 0, 0)
            with patch(
                "app.services.clinic_sync.sync_doctor_clinic_relations",
                return_value=(0, 0),
            ):
                with patch("app.services.clinic_sync._sync_clinic_id_sequence"):
                    summary = sync_clinics_from_json_file(db, json_path=missing)

        assert summary.total_clinics_processed == len(FALLBACK_CLINICS)
        mock_sync.assert_called_once()

    def test_handles_parse_errors_safely(self) -> None:
        records, errors = parse_ai_clinics([{"id": "bad"}, SAMPLE_RAW])

        assert len(records) == 1
        assert len(errors) == 1
