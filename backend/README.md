# MediQueue Backend

FastAPI backend for authentication, clinics, and AI match proxying.

## Prerequisites

- PostgreSQL running locally (default database: `mediqueue`)
- Python 3.11+ recommended

Current Alembic head revision: **`202608030002`**

## Setup

1. Create a virtual environment and install dependencies:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Copy environment variables and adjust if needed:

```powershell
copy .env.example .env
```

Ensure `.env` includes:

```env
APP_ENV=development
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/mediqueue
MEDIQUEUE_AI_BASE_URL=http://localhost:8001
SECRET_KEY=replace-this-with-a-long-random-secret
ENCRYPTION_KEY=your-base64-fernet-key
```

Generate an encryption key once:

```powershell
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

3. Apply database migrations:

```powershell
alembic upgrade head
```

4. Seed reference data (order matters — doctors first, then clinics, then demo users):

```powershell
python -m scripts.seed_doctors_from_ai_json
python -m scripts.seed_clinics_from_ai_json
python -m scripts.seed_demo_users
```

Demo logins (password `Demo1234!`):

| Email | Role | Portal |
|-------|------|--------|
| `patient@mediqueue.com` | patient | web-patient `:3002` |
| `clinic@mediqueue.com` | clinic (`clinic_id` linked) | web-clinic `:3000` |
| `doctor@mediqueue.com` | doctor (`doctor_id` linked) | web-doctor `:3001` |
| `admin@mediqueue.com` | admin | web-admin `:3003` |

`scripts.seed_demo_users` is idempotent — safe to run again before demos.

**Doctor profile (Ay 1):** `GET /v1/doctors/{id}` is not required. Portals use `GET /v1/auth/me` (`doctor_id` / `clinic_id` on the user). Dedicated doctor GET can wait for Ay 2.

Verify login and relationships:

```powershell
$login = Invoke-RestMethod -Method Post `
  -Uri "http://127.0.0.1:8000/v1/auth/login" `
  -ContentType "application/x-www-form-urlencoded" `
  -Body "username=doctor@mediqueue.com&password=Demo1234!"

Invoke-RestMethod -Method Get `
  -Uri "http://127.0.0.1:8000/v1/auth/me" `
  -Headers @{ Authorization = "Bearer $($login.access_token)" }
```

Doctor login + appointments + `/v1/match` hit/empty (AI `:8001` ayaktayken):

```powershell
python -m scripts.smoke_ay1_doctor_match
```

Full Ay 1 E2E (patient book → clinic confirm → doctor sees):

```powershell
python -m scripts.smoke_ay1_e2e
```

Ay 2 doctor negatives + availability persist (AI optional):

```powershell
python -m scripts.smoke_ay2_doctor_negatives
```

Book against the seeded demo clinic (`clinic@` → `clinic_id`), not necessarily `GET /clinics` first item (list is name-ordered).

## Run services

Start the AI service on port **8001**:

```powershell
cd ai
uvicorn app.main:app --port 8001 --reload
```

Start the backend on port **8000**:

```powershell
cd backend
uvicorn app.main:app --port 8000 --reload
```

## API docs

- Swagger UI: http://localhost:8000/docs
- Health check: http://localhost:8000/

## Match endpoint

`POST /v1/match` requires a Bearer JWT (register/login first). The backend proxies the AI service and returns:

```json
{
  "doctors": [...],
  "clinics": [...],
  "message": null
}
```

### Doctor name fields

| Context | JSON field | Notes |
|---------|------------|-------|
| Backend DB / doctor APIs (`DoctorRead`, clinic doctors list) | `full_name` | Canonical backend entity field |
| AI `doctors.json` (seed input) | `name` | Mapped to `full_name` by `seed_doctors_from_ai_json` |
| Match API (`POST /v1/match` response) | `name` | Mirrors AI contract; not renamed to `full_name` |

Frontend code should use `full_name` for backend doctor resources and `name` inside match results.

## Reviews API

- `POST /v1/reviews` — patient role required; create a clinic **or** doctor review (not both)
- `GET /v1/clinics/{clinic_id}/reviews` — public listing with `skip` / `limit`
- `GET /v1/doctors/{doctor_id}/reviews` — public listing with `skip` / `limit`

Example create body:

```json
{
  "clinic_id": 1,
  "rating": 5,
  "comment": "Excellent experience"
}
```

`comment` is required and whitespace-only comments are rejected with `422`.

> Review sentiment fields (`sentiment_label`, `sentiment_score`, `ai_summary`) are Phase 2 and currently unused.

## Patients API

- `POST /v1/patients` — roles: `patient`, `clinic`, `admin`
  - `patient` upserts own profile (`user_id=current_user.id`)
  - `clinic` / `admin` can create manual lead (`user_id=null`) or attach existing `user_id`
- `GET /v1/patients/me` — role: `patient`
- `GET /v1/patients/me/appointments` — role: `patient`

Sensitive health history is encrypted with `ENCRYPTION_KEY` and never returned decrypted by API responses.

## Appointments API

- `POST /v1/appointments` — roles: `patient`, `clinic`, `admin`
  - Blocks duplicate active bookings (same patient/clinic/doctor/date)
  - Blocks doctor/date conflicts when `doctor_id` is set (date-level only)
- `PATCH /v1/appointments/{appointment_id}/status` — roles: `clinic`, `doctor`, `admin`, `patient`
  - Patients may only set `cancelled` on their own appointment
  - Invalid transitions return `409 Conflict`
- `POST /v1/appointments/{appointment_id}/cancel` — role: `patient` (own appointment only)
- `GET /v1/clinics/{clinic_id}/appointments` — roles: `clinic`, `admin`
- `GET /v1/doctors/{doctor_id}/appointments` — roles: `doctor`, `admin`

Status values:

