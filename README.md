# MediQueue

Sağlık turizmi odaklı klinik yönetim ve hasta–doktor eşleştirme platformu. Monorepo yapısında backend, AI servisi ve web arayüzlerini barındırır.

## Monorepo Yapısı

| Klasör | Durum | Açıklama | Port |
|--------|-------|----------|------|
| [`backend/`](backend/) | Aktif | FastAPI REST API — auth, klinikler, yorumlar, AI proxy | 8000 |
| [`ai/`](ai/) | Aktif | Kural tabanlı doktor/klinik eşleştirme microservice | 8001 |
| [`web-admin/`](web-admin/) | Prototip | Süperadmin pazar yeri kontrol paneli (mock veri) | 3003 |
| [`web-clinic/`](web-clinic/) | Prototip | Klinik büyüme motoru / marketplace host paneli (mock veri) | 3000 |
| [`web-doctor/`](web-doctor/) | Prototip | Doktor portalı (mock veri) | 3001 |
| [`web-patient/`](web-patient/) | Prototip | Hasta marketplace uygulaması (mock veri) | 3002 |
| `mobile/` | Planlanmış | Mobil uygulama — henüz başlanmadı | — |

## Mimari Özet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ web-clinic  │     │ web-doctor  │     │ web-patient │
│  (mock)     │     │  (mock)     │     │   (mock)    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │  ← Ay 2: API entegrasyonu
                    ┌──────▼──────┐
                    │   backend   │  JWT auth, RBAC, REST API
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

**Şu an:** Backend ve AI servisi gerçek API + PostgreSQL ile çalışır. Web arayüzleri (admin, klinik, doktor, hasta) zengin UI prototipleri olarak mock veriyle çalışır; backend'e bağlı değildir.

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

**Süperadmin paneli:**

```powershell
cd web-admin
npm install
npm run dev
```

http://localhost:3003

**Klinik büyüme paneli:**

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
| Backend API | ~70% | Auth, RBAC, klinikler, yorumlar, match proxy |
| AI Matching | ~85% | Rule-based, PostgreSQL, CI, ~%96 test coverage |
| Web Admin | ~40% | Süperadmin marketplace paneli, mock veri |
| Web Clinic | ~45% | Büyüme motoru UI, premium modüller, mock veri |
| Web Doctor | ~25% | UI prototip, mock veri, odontogram |
| Web Patient | ~30% | Marketplace UI prototip, mock veri |
| Mobile | 0% | Yok |
| Frontend ↔ Backend | 0% | Entegrasyon Ay 2 |

## Test ve CI

| Bileşen | Test | CI |
|---------|------|-----|
| AI | pytest, ~%96 coverage | GitHub Actions (`ai-tests.yml`) |
| Backend | pytest (~88 test) | Yok |
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
- **Klinik paneli** pazar yeri görünürlüğü, hasta kazanımı ve büyüme odaklıdır (ERP/HIS değildir).
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
| [`web-clinic/README.md`](web-clinic/README.md) | Klinik büyüme paneli, demo akışı |
| [`web-doctor/README.md`](web-doctor/README.md) | Doktor portalı, demo akışı |
| [`backend/MANUAL_TEST_RBAC.md`](backend/MANUAL_TEST_RBAC.md) | Manuel RBAC doğrulama |

## Yol Haritası

**Ay 1 (mevcut):** Gösterilebilir UI prototipleri — web-admin, web-clinic, web-doctor, web-patient mock veriyle.

**Ay 2:** Frontend–backend entegrasyonu, web auth, hasta uygulaması MVP, operasyonel API'ler (randevu, mesaj).

**Faz 2:** AI feedback kalıcılığı, ML tabanlı eşleştirme, mobil uygulama.
