Sinem,

Azra — CTO. Bu senin tek Milestone turu. Metnin tamamını Cursor’a yapıştırıp uygula. İkinci bir “küçük” mesaj beklenmiyor: kod, envanter, tavan hesabı, domain/USHAŞ kutuları ve demo script taslağı bu sohbette biter.

Bu tur hem **kod** hem **kanıt dosyasıdır**. Spesifikasyon bende. Aşağıdaki kilitler yeniden açılmaz. Belirsizlikte dur. Rapora `BLOCKED — CTO` yaz, PR’ı o haliyle bırak. Ben kapatırım.

Takılırsan bana gel (30–60 dk). PR merge etme.

Cursor DNS, avukat ve USHAŞ portalını tıklamaz. O kutuları boş şablon olarak açar. Gerçek 301’i, kickoff tarihini ve tavan onayını **sen** yazarsın. Model hukuki görüş üretmez.

---

## Senden istediğim sonuç

### A. Klinik kodu — sahte operasyon kapansın

Klinik panelinde sahte büyüme, finans, mesaj ve danışma sayıları gerçek operasyon gibi durmasın. Yeni bileşen, yeni API, yeni mock veri yok. Mevcut `ComingSoonOverlay` / `ComingSoonCard` kopyalanır.

Kalıp (oku, kopyala):

- `web-clinic/src/components/ui/ComingSoon.tsx`
- `web-clinic/src/app/dashboard/market-analysis/page.tsx` (grafik overlay; tablo hâlâ açık)
- `web-clinic/src/app/dashboard/forecasts/page.tsx` (grafik overlay; içgörü kartları hâlâ açık)

1. Şu sayfalarda `PageHeader` kalsın; **altındaki sahte gövdeyi** `ComingSoonOverlay` ile ört (alttaki mock UI silinmez, tıklama ve gönderim kapanır):
   - `/dashboard/finance`
   - `/dashboard/campaigns`
   - `/dashboard/sponsorship`
   - `/dashboard/messages`
   - `/dashboard/consultations` (`consultations.ts` JWT varken de mock)
2. Yarım overlay’ler:
   - `market-analysis`: rakip tablosu (“Anonim Rakip Karşılaştırması”) da overlay’e girer. Grafik zaten örtülü. Tüm sahte blok örtülür.
   - `forecasts`: “Yapay Zeka İçgörüleri” kartları da örtülür.
3. `/dashboard` Genel Bakış: **yalnız iki sahte KPI.** `page.tsx` içinde `profileViews` / `expectedRevenue` yoksa veya 0 ise `demoSummary`’ye düşüyor (satır ~96–106). “Platform Görünürlüğü” ve “Aylık Beklenen Gelir” kartlarını `ComingSoonCard` ile değiştir. Bu iki alan için `demoSummary` fallback’i kalkar. “Yeni Randevu Talepleri” ve “Aktif Hastalar” + talep listesi durur.

Bitti (kod): login sonrası finance / campaigns / sponsorship / messages / consultations’ta Yakında katmanı var; sahte fatura, kampanya, mesaj, danışma işlemi tıklanmaz. Dashboard’da sahte gelir ve görüntülenme yok. Talepler sayfası çalışır.

### B. Dosyalar — aynı PR, aynı sohbet

Repo’ya şunlar da girer. Hepsi `docs/go-live/` altında.

1. `sinem-faz1-checklist.md`
   - **S5 envanter.** Kodu okuyup doldur. En az şu 11 rota: `/dashboard`, `/dashboard/requests`, `/dashboard/doctors`, `/dashboard/profile`, `/dashboard/campaigns`, `/dashboard/finance`, `/dashboard/sponsorship`, `/dashboard/market-analysis`, `/dashboard/forecasts`, `/dashboard/messages`, `/dashboard/consultations`. Sütunlar: kaynak (API / mock / overlay), ComingSoon var mı, yatırımcıya sahte-gerçek riski. İyi görünen satırı gizleme. Bu tabloyu senin tıklaman gerekmez; Cursor kodu okuyarak doldurur. Overlay’i uyguladıktan sonra tablo **son hali** söyler.
   - **S1 domain kutuları.** Boş durum kolonu: `UNCHECKED`. Cursor `DONE` yazmaz. Satırlar: apex `getmediqueue.com` → `https://www.getmediqueue.com` 301+SSL; `getmediqueue.info` / `.net` / `.com.tr`; `admin.getmediqueue.com` rezerve (A/AAAA/CNAME yok); `mediqueue.co` = `NOT OURS`.
   - **S3 USHAŞ kutuları.** Boş. Başlıklar: HealthTürkiye üyelik, EK-1/B vs EK-3/B, 7/24 iki dil çağrı veya çağrı merkezi, 1618 acente, mahal incelemesi, Demo Day = ürün gösterimi. Tarih yoksa durum `USHAŞ IN PROGRESS`. `CLOSED LICENSE` yazılmaz.
   - **S4 tavan hesabı.** Aşağıdaki “Tavan” bölümü. Onay satırı boş kalır; sen doldurursun.
   - **S2 avukat.** `docs/go-live/azra-avukat-teknik.md` bu branch’te yok. Satır: `BLOCKED ON CTO A1`. Gündem, (a) ve (b) cümlesi uydurulmaz.
