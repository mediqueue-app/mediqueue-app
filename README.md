# MediQueue

Sağlık turizmi odaklı klinik yönetim ve hasta–doktor eşleştirme platformu. Monorepo yapısında backend, AI servisi ve web arayüzlerini barındırır.

## Monorepo Yapısı

| Klasör | Durum | Açıklama | Port |
|--------|-------|----------|------|
| [`backend/`](backend/) | Aktif | FastAPI REST API — auth, klinikler, yorumlar, AI proxy | 8000 |
| [`ai/`](ai/) | Aktif | Kural tabanlı doktor/klinik eşleştirme microservice | 8001 |
| [`web-admin/`](web-admin/) | UI + servis katmanı | Süperadmin pazar yeri kontrol paneli (servis katmanı hazır, mock veri) | 3003 |
| [`web-clinic/`](web-clinic/) | Hybrid entegre | JWT auth + API; büyüme modülleri mock fallback | 3000 |
| [`web-doctor/`](web-doctor/) | Kısmen entegre | Doktor portalı — JWT auth + randevu/hasta API entegrasyonu | 3001 |
| [`web-patient/`](web-patient/) | UI + servis katmanı | Hasta marketplace uygulaması (yüksek kaliteli UI, entegrasyona hazır) | 3002 |
| `mobile/` | Planlanmış | Mobil uygulama — henüz başlanmadı | — |

## Mimari Özet

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ web-clinic  │     │ web-doctor  │     │ web-patient │
│ JWT + API   │     │ JWT + API   │     │ UI + svc    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
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

**Frontend mimarisi (hybrid):** Paneller `Component → Service → API` katmanını kullanır.

- **web-doctor** kısmen API'ye bağlıdır (JWT auth, randevu/hasta uç noktaları).
- **web-clinic** login ve auth süreçlerinde JWT ile gerçek API'ye bağlıdır; klinik profili, talepler ve doktor kadrosu hybrid çalışır (token varken API, aksi halde mock fallback). Kampanyalar, mesajlar, finans vb. büyüme modülleri henüz mock veri döner — sayfalar silinmez, `growth-mock.ts` üzerinden çalışır.
- **web-admin / web-patient:** Yüksek kaliteli UI; servis katmanı backend entegrasyonuna hazır.

**Entegrasyon durumu:**
- **Backend + AI:** PostgreSQL ile çalışır; CI/CD aktif (`backend-tests.yml`, `ai-tests.yml`).
- **web-doctor:** JWT kimlik doğrulama, `/auth/me`, randevu ve hasta listesi API entegrasyonu (kısmi).
- **web-clinic:** JWT + `/auth/me` gerçek API; operasyonel uç noktalar hybrid; büyüme modülleri mock.
- **web-admin / web-patient:** Servis katmanı hazır, API entegrasyonu sırada.

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

**Klinik büyüme paneli** (backend `http://localhost:8000` gerekir):

```powershell
cd web-clinic
npm install
copy .env.example .env
npm run dev
```

http://localhost:3000

Detay: [`web-clinic/README.md`](web-clinic/README.md)

**Doktor portalı:**

```powershell
cd web-doctor
npm install
copy .env.example .env
npm run dev
```

http://localhost:3001

Detay: [`web-doctor/README.md`](web-doctor/README.md)

## Tamamlanma Durumu (kabaca)

| Bileşen | Olgunluk | Not |
|---------|----------|-----|
| Backend API | ~70% | Auth, RBAC, klinikler, yorumlar, match proxy |
| AI Matching | ~85% | Rule-based, PostgreSQL, CI, ~%96 test coverage |
| Web Admin | ~45% | Süperadmin marketplace paneli, servis katmanı + mock veri |
| Web Clinic | ~50% | Büyüme motoru UI, JWT auth, API servis katmanı |
| Web Doctor | ~35% | UI + JWT auth, kısmi API entegrasyonu |
| Web Patient | ~30% | Marketplace UI prototip, servis katmanına hazır |
| Mobile | 0% | Yok |
| Frontend ↔ Backend | ~30% | web-doctor kısmi; web-clinic hybrid (auth + operasyonel API) |

## Test ve CI

| Bileşen | Test | CI |
|---------|------|-----|
| AI | pytest, ~%96 coverage | GitHub Actions (`ai-tests.yml`) |
| Backend | pytest (~110 test) | GitHub Actions ([`backend-tests.yml`](.github/workflows/backend-tests.yml)) |
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
| [`web-clinic/README.md`](web-clinic/README.md) | Klinik büyüme paneli, API auth akışı |
| [`web-doctor/README.md`](web-doctor/README.md) | Doktor portalı, API auth akışı |
| [`backend/MANUAL_TEST_RBAC.md`](backend/MANUAL_TEST_RBAC.md) | Manuel RBAC doğrulama |

## Yol Haritası

**Mevcut:** Backend CI/CD, JWT auth, web-clinic/web-doctor API servis katmanı, yüksek kaliteli admin/patient/klinik UI.

**Sırada:** web-admin ve web-patient backend entegrasyonu, büyüme modülleri için operasyonel API'ler, hasta uygulaması MVP.

**Faz 2:** AI feedback kalıcılığı, ML tabanlı eşleştirme, mobil uygulama.
