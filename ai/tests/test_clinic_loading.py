"""Tests for clinic data loading from PostgreSQL."""

from collections.abc import Callable

from sqlalchemy.orm import Session

from app.services.clinic_matcher import ClinicRecord, _load_clinics
from app.services.matcher import MatcherService


CLINIC_RECORD_FIELDS = {
    "id",
    "name",
    "description",
    "address",
    "phone",
    "specialties",
    "languages",
    "cities",
    "rating",
}


class TestClinicLoading:
    def test_load_clinics_reads_from_database(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        assert len(clinics) == 3
        assert clinics[0]["name"] == "Istanbul Heart Center"

    def test_load_clinics_returns_expected_fields(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        for clinic in clinics:
            assert CLINIC_RECORD_FIELDS <= clinic.keys()

    def test_matcher_service_load_clinics(
        self,
        matcher_service: MatcherService,
    ) -> None:
        clinics = matcher_service.load_clinics()

        assert len(clinics) == 3
        assert all(isinstance(clinic, dict) for clinic in clinics)
        assert all(isinstance(clinic["specialties"], list) for clinic in clinics)
        assert all(isinstance(clinic["languages"], list) for clinic in clinics)
