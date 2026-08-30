# MEDIQUEUE — Crawler Discovery Report (AŞAMA 2.3)

> Kapsam: yalnızca `robots.txt` ve XML sitemap altyapısı. Metadata, canonical URL, Schema.org, i18n, content architecture — **bunların hiçbiri bu turda değiştirilmedi.**

## 1. Robots Strategy

**Önce deployment topolojisini inceledim.** Repo genelinde `vercel.json`, `Dockerfile`/`docker-compose.yml` (backend hariç), veya herhangi bir CI/deploy workflow'u **yok** — root `README.md` yalnızca yerel geliştirme portlarını listeliyor (`web-clinic:3000`, `web-doctor:3001`, `web-patient:3002`, `web-admin:3003`). Yani dört Next.js uygulamasının production'da ayrı domain'lerde mi, ayrı subdomain'lerde mi, yoksa tek bir domain altında path-routing ile mi (örn. bir reverse proxy arkasında) deploy edileceği **bu repo'dan tespit edilemiyor**. Bu, aşağıdaki stratejinin bir varsayımı değil, açıkça işaretlenmiş bir bilinmeyeni.

Bu belirsizlik nedeniyle, **her dört uygulamaya kendi `robots.ts`'ini** ekledim — bu, hangi deployment topolojisi seçilirse seçilsin doğru çalışan tek yaklaşım:

| Uygulama | Dosya | Davranış |
|---|---|---|
| **web-patient** (public) | `src/app/robots.ts` | `Allow: /`, `Disallow: /auth/`, `Disallow: /appointments`, sitemap referansı |
| web-clinic (operasyon) | `src/app/robots.ts` **(yeni)** | `Disallow: /` (tamamı) |
| web-doctor (operasyon) | `src/app/robots.ts` **(yeni)** | `Disallow: /` (tamamı) |
| web-admin (operasyon, prototip) | `src/app/robots.ts` **(yeni)** | `Disallow: /` (tamamı) |

**Eğer robots.txt yalnızca web-patient için geçerli olacaksa açıkça raporla** talimatına göre: Bu, ancak web-clinic/doctor/admin **kendi ayrı Next.js sunucu instance'ları olarak** (ayrı domain/subdomain, veya path-prefix'siz ayrı bir origin) deploy edilirse doğru çalışır. Eğer bunlar yerine tek bir domain altında (örn. `mediqueue.com/clinic-portal/*`) bir reverse proxy ile path-mount edilirlerse, kendi `robots.ts`'leri o path altında `/robots.txt` olarak hiç serve edilmeyebilir — bu durumda web-patient'ın kendi `robots.ts`'ine o path'ler için ek `Disallow` kuralları eklemek gerekirdi. **Bu, deployment topolojisi netleşene kadar çözülemeyecek bir belirsizlik olarak §9'da (Remaining Risks) tekrar işaretlendi.**

**Robots.txt güvenlik mekanizması değildir.** web-clinic/doctor/admin zaten JWT authentication ile korunuyor (bkz. AŞAMA 0 audit) — bu üç `robots.ts` dosyası ek, kibar bir crawler sinyalidir, tek koruma katmanı değildir.

## 2. Sitemap Strategy

`web-patient/src/app/sitemap.ts` — App Router convention (`MetadataRoute.Sitemap`), tek bir dosya, sitemap index YOK (bkz. §5).

- `export const revalidate = 3600` (1 saat, ISR): sitemap fonksiyonu hiçbir per-request sinyal (`headers()`/`cookies()`) kullanmadığı için, Next.js bunu revalidate ayarı olmadan **build zamanında tek seferlik statik bir dosyaya donduruyor** — bunu build sırasında bizzat gözlemledim (backend build anında erişilemezken sitemap sonsuza kadar sadece 5 statik sayfa gösterecek şekilde donuyordu). `revalidate = 3600` bunu düzeltir: sitemap en fazla 1 saatte bir yeniden üretilir, ne "her istekte backend'e vur" kadar maliyetli ne de "deploy'a kadar donmuş" kadar bayat.

