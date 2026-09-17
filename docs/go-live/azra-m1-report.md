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

1. Klinik sahte token ile dashboard’da kalır mı? **Hayır.** Tarayıcı: geçerli oturum → `mq-clinic-token=fake-expired-jwt` → `/dashboard` ve `/dashboard/requests` → `/login?next=…`; `sessionStorage` token ve user `null`.
2. Doktor demo-auth sızıntısı? **Hayır.** Dosyalar silindi; `localhost:3001/dashboard` gerçek AuthGuard ile `/login?next=/dashboard`.
3. Avukat iddiası üretildi mi? **Hayır.** `kasim-frankfurt-data-path.md` yok.
4. M2’ye smoke/k6/takvim? **Evet.** `REQUIRES SEPARATE MILESTONE (AZRA M2)`.
5. Production HttpOnly şimdi? **Hayır.**

## A3 — Klinik AuthGuard 401

`web-clinic/src/components/shared/AuthGuard.tsx`: `ApiError` `status === 401` → `clearSession` (`mq-clinic-token`) → `loginRedirect("/login")` → return. SSR’de `isAuthenticated()` okunmaz (`ready`/`redirecting`); 8 sn timeout durur; 500/network shell.

`fetchClinicProfile` artık `/auth/me` **önce** çağırır ve 401’i **yutmaz**. `requireClinicId` başarısızsa `ApiError` 401. Appointments aynı.

Sahte JWT API (2026-09-17):

| Path | Sonuç |
|------|--------|
| `GET /v1/auth/me` + fake Bearer | 401 |
| `GET /v1/clinics/1/appointments` + fake Bearer | 401 |
| `GET /v1/clinics/1` + fake Bearer | 200 (backend; Kasım’a dokunulmadı) |

Tarayıcı (localhost:3000, 17 Eyl 2026):

| Adım | Sonuç |
|------|--------|
| `clinic@mediqueue.com` login | `/dashboard` açık (Genel Bakış) |
| Token → `fake-expired-jwt`, user duruyor, `/dashboard` | `/login?next=%2Fdashboard`; token+user `null` |
| Aynı sahte oturum `/dashboard/requests` | `/login?next=%2Fdashboard%2Frequests`; token+user `null` |
| HTTP `EN` locale | `mq-ui-locale=en`; `protocol=http:`; Secure uygulanmaz |

## A4 — Ölü demo-auth

Silindi: `DemoAuthGuard.tsx`, `demo-auth.ts`. Diskte yok. `web-doctor` dashboard layout gerçek `AuthGuard`. Token yokken `:3001/dashboard` → login.

`rg DemoAuthGuard -g '*.ts' -g '*.tsx' -g '*.js' -g '*.jsx'` = 0. Kalan metin yalnız untracked go-live spec + bu raporun kapanış satırı.

## A5 — Secure locale

Yalnız clinic + doctor `ui-locale.ts`. HTTPS’de `; Secure`. HTTP’de yok (tarayıcı kanıtı). Furkan path PR diffsiz. `useUiLocale` `useSyncExternalStore` (eslint `set-state-in-effect` kapandı).

Lint (M1 dosyaları): `AuthGuard.tsx` + her iki `ui-locale.ts` eslint 0. `clinic.ts` / `requests.ts` `useApi` adı pre-existing `react-hooks/rules-of-hooks` (fonksiyon hook değil).

## A1 — Avukat

`BLOCKED ON KASIM K4`. `azra-avukat-teknik.md` yok.

## A2 — AI teyidi

Kod rewrite yok. Kural tabanlı; `GET /health` var; `web-doctor` `:8001` yok. **AI COMPOSE NOT VERIFIED — LOCAL README ONLY.**

## Bilinçli dışarıda

HttpOnly, public `doctor.` DNS, doktor mesaj API, k6/ZAP/smoke, ComingSoon, Furkan/Kasım/backend, `ai/` rewrite, docker AWS.

M2: A6–A10. `REQUIRES SEPARATE MILESTONE (AZRA M2)`.

```
CLINIC 401 LOGOUT: DONE (API + browser)
DOCTOR DEAD DEMO AUTH: DONE (ts/tsx/js/jsx grep 0; :3001/dashboard → login)
SECURE COOKIES DOCTOR+CLINIC: DONE (HTTPS only; HTTP cookie observed without Secure)
AVUKAT NOTE: BLOCKED ON KASIM K4
AI LLM CALLS FROM BROWSER: NO
PRODUCTION TARGET CHANGED: NO
READY FOR AZRA M2: YES (A3–A5 kapalı; A1 K4 bekler)
RECOMMENDED NEXT STEP: Kasım K4 → A1; ayrı PR Azra M2 (smoke/k6/ZAP/takvim)

REPOSITORY: mediqueue-app
BRANCH: azra/m1-clinic-auth-locale
STARTING HEAD: b8ee388844181cb23783fc201e0845244a1aff09
FINAL COMMIT: 4de614a
PUSH PERFORMED: YES (PR #5)
FILES TOUCHED:
  web-clinic/src/components/shared/AuthGuard.tsx
  web-clinic/src/lib/services/clinic.ts
  web-clinic/src/lib/services/requests.ts
  web-clinic/src/lib/ui-locale.ts
  web-doctor/src/lib/ui-locale.ts
  web-doctor/src/components/shared/DemoAuthGuard.tsx (deleted)
  web-doctor/src/lib/demo-auth.ts (deleted)
  docs/go-live/azra-m1-report.md
GREP DemoAuthGuard: 0 in *.{ts,tsx,js,jsx}
FINAL GIT STATUS: M1 committed; unrelated WIP unstaged
```
