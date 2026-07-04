"""Seed backend doctors from ai/app/data/doctors.json.

Run from the backend directory:

    py -m scripts.seed_doctors_from_ai_json

Requires:
- PostgreSQL running and DATABASE_URL configured in .env
- Alembic migrations applied through 202607040007
"""

from __future__ import annotations

import sys

from sqlalchemy.exc import SQLAlchemyError

from app.db.session import SessionLocal
from app.services.doctor_sync import default_doctors_json_path, sync_doctors_from_json_file


def main() -> int:
    json_path = default_doctors_json_path()
    print(f"Using doctors JSON: {json_path}")

    db = SessionLocal()
    try:
        summary = sync_doctors_from_json_file(db, json_path=json_path)
        db.commit()
    except FileNotFoundError as exc:
        print(f"ERROR: {exc}")
        return 1
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

    print("Doctor sync complete.")
    print(f"  Total processed: {summary.total_processed}")
    print(f"  Inserted:        {summary.inserted}")
    print(f"  Updated:         {summary.updated}")
    print(f"  Skipped:         {summary.skipped}")

    if summary.errors:
        print("Warnings/errors:")
        for error in summary.errors:
            print(f"  - {error}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
