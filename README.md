# MediQueue

Sağlık turizmi odaklı klinik yönetim ve hasta–doktor eşleştirme platformu. Monorepo yapısında backend, AI servisi ve web arayüzlerini barındırır.

## Monorepo Yapısı

| Klasör | Durum | Açıklama | Port |
|--------|-------|----------|------|
| [`backend/`](backend/) | Aktif | FastAPI — auth, klinikler, hastalar, randevular, match proxy | 8000 |
| [`ai/`](ai/) | Aktif | Kural tabanlı doktor/klinik eşleştirme microservice | 8001 |
| [`web-admin/`](web-admin/) | Prototip (mock) | Süperadmin paneli — applications API yok | 3003 |
| [`web-clinic/`](web-clinic/) | Hybrid | JWT + operasyonel API; büyüme modülleri mock | 3000 |
| [`web-doctor/`](web-doctor/) | Hybrid (kısmi) | JWT + randevu/hasta API; mesajlar mock | 3001 |
| [`web-patient/`](web-patient/) | Hybrid | JWT auth + klinikler + booking API; fallback mock | 3002 |
| `mobile/` | Planlanmış | Flutter — başlanmadı | — |

## Mimari Özet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ web-clinic  │     │ web-doctor  │     │ web-patient │
│ JWT + API   │     │ JWT + API   │     │ JWT + API   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │   backend   │  JWT, RBAC, REST
                    │  (FastAPI)  │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌───▼───┐ ┌─────▼─────┐
       │ PostgreSQL  │ │  ai/  │ │  mobile   │
       │  (ortak)    │ │ match │ │  (yok)    │
       └─────────────┘ └───────┘ └───────────┘
```

**Ay 1 E2E (doğrulandı):** patient randevu oluşturur → clinic onaylar → doctor görür.

```powershell
cd backend
python -m scripts.smoke_ay1_e2e
```

Demo notu: `clinic@` yalnızca seed `clinic_id` (genelde **Istanbul Hair Center**, id=1) taleplerini görür. Patient demoda bu kliniği seçmeli.

## Hızlı Başlangıç

### 1. Veritabanı

PostgreSQL (DB: `mediqueue`).

### 2. Backend

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

Demo hesaplar (şifre: `Demo1234!`):

| Email | Rol | Portal |
|-------|-----|--------|
| `patient@mediqueue.com` | patient | `:3002` |
| `clinic@mediqueue.com` | clinic | `:3000` |
| `doctor@mediqueue.com` | doctor | `:3001` |
| `admin@mediqueue.com` | admin | `:3003` |

### 3. AI Servisi

```powershell
cd ai
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### 4. Web

```powershell
cd web-clinic   # :3000 — copy .env.example .env.local
cd web-doctor   # :3001
cd web-patient  # :3002
cd web-admin    # :3003 mock
npm install
npm run dev
```

`NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/v1` (clinic/doctor/patient).

## Tamamlanma Durumu (kabaca)

| Bileşen | Olgunluk | Not |
|---------|----------|-----|
| Backend API | ~80% | Auth, patients, appointments, match, seed, CI |
| AI Matching | ~85% | Rule-based + CI |
| Web Clinic | ~55% | Hybrid; growth mock |
| Web Doctor | ~40% | Hybrid; mesajlar mock |
| Web Patient | ~50% | Hybrid auth + clinics + booking |
| Web Admin | ~40% | Mock |
| Mobile | 0% | Yok |
| Frontend ↔ Backend | ~55% | patient→clinic→doctor E2E yeşil |

## Test ve CI

| Bileşen | Test | CI |
|---------|------|-----|
| AI | pytest | `ai-tests.yml` |
| Backend | pytest (~110) | `backend-tests.yml` |
| Web | Yok | Yok |

```powershell
cd backend
pytest
python -m scripts.smoke_ay1_doctor_match
python -m scripts.smoke_ay1_e2e
```

## Yol Haritası

**Ay 1:** Backend + AI + clinic/doctor/patient hybrid + demo seed + E2E smoke.

**Ay 2:** Admin API, growth/mesaj modülleri, mobil, staging/FCM/S3.

**Faz 2:** AI feedback kalıcılığı, ML eşleştirme.
