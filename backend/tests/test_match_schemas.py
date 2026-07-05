import pytest
from pydantic import ValidationError

from app.schemas.match import MatchClinic, MatchDoctor, MatchRequest, MatchResponse


class TestMatchRequestValidation:
    def test_accepts_valid_request(self) -> None:
        request = MatchRequest(
            specialty="Cardiology",
            language="Turkish",
            budget=3000,
            city="Istanbul",
        )

        assert request.specialty == "Cardiology"
        assert request.city == "Istanbul"

    def test_accepts_request_without_city(self) -> None:
        request = MatchRequest(
            specialty="Dermatology",
            language="English",
            budget=1500,
        )

        assert request.city is None

    def test_rejects_empty_specialty(self) -> None:
        with pytest.raises(ValidationError):
            MatchRequest(specialty="", language="Turkish", budget=1000)

    def test_rejects_non_positive_budget(self) -> None:
        with pytest.raises(ValidationError):
            MatchRequest(specialty="Cardiology", language="Turkish", budget=0)


class TestMatchResponseValidation:
    def test_accepts_doctors_clinics_and_null_message(self) -> None:
        response = MatchResponse(
            doctors=[
                MatchDoctor(
                    id=1,
                    name="Dr. Ali Yılmaz",
                    specialty="Cardiology",
                    city="Istanbul",
                    languages=["Turkish", "English"],
                    price=1500,
                    rating=4.8,
                    experience=12,
                    score=92.0,
                )
            ],
            clinics=[
                MatchClinic(
                    id=1,
                    name="MediQueue Clinic",
                    description="International patient clinic",
                    address="Istanbul",
                    phone="+90 555 000 00 00",
                    score=88.0,
                )
            ],
            message=None,
        )

        assert len(response.doctors) == 1
        assert len(response.clinics) == 1
        assert response.message is None

    def test_accepts_empty_lists_with_message(self) -> None:
        response = MatchResponse(
            doctors=[],
            clinics=[],
            message="No matching doctors or clinics found",
        )

        assert response.doctors == []
        assert response.clinics == []
        assert response.message == "No matching doctors or clinics found"
