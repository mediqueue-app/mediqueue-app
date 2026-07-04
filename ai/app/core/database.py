"""SQLAlchemy engine and session factory for the shared MediQueue PostgreSQL database."""

from collections.abc import Callable, Generator
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import DATABASE_URL


@lru_cache
def get_engine():
    return create_engine(DATABASE_URL, pool_pre_ping=True)


@lru_cache
def get_session_factory() -> Callable[[], Session]:
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())


def get_db_session() -> Generator[Session, None, None]:
    session = get_session_factory()()
    try:
        yield session
    finally:
        session.close()
