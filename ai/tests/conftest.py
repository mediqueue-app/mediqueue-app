"""Shared pytest fixtures for the MediQueue AI test suite."""

from collections.abc import Callable, Generator
from datetime import datetime, timezone
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.dependencies import get_matcher_service
from app.main import app
from app.models.clinic_db import ClinicDB
from app.models.doctor_clinic_db import DoctorClinicDB
from app.models.doctor_db import Base, DoctorDB
from app.services.matcher import DoctorRecord, MatcherService


def _record_to_doctor_db(record: DoctorRecord) -> DoctorDB:
    return DoctorDB(
        id=record["id"],
        full_name=record["name"],
        specialty=record["specialty"],
        city=record["city"],
        languages=record["languages"],
        price=record["price"],
        rating=record["rating"],
        experience=record["experience"],
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )


def _seed_clinics(session: Session) -> None:
    now = datetime.now(timezone.utc)
    clinics = [
        ClinicDB(
            id=1,
            name="Istanbul Heart Center",
            description="Cardiology and internal medicine",
            address="Nişantaşı, İstanbul",
            phone="+90 212 555 0101",
            is_active=True,
            created_at=now,
            updated_at=now,
        ),
        ClinicDB(
            id=2,
            name="Ankara Medical Group",
            description="Multi-specialty clinic",
            address="Çankaya, Ankara",
            phone="+90 312 555 0202",
            is_active=True,
            created_at=now,
            updated_at=now,
        ),
        ClinicDB(
            id=3,
            name="Skin Care Istanbul",
            description="Dermatology clinic",
            address="Kadıköy, İstanbul",
            phone="+90 216 555 0303",
            is_active=True,
            created_at=now,
            updated_at=now,
        ),
    ]
    links = [
        DoctorClinicDB(id=1, doctor_id=1, clinic_id=1, is_active=True, created_at=now),
        DoctorClinicDB(id=2, doctor_id=5, clinic_id=1, is_active=True, created_at=now),
        DoctorClinicDB(id=3, doctor_id=2, clinic_id=2, is_active=True, created_at=now),
        DoctorClinicDB(id=4, doctor_id=3, clinic_id=3, is_active=True, created_at=now),
    ]
    session.add_all(clinics)
    session.add_all(links)


@pytest.fixture
def sample_doctors() -> list[DoctorRecord]:
    return [
        {
            "id": 1,
            "name": "Dr. Ayşe Yılmaz",
            "specialty": "Cardiology",
            "city": "İstanbul",
            "languages": ["Turkish", "English"],
            "price": 2000,
            "rating": 4.9,
            "experience": 18,
        },
        {
            "id": 2,
            "name": "Dr. Mehmet Kaya",
            "specialty": "Cardiology",
            "city": "Ankara",
            "languages": ["Turkish"],
            "price": 1500,
            "rating": 4.5,
            "experience": 10,
        },
        {
            "id": 3,
            "name": "Dr. Elif Demir",
            "specialty": "Dermatology",
            "city": "İstanbul",
            "languages": ["Turkish"],
            "price": 1000,
            "rating": 4.0,
            "experience": 5,
        },
        {
            "id": 4,
            "name": "Dr. Hans Müller",
            "specialty": "Cardiology",
            "city": "İstanbul",
            "languages": ["German"],
            "price": 1200,
            "rating": 4.8,
            "experience": 15,
        },
        {
            "id": 5,
            "name": "Dr. Zeynep Arslan",
            "specialty": "Cardiology",
            "city": "İstanbul",
            "languages": ["Turkish"],
            "price": 2500,
            "rating": 4.6,
            "experience": 11,
        },
    ]


