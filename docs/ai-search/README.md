# MEDIQUEUE — AI Search Map (AŞAMA 1)

Bu klasör, AŞAMA 0 audit'inden (kod tabanı incelemesi) sonra üretilen **AI Search Query Map + User Journey Architecture**'ı barındırır. Amaç, kullanıcıların ChatGPT / Gemini / Claude / Perplexity / Google AI'a sağlık turizmiyle ilgili soru sorduğunda MEDIQUEUE'nun hangi sayfayla, hangi entity ile ve hangi içerikle cevap vermesi gerektiğini haritalamak.

**Bu aşamada kod değişikliği yapılmadı.** Burada üretilenler, sonraki aşamalarda (structured data, programmatic SEO, content engine) uygulanacak planın temelini oluşturuyor.

## Dosyalar

| Dosya | İçerik |
|---|---|
| [`master-query-database.md`](./master-query-database.md) | **OUTPUT A** — 630 sorgudan oluşan tam sorgu veritabanı: 11 funnel stage (510 sorgu) + marka arama sorguları (20) + "AI MEDIQUEUE'yu önerir mi?" test seti (100). |
| [`top-100-priority-queries.md`](./top-100-priority-queries.md) | **OUTPUT B** — AI Opportunity Score'a göre seçilmiş en kritik 100 sorgu; her biri için gerekçe, hedef sayfa, gereken içerik, gereken entity, öncelik. |
| [`page-architecture.md`](./page-architecture.md) | **OUTPUT C** — MEDIQUEUE'nun sahip olması gereken sayfa mimarisi, URL şeması, entity modeli ve mevcut mimariyle karşılaştırmalı content-gap analizi (existing/missing/weak/high-priority). |
| [`user-journey-map.md`](./user-journey-map.md) | **OUTPUT D** — Problem → Treatment → Destination → Clinic → Doctor → Comparison → Trust → Quote → Booking → Travel → Treatment → Aftercare tam kullanıcı yolculuğu; her adım için sorgular, hedef sayfalar, entity'ler, internal link'ler, CTA, sonraki adım. |
| [`immediate-actions.md`](./immediate-actions.md) | **OUTPUT E** — Kod ve içerik tarafında yapılması gereken en önemli 20 iş, önceliklendirilmiş. |
| [`baseline-v1.md`](./baseline-v1.md) | **AŞAMA 1.5** — MEDIQUEUE'nun bugünkü (2026-08-21) AI/generative search görünürlüğünün gerçek web araştırmasına dayalı baseline'ı. 22 sorgu test edildi: sıfır MEDIQUEUE mention'ı (domain henüz yok) + kritik bir marka-çakışması bulgusu. |
| [`competitor-domain-observations.md`](./competitor-domain-observations.md) | **AŞAMA 1.5** — `baseline-v1.md` araştırmasından çıkarılan, tier'lara ayrılmış rakip/domain analizi (bireysel klinikler, marketplace aggregator'lar, review platformları, medya/PR, akademik kaynaklar). |
| [`ssr-fix-report.md`](./ssr-fix-report.md) | **AŞAMA 2.1** — `/clinics`, `/clinics/[id]`, `/doctors`, `/doctors/[id]` için CSR→SSR fix'i: root cause, yapılan değişiklikler, veri akışı, testler ve kalan riskler (özellikle `HybridBadge`'in prod'da gizlenmemesi). |
| [`production-data-integrity-report.md`](./production-data-integrity-report.md) | **AŞAMA 2.2** — "live"/"demo" data mode ayrımı (`lib/config.ts`), production'da mock fallback'in tamamen kaldırılması, mapper'lardaki sahte rating/fiyat varsayılanlarının düzeltilmesi, `DataUnavailableNotice` ile kontrollü error state, A/B/C/D test matrisi. |
| [`crawler-discovery-report.md`](./crawler-discovery-report.md) | **AŞAMA 2.3** — `robots.ts`/`sitemap.ts` (web-patient) + disallow-all `robots.ts` (web-clinic/doctor/admin), `getSiteUrl()` merkezi domain config'i, mock-free dinamik klinik URL'leri, deployment topolojisi belirsizliği ve pre-existing (ilgisiz) build hataları üzerine dürüst raporlama. |
| [`metadata-architecture-report.md`](./metadata-architecture-report.md) | **AŞAMA 2.4** — Merkezi `buildMetadata()` (`lib/seo.ts`), her public route için unique title/description/canonical/OG/Twitter, `/clinics/[id]` için dinamik `generateMetadata()`, `/doctors/[id]` için bilinçli `noindex` (gerçek veri kaynağı yok), query-param canonicalization. |

## Funnel Stage Tanımları (11 Stage)

| # | Stage | Kullanıcı durumu |
|---|---|---|
| 1 | Problem / Discovery | Henüz ülke/klinik bilmiyor, sadece problemi/isteği farkında |
| 2 | Treatment Discovery | Tedaviyi biliyor, nereye gideceğini bilmiyor |
| 3 | Destination Discovery | Ülke/şehir araştırıyor |
| 4 | Provider Discovery | Klinik/doktor arıyor |
| 5 | Comparison | Seçenekleri (teknik, ülke, şehir, klinik) karşılaştırıyor |
| 6 | Trust / Verification | Güvenilirlik/meşruiyet arıyor — **MEDIQUEUE için en kritik stage** |
| 7 | Price / Value | Fiyat ve paket içeriği araştırıyor |
| 8 | Decision | Karar vermeye yakın, klinik seçmeye çalışıyor |
| 9 | Transactional | Teklif almak / randevu almak istiyor |
| 10 | Pre-Treatment | Tedaviye lojistik olarak hazırlanıyor |
| 11 | Post-Treatment | İyileşme ve aftercare rehberliği arıyor |

