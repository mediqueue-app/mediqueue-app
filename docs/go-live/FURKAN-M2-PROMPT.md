Furkan,

Azra — CTO. Milestone 1 kapandı (PR #7 `main`’de). Bu senin sonraki tek turun. Metnin tamamını Cursor’a yapıştırıp uygula. Kapsamı büyütme.

Bu bir **kod** görevidir. Avukat metni, KVKK paragrafı, index kararı, DNS, FastAPI ve klinik/doktor dosyası bu sohbette yok. Belirsizlikte dur. Rapora `BLOCKED — CTO` yaz. PR merge etme.

---

## Senden istediğim sonuç

Hasta tarafında, oturum yokken sahte klinik listesi gerçek katalog gibi durmasın. Mesaj penceresi sahte sohbeti gerçek operasyon gibi bırakmasın.

Hesap: `patient@mediqueue.com` / `Demo1234!`. Panel: `web-patient` `:3002`.

1. `web-patient/src/lib/services/clinics.ts`
   - Token yokken `mockClinics` dönme. Boş liste + kaynak `api` değil, yeni bir kaynak uydurma: mevcut `DataSource` tipi neyse ona uy, uymuyorsa çağıran tarafta boş listeyi “giriş yap” durumu olarak ele al.
   - `ClinicsExplorer` (`web-patient/src/components/clinics/ClinicsExplorer.tsx`): liste boş ve token yokken İstanbul’daki sahte klinik adları görünmesin. Görünen metin: giriş yap. `web-patient/src/lib/mock-data.ts` içindeki klinik adları (ör. Anadolu Estetik) logout `/clinics` ekranında yok.
   - Token varken `GET /clinics` (mevcut `apiFetch`). Hata olunca `mockClinics`’e düşme. Timeout/network fırlat. 401 mevcut oturum temizleme varsa onu koru, sonra mock yok. Diğer 4xx/5xx: hata yüzeyi veya boş liste; sahte katalog yok.
   - `fetchClinic` ve `fetchClinicDoctors` aynı kural. Token yokken mock doktor/klinik detayı gerçek kayıt gibi açılmasın: boş veya girişe yönlendir.
2. Mesajlar: `web-patient/src/lib/services/messages.ts` bellek-içi mock. API’ye bağlama. `web-patient/src/components/appointments/AppointmentChat.tsx` sahte balonu gerçek kanal gibi bırakma. `web-clinic` dosyasını import etme. `web-doctor/src/components/ui/ComingSoon.tsx` kalıbını `web-patient` içine kopyala ve sohbet gövdesinin üstüne ört. Gönder / sil tıklanmasın. Mock store silinmez.
3. Token yokken birim test veya login öncesi kod yolu, dosyadaki mock dizisini import etmeye devam edebilir. Ekranda gösterme.

Bitti: logout `/clinics` sahte klinik göstermiyor. Login sonrası liste API’den geliyor ya da dürüst boş/hata. Sohbet penceresi “Yakında”; sahte mesaj gönderilmiyor.

---

## Kilitler

- `web-clinic`, `web-doctor`, `web-admin`, `web-marketing`, `backend/` yok. `site.ts` ve `robots.ts` yok.
- `main`’den silinmiş `web-patient/playwright.config.ts` ve `tests/e2e/booking.spec.ts` geri gelmez. Yeni Playwright paketi, CI job’u ve e2e bu PR’de yok. Rapora `PLAYWRIGHT: NOT ON MAIN` yaz.
- KVKK / aydınlatma / hesap silme metni uydurma. `POST /v1/account/erasure` arayüzü bu PR’de yok. Metin avukatta. `REQUIRES SEPARATE MILESTONE (FURKAN COPY)`.
- Public `portal.` DNS yok. Admin JWT yok.
- Force push, `reset --hard`, `.env` commit yok.

---

## Nasıl çalışırsın

```
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b furkan/m2-patient-honesty
```

`furkan/brand-icon-and-clinic-nav` üzerine commit atma. O branch klinik `Sidebar.tsx` değiştiriyor.

Oku: `clinics.ts`, `ClinicsExplorer.tsx`, `messages.ts`, `AppointmentChat.tsx`, doktor panelindeki `ComingSoon.tsx` (kopya için). Next için `web-patient/node_modules/next/dist/docs/`.

Lint yalnız dokunduğun `web-patient` dosyaları.

Doğrulama:

1. API ayakta, logout `http://localhost:3002/clinics` — mock klinik adı yok, giriş çağrısı var.
2. `patient@mediqueue.com` login — liste API kaydı veya dürüst boş. Ağ kesilince sahte katalog yok.
3. Randevu sohbeti açılırsa Yakında; gönder kapalı.

---

## Senaryolar

| Durum | Yapacağın |
|--------|-----------|
| Token yok | Boş + giriş. Mock katalog yok |
| API hata, token var | Mock katalog yok |
| Daha güzel mock | Hayır |
| Playwright’ı geri kurayım | Hayır |
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
F4 API ERROR FALLBACK MOCK: CLOSED
F4 MESSAGES HONEST: YES
F4 NEW ENDPOINT: NO
F4 PLAYWRIGHT: NOT ON MAIN
F5 ERASURE UI: NOT IN THIS PR
F6 LAWYER COPY: NOT IN THIS PR
FILES THIS CHAT:
RECOMMENDED NEXT STEP: erasure UI after lawyer copy
```