- `pending`
- `confirmed`
- `alternative_date`
- `cancelled` (clinic “reject” currently maps here — no separate `rejected` status)
- `arrived`
- `completed`
- `no_show`

### Status transition matrix

| From | Allowed next |
|------|----------------|
| `pending` | `confirmed`, `alternative_date`, `cancelled` |
| `alternative_date` | `confirmed`, `cancelled` |
| `confirmed` | `arrived`, `cancelled`, `no_show` |
| `arrived` | `completed`, `no_show` |
| `completed` / `cancelled` / `no_show` | _(terminal)_ |

Active statuses for duplicate/conflict checks: `pending`, `confirmed`, `alternative_date`, `arrived`.

**Scheduling limitation:** conflict detection is date-level because appointments do not yet store time slots.

## Appointment messaging (patient ↔ clinic)

Messaging is scoped to a single appointment. Doctors cannot use these routes.

- `GET /v1/appointments/{appointment_id}/messages` — roles: `patient`, `clinic`, `admin`
- `POST /v1/appointments/{appointment_id}/messages` — roles: `patient`, `clinic`, `admin`

Ownership:

- Patient: JWT patient profile must own `appointment.patient_id`
- Clinic: JWT `clinic_id` must match `appointment.clinic_id`
- Sender identity/role always come from JWT (never from the request body)

Cancelled / completed / `no_show` appointments remain readable; new messages may still be sent for coordination.

Body rules: non-empty after trim, max 2000 characters.

## Tests

```powershell
cd backend
pytest -q
```

Focused suites:

```powershell
pytest -q tests/test_appointment_transitions.py tests/test_appointments_api.py
pytest -q tests/test_appointment_messages_api.py
```

Automated coverage includes auth, clinics, doctors, reviews, match, appointments (transitions/edge cases), messaging RBAC, clinic seed sync, admin RBAC, and config security checks.
Most unit/API tests mock DB engine interactions; real schema verification is covered by Alembic migration execution and optional CI smoke tests (`BACKEND_DB_SMOKE=1`).

## Smoke scripts

Prerequisites: Postgres migrated + seeded, backend on `:8000`.

```powershell
cd backend
python -m scripts.smoke_ay1_e2e
python -m scripts.smoke_ay2_messaging
```

Optional env overrides for messaging smoke:

| Variable | Default |
|----------|---------|
| `MEDIQUEUE_API_BASE` | `http://127.0.0.1:8000/v1` |
| `MEDIQUEUE_PASSWORD` | `Demo1234!` (local seed users) |
| `MEDIQUEUE_PATIENT_EMAIL` | `patient@mediqueue.com` |
| `MEDIQUEUE_CLINIC_EMAIL` | `clinic@mediqueue.com` |
| `MEDIQUEUE_DOCTOR_EMAIL` | `doctor@mediqueue.com` |

## Staging (Docker)

See [STAGING.md](STAGING.md) for Compose + migration + seed runbook.

## Troubleshooting Alembic

### Error: `Can't locate revision identified by '202607050001'`

This means the database `alembic_version` table references a revision that is **not** in this repository. The repo head is `202608030002` — do not create a fake `202607050001` migration.

**Option A — stamp to the repo head (keep existing data if schema already matches):**

```powershell
cd backend
alembic stamp 202608030002
alembic upgrade head
```

**Option B — clean dev database reset (destructive, local dev only):**

```powershell
# In psql or pgAdmin, drop and recreate the database, then:
cd backend
alembic upgrade head
python -m scripts.seed_doctors_from_ai_json
python -m scripts.seed_clinics_from_ai_json
```

Verify current revision:

```powershell
alembic current
alembic history
```

## Smoke test (end-to-end)

Prerequisites:

1. PostgreSQL running
2. `alembic upgrade head`
3. `python -m scripts.seed_doctors_from_ai_json`
4. `python -m scripts.seed_clinics_from_ai_json`
5. AI service on `http://localhost:8001`
6. Backend on `http://localhost:8000`

### 1. Register

```powershell
$registerBody = @{
    email = "patient@example.com"
    password = "Password123"
    full_name = "Test Patient"
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/v1/auth/register" `
    -ContentType "application/json" `
    -Body $registerBody
```

### 2. Login and store JWT

```powershell
$loginResponse = Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/v1/auth/login" `
    -ContentType "application/x-www-form-urlencoded" `
    -Body "username=patient@example.com&password=Password123"

$token = $loginResponse.access_token
```

### 3. POST /v1/match

```powershell
$matchBody = @{
    specialty = "Cardiology"
    language = "Turkish"
    budget = 5000
    city = "Istanbul"
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/v1/match" `
    -ContentType "application/json" `
    -Headers @{ Authorization = "Bearer $token" } `
    -Body $matchBody
```

Expected response shape:

```json
{
  "doctors": [...],
  "clinics": [...],
  "message": null
}
```

If no doctors or clinics match, both arrays may be empty and `message` may contain a human-readable explanation.

### 4. Optional — admin-only endpoint

Promote a user to `admin` in the database, log in again, then:

```powershell
Invoke-RestMethod -Method Get `
    -Uri "http://localhost:8000/v1/admin/summary" `
    -Headers @{ Authorization = "Bearer $adminToken" }
```

Non-admin users should receive `403 Forbidden`.

## Production notes

- Set `APP_ENV=production` or `APP_ENV=staging` and provide a strong `SECRET_KEY` and `ENCRYPTION_KEY`.
- Startup fails in protected environments when `SECRET_KEY` is missing/unsafe or `ENCRYPTION_KEY` is missing.
- Backend specialty aliases intentionally mirror AI-service aliases. If AI aliases change, update backend alias mappings too.
- This service is a medical-tourism matching MVP backend, not a hospital EHR/EMR system.
