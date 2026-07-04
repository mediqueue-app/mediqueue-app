# MediQueue AI Service

Backend servisinden bağımsız çalışan FastAPI tabanlı AI microservice.

Şu anki sürüm kural tabanlı (rule-based) filtreleme ve skorlama kullanır. Makine öğrenmesi modeli Faz 2'de eklenecektir.

## Teknolojiler

- Python 3.12
- FastAPI
- Uvicorn
- Pydantic v2
- python-dotenv

## Proje Yapısı

```
ai/
├── app/
│   ├── main.py              # FastAPI uygulaması, CORS, lifespan
│   ├── api/
│   │   └── routes.py        # HTTP endpoint'leri
│   ├── core/
│   │   └── config.py        # Ortam değişkenleri ve sabitler
│   ├── data/
│   │   ├── doctors.json
│   │   └── clinics.json
│   ├── models/
│   │   └── schemas.py       # Pydantic request/response modelleri
│   └── services/
│       └── matcher.py       # Rule-based eşleştirme motoru
├── docs/
│   ├── API.md
│   └── examples/            # JSON örnek dosyaları
├── tests/
│   ├── conftest.py
│   ├── test_api.py
│   └── test_matcher.py
├── .env.example
├── .gitignore
├── pytest.ini
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

## Çalıştırma

**Önce `ai/` klasörüne girin** (monorepo kökünden değil):

```powershell
cd ai
.venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

Alternatif:

```bash
python -m app.main
```

Servis varsayılan olarak **8001** portunda ayağa kalkar.

## Ortam Değişkenleri

| Değişken      | Varsayılan              | Açıklama              |
|---------------|-------------------------|-----------------------|
| `APP_NAME`    | MediQueue AI Service    | Uygulama adı          |
| `APP_VERSION` | 1.0.0                   | Sürüm                 |
| `HOST`        | 0.0.0.0                 | Bind adresi           |
| `PORT`        | 8001                    | Dinleme portu         |
| `DEBUG`       | false                   | Debug / reload modu   |
| `CORS_ORIGINS`| *                       | İzin verilen origin'ler (virgülle ayrılmış) |

## API Dokümantasyonu

Backend entegrasyonu için tam API dokümantasyonu:

- **[API Dokümantasyonu](docs/API.md)** — endpoint'ler, request/response örnekleri, status kodları, cURL ve entegrasyon rehberi
- **[JSON Örnekleri](docs/examples/)** — kopyalanabilir request/response dosyaları

### Swagger

- Swagger UI: [http://localhost:8001/docs](http://localhost:8001/docs)
- ReDoc: [http://localhost:8001/redoc](http://localhost:8001/redoc)
- OpenAPI JSON: [http://localhost:8001/openapi.json](http://localhost:8001/openapi.json)

### Health Check

```http
GET /health
```

**Response**

```json
{
  "status": "ok"
}
```

### Doctor Matching

```http
POST /match
Content-Type: application/json
```

Detaylı request/response örnekleri ve hata kodları için [`docs/API.md`](docs/API.md) dosyasına bakın.

## Test

```bash
pip install -r requirements-dev.txt
pytest --cov=app --cov-report=term-missing
```

## Geliştirme Notları

- Global exception handler tüm beklenmeyen hataları yakalar ve `500` döner.
- `app/services/matcher.py` kural tabanlı (rule-based) filtreleme ve skorlama motorudur; Faz 2'de ML entegrasyonu planlanmaktadır.
- `app/data/` altındaki JSON dosyaları doktor ve klinik verilerini tutar.
