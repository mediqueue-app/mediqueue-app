# MEDIQUEUE — Page Architecture (OUTPUT C)

> Part of [AŞAMA 1 — AI Search Journey & Query Architecture](./README.md).

Bu doküman iki şeyi tanımlar: (1) MEDIQUEUE'nun sahip olması gereken sayfa tipleri ve URL şeması, (2) bunun mevcut `web-patient` mimarisiyle (AŞAMA 0 audit'te tespit edilen) karşılaştırmalı content-gap analizi.

## 1. URL Şeması

`master-query-database.md`'deki `Target Page` kolonu bu şemayı referans alır. İki farklı sıralama kuralı **bilinçli bir tasarım kararıdır**, çelişki değil:

- **Marketplace/browse sayfaları → konum-önce** (`/clinics/{location}/{treatment}`): kullanıcı bir pazaryerinde önce "nerede" filtreler, sonra "ne" filtreler — bu MEDIQUEUE'nun mevcut `ClinicsExplorer` filtre modeliyle (şehir + uzmanlık) zaten örtüşüyor.
- **Editöryal/bilgi içeriği → konu-önce** (`/treatments/{treatment}/{country}`): kullanıcı ve AI sistemleri bir konuyu ararken önce "ne" sorar, sonra "nerede" — topical authority bu sırayla kurulur.

| Sayfa Tipi | URL Şeması | Örnek | Amaç |
|---|---|---|---|
| Home | `/` | `/` | Marka + genel giriş noktası |
| **Treatment pillar** | `/treatments/{treatment}` | `/treatments/hair-transplant` | Tanım, kimin için uygun, süreç özeti — Stage 1-2 |
| **Treatment × Country** | `/treatments/{treatment}/turkey` | `/treatments/hair-transplant/turkey` | "Neden Türkiye" — Stage 2-3 |
| **Treatment cost guide** | `/treatments/{treatment}/turkey/cost` | `/treatments/hair-transplant/turkey/cost` | Fiyat aralığı, dahil/hariç — Stage 7. Sadece flagship tedaviler (hair-transplant, dental, cosmetic-surgery) için ayrı sayfa; diğerleri `/treatments/{t}/turkey#cost` bölümü olarak kalır (bkz. §3 — thin content önlemi) |
| **Country clinic hub** | `/clinics/{country}` | `/clinics/turkey` | Ülke bazlı klinik listesi — Stage 4 |
| **Country × Treatment listing** | `/clinics/{country}/{treatment}` | `/clinics/turkey/hair-transplant` | Filtrelenmiş klinik listesi — Stage 4, 9 |
| **City clinic hub** | `/clinics/{city}` | `/clinics/istanbul` | Şehir bazlı klinik listesi (aynı zamanda "destination hub" işlevi görür — ayrı bir `/destinations/*` sayfası açmıyoruz, bkz. §3) — Stage 3-4 |
| **City × Treatment listing** | `/clinics/{city}/{treatment}` | `/clinics/istanbul/hair-transplant` | Stage 4, 8, 9 |
| **Clinic detail** | `/clinics/{clinic-slug}` | `/clinics/istanbul-hair-center` | Mevcut `[id]` route'unun slug'a geçmiş hali |
| **Doctor detail** | `/doctors/{doctor-slug}` | `/doctors/dr-ayse-yilmaz` | Mevcut `[id]` route'unun slug'a geçmiş hali |
| **Doctor discovery** | `/doctors/{city}/{treatment}` | `/doctors/istanbul/hair-transplant` | Bugün yok — düz `/doctors` listesi var, konum/uzmanlık kırılımı yok |
| **Comparison** | `/compare/{slug}` | `/compare/fue-vs-dhi`, `/compare/turkey-vs-spain-hair-transplant` | Stage 5 |
| **Guide** | `/guides/{slug}` | `/guides/how-to-choose-a-hair-transplant-clinic`, `/guides/hair-transplant-aftercare` | Stage 8, 10, 11 |
| **Trust hub** | `/trust/{slug}` | `/trust/clinic-verification`, `/trust/doctor-verification` | Stage 6 |
| **Research** | `/research/{slug}` | `/research/2026-hair-transplant-cost-report` | AŞAMA 0 §7 first-party data çıktıları |
| Brand/legal | `/about`, `/faq`, `/legal/privacy`, `/legal/terms` | — | E-E-A-T temel sayfaları |

## 2. Entity Modeli

`master-query-database.md`'de her satırın `Entity` kolonu bu zinciri takip eder: `MEDIQUEUE -> Treatment:X -> Country:Y -> City:Z -> Clinic/Doctor/Guide/Review`.

