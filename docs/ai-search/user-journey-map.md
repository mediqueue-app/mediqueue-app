# MEDIQUEUE — User Journey Map (OUTPUT D)

> Part of [AŞAMA 1 — AI Search Journey & Query Architecture](./README.md). Sayfa tipleri ve URL şeması için [`page-architecture.md`](./page-architecture.md); tam sorgu listeleri için [`master-query-database.md`](./master-query-database.md).

Tek bir kullanıcının uçtan uca yolculuğu:

```
Problem → Treatment → Destination → Clinic → Doctor → Comparison → Trust → Quote → Booking → Travel → Treatment → Aftercare
```

Bu, `master-query-database.md`'deki 11 funnel stage'in kronolojik/deneyimsel sıralamasıdır (stage numaraları funnel-analiz sırasını, buradaki adımlar gerçek kullanıcı zaman çizelgesini yansıtır — örn. "Comparison" hem klinik seçmeden hem de teknik seçmeden önce tekrar tekrar ortaya çıkabilir).

---

## 1. Problem
**Karşılık gelen funnel stage:** Stage 1 — Problem / Discovery

- **Search queries:** "I want a hair transplant", "Dişlerimi yaptırmak istiyorum" (bkz. `master-query-database.md` Stage 1, 50 sorgu)
- **Target page(s):** `/treatments/{slug}` (henüz yok — bkz. `page-architecture.md` MISSING)
- **Entities:** MEDIQUEUE → Treatment
- **Internal links:** Treatment pillar sayfasından → `/treatments/{slug}/turkey` (destinasyon adımına köprü)
- **CTA:** "Bu tedavi hakkında daha fazla bilgi al" (yumuşak CTA — henüz satış değil)
- **Sonraki adım:** Treatment (kullanıcı zaten tedaviyi biliyorsa bu adım atlanır, doğrudan Treatment/Destination'dan başlar)

## 2. Treatment
**Karşılık gelen funnel stage:** Stage 2 — Treatment Discovery

- **Search queries:** "Best country for hair transplant", "Why choose Turkey for dental implants?" (Stage 2, 50 sorgu)
- **Target page(s):** `/treatments/{slug}/turkey`
- **Entities:** MEDIQUEUE → Treatment → Country:Turkey
- **Internal links:** → `/clinics/turkey` (ülke hub'ı), → `/treatments/{slug}/turkey/cost`
- **CTA:** "Türkiye'deki klinikleri gör"
- **Sonraki adım:** Destination

## 3. Destination
**Karşılık gelen funnel stage:** Stage 3 — Destination Discovery

- **Search queries:** "Hair transplant Istanbul", "Is Turkey good for dental tourism?" (Stage 3, 50 sorgu)
- **Target page(s):** `/clinics/{city}` veya `/clinics/{country}` (city/country hub'ları klinik listesiyle birleşik — ayrı bir destinasyon sayfası yok, bkz. `page-architecture.md` §3)
- **Entities:** MEDIQUEUE → Treatment → Country → City
- **Internal links:** → `/clinics/{city}/{treatment}` (provider adımına köprü)
- **CTA:** "Bu şehirdeki klinikleri filtrele"
- **Sonraki adım:** Clinic

## 4. Clinic
**Karşılık gelen funnel stage:** Stage 4 — Provider Discovery

- **Search queries:** "Best hair transplant clinics in Istanbul", "Reliable dental clinics in Turkey" (Stage 4, 50 sorgu — bu repo'nun **en yüksek AI-opportunity skoruna sahip** stage'lerinden biri, bkz. `top-100-priority-queries.md`)
- **Target page(s):** `/clinics/{city}/{treatment}` → `/clinics/{clinic-slug}`
- **Entities:** MEDIQUEUE → Treatment → City → Clinic
- **Internal links:** Klinik detay sayfasından → ilgili doktorlara (`/doctors/{doctor-slug}`), → `/trust/clinic-verification`
- **CTA:** "Klinik detaylarını incele"
- **Sonraki adım:** Doctor

## 5. Doctor
- **Search queries:** "Hair transplant doctors in Istanbul" (Stage 4 alt kümesi)
- **Target page(s):** `/doctors/{city}/{treatment}` → `/doctors/{doctor-slug}`
- **Entities:** MEDIQUEUE → Doctor → Clinic → Treatment
- **Internal links:** Doktor sayfasından → çalıştığı kliniğe geri link (mevcut `doctors/[id]/page.tsx` içinde zaten var — bkz. AŞAMA 0 audit, korunmalı)
- **CTA:** "Bu doktordan randevu talep et"
- **Sonraki adım:** Comparison

## 6. Comparison
**Karşılık gelen funnel stage:** Stage 5 — Comparison

- **Search queries:** "FUE vs DHI", "Turkey vs Spain for hair transplant", "Clinic A vs Clinic B" (Stage 5, 50 sorgu)
- **Target page(s):** `/compare/{slug}`
- **Entities:** MEDIQUEUE → Treatment ↔ Treatment, veya Country ↔ Country, veya Clinic ↔ Clinic
- **Internal links:** Karşılaştırma sayfasından → her iki seçeneğin kendi sayfasına, → `/trust/clinic-verification`
- **CTA:** "Bu kriterlere göre klinik filtrele"
- **Sonraki adım:** Trust (karar öncesi son doğrulama adımı — genellikle Comparison ile birlikte, bazen tekrar tekrar ziyaret edilir)

## 7. Trust
**Karşılık gelen funnel stage:** Stage 6 — Trust / Verification

- **Search queries:** "How do I know if a clinic in Turkey is legitimate?", "How does MEDIQUEUE verify clinics?" (Stage 6, 50 sorgu — **MEDIQUEUE'nun en kritik farklılaştırma noktası**, bkz. AŞAMA 0 §9 Clinic Verification System)
- **Target page(s):** `/trust/clinic-verification`, `/trust/doctor-verification`
- **Entities:** MEDIQUEUE → Clinic → Review
- **Internal links:** Trust hub'dan → her doğrulanmış kliniğe, → About/editorial policy sayfasına
- **CTA:** "Doğrulanmış klinikleri gör"
- **Sonraki adım:** Quote

## 8. Quote
**Karşılık gelen funnel stage:** Stage 7 — Price / Value + Stage 8 — Decision

- **Search queries:** "How much does hair transplant cost in Turkey?", "Which clinic should I choose?" (Stage 7: 50, Stage 8: 50 sorgu)
- **Target page(s):** `/treatments/{slug}/turkey/cost`, `/guides/how-to-choose-a-{slug}-clinic`
- **Entities:** MEDIQUEUE → Treatment → Country, MEDIQUEUE → Clinic → Guide
- **Internal links:** Fiyat sayfasından → doğrudan booking widget'ına (mevcut `BookingWidget.tsx` bileşeni)
- **CTA:** "Ücretsiz teklif al"
- **Sonraki adım:** Booking

## 9. Booking
**Karşılık gelen funnel stage:** Stage 9 — Transactional

- **Search queries:** "Book hair transplant Turkey", "Find a dental clinic in Istanbul" (Stage 9, 50 sorgu)
- **Target page(s):** `/clinics/{city}/{treatment}` (booking CTA ile), mevcut `/appointments` akışı
- **Entities:** MEDIQUEUE → Clinic → Doctor → Treatment
- **Internal links:** Booking onayından → Pre-Treatment guide'a
- **CTA:** "Randevu talebini onayla"
- **Sonraki adım:** Travel

## 10. Travel
**Karşılık gelen funnel stage:** Stage 10 — Pre-Treatment

- **Search queries:** "How should I prepare for hair transplant?", "How long should I stay in Turkey?" (Stage 10, 30 sorgu)
- **Target page(s):** `/guides/preparing-for-{slug}-in-turkey`
- **Entities:** MEDIQUEUE → Treatment → Guide
- **Internal links:** Hazırlık rehberinden → kliniğin kendi lojistik notlarına (varsa)
- **CTA:** "Seyahat kontrol listesini indir"
- **Sonraki adım:** Treatment (platform dışı gerçekleşir — MEDIQUEUE'nun rolü burada bilgilendirme)

## 11. Treatment (gerçekleşme)
- Bu adım platform dışında (klinikte) gerçekleşir; MEDIQUEUE'nun içerik/entity sorumluluğu yok, ama **review toplama** burada tetiklenir (tedavi sonrası e-posta/bildirim akışı — mevcut sistemde yok, gelecek iş).

## 12. Aftercare
**Karşılık gelen funnel stage:** Stage 11 — Post-Treatment

- **Search queries:** "Hair transplant aftercare", "When can I fly after surgery?" (Stage 11, 30 sorgu)
- **Target page(s):** `/guides/{slug}-aftercare`
- **Entities:** MEDIQUEUE → Treatment → Guide
- **Internal links:** Aftercare sayfasından → review bırakma akışına, → ilgili tedavi pillar sayfasına (döngüyü kapatır — bu kullanıcı artık bir sonraki hastaya "review/trust" sinyali sağlayan kaynak olur)
- **CTA:** "Deneyimini paylaş"
- **Döngü:** Bu adımdaki review'lar, Stage 6 (Trust) ve Stage 4 (Provider Discovery) sayfalarını besler — journey burada kapanmıyor, bir sonraki kullanıcının Trust adımına girdi oluyor.

---

## Journey Genelinde Gözlenen Mimari Gereksinim

Bu 12 adımın **hiçbiri** bugün `/trust/*`, `/compare/*`, `/guides/*`, `/research/*` sayfa tiplerine sahip değil (bkz. `page-architecture.md` §3 MISSING). Journey'nin ortasındaki en kritik iki adım — **Trust** ve **Quote/Decision** — MEDIQUEUE'nun bugün en zayıf olduğu yerler; bu da `immediate-actions.md`'deki önceliklendirmeyi doğrudan şekillendiriyor.
