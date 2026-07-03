"""Shared pytest fixtures for the MediQueue AI test suite."""

import json
from collections.abc import Generator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.matcher import DoctorRecord, MatcherService


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
def doctors_file(tmp_path: Path, sample_doctors: list[DoctorRecord]) -> Path:
    file_path = tmp_path / "doctors.json"
    file_path.write_text(json.dumps(sample_doctors, ensure_ascii=False), encoding="utf-8")
    return file_path


@pytest.fixture
def matcher_service(doctors_file: Path) -> MatcherService:
    return MatcherService(doctors_path=doctors_file)


@pytest.fixture
def client(matcher_service: MatcherService, monkeypatch: pytest.MonkeyPatch) -> Generator[TestClient, None, None]:
    monkeypatch.setattr("app.api.routes.matcher_service", matcher_service)
    with TestClient(app) as test_client:
        yield test_client
