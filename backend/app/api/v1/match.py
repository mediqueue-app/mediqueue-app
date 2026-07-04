from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.match import MatchRequest, MatchResponse
from app.services.ai_client import AIServiceError, call_match


router = APIRouter(prefix="/match", tags=["matching"])


@router.post("", response_model=MatchResponse)
def match_doctors(
    match_in: MatchRequest,
    _current_user: User = Depends(get_current_user),
) -> MatchResponse:
    """Proxy patient matching preferences to the AI service.

    Authentication is required so anonymous clients cannot abuse the AI proxy.
    Any active authenticated user (default role: patient) may request matches.
    """
    try:
        return call_match(match_in)
    except AIServiceError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail=exc.message,
        ) from exc
