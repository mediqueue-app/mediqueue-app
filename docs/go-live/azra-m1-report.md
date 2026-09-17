# MEDIQUEUE — Azra Milestone 1 kapanış

| Alan | Değer |
|------|--------|
| Belge | GO-LIVE / M1 / AZRA |
| Hazırlayan | Azra, CTO |
| Tarih | 17 Eylül 2026 |
| Starting HEAD | `b8ee388844181cb23783fc201e0845244a1aff09` |

## Durum tablosu

| Madde | Durum |
|--------|--------|
| Clinic AuthGuard 401 | DONE |
| Demo-auth removed | DONE |
| Secure clinic+doctor | DONE |
| Avukat 1-pager | BLOCKED ON KASIM K4 |
| AI health verified | NOT VERIFIED — LOCAL README ONLY |
| Staging smoke / k6 | NOT IN M1 |
| Production doctor DNS | NO |

## Kabul soruları

1. Klinik sahte token ile dashboard’da kalır mı? **Hayır** (hedef). Boot’ta `fetchAppointmentRequests` `ApiError` 401 → `clearSession` + `/login`; `ready` true iken children yok. HTTP 500 / network → session silinmez, shell. 8 sn timeout durur.
2. Doktor demo-auth sızıntısı? **Hayır.** `DemoAuthGuard` / `demo-auth.ts` silindi; dashboard gerçek `AuthGuard`.
3. Avukat iddiası üretildi mi? **Hayır.** `docs/go-live/kasim-frankfurt-data-path.md` yok; tablo uydurulmadı.
4. M2’ye smoke/k6/takvim? **Evet.** `REQUIRES SEPARATE MILESTONE (AZRA M2)`.
5. Production HttpOnly şimdi? **Hayır.**

## A3 — Klinik AuthGuard 401

`web-clinic/src/components/shared/AuthGuard.tsx` doktor HEAD kalıbı: `ApiError` `status === 401` → `clearSession` (`mq-clinic-token`) → `loginRedirect("/login")` → return.

Sahte JWT ile API kanıtı (2026-09-17):

| Path | Sonuç |
|------|--------|
| `GET /v1/auth/me` + `Bearer fake` | 401 |
| `GET /v1/clinics/1/appointments` + `Bearer fake` | 401 |
| `GET /v1/clinics/1` + `Bearer fake` | 200 (backend; Kasım dosyasına dokunulmadı) |

`fetchClinicProfile` `/auth/me` 401’i yutuyor; `Promise.all` yine appointments 401 ile düşer. Klinik `auth.ts` zaten `clearSession` içeriyor; değiştirilmedi.

Tarayıcı E2E bu oturumda tamamlanmadı (`localhost:3000/login` curl `000`; IDE tarayıcı `chrome-error`). Semantik kod review + API 401.

## A4 — Ölü demo-auth

Silindi:

- `web-doctor/src/components/shared/DemoAuthGuard.tsx`
- `web-doctor/src/lib/demo-auth.ts`

`web-doctor/src/app/dashboard/layout.tsx` gerçek `AuthGuard` kullanıyor. `*.{ts,tsx}` grep: `DemoAuthGuard`, `demo-auth`, `mq-demo-auth`, `isDemoAuthenticated` = 0. (docs/go-live metinleri kasıtlı duruyor.)

## A5 — Secure locale

Yalnız `web-clinic/src/lib/ui-locale.ts` ve `web-doctor/src/lib/ui-locale.ts`.

`typeof window !== "undefined" && location.protocol === "https:"` → `; Secure`. HTTP localhost’ta Secure yok. `web-patient` / `web-admin` / `web-marketing` diffsiz.

## A1 — Avukat

`BLOCKED ON KASIM K4`. `azra-avukat-teknik.md` yazılmadı.

## A2 — AI teyidi

Kod rewrite yok.

| Soru | Kanıt |
|------|--------|
| Kural tabanlı mı? | Evet. `ai/app/main.py`: LLM/NLP yok. `ai/` içinde openai/anthropic yok. |
| `/health` var mı? | Evet. `GET /health` `ai/app/api/routes.py`. |
| Tarayıcı `:8001`? | Hayır. `web-doctor` `*.{ts,tsx}` içinde `8001` yok. |
| Compose? | **AI COMPOSE NOT VERIFIED — LOCAL README ONLY.** HEAD `backend/docker-compose.yml` `ai` servisi yok. `http://localhost:8001/health` timeout. Root compose bu PR’de yok / dokunulmadı. |

## Bilinçli dışarıda

HttpOnly, public `doctor.` DNS, doktor mesaj API, k6/ZAP/smoke, ComingSoon yayma, Furkan/Kasım path, `ai/` rewrite, docker AWS.

M2: A6 takvim dilimi; A7 smoke; A8 k6; A9 ZAP; A10 Sinem overlay. `REQUIRES SEPARATE MILESTONE (AZRA M2)`.

```
CLINIC 401 LOGOUT: DONE
DOCTOR DEAD DEMO AUTH: DONE (ts/tsx grep 0)
SECURE COOKIES DOCTOR+CLINIC: DONE (HTTPS only)
AVUKAT NOTE: BLOCKED ON KASIM K4
AI LLM CALLS FROM BROWSER: NO
PRODUCTION TARGET CHANGED: NO
READY FOR AZRA M2: YES (A3–A5 kapalı; A1 K4 bekler)
RECOMMENDED NEXT STEP: Kasım K4 → A1 avukat 1-pager; ayrı PR’de Azra M2 (smoke/k6/ZAP/takvim)

REPOSITORY: mediqueue-app
BRANCH: azra/m1-clinic-auth-locale
STARTING HEAD: b8ee388844181cb23783fc201e0845244a1aff09
FINAL COMMIT: 803e411
PUSH PERFORMED: YES (origin/azra/m1-clinic-auth-locale, PR #5)
FILES TOUCHED:
  web-clinic/src/components/shared/AuthGuard.tsx
  web-clinic/src/lib/ui-locale.ts
  web-doctor/src/lib/ui-locale.ts
  web-doctor/src/components/shared/DemoAuthGuard.tsx (deleted)
  web-doctor/src/lib/demo-auth.ts (deleted)
  docs/go-live/azra-m1-report.md
GREP DemoAuthGuard: 0 in *.{ts,tsx}
FINAL GIT STATUS: M1 files committed; unrelated local WIP left unstaged (Furkan/Kasım/Sinem paths not in this PR)
```
