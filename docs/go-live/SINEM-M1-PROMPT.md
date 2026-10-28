# SINEM M1 — Klinik paneli dürüstlük + Faz 1 kontrol listesi

Tek PR, tek sohbet. Kod + `docs/go-live/sinem-*` dosyaları bu sohbette biter. Kapsam genişletilmez. Belirsizlikte dur; rapora `BLOCKED — CTO` yaz, PR'ı o haliyle bırak. PR merge edilmez.

DNS paneli, avukat, USHAŞ portalı, AWS konsolu açılmaz. O kutular boş şablon olarak açılır; `DONE` yazılmaz. Hukuki görüş üretilmez.

---

## Hedef

### A. Kod — `web-clinic` sahte operasyon kapansın

Kalıp mevcut: `web-clinic/src/components/ui/ComingSoon.tsx` (`ComingSoonOverlay`, `ComingSoonCard`). Örnek kullanım: `dashboard/market-analysis/page.tsx` ve `dashboard/forecasts/page.tsx` (şu an yalnız grafik örtülü). Yeni bileşen, yeni API, yeni mock yok. Mock silinmez; örtülür.

1. `PageHeader` kalsın, altındaki sahte gövde `ComingSoonOverlay` ile örtülsün (tıklama, toggle, indirme, gönderim kapanır):
   - `/dashboard/finance`
   - `/dashboard/campaigns`
   - `/dashboard/sponsorship`
   - `/dashboard/messages`
   - `/dashboard/consultations` (`lib/services/consultations.ts` JWT varken de mock döner)
2. Yarım overlay'ler tamamlanır:
   - `market-analysis`: "Anonim Rakip Karşılaştırması" tablosu da örtülür.
   - `forecasts`: "Yapay Zeka İçgörüleri" kartları da örtülür.
3. `/dashboard` Genel Bakış (`dashboard/page.tsx`, ~96–106): `profileViews` / `expectedRevenue` 0 ise `demoSummary`'ye düşüyor. "Platform Görünürlüğü" ve "Aylık Beklenen Gelir" kartları `ComingSoonCard` olur; bu iki alan için `demoSummary` fallback kalkar. "Yeni Randevu Talepleri", "Aktif Hastalar" ve talep listesi aynen durur.

Beş sayfa `"use client"`; overlay client'ta çalışır. Import: `import { ComingSoonOverlay, ComingSoonCard } from "@/components/ui/ComingSoon";`

Bitti (kod): login sonrası finance / campaigns / sponsorship / messages / consultations'ta Yakında katmanı var; sahte fatura, kampanya, mesaj, danışma işlemi tıklanmıyor. Dashboard'da sahte gelir ve görüntülenme yok. Talepler sayfası çalışıyor.

### B. Dosyalar — `docs/go-live/`