2. `sinem-demo-script.md` — yerel prova taslağı. Staging URL yazma; her URL satırı `STAGING URL NOT YET`. Üç adım:
   1. Hasta `patient@mediqueue.com` / `Demo1234!` — randevu talebi. Portal hostu local `web-patient`.
   2. Klinik `clinic@mediqueue.com` / `Demo1234!` — talebi onayla. Growth menüsüne girilirse söz: “bu Yakında”.
   3. Doktor `doctor@mediqueue.com` / `Demo1234!` — takvim. Takvim dürüstlüğü Azra’nın işi; sen doktor koduna girmezsin.
   Admin gösterilmez. KPI slaytında mock sayı yok.
3. `sinem-m1-report.md` — kapanış formu (aşağıda).

---

## Tavan (Kasım dosyasını oku, sayı uydurma)

Price List `main`’de değil. PR #6 branch’inde:

`git show origin/kasim/m1-staging-readiness:docs/go-live/kasim-price-list.md`

O dosyayı kendi branch’ine merge etme. İçinden senaryo A ve B aylık ham toplamını al. İkisi de aynı ham toplamdır (1× m7i.xlarge ile 2× m7i.large aynı USD). Checklist’e şunu yaz:

- Ham toplam (dosyadaki A ve B)
- × 1.3 ara sonuç (aritmetiği satırda göster)
- Hariç tutulanlar dosyada ne diyorsa onu kopyala (LCU, transfer, snapshot, Frankfurt kontrol düzlemi)
- `PRICE CEILING APPROVED:` satırını **boş** bırak

400–800 USD ezberi yok. Çarpanı sen onaylarsın; Cursor onay satırını doldurmaz. Alarmı Kasım kurar, bu sohbette AWS konsolu yok.

Frankfurt notu (`kasim-frankfurt-data-path.md`) aynı branch’te duruyor. Okuyup avukat cümlesi üretme. “Veri Türkiye’de” yazılmaz.

---

## Bağlam

Pazarlama sessiz-canlı: https://www.getmediqueue.com. Klinik paneli kamuya açık production değil.

`web-clinic/src/lib/services/growth.ts`: campaigns, messages, forecasts, finance, sponsorship, market-analysis — API yok, hep mock. Overlay bunun üzerine.

Repo: mediqueue-app. Başka org’a push yok. Remote: `https://github.com/mediqueue-app/mediqueue-app.git`.

Açık işler (dokunma): PR #6 Kasım backend, PR #7 Furkan hasta/admin/pazarlama. `furkan/brand-icon-and-clinic-nav` klinik `Sidebar.tsx` ve favicon değiştiriyor. O dosyalar sende yok.

---

## Kilitler

- Kod yalnız `web-clinic` sayfa sarmalayıcıları + dashboard’daki iki KPI kartı + `docs/go-live/sinem-*`.
- `ComingSoon.tsx` yeniden yazılmaz (kırık import hariç).
- AuthGuard, `ui-locale`, `Sidebar.tsx`, favicon, `web-doctor`, `web-patient`, `web-admin`, `web-marketing`, `backend/`, Docker, JWT, rate limit yok.
- `growth.ts` / `growth-mock.ts` / `clinic-mock.ts` “daha güzel mock” yok. Mock silinmez; örtülür.
- `/dashboard/requests`, `/dashboard/doctors`, `/dashboard/profile` overlay yok.
- FastAPI endpoint, mesaj backend, finans API yok.
- Kasım branch’ini merge etme. Price List’i `git show` ile oku.
- `azra/m1-clinic-auth-locale` üzerine commit atma. `main`’de olmayan `7af674d` commit’ini alma.
- Domain 301’i Cursor DONE işaretlemez. USHAŞ lisansı kapanmış yazılmaz. Avukat cümlesi uydurulmaz. `mediqueue.co` alınmaz. `site.ts` yok.
- Force push, `reset --hard`, `.env` commit yok. Merge sende değil.

Sonraki tur (bu PR’de yok, silinmez): staging URL gelince prova; avukat (a)(b) cümlesi `azra-avukat-teknik.md` gelince checklist’e yapıştırma. Etiket: `REQUIRES SEPARATE MILESTONE (SINEM M2)`.

---

## Bugün kodda ne var

Overlay var: `market-analysis/page.tsx` yalnız grafik. `forecasts/page.tsx` yalnız grafik.

Overlay yok, mock gövde duruyor: `finance/page.tsx`, `campaigns/page.tsx`, `sponsorship/page.tsx`, `messages/page.tsx`, `consultations/page.tsx`.

`dashboard/page.tsx`: iki KPI `demoSummary` fallback.

