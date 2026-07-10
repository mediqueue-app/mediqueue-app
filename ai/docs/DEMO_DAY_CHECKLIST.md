# Demo Day — AI Smoke Test Checklist

Demo öncesi ve sunum günü hızlı doğrulama listesi. Tam senaryolar: [`DEMO.md`](DEMO.md)

## Ortam

- [ ] PostgreSQL çalışıyor (`mediqueue` veritabanı erişilebilir)
- [ ] `cd backend && alembic upgrade head` uygulandı
- [ ] `python -m scripts.seed_doctors_from_ai_json` çalıştırıldı
- [ ] `python -m scripts.seed_clinics_from_ai_json` çalıştırıldı
- [ ] `python -m scripts.seed_demo_users` çalıştırıldı (portal login’leri)
- [ ] AI servisi ayakta: `uvicorn app.main:app --port 8001` (`ai/` klasöründen)
- [ ] Backend CORS’ta `3000–3003` var (`.env` / `.env.example`)

## Health

- [ ] `GET http://localhost:8001/health` → `{"status":"ok"}`
- [ ] Swagger açılıyor: http://localhost:8001/docs

## Match — başarılı

- [ ] `POST /match` — [`examples/match-request-with-limits.json`](examples/match-request-with-limits.json)
- [ ] Yanıt `200`, en az bir `doctors` veya `clinics` kaydı var
- [ ] `message` alanı `null`

## Match — boş sonuç (fallback)

- [ ] `POST /match` (veya backend `POST /v1/match` + JWT) — `{"specialty":"Cardiology","language":"Japanese","budget":1}`
- [ ] Yanıt `200`, `doctors` ve `clinics` boş dizi
- [ ] `message` alanı dolu (bilgilendirme metni)

> Not: `budget: 1` + `language: Turkish` bazı klinik seed’lerinde hâlâ klinik döndürebilir; boş senaryo için dil uyuşmazlığı (`Japanese`) kullan.

## Backend proxy (Ay 1 P0)

- [ ] Backend ayakta: http://localhost:8000/docs
- [ ] `POST /v1/auth/login` — `patient@mediqueue.com` / `Demo1234!` → JWT
- [ ] `POST /v1/match` (Bearer JWT) — hit: `specialty=Cardiology`, `language=Turkish`, `budget=3000`, `city=Istanbul` → en az bir sonuç
- [ ] `POST /v1/match` — empty: `specialty=Cardiology`, `language=Japanese`, `budget=1` → boş listeler + `message`
- [ ] Limit alanları (`max_doctors` vb.) AI `:8001` üzerinden demo edilir; backend proxy temel match için yeterli
- [ ] Tekrarlanabilir smoke: `cd backend && python -m scripts.smoke_ay1_doctor_match`

## Doctor portal smoke (Azra)

- [ ] `web-doctor` `:3001` — `doctor@mediqueue.com` / `Demo1234!`
- [ ] Login sonrası `/auth/me` → `role=doctor`, `doctor_id` dolu
- [ ] Dashboard / patients — token varken `GET /v1/doctors/{id}/appointments` (liste boş olabilir)
- [ ] Tekrarlanabilir: `cd backend && python -m scripts.smoke_ay1_doctor_match`
- [ ] Full E2E: `python -m scripts.smoke_ay1_e2e` (patient→clinic confirm→doctor)

## CI (geliştirici)

- [ ] `cd ai && pytest -q` yeşil
- [ ] GitHub Actions `ai-tests.yml` son push'ta yeşil (repo → Actions sekmesi)

## Bilinçli olarak demo dışı

- [ ] `POST /feedback` — draft, DB'ye yazmaz (Ay 2)
- [ ] ML tabanlı eşleştirme yok (Faz 2)

---

**Son kontrol tarihi:** _______________  
**Kontrol eden:** _______________
