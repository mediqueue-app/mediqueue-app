"""Focused tests for demo doctor↔clinic link idempotency in seed_demo_users."""

from types import SimpleNamespace
from unittest.mock import MagicMock

from app.models.doctor_clinic import DoctorClinic
from scripts.seed_demo_users import _ensure_demo_doctor_clinic_link


class TestEnsureDemoDoctorClinicLink:
    def test_inserts_when_missing(self) -> None:
        db = MagicMock()
        db.scalar.return_value = None

        action = _ensure_demo_doctor_clinic_link(db, doctor_id=7, clinic_id=3)

        assert action == "inserted"
        assert db.add.call_count == 1
        link = db.add.call_args.args[0]
        assert isinstance(link, DoctorClinic)
        assert link.doctor_id == 7
        assert link.clinic_id == 3
        assert link.is_active is True
        db.flush.assert_called_once()

    def test_second_execution_skips_existing(self) -> None:
        existing = SimpleNamespace(
            doctor_id=7,
            clinic_id=3,
            is_active=True,
        )
        db = MagicMock()
        db.scalar.return_value = existing

        action = _ensure_demo_doctor_clinic_link(db, doctor_id=7, clinic_id=3)

        assert action == "already_exists"
        db.add.assert_not_called()

    def test_reactivates_inactive_without_duplicate(self) -> None:
        existing = SimpleNamespace(
            doctor_id=7,
            clinic_id=3,
            is_active=False,
        )
        db = MagicMock()
        db.scalar.return_value = existing

        action = _ensure_demo_doctor_clinic_link(db, doctor_id=7, clinic_id=3)

        assert action == "already_exists"
        assert existing.is_active is True
        db.add.assert_not_called()
        db.flush.assert_called_once()
