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

The API container runs `alembic upgrade head` on boot. For the full portal stack (clinic/doctor/patient/admin/marketing + AI), use the compose file at the repository root instead.

## Migrate and seed

Compose mounts `../ai` at `/ai` so seed scripts can read `ai/app/data/*.json`.

```powershell
docker compose run --rm api alembic upgrade head
docker compose run --rm api python -m scripts.seed_doctors_from_ai_json
docker compose run --rm api python -m scripts.seed_clinics_from_ai_json
docker compose run --rm api python -m scripts.seed_demo_users
```

## Health checks

- `GET http://localhost:8000/` → process liveness, no DB dependency: `{"status":"ok",...}`
- `GET http://localhost:8000/health` → DB-aware readiness (runs `SELECT 1`):
  `{"status":"ok","database":"ok",...}` on success (200), or
  `{"status":"error","database":"error",...}` on DB failure (503).

## Seed safety

- `APP_ENV=production` with `SEED_ON_START=true` is a **hard error**: the
  entrypoint exits before `uvicorn` starts. Production must never silently
  seed.
- `APP_ENV=staging` with `SEED_ON_START=true` is allowed for the **initial**
  staging boot only, and prints a warning to stderr on every boot while set.
  After the first intended staging seed, set `SEED_ON_START=false` in the
  staging environment and redeploy/restart the API container.
- Local development may keep `SEED_ON_START=true` as the Compose default.

## Notes

- API runs as non-root (`appuser`) on port 8000 with production-style Uvicorn (no reload).
- Postgres must be healthy before the API container starts.
- Do not use wildcard CORS with credentials.
- This is best-effort staging prep — not Kubernetes/Terraform/cloud IaC.
