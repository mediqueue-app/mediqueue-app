# MediQueue

Sağlık turizmi odaklı klinik yönetim ve hasta–doktor eşleştirme platformu. Monorepo yapısında backend, AI servisi ve web arayüzlerini barındırır.

## Monorepo Yapısı

| Klasör | Durum | Açıklama | Port |
|--------|-------|----------|------|
| [`backend/`](backend/) | Aktif | FastAPI — auth, klinikler, hastalar, randevular, match proxy | 8000 |
| [`ai/`](ai/) | Aktif | Kural tabanlı doktor/klinik eşleştirme microservice | 8001 |
| [`web-admin/`](web-admin/) | Prototip (mock) | Süperadmin pazar yeri paneli — backend applications API yok | 3003 |
| [`web-clinic/`](web-clinic/) | Hybrid | JWT auth + operasyonel API; büyüme modülleri mock | 3000 |
| [`web-doctor/`](web-doctor/) | Hybrid (kısmi) | JWT auth + randevu/hasta API; mesajlar mock | 3001 |
| [`web-patient/`](web-patient/) | UI prototip (mock) | B2C marketplace UI — **API katmanı henüz yok** (Ay 1 kalan P0) | 3002 |
| `mobile/` | Planlanmış | Flutter — başlanmadı | — |

## Mimari Özet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ web-clinic  │     │ web-doctor  │     │ web-patient │
│ JWT + API   │     │ JWT + API   │     │ mock UI     │
└──────┬──────┘     └──────┬──────┘     └──────╳──────┘
       │                   │              (API sırada)
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

**Entegrasyon durumu (Ay 1):**

- **Backend + AI:** PostgreSQL, CI (`backend-tests.yml`, `ai-tests.yml`), demo seed hazır.
- **web-clinic:** JWT + `/auth/me`; profil, talepler, doktor kadrosu hybrid (token varken API). Mesaj/kampanya/finans mock (`growth-mock.ts`).
- **web-doctor:** JWT + `/auth/me`; randevu/hasta listesi API. Mesajlar ve müsaitlik mock.
- **web-patient:** Zengin UI; login/booking/klinik listesi hâlâ `mock-data.ts`. Backend’e bağlanmamış.
- **web-admin:** Mock UI; `GET /admin/summary` dışında admin domain API’si yok.

**Ay 1 E2E hedefi:** patient randevu oluşturur → clinic onaylar → doctor görür. Zincirin ilk halkası (patient API) eksik.

## Hızlı Başlangıç

### 1. Veritabanı

PostgreSQL çalışır durumda olmalı (DB: `mediqueue`).

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

Demo hesaplar (şifre hepsi: `Demo1234!`):

| Email | Rol | Portal |
|-------|-----|--------|
| `patient@mediqueue.com` | patient | web-patient `:3002` |
| `clinic@mediqueue.com` | clinic | web-clinic `:3000` |
| `doctor@mediqueue.com` | doctor | web-doctor `:3001` |
| `admin@mediqueue.com` | admin | web-admin `:3003` |

Detay: [`backend/README.md`](backend/README.md)

### 3. AI Servisi

```powershell
cd ai
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
copy .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

Swagger: http://localhost:8001/docs — Detay: [`ai/README.md`](ai/README.md)

### 4. Web arayüzleri

**Klinik** (`:3000`) — backend gerekir:

```powershell
cd web-clinic
npm install
copy .env.example .env.local
npm run dev
```

**Doktor** (`:3001`) — backend gerekir:

```powershell
cd web-doctor
npm install
copy .env.example .env.local
npm run dev
```

**Hasta** (`:3002`) — şu an mock UI (API yok):

```powershell
cd web-patient
npm install
npm run dev
```

**Admin** (`:3003`) — mock UI:

```powershell
cd web-admin
npm install
npm run dev
```

## Tamamlanma Durumu (kabaca)

| Bileşen | Olgunluk | Not |
|---------|----------|-----|
| Backend API | ~75% | Auth, RBAC, patients, appointments, match, seed, CI |
| AI Matching | ~85% | Rule-based, PostgreSQL, CI, yüksek coverage |
| Web Clinic | ~55% | Hybrid auth + requests/profile/doctors; growth mock |
| Web Doctor | ~40% | JWT + appointments/patients; mesajlar mock |
| Web Patient | ~30% | Marketplace UI only — API entegrasyonu Ay 1 P0 |
| Web Admin | ~40% | Mock süperadmin UI |
| Mobile | 0% | Yok |
| Frontend ↔ Backend | ~35% | clinic + doctor partial; patient 0% |

## Test ve CI

| Bileşen | Test | CI |
|---------|------|-----|
| AI | pytest, yüksek coverage | `ai-tests.yml` |
| Backend | pytest (~110) | `backend-tests.yml` |
| Web | Yok | Yok |

```powershell
cd backend
.\.venv\Scripts\activate
pytest
# Doctor + match smoke (backend+AI ayaktayken):
python -m scripts.smoke_ay1_doctor_match
```

```powershell
cd ai
.\.venv\Scripts\activate
pytest --cov=app
```

## Tasarım Prensipleri

- **Doktor portalı** klinik işine odaklanır — fatura/komisyon/personel yok.
- **Klinik paneli** pazar yeri görünürlüğü ve hasta kazanımı odaklıdır (ERP/HIS değil).
- **Hasta uygulaması** eşleştirme ve randevu akışının asıl tüketicisidir (API bağlantısı sırada).
- Mock yüzeylerde KVKK’ya duyarlı dil; gerçek veride aynı prensipler.

## Dokümantasyon

| Dosya | İçerik |
|-------|--------|
| [`backend/README.md`](backend/README.md) | Kurulum, seed, API, smoke |
| [`ai/README.md`](ai/README.md) | AI kurulum, match API |
| [`ai/docs/DEMO_DAY_CHECKLIST.md`](ai/docs/DEMO_DAY_CHECKLIST.md) | Demo smoke checklist |
| [`web-clinic/README.md`](web-clinic/README.md) | Klinik hybrid panel |
| [`web-doctor/README.md`](web-doctor/README.md) | Doktor portalı |
| [`web-patient/README.md`](web-patient/README.md) | Hasta UI (mock) |
| [`web-admin/README.md`](web-admin/README.md) | Admin UI (mock) |

## Yol Haritası

**Ay 1 (mevcut):** Backend + AI + clinic/doctor hybrid + demo seed. Patient API entegrasyonu kapanış P0’ı.

**Sırada:** web-patient → appointments E2E; admin/growth API’leri; hasta MVP.

**Faz 2:** AI feedback kalıcılığı, ML eşleştirme, mobil.
