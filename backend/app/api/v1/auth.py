from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.rate_limit import SlidingWindowRateLimiter, client_identity
from app.core.security import create_access_token
from app.crud.users import authenticate_user, create_user, get_user_by_email
from app.db.session import get_db
from app.models.user import User
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserRead


router = APIRouter(prefix="/auth", tags=["auth"])

# M1 fixed limits — process-local sliding window, no Redis (see app/core/rate_limit.py).
LOGIN_RATE_LIMIT = SlidingWindowRateLimiter(max_attempts=10, window_seconds=60.0)
REGISTER_RATE_LIMIT = SlidingWindowRateLimiter(max_attempts=8, window_seconds=60.0)


def _rate_limit_key(request: Request, email: str) -> str:
    return f"{client_identity(request)}:{email.strip().lower()}"


def _enforce_rate_limit(
    limiter: SlidingWindowRateLimiter, request: Request, email: str
) -> None:
    retry_after = limiter.check(_rate_limit_key(request, email))
    if retry_after is not None:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many attempts. Please try again later.",
            headers={"Retry-After": str(int(retry_after) + 1)},
        )


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(
    request: Request, user_in: UserCreate, db: Session = Depends(get_db)
) -> User:
    _enforce_rate_limit(REGISTER_RATE_LIMIT, request, user_in.email)

    existing_user = get_user_by_email(db, user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    return create_user(db, user_in)


@router.post("/login", response_model=Token)
def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> Token:
    _enforce_rate_limit(LOGIN_RATE_LIMIT, request, form_data.username)

    user = authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user or not user.is_active or user.deleted_at is not None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.id)
    return Token(access_token=access_token)


@router.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user
