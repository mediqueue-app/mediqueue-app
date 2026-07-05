"""Unit tests for the rule-based doctor matching engine (matcher.py)."""

import logging
from collections.abc import Callable
from datetime import datetime, timezone

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core.config import BASE_SCORE, CITY_MATCH_BONUS
from app.models.doctor_db import DoctorDB
from app.models.schemas import PatientRequest
from app.services.matcher import (
    MatcherService,
    _load_doctors,
    match_doctors,
)


class TestSpecialtyMatching:
    def test_correct_specialty_is_matched(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        assert len(result.matches) == 3
        assert all(match.specialty == "Cardiology" for match in result.matches)
        assert {match.id for match in result.matches} == {1, 2, 5}

    def test_turkish_specialty_alias_is_matched(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Kardiyoloji",
            language="Turkish",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        assert len(result.matches) == 3
        assert all(match.specialty == "Cardiology" for match in result.matches)


class TestMedicalTourismSpecialtyAliases:
    def test_sac_ekimi_alias_matches_hair_transplant(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Saç Ekimi",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 101
        assert result.matches[0].specialty == "hair transplant"

    def test_fue_alias_matches_hair_transplant(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="FUE",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 101
        assert result.matches[0].specialty == "hair transplant"

    def test_estetik_alias_matches_aesthetic_surgery(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Estetik",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 102
        assert result.matches[0].specialty == "aesthetic surgery"

    def test_goz_ameliyati_alias_matches_eye_surgery(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Göz Ameliyatı",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 103
        assert result.matches[0].specialty == "eye surgery"

    def test_lasik_alias_matches_eye_surgery(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="LASIK",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 103
        assert result.matches[0].specialty == "eye surgery"

    def test_obezite_alias_matches_obesity_surgery(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Obezite",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 104
        assert result.matches[0].specialty == "obesity surgery"

    def test_bariatric_alias_matches_obesity_surgery(
        self,
        medical_tourism_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="bariatric",
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 104
        assert result.matches[0].specialty == "obesity surgery"

    @pytest.mark.parametrize(
        "specialty_input",
        ["Bariatrik", "bariatrik cerrahi"],
    )
    def test_bariatrik_tr_alias_matches_obesity_surgery(
        self,
        medical_tourism_doctors: list[dict],
        specialty_input: str,
    ) -> None:
        patient = PatientRequest(
            specialty=specialty_input,
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 104
        assert result.matches[0].specialty == "obesity surgery"

    @pytest.mark.parametrize(
        "specialty_input",
        [
            "saç ekimi",
            "SAÇ EKİMİ",
            "Saç Ekimi",
            "saç ekımı",
        ],
    )
    def test_sac_ekimi_case_and_turkish_character_variations(
        self,
        medical_tourism_doctors: list[dict],
        specialty_input: str,
    ) -> None:
        patient = PatientRequest(
            specialty=specialty_input,
            language="Turkish",
            budget=10000,
        )

        result = match_doctors(patient, medical_tourism_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 101
        assert result.matches[0].specialty == "hair transplant"


class TestLanguageMatching:
    def test_language_mismatch_excludes_doctor(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Russian",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        assert result.matches == []

    def test_language_code_matches_full_name(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="en",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 1


class TestBudgetFiltering:
    def test_insufficient_budget_excludes_expensive_doctors(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=1500,
        )

        result = match_doctors(patient, sample_doctors)

        assert len(result.matches) == 1
        assert result.matches[0].id == 2
        assert result.matches[0].price <= patient.budget


class TestCityBonus:
    def test_city_bonus_ranks_same_city_doctor_higher(self) -> None:
        doctors: list[dict] = [
            {
                "id": 10,
                "name": "Dr. Istanbul",
                "specialty": "Cardiology",
                "city": "İstanbul",
                "languages": ["Turkish"],
                "price": 1000,
                "rating": 4.0,
                "experience": 10,
            },
            {
                "id": 11,
                "name": "Dr. Ankara",
                "specialty": "Cardiology",
                "city": "Ankara",
                "languages": ["Turkish"],
                "price": 1000,
                "rating": 4.0,
                "experience": 10,
            },
        ]
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
            city="İstanbul",
        )

        result = match_doctors(patient, doctors)

        istanbul_match = next(match for match in result.matches if match.id == 10)
        ankara_match = next(match for match in result.matches if match.id == 11)

        assert istanbul_match.score > ankara_match.score
        assert istanbul_match.score - ankara_match.score == CITY_MATCH_BONUS

    def test_city_alias_matches_ascii_and_turkish_names(self) -> None:
        doctors: list[dict] = [
            {
                "id": 12,
                "name": "Dr. Istanbul",
                "specialty": "Cardiology",
                "city": "İstanbul",
                "languages": ["Turkish"],
                "price": 1000,
                "rating": 4.0,
                "experience": 10,
            },
        ]
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
            city="Istanbul",
        )

        result = match_doctors(patient, doctors)

        assert len(result.matches) == 1
        assert result.matches[0].score == BASE_SCORE + CITY_MATCH_BONUS + 12.0 + 5.0

    def test_city_bonus_is_not_applied_when_city_not_provided(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        for match in result.matches:
            expected_score = round(
                BASE_SCORE
                + (match.rating / 5.0) * 15.0
                + (min(match.experience, 20) / 20.0) * 10.0
            )
            assert match.score == expected_score


class TestScoreOrdering:
    def test_matches_are_sorted_by_score_descending(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
            city="Istanbul",
        )

        result = match_doctors(patient, sample_doctors)
        scores = [match.score for match in result.matches]

        assert scores == sorted(scores, reverse=True)
        assert result.matches[0].id == 1
        assert result.matches[0].score > result.matches[-1].score


class TestEmptyResults:
    def test_returns_empty_list_when_no_doctor_matches(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Neurology",
            language="Turkish",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        assert result.matches == []

    def test_returns_empty_list_when_budget_is_zero(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest.model_construct(
            specialty="Cardiology",
            language="Turkish",
            budget=0,
        )

        result = match_doctors(patient, sample_doctors)

        assert result.matches == []


class TestMatcherService:
    def test_load_doctors_reads_from_database(
        self,
        matcher_service: MatcherService,
        sample_doctors: list[dict],
    ) -> None:
        doctors = matcher_service.load_doctors()

        assert len(doctors) == len(sample_doctors)
        assert doctors[0]["name"] == sample_doctors[0]["name"]

    def test_match_orchestrates_load_and_filter(
        self,
        matcher_service: MatcherService,
    ) -> None:
        patient = PatientRequest(
            specialty="Dermatology",
            language="Turkish",
            budget=2000,
        )

        result = matcher_service.match(patient)

        assert len(result.doctors) == 1
        assert result.doctors[0].specialty == "Dermatology"
        assert len(result.clinics) == 1
        assert result.clinics[0].name == "Skin Care Istanbul"

    def test_load_doctors_skips_inactive_rows(
        self,
        session_factory: Callable[[], Session],
    ) -> None:
        session = session_factory()
        try:
            inactive = DoctorDB(
                id=99,
                full_name="Dr. Inactive",
                specialty="Cardiology",
                city="İstanbul",
                languages=["Turkish"],
                price=1000,
                rating=4.0,
                experience=5,
                is_active=False,
                created_at=datetime.now(timezone.utc),
            )
            session.add(inactive)
            session.commit()
        finally:
            session.close()

        service = MatcherService(session_factory=session_factory)
        doctors = service.load_doctors()

        assert all(doctor["id"] != 99 for doctor in doctors)

    def test_load_doctors_logs_warning_for_missing_required_field(
        self,
        session_factory: Callable[[], Session],
        caplog: pytest.LogCaptureFixture,
    ) -> None:
        session = session_factory()
        try:
            incomplete = DoctorDB(
                id=98,
                full_name="Dr. Incomplete",
                specialty="Cardiology",
                city="İstanbul",
                languages=["Turkish"],
                price=None,
                rating=4.0,
                experience=5,
                is_active=True,
                created_at=datetime.now(timezone.utc),
            )
            session.add(incomplete)
            session.commit()

            with caplog.at_level(logging.WARNING, logger="app.services.matcher"):
                doctors = _load_doctors(session)
        finally:
            session.close()

        assert all(doctor["id"] != 98 for doctor in doctors)
        assert any(
            record.message == "Doctor id=98 excluded from matching: missing field 'price'"
            for record in caplog.records
        )

    def test_match_loads_doctors_once(
        self,
        matcher_service: MatcherService,
    ) -> None:
        from unittest.mock import patch

        from app.services import matcher as matcher_module

        patient = PatientRequest(
            specialty="Dermatology",
            language="Turkish",
            budget=2000,
        )

        with patch.object(
            matcher_module,
            "_load_doctors",
            wraps=matcher_module._load_doctors,
        ) as load_doctors_spy:
            result = matcher_service.match(patient)

        assert load_doctors_spy.call_count == 1
        assert len(result.doctors) == 1
        assert len(result.clinics) == 1


class TestPatientRequestValidation:
    def test_empty_specialty_is_rejected(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(specialty="", language="Turkish", budget=1000)

    def test_empty_language_is_rejected(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(specialty="Cardiology", language="", budget=1000)

    def test_negative_budget_is_rejected(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(specialty="Cardiology", language="Turkish", budget=-1)

    def test_city_is_optional(self) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=1000,
        )

        assert patient.city is None


class TestResultLimits:
    def test_max_doctors_returns_top_scored_matches(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
            max_doctors=2,
        )

        result = match_doctors(patient, sample_doctors)

        assert len(result.matches) == 2
        scores = [match.score for match in result.matches]
        assert scores == sorted(scores, reverse=True)

        unlimited = match_doctors(
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=5000,
            ),
            sample_doctors,
        )
        assert len(unlimited.matches) == 3
        assert {match.id for match in result.matches}.issubset(
            {match.id for match in unlimited.matches}
        )
        assert result.matches[0].id == unlimited.matches[0].id

    def test_omitted_max_doctors_returns_all_matches(
        self,
        sample_doctors: list[dict],
    ) -> None:
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=5000,
        )

        result = match_doctors(patient, sample_doctors)

        assert len(result.matches) == 3

    def test_max_doctors_rejects_zero(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=1000,
                max_doctors=0,
            )

    def test_max_doctors_rejects_negative_value(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=1000,
                max_doctors=-1,
            )

    def test_max_doctors_via_api_returns_limited_results(
        self,
        client: TestClient,
    ) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 5000,
                "max_doctors": 2,
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert len(body["doctors"]) == 2
        assert len(body["clinics"]) == 2

    def test_max_doctors_zero_via_api_returns_422(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 1000,
                "max_doctors": 0,
            },
        )

        assert response.status_code == 422

    def test_max_clinics_rejects_zero(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=1000,
                max_clinics=0,
            )

    def test_max_clinics_rejects_negative_value(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=1000,
                max_clinics=-1,
            )

    def test_max_clinics_via_api_returns_limited_results(
        self,
        client: TestClient,
    ) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 5000,
                "max_clinics": 1,
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert len(body["clinics"]) == 1
        assert len(body["doctors"]) == 3

    def test_max_clinics_zero_via_api_returns_422(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 1000,
                "max_clinics": 0,
            },
        )

        assert response.status_code == 422

    def test_max_clinics_rejects_zero(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=1000,
                max_clinics=0,
            )

    def test_max_clinics_rejects_negative_value(self) -> None:
        with pytest.raises(ValidationError):
            PatientRequest(
                specialty="Cardiology",
                language="Turkish",
                budget=1000,
                max_clinics=-1,
            )

    def test_max_clinics_via_api_returns_limited_results(
        self,
        client: TestClient,
    ) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 5000,
                "max_clinics": 1,
            },
        )

        assert response.status_code == 200
        body = response.json()
        assert len(body["clinics"]) == 1
        assert len(body["doctors"]) == 3

    def test_max_clinics_zero_via_api_returns_422(self, client: TestClient) -> None:
        response = client.post(
            "/match",
            json={
                "specialty": "Cardiology",
                "language": "Turkish",
                "budget": 1000,
                "max_clinics": 0,
            },
        )

        assert response.status_code == 422
