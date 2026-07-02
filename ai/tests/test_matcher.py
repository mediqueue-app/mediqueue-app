import json
from pathlib import Path

import pytest
from pydantic import ValidationError

from app.models.schemas import PatientRequest
from app.services.matcher import (
    BASE_SCORE,
    CITY_MATCH_BONUS,
    MatcherService,
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
        patient = PatientRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=0,
        )

        result = match_doctors(patient, sample_doctors)

        assert result.matches == []


class TestMatcherService:
    def test_load_doctors_reads_json_file(
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

        assert len(result.matches) == 1
        assert result.matches[0].specialty == "Dermatology"

    def test_load_doctors_raises_for_missing_file(self, tmp_path: Path) -> None:
        service = MatcherService(doctors_path=tmp_path / "missing.json")

        with pytest.raises(FileNotFoundError):
            service.load_doctors()


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