## 3. Public Routes

Mevcut `web-patient/src/app` route'ları incelendi (gerçek kod, aspirational `page-architecture.md` şeması değil):

**Sitemap'e eklenen (public, indexable, meaningful):**
- `/` — ana sayfa
- `/clinics` — klinik listesi
- `/doctors` — doktor listesi
- `/treatments` — tedavi listesi
- `/how-it-works` — nasıl çalışır

**Sitemap'e eklenmeyen — auth/transactional/utility (gerçek, mock değil, ama arama için anlamsız):**
- `/auth/login`, `/auth/register` — kimlik doğrulama akışı
- `/appointments` — hastanın kendi randevu/mesajlaşma görünümü (private, kullanıcıya özel)

robots.txt bu ikisini de `Disallow` ile işaretliyor (bkz. §1).

## 4. Dynamic Entity Strategy

**Klinikler (`/clinics/[id]`):** `sitemap.ts`, mevcut `fetchClinics()` servisini (AŞAMA 2.2'de yazılan, "live" modda mock'a asla düşmeyen fonksiyon) çağırıyor ve **yalnızca `source === "api"` olduğunda** dönen klinikleri `apiId`'lerine göre URL'e çeviriyor:

```ts
const { data: clinics, source } = await fetchClinics();
const clinicEntries = source === "api"
  ? clinics.filter(c => c.apiId != null).map(c => ({ url: `${siteUrl}/clinics/${c.apiId}` }))
  : [];
```

Bu kontrol **modelden bağımsız olarak mutlak**: "demo" modda backend kapalıyken `fetchClinics()` `source: "mock"` dönerse, "live" modda backend'e ulaşılamazsa `source: "unavailable"` dönerse — her iki durumda da klinik URL'leri sitemap'e **hiç eklenmiyor**. Bunu hem dev hem prod build'de test ederek doğruladım (bkz. §8).

