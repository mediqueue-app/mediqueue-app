"""Tests for clinic data loading (MatcherService.load_clinics)."""

import json
from pathlib import Path

import pytest

from app.core.config import CLINICS_JSON_PATH
from app.models.schemas import ClinicRecord
from app.services.matcher import MatcherService

CLINIC_RECORD_FIELDS = {
    "id",
    "name",
    "specialty",
    "city",
    "languages",
    "min_price",
    "max_price",
    "rating",
    "doctor_count",
}


@pytest.fixture
def sample_clinics() -> list[ClinicRecord]:
    return [
        {
            "id": 1,
            "name": "Test Hair Clinic",
            "specialty": ["Hair Transplant"],
            "city": "İstanbul",
            "languages": ["Turkish", "English"],
            "min_price": 3000,
            "max_price": 10000,
            "rating": 4.7,
            "doctor_count": 4,
        },
        {
            "id": 2,
            "name": "Test Dental Center",
            "specialty": ["Dentistry"],
            "city": "Ankara",
            "languages": ["Turkish", "Arabic"],
            "min_price": 500,
            "max_price": 4000,
            "rating": 4.2,
            "doctor_count": 6,
        },
    ]


@pytest.fixture
def clinics_file(tmp_path: Path, sample_clinics: list[ClinicRecord]) -> Path:
    file_path = tmp_path / "clinics.json"
    file_path.write_text(json.dumps(sample_clinics, ensure_ascii=False), encoding="utf-8")
    return file_path


class TestClinicLoading:
    def test_load_clinics_reads_json_file(self, clinics_file: Path, sample_clinics: list[ClinicRecord]) -> None:
        service = MatcherService(clinics_path=clinics_file)

        clinics = service.load_clinics()

        assert clinics == sample_clinics

    def test_load_clinics_returns_expected_fields(self, clinics_file: Path) -> None:
        service = MatcherService(clinics_path=clinics_file)

        clinics = service.load_clinics()

        assert len(clinics) == 2
        for clinic in clinics:
            assert CLINIC_RECORD_FIELDS <= clinic.keys()

    def test_load_clinics_reads_default_clinics_json(self) -> None:
        service = MatcherService()

        clinics = service.load_clinics()

        assert len(clinics) >= 15
        assert CLINICS_JSON_PATH.exists()
        for clinic in clinics:
            assert CLINIC_RECORD_FIELDS <= clinic.keys()
            assert isinstance(clinic["specialty"], list)
            assert isinstance(clinic["languages"], list)
            assert clinic["min_price"] <= clinic["max_price"]
