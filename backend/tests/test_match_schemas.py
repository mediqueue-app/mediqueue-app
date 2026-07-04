import pytest
from pydantic import ValidationError

from app.schemas.match import MatchRequest


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
