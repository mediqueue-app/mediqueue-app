# MEDIQUEUE — Metadata Architecture Report (AŞAMA 2.4)

> Kapsam: yalnızca `web-patient` için title/description/canonical/Open Graph/Twitter metadata mimarisi. Schema.org/JSON-LD, i18n, Treatment entity, yeni content sayfaları — **bunların hiçbiri bu turda yapılmadı.**

## 1. Metadata Architecture

**Yeni dosya: `web-patient/src/lib/seo.ts`** — tek, merkezi `buildMetadata()` yardımcı fonksiyonu. Her public sayfa bu fonksiyonu çağırıp `{ title, description, path, noIndex? }` veriyor; fonksiyon karşılığında canonical + Open Graph (title/description/url/siteName/locale/type) + Twitter card'ın **tamamını** üretiyor.

Bunu neden merkezi bir fonksiyonla yaptım: Next.js'in metadata çözümlemesinde **iç içe alanlar (`openGraph`, `twitter`) parent/child arasında deep-merge edilmiyor** — bir sayfa kendi `openGraph` objesini tanımlarsa, layout'takini tamamen değiştiriyor. Yani her sayfanın `openGraph.title`/`url` gibi alanları kendi başına, eksiksiz üretmesi gerekiyor; `buildMetadata()` bunu tek bir yerde garanti ediyor, her sayfada tekrar tekrar unutulma riskini ortadan kaldırıyor.

**`web-patient/src/app/layout.tsx`** iki şey ekliyor:
- `metadataBase: new URL(getSiteUrl())` — AŞAMA 2.3'te oluşturulan merkezi domain config'i (`lib/config.ts`) yeniden kullanıldı, yeni bir domain kavramı icat edilmedi.
- `title: { default: "...", template: "%s | MediQueue" }` — alt sayfalar artık yalnızca kendi çıplak başlıklarını ("Klinikler") set ediyor, marka son eki merkezi olarak ekleniyor.

**Önemli bir düzeltme test sırasında bulundu:** `title.template` yalnızca HTML `<title>` etiketine uygulanıyor, `openGraph.title`/`twitter.title`'a otomatik yansımıyor — ilk halde bunlar "Klinikler | MediQueue" (title) vs. yalnızca "Klinikler" (og:title) olarak tutarsızdı. `buildMetadata()`'ya `titleIsFullyBranded` parametresi eklenerek OG/Twitter başlıklarına da marka son eki açıkça ekleniyor (yalnızca ana sayfa, başlığı zaten tam markalı olduğu için bu parametreyi `true` geçiyor).

## 2. Route-by-Route Metadata

| Route | Title (render edilen) | Canonical | Not |
|---|---|---|---|
| `/` | `MediQueue \| Kliniğinizi ve Doktorunuzu Bulun` | `/` | layout.tsx'te `title.default` |
| `/clinics` | `Klinikler \| MediQueue` | `/clinics` | Query-string'den bağımsız, statik |
| `/doctors` | `Doktorlar \| MediQueue` | `/doctors` | Query-string'den bağımsız, statik; backend'de liste endpoint'i olmasa da bu **kalıcı bir landing page kavramı** olduğu için normal, indexable metadata alıyor (bkz. §4) |
| `/treatments` | `Tedaviler \| MediQueue` | `/treatments` | Statik |
| `/how-it-works` | `Nasıl Çalışır? \| MediQueue` | `/how-it-works` | Statik |
| `/clinics/[id]` | Dinamik, `generateMetadata()` | `/clinics/{id}` | Bkz. §3 |
| `/doctors/[id]` | `Doktor Profili \| MediQueue` (jenerik, entity-specific DEĞİL) | `/doctors/{id}` | `noindex, nofollow` — bkz. §4 |

Her başlık farklı ve sayfaya özgü (görev talimatındaki "title'lar birbirinin aynısı olmamalı" şartı).

## 3. Clinic Detail — Dynamic `generateMetadata()`

`clinics/[id]/page.tsx`'teki mevcut `loadClinic()` fonksiyonu (AŞAMA 2.1/2.2'den, zaten "live" modda mock'a hiç düşmeyen, 404 ile gerçek "not found"u ayıran üç durumlu mantık) **`React.cache()` ile sarmalandı** ve hem `generateMetadata()` hem de sayfa component'i tarafından paylaşılıyor — aynı isteğin içinde `fetchClinic`/`fetchClinicDoctors` iki kez çağrılmıyor.

