# MEDIQUEUE — Top 20 Immediate Actions (OUTPUT E)

> Part of [AŞAMA 1 — AI Search Journey & Query Architecture](./README.md). İlk 10 madde, AŞAMA 0 audit'inde çıkarılan Top 10'un aynısıdır (referans için korunmuştur); 11-20 bu aşamada üretilen query/page/journey haritasından türetilmiştir. Bu liste henüz uygulanmadı — bir sonraki aşamada birlikte hayata geçirilecek.

| # | Aksiyon | Tip | Neden | Bağımlı olduğu |
|---|---|---|---|---|
| 1 | Clinic/Doctor liste+detay sayfalarında CSR → SSR fix (`ClinicsExplorer.tsx`, `ClinicDetailView.tsx`) | Kod | Crawler'lara/AI fetcher'lara giden ilk HTML boş skeleton — her şeyin ön koşulu | — |
| 2 | `app/robots.ts` + dinamik `app/sitemap.ts` | Kod | Crawl haritası yok, web-clinic/doctor/admin de yanlışlıkla indexlenebilir | — |
| 3 | Tüm route'larda Metadata + dinamik detay sayfalarında `generateMetadata` (canonical, OG, Twitter) | Kod | Her klinik/doktor aynı generic title'ı paylaşıyor | #1 |
| 4 | JSON-LD: Organization, WebSite, BreadcrumbList, MedicalBusiness, Physician, Review/AggregateRating, FAQPage | Kod | Sıfır structured data | #1 |
| 5 | `/treatments/{slug}` AI-citable pillar sayfaları (definition/cost/process/risk/FAQ) | Kod+İçerik | `page-architecture.md` MISSING listesinin en üst maddesi; Stage 1-2 sorgularının hedefi | #7 |
| 6 | Trust hub: `/about`, `/trust/clinic-verification`, `/faq`, `/legal/*` | Kod+İçerik | Stage 6 (Trust) — en yüksek AI-opportunity skoruna sahip stage, bugün karşılığı sıfır | — |
| 7 | Backend'e `Treatment` entity + `Clinic↔Treatment` ilişkisi + `slug` alanları (Clinic, Doctor) | Kod (backend) | Entity modelinin temeli; #5, #11, #15 bu olmadan yapılamaz | — |
| 8 | `HybridBadge`'in prod'a sızmadığını garanti et; web-clinic/doctor/admin'e noindex | Kod | Mock-data rozetinin canlıda görünmesi güveni zedeler | — |
| 9 | Filtreli `/clinics?...` URL'lerini canonical'la | Kod | Duplicate content riski | #1 |
| 10 | İngilizce içerik hattını başlat (routing kararı + ilk EN sayfalar) | Kod+İçerik | Site tamamen Türkçe, hedef sorguların çoğu İngilizce | #5 |
| 11 | `/clinics/{country}/{treatment}` ve `/clinics/{city}/{treatment}` route'larını uygula | Kod | Stage 4 (Provider Discovery) — `top-100-priority-queries.md`'nin en kalabalık hedef sayfası, bugün sadece query-string filtresi var | #7 |
| 12 | `/guides/how-to-choose-a-{slug}-clinic` şablonunu hair-transplant için canlıya al (pilot) | İçerik | Stage 8 (Decision) — journey'nin "Quote" adımında karşılığı sıfır olan tek nokta | #7 |
| 13 | `/compare/*` şablonunu kur, ilk 3 karşılaştırma sayfasını yaz (FUE vs DHI, Turkey vs Spain hair transplant, All-on-4 vs All-on-6) | Kod+İçerik | Stage 5 — AI answer engine'lerin en çok sentezlediği içerik tipi | — |
| 14 | Doktor/klinik `slug` alanlarını backend migration ile ekle, mevcut numeric-ID route'ları slug'a geçir | Kod (backend) | Semantik URL yok; `page-architecture.md`'deki tüm URL şeması buna bağımlı | #7 |
| 15 | AI Query Test Lab v1: `master-query-database.md`'deki 100 sorguluk "AI Recommendation Test Set"i ChatGPT/Gemini/Claude/Perplexity'de manuel test et, sonuçları `docs/ai-search/test-results/` altına kaydet | Ölçüm | Bugünkü baseline'ı bilmeden ilerleme ölçülemez | — |
| 16 | Review verisini AggregateRating/Review JSON-LD'ye bağla | Kod | Gerçek review verisi var (`reviews.py`) ama hiç structured data'ya aktarılmıyor | #4, #7 |
| 17 | Guide/treatment içeriklerine "son güncelleme" tarihi + editöryal inceleme notu ekle | Kod+İçerik | E-E-A-T için author/reviewer/update-date sinyali bugün hiç yok | #5, #6 |
| 18 | `user-journey-map.md`'e göre mevcut sayfalar arası internal linking geçişi yap (clinic↔doctor zaten var, treatments→clinics eksik) | Kod | Orphan page riski; journey adımları arasında köprü yok | #1, #11 |
| 19 | `/doctors/{city}/{treatment}` konum/uzmanlık kırılımlı doktor keşif sayfası | Kod | Bugün sadece düz `/doctors` listesi var, journey'nin "Doctor" adımı zayıf | #7, #14 |
| 20 | Rakip araştırması (AŞAMA 0 §14 / bu aşamanın "Competitor Gaps" boşluğu) — canlı web taraması, ayrı bir tur olarak | Araştırma | AI Opportunity Score formülündeki "Competition" boyutu şu an modellenmiyor; skorların kalibrasyonu buna bağlı | #15 |

## Öncelik Sırası (ilk uygulama turu için önerim)

**1 → 2 → 8 → 3 → 4 → 7 → 6 → 5 → 11 → 15 → 13/12 → 14 → 18 → 9/10/16/17/19/20**

Mantık: önce crawler'ların gerçek içeriği görebilmesini sağla (1-4, 8), sonra entity/veri temelini kur (7), sonra en yüksek AI-opportunity'li boş alanları doldur (6, 5, 11), sonra ölçümü başlat (15) ki sonraki her adımın etkisini takip edebilelim.
