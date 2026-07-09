# MediQueue

Sağlık turizmi odaklı klinik yönetim ve hasta–doktor eşleştirme platformu. Monorepo yapısında backend, AI servisi ve web arayüzlerini barındırır.

## Monorepo Yapısı

| Klasör | Durum | Açıklama | Port |
|--------|-------|----------|------|
| [`backend/`](backend/) | Aktif | FastAPI REST API — auth, klinikler, hastalar, randevular, yorumlar, AI proxy, Fernet | 8000 |
| [`ai/`](ai/) | Aktif | Kural tabanlı doktor/klinik eşleştirme microservice | 8001 |
| [`web-clinic/`](web-clinic/) | Aktif (kısmi API) | Klinik dashboard — JWT + client fetch; analytics/billing mock | 3000 |
| [`web-doctor/`](web-doctor/) | Aktif (kısmi API) | Doktor portalı — JWT + randevular; mesajlar mock | 3001 |
| [`web-patient/`](web-patient/) | Prototip | Hasta B2C UI — mock veri, API bağlama bekleniyor | 3002? |
| `mobile/` | Planlanmış | Mobil uygulama — henüz başlanmadı | — |

## Mimari Özet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ web-clinic  │     │ web-doctor  │     │ web-patient │
│ (JWT+API)   │     │ (JWT+API)   │     │  (mock UI)  │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │  patient API → Ay 2 / Furkan
                    ┌──────▼──────┐
                    │   backend   │  JWT auth, RBAC, REST API
                    │  (FastAPI)  │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌───▼───┐ ┌─────▼─────┐
       │ PostgreSQL  │ │  ai/  │ │  mobile   │
       │  (ortak)    │ │ match │ │ (erteli)  │
       └─────────────┘ └───────┘ └───────────┘
```

**Şu an:** Backend (Sprint 2) ve AI gerçek API ile çalışır. web-clinic / web-doctor JWT login + client-side API (SSR token sorunu giderildi). web-patient UI var, API henüz bağlı değil. Analytics / mesaj / billing mock.

## Hızlı Başlangıç

### 1. Veritabanı

PostgreSQL çalışır durumda olmalı (varsayılan DB: `mediqueue`).

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
uvicorn app.main:app --port 8000 --reload
```

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

Swagger: http://localhost:8001/docs

Detay: [`ai/README.md`](ai/README.md)

### 4. Web Arayüzleri

**Klinik dashboard:**

```powershell
cd web-clinic
npm install
npm run dev
```

http://localhost:3000

Detay: [`web-clinic/README.md`](web-clinic/README.md)

**Doktor portalı:**

```powershell
cd web-doctor
npm install
npm run dev
```

http://localhost:3001

Detay: [`web-doctor/README.md`](web-doctor/README.md)

## Tamamlanma Durumu (kabaca)

| Bileşen | Olgunluk | Not |
|---------|----------|-----|
| Backend API | ~90% | Auth, RBAC, hastalar, randevular, match, Fernet — Sprint 2 |
| AI Matching | ~85% | Rule-based, CI, ~%96 coverage |
| Web Clinic | ~55% | JWT + client API; analytics/billing mock |
| Web Doctor | ~45% | JWT + randevular; profil /auth/me; mesajlar mock |
| Web Patient | ~35% | UI prototip, API %0 |
| Mobile | 0% | Ertelendi |
| Frontend ↔ Backend | ~40% | Clinic/doctor kısmi; patient yok |

## Test ve CI

| Bileşen | Test | CI |
|---------|------|-----|
| AI | pytest, ~%96 coverage | GitHub Actions (`ai-tests.yml`) |
| Backend | pytest (~110 test) | GitHub Actions (`backend-tests.yml`) |
| Web | Yok | Yok |

Backend testleri:

```powershell
cd backend
.venv\Scripts\activate
pytest
```

AI testleri:

```powershell
cd ai
.venv\Scripts\activate
pytest --cov=app
```

## Tasarım Prensipleri

- **Doktor portalı** yalnızca klinik işine odaklanır — fatura, komisyon, personel yönetimi yoktur.
- **Klinik dashboard** operasyonel yönetim (lead, analitik, billing) içindir.
- **Hasta uygulaması** eşleştirme akışının asıl tüketicisi olacaktır.
- Mock veri kullanan arayüzlerde KVKK'ya duyarlı dil tercih edilir; gerçek veri geldiğinde aynı prensipler korunur.

## Dokümantasyon

| Dosya | İçerik |
|-------|--------|
| [`backend/README.md`](backend/README.md) | Kurulum, migration, seed, API, smoke test |
| [`ai/README.md`](ai/README.md) | AI servisi kurulum, API, Faz 2 planı |
| [`ai/docs/API.md`](ai/docs/API.md) | Detaylı match API dokümantasyonu |
| [`ai/docs/DEMO.md`](ai/docs/DEMO.md) | Demo Day match senaryosu |
| [`ai/docs/DEMO_DAY_CHECKLIST.md`](ai/docs/DEMO_DAY_CHECKLIST.md) | AI smoke test checklist |
| [`web-clinic/README.md`](web-clinic/README.md) | Klinik dashboard, demo akışı, Ay 1 kapsamı |
| [`web-doctor/README.md`](web-doctor/README.md) | Doktor portalı, demo akışı, Ay 1 kapsamı |
| [`backend/MANUAL_TEST_RBAC.md`](backend/MANUAL_TEST_RBAC.md) | Manuel RBAC doğrulama |

## Yol Haritası

**Ay 1 (mevcut):** Backend + AI hazır; clinic/doctor JWT + client API; web-patient UI mock.

**Ay 2:** web-patient API, cookie auth, mesajlaşma, billing, FCM/S3, doktor GET/PATCH tamamı.

**Faz 2:** AI feedback kalıcılığı, ML tabanlı eşleştirme, mobil uygulama.