Üç durum:
- **`not_found`** → `generateMetadata()` içinde de `notFound()` çağrılıyor (sayfa component'iyle tutarlı, Next.js'in kendi 404 metadata'sı devreye giriyor).
- **`unavailable`** (backend'e ulaşılamıyor) → jenerik başlık/açıklama ("Klinik bilgileri şu anda görüntülenemiyor...") + **`noindex, nofollow`** — bu geçici bir durum olduğu için, o anki isteğin crawler tarafından "gerçek içerik" olarak indexlenmesini engelliyoruz; backend geri geldiğinde aynı URL normal metadata ile tekrar crawl edilebilir.
- **`ok`** (gerçek klinik verisi var — API'den veya "demo" modda mock'tan) → entity-specific title/description:
  - **Title:** `[Klinik Adı] — [İlk Uzmanlık Alanı, varsa] — [Şehir, varsa]` deseninde, parçalar `join(" — ")` ile birleştiriliyor. `clinic.specialties` boşsa (AŞAMA 2.2'den beri backend'de karşılığı olmayan alanlar için hiçbir zaman sahte bir varsayılan üretilmiyor) o parça hiç eklenmiyor — **test edildi:** production'da (live mode) mock-fallback'i olan bir klinik (id=1) bile, live modda enrichment devre dışı olduğu için, başlığında uzmanlık alanı GÖSTERMEDİ — tam da istenen davranış.
  - **Description:** gerçek `clinic.about` (backend `description` alanı veya "demo" modda mock) varsa kullanılıyor, 155 karakterde kesiliyor; yoksa klinik hakkında hiçbir spesifik iddia içermeyen, yalnızca platformla ilgili dürüst bir genel cümleye düşülüyor.

## 4. Doctor Detail — Bilinçli Sınırlama

`doctors/[id]/page.tsx`'e eklenen `generateMetadata()` **entity-specific hiçbir şey üretmiyor** — jenerik "Doktor Profili" başlığı + "şu anda genel arama indekslemesi için hazır değil" açıklaması + **`noindex, nofollow`**, kendi URL'ine self-canonical.

**Neden:** Backend'de public bir `GET /doctors` veya `GET /doctors/{id}` endpoint'i yok (bkz. `ssr-fix-report.md` §2, `production-data-integrity-report.md` §1). Bu sayfa bugün ya "demo" modda mock-data'dan (yerel test için gerçek/doğrulanmış olmayan içerik) ya "live" modda hiçbir şeyden (`DataUnavailableNotice`) besleniyor — hiçbir durumda "bu gerçekten var olan bir doktor" diyebileceğimiz bir veri kaynağı yok. Mock doktor adı/uzmanlığı/fiyatını arama motoruna gerçekmiş gibi sunmak yerine, sayfayı bilerek indexlenemez işaretledim.

**Test edildi:** "demo" modda (yerel `next dev`) sayfa içeriği hâlâ gerçek mock doktoru (`Dr. Emre Demir`) gösteriyor — bu, yerel geliştirme/demo deneyimini bozmuyor — ama metadata her modda aynı jenerik + `noindex` kalıyor.

**İndexability problemi ve gelecek mimari önerisi:** Backend'e bir gün `GET /doctors/{id}` public endpoint'i eklendiğinde, bu dosyaya `/clinics/[id]`'deki AYNI desen uygulanmalı: `loadDoctor(id)` fonksiyonu `cache()` ile sarmalanır, `generateMetadata()` gerçek `doctor.full_name`/`specialty`/`city` alanlarından (mevcut `DoctorRead` şemasında zaten var) entity-specific title/description üretir ve `noIndex` kaldırılır. Bu, backend değişikliği gerektirdiği için bu turun kapsamı dışında bırakıldı.

## 5. Query Parameter Canonicalization

`/clinics` ve `/doctors` sayfalarının `export const metadata` (statik) export'u, gelen isteğin `?q=`/`?city=`/`?specialty=` gibi query-string'lerinden **hiç etkilenmiyor** — `alternates.canonical` her zaman `/clinics` veya `/doctors` (çıplak path). Bu, ekstra bir "eğer query varsa strip et" mantığına gerek kalmadan, statik metadata export'unun doğası gereği zaten doğru davranış (dinamik `generateMetadata` kullanılmadığı için request'e hiç bakmıyor).

**Test edildi:** `/clinics?q=test`, `/clinics?city=istanbul`, `/doctors?q=demo&city=izmir` — üçü de canonical'ı sırasıyla `/clinics`, `/clinics`, `/doctors` olarak gösterdi.

Gelecekte gerçek, ayrı landing page'ler (örn. `page-architecture.md`'deki `/treatments/hair-transplant`) eklendiğinde, bunlar KENDİ canonical'larını taşıyacak — bu strateji yalnızca "aynı listenin filtrelenmiş varyantları" için geçerli, gerçek farklı içerik sayfalarını etkilemiyor.

