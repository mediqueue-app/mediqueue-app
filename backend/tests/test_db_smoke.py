import os
from urllib.parse import urlparse

import psycopg2
import pytest


pytestmark = pytest.mark.skipif(
    os.getenv("BACKEND_DB_SMOKE") != "1",
    reason="Real DB smoke tests are enabled only in CI",
)


def _connect():
    database_url = os.getenv("DATABASE_URL", "")
    if not database_url:
        pytest.skip("DATABASE_URL is not set")

    parsed = urlparse(database_url.replace("+psycopg2", ""))
    return psycopg2.connect(
        dbname=parsed.path.lstrip("/"),
        user=parsed.username,
        password=parsed.password,
        host=parsed.hostname,
        port=parsed.port or 5432,
    )


def test_alembic_head_applied() -> None:
    with _connect() as conn, conn.cursor() as cur:
        cur.execute("SELECT version_num FROM alembic_version")
        version = cur.fetchone()
        assert version is not None
        assert version[0] == "202608030002"


def test_new_tables_exist() -> None:
    with _connect() as conn, conn.cursor() as cur:
        cur.execute(
            """
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name IN ('patients', 'appointments')
            ORDER BY table_name
            """
        )
        tables = [row[0] for row in cur.fetchall()]
        assert tables == ["appointments", "patients"]
