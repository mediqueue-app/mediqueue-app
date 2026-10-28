# FURKAN M2 — Hasta paneli dürüstlük

Kod görevi. Avukat metni, KVKK paragrafı, index kararı, DNS, FastAPI, klinik/doktor dosyası bu sohbette yok. Kapsam genişletilmez. Belirsizlikte dur; rapora `BLOCKED — CTO` yaz. PR merge edilmez.

Hesap: `patient@mediqueue.com` / `Demo1234!`. Panel: `web-patient` :3002. API local (`backend/README.md`).

---

## Hedef

Oturum yokken sahte klinik listesi gerçek katalog gibi durmasın. Mesaj penceresi sahte sohbeti gerçek operasyon gibi bırakmasın.

1. `web-patient/src/lib/services/clinics.ts`
   - Token yokken `mockClinics` dönme: boş liste. `DataSource` (`"api" | "mock" | "hybrid"`, `lib/api/types.ts`) genişletilmez; çağıran taraf "liste boş + token yok" durumunu giriş çağrısı olarak gösterir.
   - Token varken `GET /clinics` (`apiFetch`). `catch`: timeout/network fırlat (mevcut); 401 → mevcut `clearSession`, mock yok; diğer 4xx/5xx → hata yüzeyi veya boş liste. Sahte katalog yok.
   - `fetchClinic` ve `fetchClinicDoctors` aynı kural. Token yokken `/clinics/[id]` mock detayı gerçek kayıt gibi açılmaz: boş veya girişe yönlendir (`/auth/login`).
2. `web-patient/src/components/clinics/ClinicsExplorer.tsx` ve `ClinicDetailView.tsx`: token yok ve liste boşken `lib/mock-data.ts` klinik adları (ör. "Anadolu Estetik & Cerrahi Merkezi") ekranda yok; görünen metin giriş çağrısı. Yalnız boş/giriş dalı değişir; sayfa yeniden tasarlanmaz.
3. Mesajlar: `web-patient/src/lib/services/messages.ts` bellek-içi mock; API'ye bağlanmaz. `web-patient/src/components/appointments/AppointmentChat.tsx` sahte balonu gerçek kanal gibi bırakmaz. `web-clinic/src/components/ui/ComingSoon.tsx` kalıbı `web-patient/src/components/ui/ComingSoon.tsx` olarak kopyalanır (`web-clinic` import edilmez); sohbet gövdesi `ComingSoonOverlay` ile örtülür. Gönder / sil tıklanmaz. Mock store silinmez.
4. Login öncesi kod yolu ve `mappers.ts` mock diziyi import etmeye devam edebilir; ekranda gösterilmez. Ana sayfa (`app/page.tsx`) vitrin kartları bu PR'de değişmez.

Bitti: logout `/clinics` sahte klinik göstermiyor, giriş çağrısı var. Login sonrası liste API'den geliyor ya da dürüst boş/hata. Sohbet penceresi "Yakında"; sahte mesaj gönderilmiyor.

---

## Kilitler

- `web-clinic`, `web-doctor`, `web-admin`, `web-marketing`, `backend/`, `ai/` yok. `site.ts`, `robots.ts` yok.
- `main`'den silinmiş `web-patient/playwright.config.ts` ve `tests/e2e/booking.spec.ts` geri gelmez. Yeni Playwright paketi, CI job'u, e2e yok. Rapora `PLAYWRIGHT: NOT ON MAIN`.
- KVKK / aydınlatma / hesap silme metni uydurulmaz. Erasure UI bu PR'de yok. `REQUIRES SEPARATE MILESTONE (FURKAN COPY)`.
- Public `portal.` DNS yok. Admin JWT yok.
- `furkan/brand-icon-and-clinic-nav` üzerine commit yok; başka branch'ten commit alınmaz.
- Force push, `reset --hard`, `.env` commit yok.

---

## Çalışma

```
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b furkan/m2-patient-honesty
git remote -v
git branch --show-current
git status
git rev-parse HEAD
```

Oku: `clinics.ts`, `ClinicsExplorer.tsx`, `ClinicDetailView.tsx`, `HybridBadge.tsx`, `messages.ts`, `AppointmentChat.tsx`, `lib/auth.ts` (`getToken`, `clearSession`), klinik `ComingSoon.tsx` (kopya için). Next için `web-patient/node_modules/next/dist/docs/`.

Stage: dokunulan `web-patient` dosyaları + `docs/go-live/furkan-m2-report.md`. Lint yalnız dokunulan dosyalar.

Doğrulama:

1. Logout, API ayakta: `http://localhost:3002/clinics` — mock klinik adı yok, giriş çağrısı var. `/clinics/1` aynı.
2. `patient@mediqueue.com` login — liste API kaydı veya dürüst boş. API kapatılınca sahte katalog yok; hata görünür.
3. Randevu sohbeti açılınca Yakında; gönder ve sil kapalı.

---

## Senaryolar

| Durum | Yap |
|---|---|
| Token yok | Boş + giriş çağrısı. Mock katalog yok |
| API hata, token var | Mock katalog yok |
| Daha güzel mock | Hayır |
| ClinicsExplorer'ı yeniden tasarlayayım | Hayır; yalnız boş/giriş dalı |
| Playwright'ı geri kurayım | Hayır |
| KVKK metni | Hayır |
| Klinik ComingSoon dosyasına yazayım | Hayır; kopya |
| Spesifikasyon suskun | `BLOCKED — CTO` |

---

## Kapanış (`docs/go-live/furkan-m2-report.md`)

```
git remote -v
git branch --show-current
git rev-parse HEAD

F4 LOGGED OUT CLINICS MOCK: CLOSED
F4 CLINIC DETAIL LOGGED OUT MOCK: CLOSED
F4 API ERROR FALLBACK MOCK: CLOSED
F4 MESSAGES HONEST: YES
F4 NEW ENDPOINT: NO
F4 PLAYWRIGHT: NOT ON MAIN
F5 ERASURE UI: NOT IN THIS PR
F6 LAWYER COPY: NOT IN THIS PR
FILES THIS CHAT:
RECOMMENDED NEXT STEP: erasure UI after lawyer copy
```
