from unittest.mock import MagicMock, patch

import httpx
import pytest

from app.schemas.match import MatchRequest, MatchResponse
from app.services.ai_client import AIServiceError, call_match


SAMPLE_MATCH_RESPONSE = {
    "doctors": [
        {
            "id": 1,
            "name": "Dr. Ali Yılmaz",
            "specialty": "Cardiology",
            "city": "Istanbul",
            "languages": ["Turkish", "English"],
            "price": 1500,
            "rating": 4.8,
            "experience": 12,
            "score": 92.0,
        }
    ],
    "clinics": [
        {
            "id": 1,
            "name": "MediQueue Clinic",
            "description": "International patient clinic",
            "address": "Istanbul",
            "phone": "+90 555 000 00 00",
            "score": 88.0,
        }
    ],
    "message": None,
}


def _mock_http_client(response: MagicMock) -> MagicMock:
    client = MagicMock()
    client.__enter__.return_value = client
    client.__exit__.return_value = None
    client.post.return_value = response
    return client


class TestAIClient:
    @patch("app.services.ai_client.httpx.Client")
    def test_call_match_success(self, mock_client_cls: MagicMock) -> None:
        response = MagicMock()
        response.status_code = 200
        response.json.return_value = SAMPLE_MATCH_RESPONSE
        mock_client_cls.return_value = _mock_http_client(response)

        result = call_match(
            MatchRequest(specialty="Cardiology", language="Turkish", budget=5000)
        )

        assert isinstance(result, MatchResponse)
        assert len(result.doctors) == 1
        assert result.doctors[0].name == "Dr. Ali Yılmaz"
        assert len(result.clinics) == 1
        assert result.clinics[0].name == "MediQueue Clinic"
        assert result.message is None

    @patch("app.services.ai_client.httpx.Client")
    def test_call_match_timeout(self, mock_client_cls: MagicMock) -> None:
        client = MagicMock()
        client.__enter__.return_value = client
        client.__exit__.return_value = None
        client.post.side_effect = httpx.TimeoutException("timed out")
        mock_client_cls.return_value = client

        with pytest.raises(AIServiceError) as exc_info:
            call_match(
                MatchRequest(specialty="Cardiology", language="Turkish", budget=5000)
            )

        assert exc_info.value.status_code == 504

    @patch("app.services.ai_client.httpx.Client")
    def test_call_match_connection_error(self, mock_client_cls: MagicMock) -> None:
        client = MagicMock()
        client.__enter__.return_value = client
        client.__exit__.return_value = None
        client.post.side_effect = httpx.ConnectError("connection refused")
        mock_client_cls.return_value = client

        with pytest.raises(AIServiceError) as exc_info:
            call_match(
                MatchRequest(specialty="Cardiology", language="Turkish", budget=5000)
            )

        assert exc_info.value.status_code == 503

    @patch("app.services.ai_client.httpx.Client")
    def test_call_match_non_200_response(self, mock_client_cls: MagicMock) -> None:
        response = MagicMock()
        response.status_code = 422
        response.json.return_value = {"detail": "validation failed"}
        response.text = '{"detail":"validation failed"}'
        mock_client_cls.return_value = _mock_http_client(response)

        with pytest.raises(AIServiceError) as exc_info:
            call_match(
                MatchRequest(specialty="Cardiology", language="Turkish", budget=5000)
            )

        assert exc_info.value.status_code == 502
        assert "validation failed" in exc_info.value.message

    @patch("app.services.ai_client.httpx.Client")
    def test_call_match_invalid_json(self, mock_client_cls: MagicMock) -> None:
        response = MagicMock()
        response.status_code = 200
        response.json.side_effect = ValueError("invalid json")
        mock_client_cls.return_value = _mock_http_client(response)

        with pytest.raises(AIServiceError) as exc_info:
            call_match(
                MatchRequest(specialty="Cardiology", language="Turkish", budget=5000)
            )

        assert "invalid JSON" in exc_info.value.message
