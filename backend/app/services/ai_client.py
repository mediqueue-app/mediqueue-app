"""HTTP client for the MediQueue AI microservice."""

from __future__ import annotations

import httpx

from app.core.config import settings
from app.schemas.match import MatchRequest, MatchResponse


class AIServiceError(Exception):
    """Raised when the AI service cannot return a valid match response."""

    def __init__(self, message: str, status_code: int = 502) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(message)


def _match_url() -> str:
    return f"{settings.MEDIQUEUE_AI_BASE_URL.rstrip('/')}/match"


def call_match(match_request: MatchRequest) -> MatchResponse:
    payload = match_request.model_dump(mode="json", exclude_none=True)

    try:
        with httpx.Client(timeout=settings.MEDIQUEUE_AI_TIMEOUT_SECONDS) as client:
            response = client.post(_match_url(), json=payload)
    except httpx.TimeoutException as exc:
        raise AIServiceError(
            "AI matching service timed out",
            status_code=504,
        ) from exc
    except httpx.RequestError as exc:
        raise AIServiceError(
            "AI matching service is unavailable",
            status_code=503,
        ) from exc

    if response.status_code != 200:
        detail = _extract_error_detail(response)
        raise AIServiceError(
            f"AI matching service returned an error: {detail}",
            status_code=502,
        )

    try:
        data = response.json()
    except ValueError as exc:
        raise AIServiceError(
            "AI matching service returned invalid JSON",
            status_code=502,
        ) from exc

    try:
        return MatchResponse.model_validate(data)
    except ValueError as exc:
        raise AIServiceError(
            "AI matching service returned an unexpected response shape",
            status_code=502,
        ) from exc


def _extract_error_detail(response: httpx.Response) -> str:
    try:
        body = response.json()
    except ValueError:
        return response.text or f"HTTP {response.status_code}"

    if isinstance(body, dict) and "detail" in body:
        detail = body["detail"]
        if isinstance(detail, str):
            return detail
        return str(detail)

    return response.text or f"HTTP {response.status_code}"
