Azra — Milestone 1 sonrası, mesaj 2.

Metnin tamamını Cursor’a yapıştırıp uygula; kapsamı genişletme.

Bu bir **kod** görevidir. Avukat, K4, A1, Frankfurt tablosu bu sohbette yok. Spesifikasyon bende. Aşağıdaki kilitler yeniden açılmaz, “daha iyi olur” diye değiştirilmez. Belirsizlikte dur. Rapora `BLOCKED — CTO` yaz, PR’ı o haliyle bırak.

Mesaj 1 kapandı: A3 klinik 401, A4 demo-auth silindi, A5 clinic/doctor Secure. Branch `azra/m1-clinic-auth-locale`, PR #5, rapor `docs/go-live/azra-m1-report.md`. Bu sohbette AuthGuard ve locale’e dokunma. Furkan (patient/admin/marketing), Kasım FastAPI, public `doctor.` DNS, HttpOnly, k6/ZAP/staging smoke yok.

---

## Senden istediğim sonuç

Demo Day’de doktor **takvimde gerçek onaylı randevu** görsün. Local API + seed yeterli. Staging URL yok; bu A7 değil.

Hesap: `doctor@mediqueue.com` / `Demo1234!` (backend README seed). Panel: web-doctor `:3001`.

1. Login sonrası `/dashboard/calendar`: oturum varken liste `GET /v1/doctors/{id}/appointments` (mevcut client, prefix `apiFetch` ile). **Token varken API hata olunca `getCalendarAppointments()` mock’una sessiz düşme.** Timeout/network mevcut gibi fırlat. 401 → `clearSession` (mevcut) ve mock’a düşme. Diğer 4xx/5xx: boş liste veya `PageLoadError` — sahte Klaus Richter / Klaus Fischer takvimi değil.
2. `/dashboard/schedule` bugün `mock-doctor` slotları + local toggle. Token varken bu sahte ızgara Demo Day sızıntısı. Ya aynı API randevularını göster ya da dürüst “Yakında” (klinikteki `ComingSoonOverlay` kalıbını `web-doctor` içine kopyala; `web-clinic` dosyasını import etme). Local toggle ile sahte randevu üretme.
3. Mesajlar: `web-doctor/src/lib/services/messages.ts` in-memory mock. API bağlama yok (roadmap). Sayfada sahte konuşmayı gerçek operasyon gibi bırakma: “Yakında” overlay veya bağlama. Dashboard `fetchQuickStats` / `fetchRecentActivities` mock kalabilir; yeni sahte KPI uydurma.
4. Token yokken mevcut mock (login öncesi / unit) kırılmasın.

Bitti demek: seed doktor login, takvimde API’den gelen onaylı randevu (veya dürüst boş). Schedule sahte dolu hafta değil. Mesaj sahte thread gerçek değil.

---

## Bağlam (bilmen gereken kadar)

Pazarlama sessiz-canlı: https://www.getmediqueue.com. Klinik / doktor paneli kamuya açık production’da değil. Public `doctor.` DNS bu işte açılmaz.

A1 avukat notu Kasım’ın `kasim-frankfurt-data-path.md` dosyasına bağlı; o dosya yok. Bu sohbette A1 yok. A7 staging smoke Kasım URL’sine bağlı; URL yok.

Repo: mediqueue-app. Başka org’a push yok.

---

## Kilitler (uygula, seçme)

- FastAPI endpoint icat etme. Appointments listesi yoksa veya 404: `BLOCKED — CTO` ve Kasım’a bir satır not; sahte veri doldurma.
- Doktor mesaj API yok. `messages.ts`’i backend’e bağlama.
- `web-patient`, `web-admin`, `web-marketing` yok. Clinic’e yalnız ComingSoon **kopyası** için bak; clinic dosyasına yazma.
- `docs/go-live/azra-avukat-teknik.md` yok bu PR’de.
- A3–A5 regression yok: clinic 401 `clearSession`, DemoAuthGuard geri gelmez, locale Secure.
- Force push, `reset --hard`, `.env` commit yok.
- HttpOnly cookie, public DNS, k6, ZAP, staging smoke yok.

M2’de durur (raporda silinmez, bu PR’de yapılmaz): A7 staging smoke, A1 avukat, A8 HttpOnly. Etiket: `REQUIRES SEPARATE MILESTONE (AZRA M2)` yalnız bunlar için.

