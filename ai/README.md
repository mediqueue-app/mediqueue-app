# MediQueue AI Service

Backend servisinden bağımsız çalışan FastAPI tabanlı AI microservice. Hasta tercihlerine göre **doktor ve klinik** eşleştirmesi yapar; veri kaynağı backend ile paylaşılan PostgreSQL veritabanıdır.

Şu anki sürüm kural tabanlı (rule-based) filtreleme ve skorlama kullanır. Makine öğrenmesi modeli Faz 2'de eklenecektir.

## Teknolojiler

- Python 3.12+
- FastAPI
- Uvicorn
- Pydantic v2
- SQLAlchemy 2.x
- PostgreSQL (backend ile ortak)
- python-dotenv

## Proje Yapısı

```
ai/
├── app/
│   ├── main.py                    # FastAPI uygulaması, CORS, lifespan
│   ├── api/
│   │   ├── routes.py              # POST /match, GET /health
│   │   └── feedback.py            # POST /feedback (draft)
│   ├── core/
│   │   ├── config.py              # Ortam değişkenleri
│   │   ├── database.py            # SQLAlchemy engine / session
│   │   └── dependencies.py
│   ├── data/                      # Backend seed referans JSON (matching'de kullanılmaz)
│   │   ├── doctors.json
│   │   └── clinics.json
│   ├── models/
│   │   ├── schemas.py             # Pydantic request/response modelleri
│   │   ├── doctor_db.py           # doctors tablosu (read-only)
│   │   ├── clinic_db.py           # clinics tablosu (read-only)
│   │   └── doctor_clinic_db.py    # doctor_clinics join (read-only)
│   └── services/
│       ├── matcher.py             # Doktor eşleştirme motoru
│       └── clinic_matcher.py      # Klinik eşleştirme motoru
├── docs/
│   ├── API.md
│   └── examples/
├── tests/
│   ├── conftest.py
│   ├── test_api.py
│   ├── test_matcher.py
│   ├── test_clinic_matcher.py
│   ├── test_clinic_loading.py
│   └── test_feedback.py
├── .env.example
├── requirements.txt
└── requirements-dev.txt
```

## Kurulum

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

`.env` dosyasını oluşturun:

```bash
cp .env.example .env
```

## Veritabanı

AI servisi backend ile **aynı PostgreSQL** veritabanını kullanır. `.env` içinde:

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/mediqueue
```

**Gereksinimler:**

1. PostgreSQL çalışır durumda olmalı
2. Backend Alembic migration'ları uygulanmış olmalı (`backend/` → `alembic upgrade head`)
3. `doctors` tablosu dolu olmalı (`backend/scripts/seed_doctors_from_ai_json.py`)
4. Klinik eşleştirmesi için `clinics` ve `doctor_clinics` tabloları da dolu olmalı — seed yoksa `clinics` boş liste döner

> `app/data/doctors.json` ve `clinics.json` dosyaları AI matching tarafından **okunmaz**; backend seed script'i için referans olarak durur. `clinics.json` içindeki `min_price`, `max_price`, `rating`, `doctor_count` alanları runtime'da kullanılmaz — ayrıntı: [`app/data/clinics.json.README.md`](app/data/clinics.json.README.md).

## Çalıştırma

**Önce `ai/` klasörüne girin** (monorepo kökünden değil):

```powershell
cd ai
.venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

Servis varsayılan olarak **8001** portunda ayağa kalkar.

## API Özeti

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/health` | GET | Health check |
| `/match` | POST | Doktor + klinik eşleştirmesi |
| `/feedback` | POST | Match geri bildirimi (**draft — kalıcı değil**, yalnızca log) |

> **`/feedback` vs backend reviews:** AI `/feedback` veritabanına yazmaz. Backend `POST /v1/reviews` canlıdır (patient JWT). İkisi Ay 2'de birleştirilecek; şu an ayrı sistemlerdir.

### POST /match — Response

```json
{
  "doctors": [...],
  "clinics": [...],
  "message": null
}
```

`message` yalnızca `doctors` ve `clinics` **ikisi de boş** olduğunda dolar.

Detaylı dokümantasyon: [`docs/API.md`](docs/API.md)

## Ortam Değişkenleri

| Değişken | Varsayılan | Açıklama |
|----------|------------|----------|
| `DATABASE_URL` | `postgresql+psycopg2://postgres:postgres@localhost:5432/mediqueue` | PostgreSQL bağlantısı |
| `APP_NAME` | MediQueue AI Service | Uygulama adı |
| `APP_VERSION` | 1.0.0 | Sürüm |
| `HOST` | 0.0.0.0 | Bind adresi |
| `PORT` | 8001 | Dinleme portu |
| `DEBUG` | false | Debug / reload modu |
| `ALLOWED_ORIGINS` | localhost:3000–3004,5173,8080 | CORS (clinic/doctor/patient/admin/marketing) |

## API

Sözleşme ve örnek JSON: [`docs/API.md`](docs/API.md), [`docs/examples/`](docs/examples/).

Backend doctor+match smoke: `cd backend && python -m scripts.smoke_ay1_doctor_match` (AI `:8001` + seed).

## Test

```bash
cd ai
python -m pytest -q
```

Coverage ile:

```bash
pip install -r requirements-dev.txt
pytest --cov=app --cov-report=term-missing
```

## Swagger

- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

## Geliştirme Notları

- `matcher.py` — doktor eşleştirme (uzmanlık, dil, bütçe hard filter + skorlama)
- `clinic_matcher.py` — klinik eşleştirme (uzmanlık, dil hard filter; bütçe uygulanmaz; city/rating bonus)
- Klinik eşleştirme alanları bağlı doktorlardan türetilir (`doctor_clinics` join)
- Backend proxy (`POST /v1/match`) aynı `{ doctors, clinics, message }` formatını döndürür — `max_doctors` / `max_clinics` yalnızca AI `/match` üzerinde (backend proxy Ay 2)
- `POST /feedback` draft'tır; backend reviews API ile entegre değildir (Ay 2)
