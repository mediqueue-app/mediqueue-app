# MediQueue

Sağlık turizmi için klinik, doktor ve hasta panelleri. Monorepo: FastAPI, kural tabanlı AI eşleştirme, beş Next.js uygulaması.

## GitHub’da ne var

Yalnızca stack’i ayağa kaldırmak, geliştirmek ve CI çalıştırmak için gerekenler.

| Var | Yok (yerel `.local/`, gitignored) |
|-----|-------------------------------------|
| `backend/`, `ai/`, `web-*`, `mobile/` (placeholder) | Milestone promptları, kapanış raporları |
| `docker-compose.yml`, `docker/`, `Dockerfile` / `.dockerignore` | LinkedIn lansman PNG/HTML |
| `.env.example`, testler, `.github/workflows` | Kurucu iş modeli PDF/MD |
| Paket README’leri, `ai/docs/API.md` | Flutter backlog, tema/audit, lansman, milestone |

`.env` commit edilmez. Kökte `copy .env.example .env`.

## Yapı

```
backend/          FastAPI + Postgres  :8000
ai/               Eşleştirme (kural)  :8001
web-clinic/       Klinik paneli       :3000
web-doctor/       Doktor paneli       :3001
web-patient/      Hasta               :3002
web-admin/        Süperadmin (mock)   :3003
web-marketing/    Pazarlama sitesi    :3004
docker/           Ortak Next image
docs/             Bu indeksten paket README’lerine
.local/           İç notlar — git yok
```

```
web-clinic / web-doctor / web-patient / web-admin / web-marketing
                         │
                    backend (JWT, REST)
                         │
              PostgreSQL + ai (match)
```

## Hızlı başlangıç

### Docker (tüm siteler)

```powershell
copy .env.example .env
docker compose up --build
```

| Adres | Uygulama |
|-------|----------|
| http://localhost:3000 | Klinik |
| http://localhost:3001 | Doktor |
| http://localhost:3002 | Hasta |
| http://localhost:3003 | Admin |
| http://localhost:3004 | Pazarlama |
| http://localhost:8000/docs | API |
| http://localhost:8001/docs | AI |

İlk boot: Alembic + demo seed. Şifre: `Demo1234!`  
Hesaplar: `patient@`, `clinic@`, `doctor@`, `admin@mediqueue.com`.

Yalnız API + DB: [`backend/docker-compose.yml`](backend/docker-compose.yml). Staging notları: [`backend/STAGING.md`](backend/STAGING.md).

Demo: `clinic@` genelde seed `clinic_id=1` (**Istanbul Hair Center**) taleplerini görür.

### Docker olmadan

PostgreSQL (`mediqueue`), sonra:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
alembic upgrade head
python -m scripts.seed_doctors_from_ai_json
python -m scripts.seed_clinics_from_ai_json
python -m scripts.seed_demo_users
uvicorn app.main:app --port 8000 --reload
```

```powershell
cd ai
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

```powershell
cd web-clinic   # :3000 — copy .env.example .env.local
# web-doctor :3001  web-patient :3002  web-admin :3003  web-marketing :3004
npm install
npm run dev
```

`NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1`

## Test

```powershell
cd backend
pytest
python -m scripts.smoke_ay1_e2e
python -m scripts.smoke_ay1_doctor_match
```

CI: `.github/workflows/backend-tests.yml`, `ai-tests.yml`.

## Durum

| Bileşen | Kabaca | Not |
|---------|--------|-----|
| Backend | ~80% | Auth, randevu, match proxy |
| AI | ~85% | Kural tabanlı; tarayıcı `:8001` çağırmaz |
| Clinic / doctor / patient | Hybrid | JWT + API; bazı modüller mock |
| Admin | Mock | |
| Mobile | 0% | `mobile/` boş |

Ay 1 E2E: patient randevu açar → clinic onaylar → doctor görür.