---

## Bugün kodda ne var (oku, ezberleme)

`web-doctor/src/lib/services/appointments.ts` — `fetchAllAppointments`: token yoksa `getCalendarAppointments()` mock. Token varken `GET /doctors/{id}/appointments`. `catch`: timeout/network throw; 401 `clearSession`; **diğer her hata mock’a düşüyor**. Bunu kapat.

`web-doctor/src/app/dashboard/calendar/page.tsx` — `fetchCalendarAppointments` + `CalendarView`.

`web-doctor/src/app/dashboard/schedule/page.tsx` — `scheduleSlots` / `TODAY_ISO` (`mock-doctor.ts`), state local, toggle sahte slot.

`web-doctor/src/app/dashboard/messages/page.tsx` — `fetchChatThreads` → in-memory mock.

`web-doctor/src/app/dashboard/page.tsx` — bugün randevu `fetchTodayAppointments` (aynı fallback’li path); stats/activities mock.

`web-doctor` içinde ComingSoon yok. Kalıp: `web-clinic/src/components/ui/ComingSoon.tsx` (`ComingSoonOverlay`). Gerekirse kopyala.

Seed: backend README `doctor@mediqueue.com` / `Demo1234!`. Compose local (`db` + `api`). Endpoint testi: `backend/tests/test_clinic_doctor_new_endpoints.py` `GET /v1/doctors/7/appointments`.

---

## Nasıl çalışırsın

Incremental patch. Platform rewrite yok.

Branch: mevcut `azra/m1-clinic-auth-locale` veya ondan yeni branch. Mesaj 1 commit’ini bozma, amend etme.

Başlamadan kaydet, kapanış formuna yaz:

```
git remote -v
git branch --show-current
git status
git rev-parse HEAD
```

Oku: `appointments.ts`, calendar/schedule/messages/dashboard page, `mock-doctor.ts`, `mock-data.ts` (Klaus Richter takvimi), clinic ComingSoon (kopya için). `web-doctor` Next sürümü için `web-doctor/node_modules/next/dist/docs/` — ezbere App Router yazma.

Lint yalnız dokunduğun app’te. Pre-existing `react-hooks/rules-of-hooks` (`useApi` adı) dokunulmadıysa düzeltme.

Doğrulama (local, staging URL yok):

1. API ayakta, seed doktor login `:3001`.
2. `/dashboard/calendar` — mock isim (Klaus Richter / Klaus Fischer) değil; API kaydı veya dürüst boş.
3. Token’ı boz → `/login` (A4 kalıbı); sahte takvim dashboard’da kalmasın.
4. `/dashboard/schedule` — API veya overlay; local toggle ile sahte apt yok.
5. `/dashboard/messages` — sahte thread gerçek operasyon gibi durmasın.

---

## Senaryolar

| Durum | Yapacağın |
|--------|-----------|
| API down, token var | Mock takvim yok; error veya boş |
| 401 | clearSession; mock yok |
| Appointments 200 boş (seed’de randevu yok) | Dürüst boş; fake apt basma; rapora `EMPTY-HONEST` |
| Schedule’ı “daha güzel mock” | Hayır |
| Mesaj backend | Hayır |
| Staging URL yok | A7 yok; local yeter |
| K4 / avukat / A1 | Bu sohbet değil |
| Clinic AuthGuard “daha iyi” | Hayır |

---

## Kapanış (`docs/go-live/azra-m1-report.md` — A6 satırı ekle, A3–A5 silme)

```
git remote -v
git branch --show-current
git rev-parse HEAD

A6 CALENDAR API WHEN LOGGED IN: YES / NO
A6 SILENT MOCK FALLBACK REMOVED: YES / NO
A6 SCHEDULE MOCK LEAK: FIXED (api | overlay) / DEFERRED
A6 MESSAGES HONEST: YES / NO
A6 NEW APPOINTMENT ENDPOINT: NO
A1 AVUKAT: UNCHANGED (K4)
LOCAL DOCTOR LOGIN CALENDAR: PASS / FAIL / EMPTY-HONEST
FILES THIS CHAT:
RECOMMENDED NEXT STEP: A1 K4 sonrası; A7 Kasım URL
```
