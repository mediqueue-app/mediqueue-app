# Demo Day — Match API Senaryosu

Ay 1 sunumu için önerilen eşleştirme demosu. AI servisi doğrudan (`:8001`) veya backend proxy (`:8000/v1/match`) üzerinden gösterilebilir.

## Ön koşullar

1. PostgreSQL çalışıyor (`mediqueue` DB)
2. Backend migration + seed tamamlandı:
   ```powershell
   cd backend
   alembic upgrade head
   python -m scripts.seed_doctors_from_ai_json
   python -m scripts.seed_clinics_from_ai_json
   ```
3. AI servisi ayakta: http://localhost:8001/docs
4. (Opsiyonel) Backend ayakta: http://localhost:8000/docs

## Senaryo A — Başarılı eşleşme (Swagger)

**AI Swagger:** http://localhost:8001/docs → `POST /match`

**Request body** — dosya: [`examples/match-request-with-limits.json`](examples/match-request-with-limits.json)

```json
{
  "specialty": "Cardiology",
  "language": "Turkish",
  "budget": 3000,
  "city": "Istanbul",
  "max_doctors": 5,
  "max_clinics": 3
}
```

**Beklenen:** `200 OK`, `doctors` ve/veya `clinics` dolu, `message: null`

**Anlatım notu:** Bütçe yalnızca doktor filtresinde; klinik skoru bağlı doktorlardan türetilir.

## Senaryo B — Boş sonuç (fallback mesajı)

**Request body:**

```json
{
  "specialty": "Cardiology",
  "language": "Turkish",
  "budget": 1
}
```

**Beklenen:** `200 OK`, `doctors: []`, `clinics: []`, `message` bilgilendirme metni (boş değil)

Örnek response: [`examples/match-response-empty.json`](examples/match-response-empty.json)

## Senaryo C — Backend proxy (JWT)

1. `POST /v1/auth/register` veya `POST /v1/auth/login` → token al
2. `POST /v1/match` — Authorization: `Bearer <token>`
3. Aynı JSON gövdesi (Senaryo A) — **doğrudan AI Swagger üzerinden** gösterin

> **Not:** Backend `POST /v1/match` şu an `max_doctors` / `max_clinics` alanlarını iletmez (Ay 2). Limit demo için AI endpoint'ini (`:8001`) kullanın.

## cURL — AI doğrudan

```bash
curl -s -X POST http://localhost:8001/match \
  -H "Content-Type: application/json" \
  -d @docs/examples/match-request-with-limits.json
```

## cURL — Backend proxy

```bash
TOKEN=$(curl -s -X POST http://localhost:8000/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=demo@example.com&password=secret123" | jq -r .access_token)

curl -s -X POST http://localhost:8000/v1/match \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @docs/examples/match-request-with-limits.json
```

## Örnek dosyalar

| Dosya | Açıklama |
|-------|----------|
| [`match-request-with-city.json`](examples/match-request-with-city.json) | Şehirli istek |
| [`match-request-with-limits.json`](examples/match-request-with-limits.json) | Sonuç limitleri |
| [`match-request-without-city.json`](examples/match-request-without-city.json) | Şehirsiz istek |
| [`match-response-success.json`](examples/match-response-success.json) | Başarılı yanıt |
| [`match-response-empty.json`](examples/match-response-empty.json) | Boş sonuç + message |

## Demo Day checklist

Kısa smoke test listesi: [`DEMO_DAY_CHECKLIST.md`](DEMO_DAY_CHECKLIST.md)