## 6. Auth / Private Routes

`/auth/login`, `/auth/register`, `/appointments` bu turda **hiç dokunulmadı** (görev talimatı gereği) — mevcut statik `title`'ları aynen duruyor. `robots.ts` da değiştirilmedi; bu üç sayfa zaten AŞAMA 2.3'te `Disallow` ile işaretlenmişti, bu tutarlılık korunuyor.

## 7. Open Graph Strategy

Her sayfa: `title`, `description`, `url` (relative path, `metadataBase` üzerinden çözülüyor), `siteName: "MediQueue"`, `locale: "tr_TR"` (gerçek `<html lang="tr">` ile tutarlı), `type: "website"`.

**`og:image` YOK.** `web-patient`'ta hiçbir zaman bir `public/` klasörü olmadı (AŞAMA 0 audit'inde tespit edildi, bu turda da doğrulandı) — yani gerçek bir logo/kapak görseli asset'i yok. Görev talimatı açıkça "gerçek olmayan/generik bir görsel URL uydurma" ve "şimdilik image generation... oluşturma" dediği için, `openGraph.images`/`twitter.images` **bilerek boş bırakıldı**. Bu, aşağıda §10'da bir "remaining risk" olarak işaretlendi — sosyal medya paylaşımlarında (Twitter/LinkedIn/WhatsApp önizlemesi) şu an hiç görsel gösterilmeyecek.

## 8. Twitter / X Strategy