| Entity | Kaynak | Durum (AŞAMA 0 audit'e göre) |
|---|---|---|
| MEDIQUEUE (Organization) | Marka | Var ama structured data'ya hiç aktarılmamış |
| Treatment | Yeni kavram | **Backend'de hiç yok** — sadece `web-patient/src/lib/mock-data.ts` içinde frontend mock objesi |
| Clinic | `backend/app/models/clinic.py` | Var (id, name, description, address, phone, city, languages) ama `slug`, `country`, `district`, `treatments` ilişkisi yok |
| Doctor | `backend/app/models/doctor.py` | Var ama `slug` yok |
| Country | Yeni kavram | Backend'de yok, `city` serbest metin string |
| City | `Clinic.city` / `Doctor.city` string kolonu | Yapılandırılmış entity değil |
| Destination | Yeni kavram | Country + City'nin birleşimi olarak modellenebilir, ayrı tablo gerekmez |
| Medical Specialty | `Doctor.specialty` string | Var ama Treatment'la ilişkilendirilmemiş |
| Guide | Yeni kavram | Hiç yok |
| Research | Yeni kavram | Hiç yok |
| Review | `backend/app/models/review.py` | Var, `reviews.py` API'si mevcut, ama Review/AggregateRating structured data'ya hiç aktarılmamış |

**Kritik veri modeli eksiği:** `Treatment` entity'sinin backend'de var olmaması, "Clinic → offers → Treatment" ilişkisinin (AŞAMA 0 §3'te istenen) bugün kurulamaz olduğu anlamına geliyor. Bu, `immediate-actions.md`'deki en yüksek öncelikli backend işlerinden biri.

## 3. Content Gap Analizi

### EXISTING (mevcut sistemde karşılığı olan)
- Ana sayfa (`/`), klinik listesi (`/clinics`), doktor listesi (`/doctors`), tedavi listesi (`/treatments`), "nasıl çalışır" (`/how-it-works`) — hepsi mevcut ama aşağıdaki WEAK bölümünde detaylandırıldığı gibi zayıf.

### MISSING (hiç karşılığı olmayan)
- `/treatments/{slug}` bireysel tedavi sayfaları (bugün sadece tek bir grid sayfası var, alt sayfa yok)
- `/treatments/{slug}/turkey`, `/treatments/{slug}/turkey/cost`
- `/clinics/{country}`, `/clinics/{city}` (bugün sadece query-string filtreleme var, kalıcı URL yok)
- `/compare/*` — hiç comparison content yok
- `/guides/*` — hiç guide/how-to içeriği yok
- `/trust/*`, `/about`, `/faq`, `/legal/*` — hiç trust/E-E-A-T sayfası yok
- `/research/*` — hiç first-party data içeriği yok
- `/doctors/{city}/{treatment}` — konum/uzmanlık kırılımlı doktor keşfi yok

### WEAK (karşılığı var ama yeterince güçlü değil)
- `/clinics/[id]` ve `/doctors/[id]`: içerik var ama (a) `/clinics/[id]` client-side render ediliyor (crawler'lara boş skeleton gidiyor — AŞAMA 0 §9), (b) `/doctors/[id]`'de hiç per-entity metadata yok, (c) hiçbiri structured data içermiyor, (d) ikisi de mock-data'ya bağımlı, canlı backend verisiyle senkron değil.
- `/treatments`: statik ve server-render ama tek sayfa — AI-citable derinlik (fiyat, süreç, risk, FAQ) yok, sadece kart grid'i.
- `/clinics`, `/doctors` liste sayfaları: client-side fetch ediliyor, ilk HTML'de içerik yok.

### HIGH PRIORITY (yüksek ticari + AI visibility potansiyeli)
`top-100-priority-queries.md`'nin üst sıralarına bakıldığında, en yüksek öncelik **Stage 6 (Trust)**, **Stage 8 (Decision)** ve **Stage 4 (Provider Discovery)** sorgularında — özellikle hair-transplant ve dental verticals'inde, Istanbul/Ankara/Izmir gibi şehir kırılımlarında. Bu üç stage için karşılık gelen sayfa tipleri (`/trust/clinic-verification`, `/guides/how-to-choose-*`, `/clinics/{city}/{treatment}`) bugün **hiç yok** — yani MEDIQUEUE'nun en çok kazanabileceği yerde bugün hiçbir varlığı yok.

## 4. Programmatic SEO Kalite Bariyeri

AŞAMA 0 §5'teki uyarı burada da geçerli: `/clinics/{city}/{treatment}` gibi kombinatoryal sayfalar üretilecekse, her sayfa o şehir+tedavi kombinasyonuna özgü gerçek bilgi taşımalı (o şehirdeki gerçek klinik sayısı, gerçek fiyat aralığı, şehre özgü lojistik notlar) — aynı template'in şehir adı değiştirilerek çoğaltılması yasak. Minimum kalite standardı: bir `/clinics/{city}/{treatment}` sayfası yayınlanabilmesi için o kombinasyonda **en az 2 doğrulanmış, aktif klinik kaydı** olmalı; aksi halde o sayfa üretilmemeli (thin/doorway page riski).