`consultations.ts`: backend yok, mock dönüyor.

Next: `web-clinic/node_modules/next/dist/docs/` — ezbere App Router yazma. `finance` / `campaigns` / `messages` `"use client"`; overlay client’ta çalışır. Import: `import { ComingSoonOverlay } from "@/components/ui/ComingSoon";` Kart: `ComingSoonCard`.

---

## Nasıl çalışırsın

```
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b sinem/m1-clinic-honesty
```

Başlamadan kaydet:

```
git remote -v
git branch --show-current
git status
git rev-parse HEAD
```

Oku: `ComingSoon.tsx`, market-analysis, forecasts, finance, campaigns, sponsorship, messages, consultations, dashboard `page.tsx`. AuthGuard’ı okuma yeter; değiştirme. Sidebar’ı değiştirme.

Price List için yalnız `git show` (yukarıdaki komut). O branch’e geçme.

Stage: dokunduğun `web-clinic` sayfaları + `docs/go-live/sinem-faz1-checklist.md` + `docs/go-live/sinem-demo-script.md` + `docs/go-live/sinem-m1-report.md`. Başkasının dosyasını silme.

Lint: dokunduğun `web-clinic` dosyaları. Pre-existing lint’e girme.

Doğrulama (local `web-clinic`, seed `clinic@mediqueue.com` / `Demo1234!` — README):

1. `/dashboard/finance` `/campaigns` `/sponsorship` `/messages` `/consultations` — Yakında; sahte indirme, toggle, gönder kapalı.
2. `/dashboard/market-analysis` ve `/forecasts` — tablo ve içgörüler de örtülü.
3. `/dashboard` — gelir ve görünürlük kartı Yakında; talep kartları durur.
4. `/dashboard/requests` — overlay yok, liste durur.
5. Checklist’te envanter dolu; domain/USHAŞ `UNCHECKED` veya `IN PROGRESS`; tavan onay satırı boş; avukat `BLOCKED ON CTO A1`.

Sen, Cursor bittikten sonra (ayrı sohbet değil, sen doldurursun): gizli pencerede apex 301, USHAŞ kickoff tarihi, `PRICE CEILING APPROVED` sayısı. Bunlar boş kalırsa rapor dürüst kalır; sahte DONE yok.

---

## Senaryolar

| Durum | Yapacağın |
|--------|-----------|
| ComingSoon’u sıfırdan yazayım | Hayır; mevcut dosya |
| Mock veriyi sileyim | Hayır; ört |
| growth.ts’i API’ye bağlayayım | Hayır |
| Tüm dashboard’u örteyim | Hayır; yalnız iki sahte KPI |
| requests / doctors / profile overlay | Hayır |
| Sidebar, favicon, AuthGuard | Hayır |
| Kasım veya Furkan branch’ine commit | Hayır |
| Price List’te olmayan USD | Yazma |
| Onay satırını Cursor doldursun | Hayır; boş |
| Avukat cümlesi | `BLOCKED ON CTO A1` |
| Domain’i DONE yazayım | Hayır; `UNCHECKED` |
| USHAŞ lisansı bitti | Hayır; `IN PROGRESS` |
| Staging URL uydurayım | `STAGING URL NOT YET` |
| Spesifikasyon suskun | `BLOCKED — CTO` |

---

## Kapanış (`docs/go-live/sinem-m1-report.md`)

```
git remote -v
git branch --show-current
git rev-parse HEAD

S1 FINANCE OVERLAY: YES / NO
S1 CAMPAIGNS OVERLAY: YES / NO
S1 SPONSORSHIP OVERLAY: YES / NO
S1 MESSAGES OVERLAY: YES / NO
S1 CONSULTATIONS OVERLAY: YES / NO
S1 MARKET TABLE OVERLAY: YES / NO
S1 FORECAST INSIGHTS OVERLAY: YES / NO
S1 DASHBOARD FAKE KPI CARDS: YES / NO
S1 REQUESTS PAGE UNTOUCHED: YES / NO
S1 AUTHGUARD UNTOUCHED: YES
S1 SIDEBAR UNTOUCHED: YES
S1 NEW API: NO
S5 INVENTORY TABLE: DONE / NO
S4 RAW MONTHLY USD (from Kasım file):
S4 TIMES 1.3 (arithmetic shown):
PRICE CEILING APPROVED: (Sinem fills; Cursor leaves blank)
S2 LAWYER: BLOCKED ON CTO A1
DATA-IN-TURKEY PUBLIC CLAIM: FORBIDDEN
S1 DOMAIN CHECKLIST: UNCHECKED (Sinem clicks)
S3 USHAŞ: IN PROGRESS (Sinem dates)
S7 DEMO SCRIPT: DRAFT / STAGING URL NOT YET
FILES THIS CHAT:
RECOMMENDED NEXT STEP: Sinem fills ceiling + domain; lawyer waits for Azra A1; staging rehearsal waits for Kasım URL
```
