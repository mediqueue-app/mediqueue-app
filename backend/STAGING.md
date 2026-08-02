# Staging runbook (backend)

Minimal Docker-based staging preparation for the MediQueue API.

## Prerequisites

- Docker + Docker Compose
- Strong `SECRET_KEY` and Fernet `ENCRYPTION_KEY` (never commit them)

## Environment

Copy and edit:

```powershell
cd backend
copy .env.example .env
```

Required for `APP_ENV=staging`:

| Variable | Notes |
|----------|--------|
| `APP_ENV` | `staging` |
| `SECRET_KEY` | Non-default, long random string |
| `ENCRYPTION_KEY` | `python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"` |
| `DATABASE_URL` | Defaults to `postgresql+psycopg2://postgres:postgres@db:5432/mediqueue` in Compose |
| `BACKEND_CORS_ORIGINS` | Comma-separated staging portal origins (no `*`) |

## Start stack

```powershell
cd backend
docker compose up --build -d
```

## Migrate and seed

Compose mounts `../ai` at `/ai` so seed scripts can read `ai/app/data/*.json`.

```powershell
docker compose run --rm api alembic upgrade head
docker compose run --rm api python -m scripts.seed_doctors_from_ai_json
docker compose run --rm api python -m scripts.seed_clinics_from_ai_json
docker compose run --rm api python -m scripts.seed_demo_users
```

## Health checks

- `GET http://localhost:8000/health` → `{"status":"ok",...}`
- `GET http://localhost:8000/` → same shape

## Smoke scripts (host against published port)

```powershell
$env:MEDIQUEUE_API_BASE = "http://127.0.0.1:8000/v1"
python -m scripts.smoke_ay1_e2e
python -m scripts.smoke_ay2_messaging
```

## Notes

- API runs as non-root (`appuser`) on port 8000 with production-style Uvicorn (no reload).
- Postgres must be healthy before the API container starts.
- Do not use wildcard CORS with credentials.
- This is best-effort staging prep — not Kubernetes/Terraform/cloud IaC.
