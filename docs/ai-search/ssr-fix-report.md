# MEDIQUEUE — SSR / Crawler Access Fix Report (AŞAMA 2.1)

> Kapsam: yalnızca `/clinics`, `/clinics/[id]`, `/doctors`, `/doctors/[id]` sayfalarının server-side içerik erişimi. Sitemap, robots, structured data, metadata sistemi, i18n, content pages, backend Treatment entity, database migration — **bunların hiçbiri bu turda yapılmadı.**

## 1. Problem

AŞAMA 0 audit'inde tespit edilen bulgu: `/clinics`, `/clinics/[id]` ve `/doctors` sayfalarının gerçek içeriği client-side JavaScript ile fetch ediliyordu; bu yüzden bu sayfaların ilk HTML response'u crawler'lara/AI fetcher'lara boş bir loading skeleton olarak gidiyordu.

## 2. Root Cause

Kod incelemesi iki AYRI, birbirinden bağımsız kök nedeni ortaya çıkardı:

**(a) Yanlış auth varsayımı — `web-patient/src/lib/services/clinics.ts`**
`fetchClinics()` ve `fetchClinic()`, `getToken()` (sessionStorage'daki oturum token'ı) yoksa gerçek API'ye **hiç istek atmadan** doğrudan mock veriye düşüyordu. Ama backend'de (`backend/app/api/v1/clinics.py`) `GET /clinics` ve `GET /clinics/{id}` **public endpoint'lerdir** — hiçbir auth dependency taşımıyorlar. Yani her anonim ziyaretçi/crawler (token'sız) için kod, çalışan ve erişilebilir bir API'yi bilerek atlayıp mock veri gösteriyordu.

**(b) Veri fetch'i `useEffect` içinde, component'ler `"use client"`**
`ClinicsExplorer.tsx` ve `ClinicDetailView.tsx` her ikisi de `"use client"` idi ve verilerini `useEffect` içinde fetch ediyordu. `useEffect` yalnızca tarayıcıda, mount sonrası çalışır — sunucu tarafı render sırasında hiç çalışmaz. Bu yüzden bu iki component'in server-render edilen ilk hali her zaman boş/loading state'teydi, (a)'daki bug düzeltilse bile.