@pytest.fixture
def medical_tourism_doctors() -> list[DoctorRecord]:
    return [
        {
            "id": 101,
            "name": "Dr. Mehmet Yılmaz",
            "specialty": "hair transplant",
            "city": "İstanbul",
            "languages": ["Turkish", "English", "Arabic"],
            "price": 4500,
            "rating": 4.9,
            "experience": 12,
        },
        {
            "id": 102,
            "name": "Dr. Ayşe Kara",
            "specialty": "aesthetic surgery",
            "city": "Ankara",
            "languages": ["Turkish", "English"],
            "price": 3800,
            "rating": 4.7,
            "experience": 10,
        },
        {
            "id": 103,
            "name": "Dr. Can Öz",
            "specialty": "eye surgery",
            "city": "İzmir",
            "languages": ["Turkish", "English", "German"],
            "price": 3200,
            "rating": 4.8,
            "experience": 14,
        },
        {
            "id": 104,
            "name": "Dr. Selin Ak",
            "specialty": "obesity surgery",
            "city": "Antalya",
            "languages": ["Turkish", "English"],
            "price": 5500,
            "rating": 4.6,
            "experience": 9,
        },
    ]


@pytest.fixture
def message_behavior_session_factory() -> Callable[[], Session]:
    """Isolated DB for POST /match message-field behavior tests."""
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    doctors: list[DoctorRecord] = [
        {
            "id": 201,
            "name": "Dr. Nur Ak",
            "specialty": "Neurology",
            "city": "İstanbul",
            "languages": ["Turkish"],
            "price": 2000,
            "rating": 4.5,
            "experience": 8,
        },
        {
            "id": 202,
            "name": "Dr. Kerem Saç",
            "specialty": "hair transplant",
            "city": "İstanbul",
            "languages": ["Turkish", "English"],
            "price": 8000,
            "rating": 4.8,
            "experience": 12,
        },
    ]
    now = datetime.now(timezone.utc)
    clinics = [
        ClinicDB(
            id=10,
            name="Istanbul Hair Center",
            description="Hair transplant clinic",
            address="Beşiktaş, İstanbul",
            phone="+90 212 555 1010",
            is_active=True,
            created_at=now,
            updated_at=now,
        ),
    ]
    links = [
        DoctorClinicDB(
            id=10,
            doctor_id=202,
            clinic_id=10,
            is_active=True,
            created_at=now,
        ),
    ]

    seed_session = factory()
    try:
        seed_session.add_all(_record_to_doctor_db(record) for record in doctors)
        seed_session.add_all(clinics)
        seed_session.add_all(links)
        seed_session.commit()
    finally:
        seed_session.close()

    return factory


@pytest.fixture
def message_behavior_client(
    message_behavior_session_factory: Callable[[], Session],
) -> Generator[TestClient, None, None]:
    matcher_service = MatcherService(session_factory=message_behavior_session_factory)
    app.dependency_overrides[get_matcher_service] = lambda: matcher_service
    get_matcher_service.cache_clear()
    with patch("app.main.get_matcher_service", return_value=matcher_service):
        with TestClient(app) as test_client:
            yield test_client
    app.dependency_overrides.pop(get_matcher_service, None)
    get_matcher_service.cache_clear()


@pytest.fixture
def session_factory(sample_doctors: list[DoctorRecord]) -> Callable[[], Session]:
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    factory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    seed_session = factory()
    try:
        seed_session.add_all(_record_to_doctor_db(record) for record in sample_doctors)
        _seed_clinics(seed_session)
        seed_session.commit()
    finally:
        seed_session.close()

    return factory


@pytest.fixture
def matcher_service(session_factory: Callable[[], Session]) -> MatcherService:
    return MatcherService(session_factory=session_factory)


@pytest.fixture
def client(matcher_service: MatcherService) -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_matcher_service] = lambda: matcher_service
    get_matcher_service.cache_clear()
    with patch("app.main.get_matcher_service", return_value=matcher_service):
        with TestClient(app) as test_client:
            yield test_client
    app.dependency_overrides.pop(get_matcher_service, None)
    get_matcher_service.cache_clear()