Duplicate koruması: `apiId` bazlı bir `Set` ile aynı ID iki kez eklenmiyor (backend'in aynı kliniği iki kez döndürmesi teorik olarak mümkün olsa bile).

**Doktorlar (`/doctors/[id]`):** **Sitemap'e hiç eklenmiyor.** Backend'de public bir doktor liste/detay endpoint'i yok (bkz. `ssr-fix-report.md` §2, `production-data-integrity-report.md` §1 — yalnızca `/{id}/reviews`, `/{id}/appointments`, `/{id}/availability` var). Gerçek bir doktor ID kaynağı olmadığı için, bu URL'leri sitemap'e koymanın tek yolu mock ID'leri (`d-1`, `d-2`...) kullanmak olurdu — ki bu, görevin en katı kuralına ("mock entity'leri sitemap'e kesinlikle ekleme") doğrudan aykırı olurdu. Bu yüzden bilinçli olarak boş bırakıldı.

## 5. Domain Strategy

MEDIQUEUE'nun henüz bir production domain'i yok (bkz. `baseline-v1.md` §0 — `mediqueue.tech` aranıp canlı olmadığı doğrulandı). Bu yüzden:

- `web-patient/src/lib/config.ts`'e `getSiteUrl()` eklendi: `NEXT_PUBLIC_SITE_URL` set edilmişse onu kullanır, edilmemişse `http://localhost:3002`'ye düşer.
- `web-patient/.env.example` **(yeni — bu app'te daha önce hiç yoktu, web-clinic/doctor/admin'de zaten vardı)** oluşturuldu, `NEXT_PUBLIC_SITE_URL` alanı açıkça "REPLACE-WITH-PRODUCTION-DOMAIN" placeholder'ıyla belgelendi.
- Kodun hiçbir yerinde gerçek/varsayımsal bir domain hardcode edilmedi.

**Domain geldiğinde değiştirilmesi gereken TEK değer:** `NEXT_PUBLIC_SITE_URL` ortam değişkeni (production deployment'ın env config'inde). Kodda başka hiçbir değişiklik gerekmiyor — `robots.ts` ve `sitemap.ts` ikisi de bu tek değeri `getSiteUrl()` üzerinden okuyor.

## 6. Mock-Data Protection

- Sitemap, klinik URL'leri için AŞAMA 2.2'nin `fetchClinics()` fonksiyonunu **yeniden kullanıyor** (yeni bir fetch mantığı icat etmedim) — bu fonksiyon zaten "live" modda mock'a hiç düşmüyor.
- Buna ek olarak, sitemap kendi `source === "api"` filtresini **açıkça** uyguluyor — bu, "mock hiçbir zaman sitemap'e sızmaz" kuralının `fetchClinics()`'in iç mantığına bağımlı olmayan, tek satırda denetlenebilir bir garantisi.
- Test edildi: dev modda backend kapalıyken (mock fallback aktifken, `/clinics` sayfası "Demo Veri" gösterirken) sitemap'te **sıfır** klinik URL'si çıktı — yalnızca 5 statik sayfa (bkz. §8).

## 7. Robots Safety

- `web-patient`'ın `robots.ts`'i `Allow: /` ile başlıyor — hiçbir CSS/JS/statik kaynak (`/_next/*`) yanlışlıkla engellenmiyor.
- `/auth/`, `/appointments` dışında hiçbir public route disallow edilmiyor — `/clinics`, `/doctors`, `/treatments`, `/how-it-works` tamamen crawl edilebilir.
- web-clinic/doctor/admin'in `Disallow: /`'ı, bu üç uygulamanın zaten var olan JWT authentication'ının **yerine geçmiyor**, ona ek bir sinyal.

## 8. Test Results

`curl` ile ham response üzerinden (tarayıcı değil), dört senaryoda test edildi:

| Senaryo | HTTP | Content-Type | XML Geçerli mi | İçerik |
|---|---|---|---|---|
| Prod build, `NEXT_PUBLIC_SITE_URL` **yapılandırılmamış**, backend kapalı | 200 / 200 | `application/xml` / `text/plain` | ✅ (Python `xml.etree` ile parse edildi) | Sitemap: yalnızca 5 statik URL, hepsi `http://localhost:3002/*` (güvenli varsayılan — gerçek bir domain hiç sahtelenmedi). robots.txt: `Allow: /`, `Disallow: /auth/`, `/appointments` |
| Prod build, `NEXT_PUBLIC_SITE_URL=https://example-mediqueue-prod.test` **yapılandırılmış**, stub API çalışıyor (id=999) | 200 / 200 | aynı | ✅ | Sitemap: 5 statik + `/clinics/999` — **sıfır `localhost` URL'i**, sıfır mock ID, sıfır duplicate (Python ile doğrulandı: 6 URL, 6 benzersiz) |
| Dev (`next dev`), backend kapalı (mock fallback aktif, `/clinics` sayfası "Demo Veri" gösteriyor) | 200 | — | ✅ | Sitemap: yalnızca 5 statik URL — mock klinikler **sızmadı** |
| Build sırasında backend erişilemezken `revalidate` olmadan | — | — | — | Sitemap build-time'da donuyordu (bkz. §2) — `revalidate=3600` eklenerek düzeltildi |

Ayrıca kontrol edildi: `/doctors/[id]` hiçbir senaryoda sitemap'te görünmedi; `/auth/*` ve `/appointments` hiçbir senaryoda görünmedi; duplicate URL yok.

**Build/Lint (dört uygulama):**

| Uygulama | `npm run lint` | `npm run build` | Not |
|---|---|---|---|
| **web-patient** | ✅ temiz | ✅ başarılı (`/robots.txt`, `/sitemap.xml` route tablosunda) | Bu turun asıl kapsamı |
| web-admin | ⚠️ 1 pre-existing hata + 2 uyarı (`AuthGuard.tsx` setState-in-effect, `useMemo` eksik dependency, kullanılmayan import) | ✅ başarılı, `/robots.txt` route tabloda görünüyor | Hatalar `robots.ts` ile **ilgisiz**, bu turdan önce de vardı |
| web-doctor | ❌ 10 pre-existing hata (`useApi` adlı fonksiyonların hook kuralı ihlali — `src/lib/services/*.ts`), 1 uyarı | ❌ pre-existing TypeScript hatası (`@/types`'ta `ScheduleSlot` export edilmiyor — `dashboard/schedule/page.tsx`) | Bu turdan **önce** de bozuktu; `robots.ts` eklenmesiyle ilgisi yok |
| web-clinic | ❌ 12 pre-existing hata (aynı `useApi` hook kuralı ihlali deseni) | ❌ pre-existing eksik bağımlılık (`cobe` paketi `package.json`'da hiç yok, `PatientOriginGlobe.tsx` import ediyor) | Bu turdan **önce** de bozuktu; `robots.ts` eklenmesiyle ilgisi yok |

web-clinic ve web-doctor'daki hatalar `robots.ts` dosyalarıyla hiçbir ilişkisi olmayan, tamamen farklı dosyalardaki (services/*.ts, dashboard/schedule, PatientOriginGlobe) pre-existing sorunlar — doğruladım (`cobe` paketi gerçekten `package.json`'da yok; hata listesindeki hiçbir dosya `robots.ts` değil). Bu görevin kapsamı "sadece crawler discovery altyapısı" olduğu için bu üç uygulamadaki ilgisiz, önceden var olan bozuklukları **düzeltmedim** — bu ayrı bir bakım görevi gerektirir.

## 9. Remaining Crawler/Indexing Risks

1. **Deployment topolojisi belirsiz (bkz. §1).** web-clinic/doctor/admin ayrı domain/subdomain olarak deploy edilmezse, kendi `robots.ts`'leri o path'lerde hiç serve edilmeyebilir — bu durumda web-patient'ın robots.ts'ine ek path-bazlı `Disallow` kuralları gerekir. Deployment kararı netleştiğinde tekrar gözden geçirilmeli.
2. **`web-clinic` ve `web-doctor` build edilemiyor** (pre-existing, ilgisiz hatalar — bkz. §8). Bu, o iki uygulamanın `robots.ts`'inin gerçek bir production build'de fiilen çalışıp çalışmayacağını doğrulayamadığım anlamına geliyor — dosyanın kendisi `web-admin`'de (aynı desen, başarıyla build edildi) doğrulandı, ama web-clinic/doctor'daki genel build durumu bu iki uygulamayı deploy edilemez halde tutuyor zaten.
3. **Sitemap 1 saatlik ISR penceresi** — yeni bir klinik eklendiğinde sitemap'e yansıması en fazla 1 saat sürebilir. Küçük ölçekte kabul edilebilir; ölçek büyüdüğünde webhook-tetiklemeli revalidation değerlendirilebilir.
4. **`lastModified` hiçbir URL için set edilmiyor** (bilinçli — bkz. §6 görev talimatı). Backend `ClinicRead.updated_at` alanı var ama `mapClinicReadToUi()` bunu UI tipine taşımıyor — gelecekte bu alan plumbing edilirse klinik URL'leri için gerçek `lastModified` eklenebilir.
5. **Sitemap index yok** — bugünkü ölçekte (5 statik + az sayıda klinik) gereksiz olurdu. `page-architecture.md`'deki gelecek URL şeması (treatments, destinations, guides) yüzlerce/binlerce sayfaya ulaştığında, Next.js'in `generateSitemaps()` API'si ile bir sitemap-index mimarisine geçilmeli — bu, ileride ayrı bir görev.
6. **`/clinics` listesi hâlâ tüm sonuçları tek bir `source: "api"` etiketiyle işaretliyor** (AŞAMA 2.2'den kalan bilinen sınırlama) — sitemap açısından sorun değil (yalnızca top-level source kontrol ediliyor, tüm liste zaten ya tamamen API ya tamamen mock/unavailable), ama gelecekte per-clinic provenance eklenirse sitemap filtresi de per-item hale getirilmeli.
