import logging

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.account import AccountErasureRead
from app.services.account_erasure import (
    AccountErasureNotAllowed,
    erase_own_account,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/account", tags=["account"])


def _client_ip(request: Request) -> str | None:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()[:64]
    if request.client is not None:
        return request.client.host
    return None


@router.post("/erasure", response_model=AccountErasureRead)
def erase_own_account_endpoint(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AccountErasureRead:
    """KVKK right-to-erasure. No reason is collected. Irreversible."""
    try:
        result = erase_own_account(
            db,
            user=current_user,
            ip_address=_client_ip(request),
        )
    except AccountErasureNotAllowed as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=str(exc),
        ) from exc

    logger.info(
        "account_erasure user_id=%s role=%s cancelled=%s messages=%s",
        current_user.id,
        current_user.role,
        result.cancelled_appointments,
        result.redacted_messages,
    )
    return AccountErasureRead(
        status="erased",
        erased_at=result.erased_at,
        cancelled_appointments=result.cancelled_appointments,
        redacted_messages=result.redacted_messages,
    )
