from collections.abc import Callable, Iterable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.crud.users import get_user_by_id
from app.db.session import get_db
from app.models.user import User, UserRole


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/auth/login")


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        subject = payload.get("sub")
        if subject is None:
            raise credentials_exception
        user_id = int(subject)
    except (JWTError, ValueError):
        raise credentials_exception from None

    user = get_user_by_id(db, user_id=user_id)
    if user is None or not user.is_active or user.deleted_at is not None:
        raise credentials_exception

    return user


def require_roles(allowed_roles: Iterable[UserRole | str]) -> Callable[[User], User]:
    allowed_role_values = {
        role.value if isinstance(role, UserRole) else role
        for role in allowed_roles
    }

    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_role_values:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )

        return current_user

    return role_checker
