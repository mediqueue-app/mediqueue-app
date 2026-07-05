"""Unit tests for the rule-based clinic matching engine (clinic_matcher.py)."""

from collections.abc import Callable
from datetime import datetime, timezone

import pytest
from sqlalchemy.orm import Session

from app.core.config import BASE_SCORE, CITY_MATCH_BONUS
from app.models.schemas import PatientRequest
from app.services.clinic_matcher import ClinicRecord, _load_clinics, match_clinics


class TestClinicSpecialtyMatching:
    def test_correct_specialty_is_matched(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
        )

        result = match_clinics(patient, clinics)

        assert len(result) == 2
        assert {clinic.id for clinic in result} == {1, 2}

    def test_turkish_specialty_alias_is_matched(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        patient = PatientRequest(
            specialty="Kardiyoloji",
            language="Turkish",
            budget=5000,
        )

        result = match_clinics(patient, clinics)

        assert len(result) == 2


class TestClinicLanguageMatching:
    def test_language_mismatch_excludes_clinic(self) -> None:
        clinics: list[ClinicRecord] = [
            {
                "id": 10,
                "name": "German Clinic",
                "description": None,
                "address": None,
                "phone": None,
                "specialties": ["Cardiology"],
                "languages": ["German"],
                "cities": ["İstanbul"],
                "rating": 4.5,
            }
        ]
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
        )

        result = match_clinics(patient, clinics)

        assert result == []


class TestClinicCityBonus:
    def test_city_bonus_ranks_same_city_clinic_higher(self) -> None:
        clinics: list[ClinicRecord] = [
            {
                "id": 11,
                "name": "Istanbul Clinic",
                "description": None,
                "address": None,
                "phone": None,
                "specialties": ["Cardiology"],
                "languages": ["Turkish"],
                "cities": ["İstanbul"],
                "rating": 4.0,
            },
            {
                "id": 12,
                "name": "Ankara Clinic",
                "description": None,
                "address": None,
                "phone": None,
                "specialties": ["Cardiology"],
                "languages": ["Turkish"],
                "cities": ["Ankara"],
                "rating": 4.0,
            },
        ]
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
            city="İstanbul",
        )

        result = match_clinics(patient, clinics)

        istanbul_match = next(clinic for clinic in result if clinic.id == 11)
        ankara_match = next(clinic for clinic in result if clinic.id == 12)

        assert istanbul_match.score > ankara_match.score
        assert istanbul_match.score - ankara_match.score == CITY_MATCH_BONUS


class TestClinicEmptyResults:
    def test_returns_empty_list_when_no_clinic_matches(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        patient = PatientRequest(
            specialty="Neurology",
            language="Turkish",
            budget=5000,
        )

        result = match_clinics(patient, clinics)

        assert result == []

    def test_load_clinics_skips_inactive_clinic(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        from app.models.clinic_db import ClinicDB

        session = session_factory()
        try:
            now = datetime.now(timezone.utc)
            session.add(
                ClinicDB(
                    id=99,
                    name="Inactive Clinic",
                    description="Should not appear",
                    address=None,
                    phone=None,
                    is_active=False,
                    created_at=now,
                    updated_at=now,
                )
            )
            session.commit()
            clinics = _load_clinics(session)
        finally:
            session.close()

        assert all(clinic["id"] != 99 for clinic in clinics)


class TestClinicResultLimits:
    def test_max_clinics_returns_top_scored_matches(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
            max_clinics=1,
        )

        result = match_clinics(patient, clinics)

        assert len(result) == 1
        scores = [clinic.score for clinic in result]
        assert scores == sorted(scores, reverse=True)

        unlimited = match_clinics(
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=5000,
            ),
            clinics,
        )
        assert len(unlimited) == 2
        assert {clinic.id for clinic in result}.issubset({clinic.id for clinic in unlimited})
        assert result[0].id == unlimited[0].id

    def test_omitted_max_clinics_returns_all_matches(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            clinics = _load_clinics(session)
        finally:
            session.close()

        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
        )

        result = match_clinics(patient, clinics)

        assert len(result) == 2


class TestClinicLoadingWarnings:
    def test_load_clinics_logs_warning_for_unlinked_clinic(
        self,
        session_factory: Callable[[], Session],
        caplog: pytest.LogCaptureFixture,
    ) -> None:
        import logging

        from app.models.clinic_db import ClinicDB

        session = session_factory()
        try:
            now = datetime.now(timezone.utc)
            session.add(
                ClinicDB(
                    id=50,
                    name="Orphan Clinic",
                    description="No linked doctors",
                    address=None,
                    phone=None,
                    is_active=True,
                    created_at=now,
                    updated_at=now,
                )
            )
            session.commit()

            with caplog.at_level(logging.WARNING, logger="app.services.clinic_matcher"):
                clinics = _load_clinics(session)
        finally:
            session.close()

        assert all(clinic["id"] != 50 for clinic in clinics)
        assert any(
            record.message
            == "Clinic id=50 excluded from matching: no active linked doctors"
            for record in caplog.records
        )