`card: "summary_large_image"` kullanıldı (görsel olmadan da geçerli bir card tipi — özet metni gösterir, görsel eklenince otomatik büyür). `site`/`creator` (örn. "@mediqueue" handle) **eklenmedi** — repo'da MEDIQUEUE'nun doğrulanmış bir X/Twitter hesabı olduğuna dair hiçbir kanıt yok (bkz. `baseline-v1.md`'deki marka-çakışması bulgusu); var olmayan bir handle'ı iddia etmek yerine bu alanlar boş bırakıldı.

## 9. Domain Strategy

Yeni bir domain kavramı icat edilmedi — AŞAMA 2.3'te oluşturulan `getSiteUrl()` (`lib/config.ts`) hem `layout.tsx`'in `metadataBase`'i hem de dolaylı olarak tüm `buildMetadata()` çağrılarının canonical/OG URL'leri için tek kaynak. `NEXT_PUBLIC_SITE_URL` set edilmemişse `http://localhost:3002`'ye düşüyor — test edildi, gerçek/sahte bir production domain asla üretilmiyor. **Domain geldiğinde değişecek tek değer yine `NEXT_PUBLIC_SITE_URL`.**

## 10. Data Integrity

- Klinik metadata'sı yalnızca `loadClinic()`'in (AŞAMA 2.2'nin live/demo/mock ayrımına zaten uyan) döndürdüğü gerçek veriden üretiliyor — mock-data'ya production'da hiç dokunulmuyor.
- Uzmanlık/tedavi bilgisi yalnızca gerçekten mevcutsa (`specialties.length > 0`) başlığa ekleniyor — test edilerek doğrulandı (live modda id=1 bile uzmanlık göstermedi).
- Doktor detay metadata'sı hiçbir zaman entity-specific bir iddia içermiyor (§4).
- **Bilinen, çözülmemiş bir residual risk:** `mapClinicReadToUi()`'nin `city` alanı, backend'de `city` null olduğunda `"İstanbul"`a düşüyor (bu, AŞAMA 2.2'de rating/price/specialties için düzeltilen "sahte varsayılan" deseninin şehir alanı için düzeltilmemiş hali — bu turun kapsamı bu mapper'ı değiştirmek değildi). Klinik metadata başlığı bu alanı olduğu gibi kullanıyor; yani teorik olarak şehri bilinmeyen bir klinik, başlığında yanlışlıkla "İstanbul" gösterebilir. Bu, §14'te ayrı bir risk olarak işaretlendi.

## 11. Tests

`curl` ile ham HTML üzerinden (tarayıcı değil), aşağıdaki matris test edildi:

| Test | Yöntem | Sonuç |
|---|---|---|
| Statik sayfalar (`/`, `/clinics`, `/doctors`, `/treatments`, `/how-it-works`) | Prod build, varsayılan config | Her biri benzersiz title/description/canonical/OG/Twitter — hepsi doğrulandı |
| Query-string canonicalization | `/clinics?q=test`, `/clinics?city=istanbul`, `/doctors?q=demo&city=izmir` | Üçü de canonical'ı temiz path'e (`/clinics`, `/doctors`) indirdi |
| Clinic detail, gerçek API (stub, id=999, fallback yok) | Prod build + stub API + configured `NEXT_PUBLIC_SITE_URL` | Entity-specific title/description, doğru canonical, uzmanlık alanı YOK (gerçekten yok) |
| Clinic detail, hybrid (stub, id=1, mock fallback var) | Aynı | Live modda enrichment devre dışı olduğu doğrulandı — başlıkta mock uzmanlık/fiyat YOK |
| Clinic detail, gerçekten yok (id=5, stub'da tanımsız) | Aynı | HTTP 404 |
| Clinic detail, backend tamamen kapalı (id=1) | Prod build, backend yok | Jenerik başlık + `noindex, nofollow` |
| Legacy mock ID, live mode (`/clinics/c-1`) | Prod build | HTTP 404 (AŞAMA 2.2'den beri) |
| Doctor detail (`/doctors/d-1`), live mode | Prod build | Jenerik "Doktor Profili" + `noindex, nofollow` |
| Doctor detail (`/doctors/d-1`), demo mode | `next dev` | Gerçek mock içerik render ediliyor (`Dr. Emre Demir`) ama metadata **hâlâ** jenerik + `noindex` |
| Sitemap/robots regresyonu | Prod build + start | `/sitemap.xml` ve `/robots.txt` hâlâ HTTP 200, içerik değişmedi |

`npm run lint` ve `npm run build` her turda temiz geçti (son çalıştırma dahil).

## 12. Remaining Risks

1. **`clinic.city`'nin "İstanbul" varsayılanı metadata'ya sızabilir** (bkz. §10) — `mapClinicReadToUi()`'de düzeltilmesi gereken, bu turdan önce var olan bir mapper davranışı. Bu turun kapsamı yalnızca metadata plumbing'i olduğu için mapper'a dokunulmadı; bir sonraki data-integrity turunda ele alınmalı.
2. **`og:image`/`twitter:image` hiç yok** (bkz. §7) — sosyal paylaşımlarda görsel önizleme çıkmayacak. Gerçek bir marka görseli (logo, kapak fotoğrafı) tasarlandığında `public/` klasörüne eklenip `buildMetadata()`'ya bir `image` parametresi eklenmeli — bu, "yeni büyük tasarım sistemi" değil, küçük bir takip işi.
3. **`/doctors` liste sayfası indexable ama içeriği "live" modda boş** (`DataUnavailableNotice`) — arama motorları bu URL'i normal, indexlenebilir bir sayfa olarak görecek ama ziyaret ettiklerinde (backend endpoint'i eklenene kadar) içerik bulamayacaklar. Bu, `/doctors`'un GELECEKTE gerçek içerik alacak kalıcı bir landing page olması nedeniyle bilinçli bir karar (bkz. §2) ama backend endpoint'i uzun süre eklenmezse gözden geçirilmeli.
4. **Sitemap'teki klinik URL'leri ile metadata'nın "unavailable" durumu arasında senkron bir garanti yok** — sitemap ISR'si (1 saat) ile canlı `generateMetadata()` isteği arasında backend durumu değişebilir; bu, iki bağımsız ama tutarlı tasarım kararı (ikisi de mock'a asla düşmüyor), sadece aynı anda "taze" olacaklarının garantisi yok. Küçük ölçekte önemsiz.
5. **Schema.org/JSON-LD henüz eklenmedi** (bilinçli, görev kapsamı dışı) — rich snippet'ler (yıldız puanı, fiyat aralığı, breadcrumb) için bir sonraki aşama.
