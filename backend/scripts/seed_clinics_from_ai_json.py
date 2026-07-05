"""Seed backend clinics and doctor_clinics from ai/app/data/clinics.json.

Run from the backend directory:

    py -m scripts.seed_clinics_from_ai_json

Requires:
- PostgreSQL running and DATABASE_URL configured in .env
- Alembic migrations applied through 202607040003 (clinics + doctor_clinics)
- Doctors seeded first (py -m scripts.seed_doctors_from_ai_json)
"""

from __future__ import annotations

import sys

from sqlalchemy.exc import SQLAlchemyError

from app.db.session import SessionLocal
from app.services.clinic_sync import (
    default_clinics_json_path,
    sync_clinics_from_json_file,
)


def main() -> int:
    json_path = default_clinics_json_path()
    if json_path.is_file():
        print(f"Using clinics JSON: {json_path}")
    else:
        print(f"Clinics JSON not found at {json_path}; using built-in fallback sample.")

    db = SessionLocal()
    try:
        summary = sync_clinics_from_json_file(db, json_path=json_path)
        db.commit()
    except SQLAlchemyError as exc:
        db.rollback()
        print(f"ERROR: Database operation failed: {exc.__class__.__name__}")
        return 1
    except ValueError as exc:
        db.rollback()
        print(f"ERROR: {exc}")
        return 1
    finally:
        db.close()

    print("Clinic sync complete.")
    print(f"  Total processed:   {summary.total_clinics_processed}")
    print(f"  Clinics inserted:  {summary.clinics_inserted}")
    print(f"  Clinics updated:   {summary.clinics_updated}")
    print(f"  Clinics skipped:   {summary.clinics_skipped}")
    print(f"  Relations inserted:{summary.relations_inserted}")
    print(f"  Relations skipped: {summary.relations_skipped}")

    if summary.errors:
        print("Warnings/errors:")
        for error in summary.errors:
            print(f"  - {error}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
