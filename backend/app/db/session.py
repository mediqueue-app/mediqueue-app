from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings


_connect_args: dict[str, object] = {}
if settings.DATABASE_URL.startswith("postgresql"):
    _connect_args["connect_timeout"] = 10

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_timeout=30,
    connect_args=_connect_args,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