1. `sinem-faz1-checklist.md`
   - **S5 envanter.** Kodu okuyarak doldur; tıklama gerekmez. 11 rota: `/dashboard`, `/dashboard/requests`, `/dashboard/doctors`, `/dashboard/profile`, `/dashboard/campaigns`, `/dashboard/finance`, `/dashboard/sponsorship`, `/dashboard/market-analysis`, `/dashboard/forecasts`, `/dashboard/messages`, `/dashboard/consultations`. Sütunlar: veri kaynağı (API / mock / overlay), ComingSoon var mı, yatırımcıya sahte-gerçek riski. Overlay uygulandıktan sonraki son hal yazılır; iyi görünen satır gizlenmez.
   - **S1 domain.** Durum kolonu boş: `UNCHECKED`. Satırlar: apex `getmediqueue.com` → `https://www.getmediqueue.com` 301+SSL; `getmediqueue.info` / `.net` / `.com.tr`; `admin.getmediqueue.com` rezerve (A/AAAA/CNAME yok); `mediqueue.co` = `NOT OURS`.
   - **S3 USHAŞ.** Boş. Başlıklar: HealthTürkiye üyelik, EK-1/B vs EK-3/B, 7/24 iki dil çağrı veya çağrı merkezi, 1618 acente, mahal incelemesi, Demo Day = ürün gösterimi. Durum `USHAŞ IN PROGRESS`. `CLOSED LICENSE` yazılmaz.
   - **S4 tavan.** Aşağıdaki "Tavan" bölümü. `PRICE CEILING APPROVED:` satırı boş kalır; insan doldurur.
   - **S2 avukat.** Teknik not var: `docs/go-live/azra-avukat-teknik.md` (main'de yoksa `git show origin/azra/a6-doctor-honesty:docs/go-live/azra-avukat-teknik.md`). Avukatın yazılı (a) staging (b) yerleşim cümlesi yok. Satır: `LAWYER SENTENCE: NOT WRITTEN`. Cümle uydurulmaz.
2. `sinem-demo-script.md` — yerel prova taslağı. Staging URL yok; her URL satırı `STAGING URL NOT YET`. Üç adım:
   1. Hasta `patient@mediqueue.com` / `Demo1234!` — `web-patient` :3002 — randevu talebi.
   2. Klinik `clinic@mediqueue.com` / `Demo1234!` — `web-clinic` :3000 — talebi onayla. Growth menüsüne girilirse söz: "bu Yakında".
   3. Doktor `doctor@mediqueue.com` / `Demo1234!` — `web-doctor` :3001 — takvim (A6 ile API'ye bağlı; doktor koduna girilmez).
   Admin gösterilmez. KPI slaytında mock sayı yok.
3. `sinem-m1-report.md` — kapanış formu (aşağıda).

---

## Tavan (sayı uydurma)

Kaynak `main`'de: `docs/go-live/kasim-price-list.md`. Senaryo A (1× m7i.xlarge) ve B (2× m7i.large) aynı ham toplam. Checklist'e:

- Ham aylık toplam (A ve B, dosyadan)
- × 1.3 ara sonuç (aritmetik satırda gösterilir)
- Hariç tutulanlar, dosyadaki cümleyle (ALB LCU-saat, veri transferi, EBS snapshot, Frankfurt kontrol düzlemi)
- `PRICE CEILING APPROVED:` boş

Çarpanı insan onaylar; Cursor onay satırını doldurmaz. Alarmı Kasım kurar. `docs/go-live/kasim-frankfurt-data-path.md` okunur, avukat cümlesi üretilmez. "Veri Türkiye'de" yazılmaz.

---

## Bağlam

Pazarlama sessiz-canlı: https://www.getmediqueue.com. Klinik paneli kamuya açık production değil.

`web-clinic/src/lib/services/growth.ts`: campaigns, messages, forecasts, finance, sponsorship, market-analysis — API yok, hep mock. `consultations.ts` aynı. Overlay bunun üzerine.

Repo: `https://github.com/mediqueue-app/mediqueue-app.git`. Başka org'a push yok. Açık PR #8 (`azra/a6-doctor-honesty`, web-doctor) dokunulmaz. `furkan/brand-icon-and-clinic-nav` klinik `Sidebar.tsx` ve favicon'u değiştiriyor; o dosyalar bu PR'de yok.

---

## Kilitler

- Kod yalnız `web-clinic` dashboard sayfa sarmalayıcıları + dashboard'daki iki KPI kartı + `docs/go-live/sinem-*`.
- `ComingSoon.tsx` yeniden yazılmaz (kırık import hariç).
- AuthGuard, `ui-locale`, `Sidebar.tsx`, favicon, `web-doctor`, `web-patient`, `web-admin`, `web-marketing`, `backend/`, `ai/`, Docker, JWT yok.
- `growth.ts` / `growth-mock.ts` / `clinic-mock.ts` "daha güzel mock" yok.
- `/dashboard/requests`, `/dashboard/doctors`, `/dashboard/profile` overlay yok.
- FastAPI endpoint, mesaj backend, finans API yok.
- Başka branch'ten commit alınmaz, merge edilmez; diğer dosyalar yalnız `git show` ile okunur.
- Domain `DONE`, USHAŞ `CLOSED`, avukat cümlesi, tavan onayı Cursor tarafından yazılmaz. `mediqueue.co` alınmaz. `site.ts` yok.
- Force push, `reset --hard`, `.env` commit yok.

Sonraki tur (bu PR'de yok, raporda silinmez): staging URL gelince prova; avukat (a)(b) cümlesi gelince checklist'e yapıştırma. Etiket `REQUIRES SEPARATE MILESTONE (SINEM M2)`.

---

## Çalışma

```
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b sinem/m1-clinic-honesty
git remote -v
git branch --show-current
git status
git rev-parse HEAD
```

Oku: `ComingSoon.tsx`, yedi dashboard sayfası (finance, campaigns, sponsorship, messages, consultations, market-analysis, forecasts), `dashboard/page.tsx`, `growth.ts`, `consultations.ts`. AuthGuard ve Sidebar yalnız okunur. Next API için `web-clinic/node_modules/next/dist/docs/`; ezbere App Router yazılmaz.

Stage: dokunulan `web-clinic` sayfaları + `docs/go-live/sinem-faz1-checklist.md` + `docs/go-live/sinem-demo-script.md` + `docs/go-live/sinem-m1-report.md`. Başkasının dosyası silinmez. Lint yalnız dokunulan dosyalar; pre-existing lint'e girilmez.

Doğrulama (local `web-clinic`, API ayakta — `backend/README.md`; `clinic@mediqueue.com` / `Demo1234!`):

1. `/dashboard/finance`, `/campaigns`, `/sponsorship`, `/messages`, `/consultations` — Yakında; indirme, toggle, gönder kapalı.
2. `/dashboard/market-analysis` tablo ve `/forecasts` içgörüleri de örtülü.
3. `/dashboard` — gelir ve görünürlük kartı Yakında; talep kartları ve liste durur.
4. `/dashboard/requests` — overlay yok, liste çalışır.
5. Checklist: envanter dolu; domain `UNCHECKED`; USHAŞ `IN PROGRESS`; tavan onay satırı boş; avukat `NOT WRITTEN`.

---

## Senaryolar

| Durum | Yap |
|---|---|
| ComingSoon'u sıfırdan yazayım | Hayır; mevcut dosya |
| Mock'u sileyim | Hayır; ört |
| growth.ts'i API'ye bağlayayım | Hayır |
| Tüm dashboard'u örteyim | Hayır; yalnız iki KPI |
| requests / doctors / profile overlay | Hayır |
| Sidebar, favicon, AuthGuard | Hayır |
| Price List'te olmayan USD | Yazma |
| Onay / domain / USHAŞ / avukat satırı | Boş / `UNCHECKED` / `IN PROGRESS` / `NOT WRITTEN` |
| Staging URL | `STAGING URL NOT YET` |
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
S4 RAW MONTHLY USD (from kasim-price-list.md):
S4 TIMES 1.3 (arithmetic shown):
PRICE CEILING APPROVED: (human fills; Cursor leaves blank)
S2 LAWYER TECH NOTE: PRESENT (azra-avukat-teknik.md)
S2 LAWYER SENTENCE (a)(b): NOT WRITTEN
DATA-IN-TURKEY PUBLIC CLAIM: FORBIDDEN
S1 DOMAIN CHECKLIST: UNCHECKED
S3 USHAŞ: IN PROGRESS
S7 DEMO SCRIPT: DRAFT / STAGING URL NOT YET
FILES THIS CHAT:
RECOMMENDED NEXT STEP: ceiling + domain filled by human; staging rehearsal after Kasım URL
```