Buna ek olarak iki özel kategori var: **Brand Discovery** (MEDIQUEUE'yu doğrudan marka olarak arayan sorgular) ve **AI Recommendation Test Set** (AŞAMA 13'teki AI Query Test Lab'in ilk 100 sorguluk çekirdeği — birinci ağızdan "bana yardım et" formatında sorular; periyodik olarak ChatGPT/Gemini/Claude/Perplexity'de tekrar test edilecek).

## AI Opportunity Score — Metodoloji

`master-query-database.md` ve `top-100-priority-queries.md` içindeki skorlar **elle tek tek verilmiş öznel yargılar değil**, aşağıdaki deterministik formülle hesaplanmıştır — bu, 630 satır boyunca tutarlılık sağlar ve skorların nasıl üretildiğini denetlenebilir kılar:

```
score = stage_base_score
      + 0.5  (tedavi "flagship" ise: hair-transplant / dental / cosmetic-surgery)
      - 0.5  (tedavi "flagship" değilse: eye-laser / dermatology / orthopedics / obgyn)
      + 0.3  (destinasyon spesifik bir şehirse — daha long-tail, genelde daha az rekabet)
      - 0.3  (destinasyon Türkiye dışı bir karşılaştırma ülkesiyse — MEDIQUEUE ilgisi daha düşük)
      → clamp(1, 10), en yakın 0.5'e yuvarla
```

`stage_base_score` değerleri (Trust/Decision/Provider/Transactional stage'lerin AI-recommendation anlarında yoğunlaştığı gözlemine dayanır):

| Stage | Base | Stage | Base |
|---|---|---|---|
| 1 Discovery | 5.0 | 7 Price | 7.0 |
| 2 Treatment Discovery | 6.0 | 8 Decision | 8.5 |
| 3 Destination Discovery | 6.5 | 9 Transactional | 8.0 |
| 4 Provider Discovery | 8.0 | 10 Pre-Treatment | 5.5 |
| 5 Comparison | 7.5 | 11 Post-Treatment | 5.0 |
| 6 Trust | 8.5 | Brand | 7.0 |
| | | Test Set | 8.0 |

**Önemli sınırlama:** Bu skorlar bugün için *varsayılan bir öncelik iskeleti*dir — gerçek rekabet/arama hacmi/AI-görünürlük verisiyle henüz doğrulanmamıştır. AŞAMA 13'teki AI Query Test Lab canlıya alındığında (gerçek ChatGPT/Gemini/Claude/Perplexity testleri), bu skorlar gözlemlenen sonuçlarla yeniden kalibre edilmeli. Rakip analizi (AŞAMA 0 §14) de "Competition" boyutunu şu an formülde yok — bu, canlı rakip araştırması yapıldıktan sonra eklenecek bir modifier.

## Dil Politikası

Sorgu veritabanının çoğunluğu İngilizce (~%70) ve Türkçe (~%25) — bugünkü site tamamen Türkçe olduğu ve hedef sorguların çoğu İngilizce olduğu için (bkz. AŞAMA 0 audit, §7 International SEO). Almanca/Fransızca/İspanyolca/Arapça için Stage 1'de birkaç **örnek/illustratif** sorgu var (~%5) — bunlar **doğrudan makine çevirisi değil**, elle kontrol edilmiş doğal ifadelerdir, ama tam bir lokalizasyon seti değildir. AŞAMA 0 §11'de belirtildiği gibi, her dil için gerçek kültürel/dilsel intent araştırması yapılmadan bu diller için query database'i genişletmeyeceğiz — bu bilinçli bir kapsam sınırı, eksiklik değil.

## Nasıl Kullanılır

1. **Content planlaması:** `top-100-priority-queries.md`'deki "Content Required" kolonu doğrudan content brieflerine dönüştürülebilir.
2. **URL/route planlaması:** `page-architecture.md`'deki URL şeması, gelecek aşamalarda (Programmatic SEO, AŞAMA 5) uygulanacak Next.js route yapısının kaynağıdır.
3. **Internal linking:** `user-journey-map.md`, her sayfanın hangi diğer sayfalara link vermesi gerektiğini gösterir.
4. **Periyodik test:** AI Recommendation Test Set (`master-query-database.md` sonunda), AŞAMA 13'te kurulacak Test Lab'in başlangıç veri setidir — her 4-6 haftada bir gerçek AI sistemlerinde manuel olarak tekrar denenmeli ve sonuçlar bu klasöre eklenecek bir `test-results/` alt klasörüne kaydedilmelidir (henüz oluşturulmadı).

## Sınırlar / Yapılmayanlar

AŞAMA 1 talimatına sadık kalınarak bu aşamada:
- 500+ blog yazısı **üretilmedi** — bu sadece bir query/entity/page **haritası**.
- Kodda değişiklik **yapılmadı**.
- Fake content, keyword stuffing veya "AI kesin önersin" garantisi **oluşturulmadı**.
- Rakip analizi (AŞAMA 0 §14 / bu klasörün OUTPUT C'sindeki "Competitor Gaps") canlı web araştırması gerektirdiği için bu dosyalarda **varsayımla doldurulmadı** — ayrı bir araştırma turu olarak işaretli.