**Doctors tarafında farklı bir durum:** `DoctorsExplorer.tsx` `"use client"` olsa da, verisini `useEffect` ile değil `@/lib/mock-data`'dan **doğrudan statik import** ile alıyordu — yani zaten senkron olarak render oluyordu (ilk HTML'de mock veri vardı). Buradaki asıl sorun SSR değil, **backend'de hiç `GET /doctors` (liste) veya `GET /doctors/{id}` (detay) endpoint'inin bulunmaması** idi (`backend/app/api/v1/doctors.py`'de sadece `/{id}/reviews`, `/{id}/appointments`, `/{id}/availability`, `/{id}` PATCH var — liste veya tekil GET yok). `doctors/[id]/page.tsx` zaten bir Server Component'ti ve mock-data'yı senkron okuyordu — yani bu sayfa **daha önceden de** SSR açısından sorunsuzdu; sorun veri kaynağının mock olmasıydı, mimarinin CSR olması değildi.

## 3. Files Changed

| Dosya | Değişiklik |
|---|---|
| `web-patient/src/lib/services/clinics.ts` | Token-gate kaldırıldı (auth olmadan da gerçek API deneniyor); `fetchClinic` artık mock fallback kullanıldığında `source: "hybrid"` işaretliyor; `fetchClinicDoctors` artık 401/hata durumunda mock doktor **ikame etmiyor**, boş liste dönüyor |
| `web-patient/src/app/clinics/page.tsx` | Server Component'e çevrildi: `fetchClinics()` + `searchParams` server-side okunuyor, initial data prop olarak geçiriliyor |
| `web-patient/src/components/clinics/ClinicsExplorer.tsx` | `useEffect`/`fetchClinics`/`useSearchParams` kaldırıldı; artık `initialClinics`/`initialSource`/`initialQuery`/`initialCity` prop'larını alıyor, yalnızca filter/sort/search interaktivitesini yönetiyor |
| `web-patient/src/app/clinics/[id]/page.tsx` | Eski client-side `load()` mantığı buraya (server-side) taşındı; `notFound()` burada çağrılıyor; sonuç `ClinicDetailView`'a initial data olarak geçiyor |
| `web-patient/src/components/clinics/ClinicDetailView.tsx` | `"use client"` **kaldırıldı** → artık bir Server Component; kendi fetch/loading/notFound state'i yok, veriyi doğrudan prop olarak alıyor. İnteraktif alt bileşenler (`BookingWidget`, `SmartImage`) kendi `"use client"` sınırlarını koruyor |
| `web-patient/src/app/doctors/page.tsx` | `searchParams` server-side okunuyor; mock `doctors` artık açıkça `initialDoctors` prop'u olarak geçiriliyor (mimari netlik için — veri kaynağı hâlâ mock, bkz. §7) |
| `web-patient/src/components/doctors/DoctorsExplorer.tsx` | `useSearchParams` kaldırıldı; `initialDoctors`/`initialQuery`/`initialCity` prop'larını alıyor |

**Değiştirilmeyen:** `web-patient/src/app/doctors/[id]/page.tsx` — zaten SSR-uyumlu bir Server Component olduğu için dokunulmadı (bkz. §2).

Backend'de **hiçbir dosya değiştirilmedi** — auth, veritabanı, migration dokunulmadı (bkz. AŞAMA 2.1 kısıtları).

## 4. Architecture Before

```
Page (Server Component, boş kabuk)
  └─ Suspense
       └─ ClinicsExplorer ("use client")
            └─ useEffect → fetchClinics() → token yoksa mock'a bile bakmadan
              "if (!token) return mock" ... AMA yine de useEffect
              sonrasında (mount sonrası) set-state → re-render
              → İLK HTML: boş / loading skeleton
```
Aynı desen `ClinicDetailView` için de geçerliydi (+ ayrıca `fetchClinicDoctors` başarısız olduğunda gerçek klinik ID'sine sahte mock doktorlar iliştiriyordu).

## 5. Architecture After

```
Page (async Server Component)
  └─ await fetchClinics() / loadClinic()   ← server-side, gerçek API'ye istek
  └─ initial data (clinics, source, query, city) hazır
       └─ ClinicsExplorer / ClinicDetailView
            (client component yalnızca filter/sort/search İÇİN "use client";
             ClinicDetailView artık Server Component)
```

`useSearchParams()` client hook'unun kaldırılması ayrıca önemli bir ek düzeltmeydi: bu hook Next.js'i bir `<Suspense>` sınırı kullanmaya zorluyordu, bu da ilk HTML flush'ında gerçek içerik yerine geçici bir fallback + sonradan stream edilen bir "swap" davranışına yol açıyordu (React Flight/RSC payload'ı olarak). Test sırasında bunu doğrudan gözlemledim: `searchParams` server component'te (`page.tsx`) okunup düz prop olarak geçirilince, Suspense sınırına gerek kalmadı ve içerik ilk response'ta **doğrudan DOM metni** olarak geldi (bkz. §7 test detayları).

## 6. API Data Flow

```
Anonim ziyaretçi/crawler → GET /clinics
  → clinics/page.tsx (Server Component)
       → fetchClinics() → apiFetch("/clinics") [token yok ama backend zaten public]
            ├─ Başarılı → source: "api", her klinik için mock'tan UI-only alan
            │              (gallery/amenities/price) varsa birleştirilir
            └─ Başarısız (backend kapalı/erişilemez) → source: "mock"

Anonim ziyaretçi/crawler → GET /clinics/{id}
  → clinics/[id]/page.tsx
       → id numeric mi?
            ├─ Evet → Promise.all([fetchClinic(id), fetchClinicDoctors(id)])
            │    fetchClinic: backend public → genelde başarılı
            │       fallback varsa → source: "hybrid", yoksa → "api"
            │    fetchClinicDoctors: backend AUTH GEREKTİRİYOR (require_roles)
            │       → anonim istek her zaman 401 → boş dizi (mock ikame YOK)
            └─ Hayır (legacy mock id, örn. "c-1") → doğrudan mock-data

Anonim ziyaretçi/crawler → GET /doctors, /doctors/{id}
  → Backend'de bu kaynaklar için public bir GET endpoint'i yok
  → mock-data'dan senkron okunuyor (server-side, ilk HTML'de mevcut)
```

## 7. SEO / Crawler Impact

- `/clinics`, `/clinics/[id]`, `/doctors`, `/doctors/[id]` artık ilk HTTP response'unda **doğrudan DOM metni olarak** gerçek/anlamlı içerik taşıyor — JS çalıştırmadan HTML'i okuyan bir sistem (çoğu klasik arama motoru crawler'ı, birçok metin-çıkarma tabanlı AI sistemi) bu içeriği görebilir.
- Anonim/token'sız istekler artık gerçekten public olan backend endpoint'lerine ulaşıyor — önceden bu hiç denenmiyordu.
- `Klinik Doktorları` bölümü, backend'in auth-gated `/clinics/{id}/doctors` endpoint'i anonim istekte başarısız olduğunda **tamamen gizleniyor** (boş başlık göstermek yerine) — hem daha temiz hem de "boş görünen ama aslında veri var" belirsizliğini önlüyor.
- **Kritik, henüz çözülmemiş bir risk (bkz. §9):** `HybridBadge` bileşeni prod/dev ayrımı yapmadan her ortamda render ediliyor. Backend erişilemezse (`source: "mock"`), sayfa "Demo Veri" rozetiyle birlikte prod'da yayınlanır — bu, gerçek klinik verisi ile karışık gösterilen mock içeriğin crawler/kullanıcı tarafından görülebileceği anlamına gelir. Bu turda bu bileşene dokunmadım (kapsam dışı — sadece SSR/veri-akışı sorunu çözülüyor), ama bu bulguyu net şekilde raporluyorum.

## 8. Tests Performed

1. **`npm run lint`** — temiz, hata/uyarı yok (son çalıştırma dahil).
2. **`npm run build`** (prod) — başarılı; `/clinics` ve `/doctors` artık `ƒ (Dynamic)` (server-rendered on demand), `/clinics/[id]` ve `/doctors/[id]` mock ID'ler için `● (SSG)`, numeric (gerçek backend) ID'ler için dinamik/on-demand.
3. **`npm run start` + raw HTML incelemesi (curl, tarayıcı DEĞİL):**
   - Mock-only senaryo (backend kapalı, varsayılan yapılandırma): `/clinics`, `/clinics/c-1`, `/doctors`, `/doctors/d-1` → hepsi HTTP 200, gerçek klinik/doktor adları (`Anadolu Estetik & Cerrahi Merkezi`, `Dr. Emre Demir` vb.) ve sayaç metinleri (`klinik bulundu`, `doktor bulundu`) doğrudan HTML gövdesinde bulundu.
   - **Canlı-API senaryosu:** Gerçek backend'i (Postgres + FastAPI) bu ortamda ayağa kaldırmak kapsam dışı bir yük olacağından, `backend/app/api/v1/clinics.py`'deki iki public endpoint'in (`GET /clinics`, `GET /clinics/{id}`) davranışını birebir taklit eden minimal bir stub HTTP sunucusu yazıp `NEXT_PUBLIC_API_BASE_URL` ile buna yönlendirdim. Sonuç: `/clinics` ve `/clinics/999` (mock'ta karşılığı olmayan bir ID) gerçek stub verisini `"Canlı API"` etiketiyle gösterdi; `/clinics/1` (mock'ta karşılığı olan seed klinik) gerçek API'den gelen isim/adres ile mock'tan gelen galeri/fiyat/uzmanlık alanlarını birleştirip doğru şekilde `"Hibrit Veri"` etiketiyle gösterdi; `/clinics/999/doctors` 401 döndüğünde "Klinik Doktorları" bölümü tamamen gizlendi (mock doktor ikame edilmedi).
4. **Regresyon kontrolü:** Filtre/arama/sıralama/harita hover state'i (client-side interaktivite), booking widget, breadcrumb, tab navigasyonu — kod incelemesiyle doğrulandı, davranışları değiştirilmedi (yalnızca veri girişi kaynağı değişti).

## 9. Remaining Issues

Bunlar bu turda **bilerek çözülmedi** — kapsam dışı veya backend/auth'a dokunmayı gerektiriyor:

1. **`HybridBadge` prod'da gizlenmiyor.** Mock veri gösterildiğinde "Demo Veri" rozeti kullanıcıya/crawler'a görünür kalıyor. Bir sonraki adımda ele alınmalı (muhtemelen `NODE_ENV`/env flag ile prod'da gizleme, veya mock fallback'in prod'da hiç gerçekleşmemesini garanti eden bir izleme/alarm sistemi).
2. **`/clinics/{id}/doctors` backend'de auth gerektiriyor**, anonim ziyaretçiler bu yüzden hiçbir zaman gerçek "Klinik Doktorları" listesini göremiyor. Kalıcı çözüm bu endpoint'i public yapmak olurdu, ama bu bir auth/backend değişikliği olduğu için ve görev tanımı "authentication kritik sistemlere dokunulmadı" şartını koyduğu için bu turda yapılmadı.
3. **`/doctors` ve `/doctors/[id]` için backend'de hâlâ hiçbir public liste/detay endpoint'i yok.** Bu iki sayfa bugün de, bu düzeltmeden sonra da %100 mock-data kullanıyor. Gerçek doktor verisi göstermek için backend'e yeni route'lar eklenmesi gerekiyor — bu bir backend değişikliği (yeni endpoint) olduğu için bu turun kapsamı dışında tutuldu.
4. **`fetchClinics()` (liste) hâlâ blanket `"api"` etiketi kullanıyor**, `fetchClinic()` (detay) gibi per-clinic hybrid tespiti yapmıyor — bunu yapmak `ClinicListCard`/UI'da her karta ayrı rozet gerektirirdi, bu da bu turun "minimum gerekli değişiklik" ilkesini aşardı. Not olarak bırakıldı.
5. **Mock veri hâlâ SEO riski taşıyor** (bkz. §7) — bu görev mock'un *doğru etiketlenmesini* ve *gerçek entity'lere sahte alt-veri (doktor) iliştirilmemesini* sağladı, ama backend tamamen erişilemez olduğunda sitenin genelinin mock içerik göstermeye devam etmesi kaçınılmaz bir fallback — bunu tamamen ortadan kaldırmak (örn. backend kapalıyken 503 döndürüp mock'u hiç göstermemek) ayrı bir ürün/mimari kararı gerektirir, bu turda alınmadı.

## 10. Acceptance Criteria — Durum

- [x] `/clinics` ilk HTML'de gerçek clinic content taşıyor
- [x] `/clinics/[id]` ilk HTML'de gerçek clinic content taşıyor
- [x] `/doctors` ilk HTML'de gerçek doctor content taşıyor (mock kaynaklı, açıkça belgelendi)
- [x] `/doctors/[id]` backend'de public endpoint olmadığı açıkça raporlandı (mock kullanılmaya devam ediyor)
- [x] Client-side interactivity bozulmadı (filter/sort/search/harita/booking değişmedi)
- [x] Existing UI bozulmadı
- [x] Mock data artık gerçek klinik'e sahte doktor iliştirmiyor; kaynağı (`api`/`hybrid`/`mock`) doğru etiketleniyor — ama `HybridBadge`'in prod'da gizlenmemesi ayrı, raporlanan bir risk (§9.1)
- [x] Build başarılı
- [x] Lint başarılı
- [x] Authentication/booking/payment sistemlerine dokunulmadı (backend hiç değiştirilmedi)
