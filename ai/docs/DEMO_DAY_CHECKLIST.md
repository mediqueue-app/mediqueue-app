# Demo Day — AI Smoke Test Checklist

Demo öncesi ve sunum günü hızlı doğrulama listesi. Tam senaryolar: [`DEMO.md`](DEMO.md)

## Ortam

- [ ] PostgreSQL çalışıyor (`mediqueue` veritabanı erişilebilir)
- [ ] `cd backend && alembic upgrade head` uygulandı
- [ ] `python -m scripts.seed_doctors_from_ai_json` çalıştırıldı
- [ ] `python -m scripts.seed_clinics_from_ai_json` çalıştırıldı
- [ ] AI servisi ayakta: `uvicorn app.main:app --port 8001` (`ai/` klasöründen)

## Health

- [ ] `GET http://localhost:8001/health` → `{"status":"ok"}`
- [ ] Swagger açılıyor: http://localhost:8001/docs

## Match — başarılı

- [ ] `POST /match` — [`examples/match-request-with-limits.json`](examples/match-request-with-limits.json)
- [ ] Yanıt `200`, en az bir `doctors` veya `clinics` kaydı var
- [ ] `message` alanı `null`

## Match — boş sonuç (fallback)

- [ ] `POST /match` — `{"specialty":"Cardiology","language":"Turkish","budget":1}`
- [ ] Yanıt `200`, `doctors` ve `clinics` boş dizi
- [ ] `message` alanı dolu (bilgilendirme metni)

## Backend proxy (opsiyonel demo)

- [ ] Backend ayakta: http://localhost:8000/docs
- [ ] Login/register → JWT alındı
- [ ] `POST /v1/match` aynı gövde ile `200` döndü (limit alanları backend'de henüz yok — limit demosu için AI `:8001` kullanın)

## CI (geliştirici)

- [ ] `cd ai && pytest -q` yeşil
- [ ] GitHub Actions `ai-tests.yml` son push'ta yeşil (repo → Actions sekmesi)

## Bilinçli olarak demo dışı

- [ ] `POST /feedback` — draft, DB'ye yazmaz (Ay 2)
- [ ] ML tabanlı eşleştirme yok (Faz 2)

---

**Son kontrol tarihi:** _______________  
**Kontrol eden:** _______________
