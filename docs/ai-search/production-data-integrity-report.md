# MEDIQUEUE — Production Data Integrity Report (AŞAMA 2.2)

> Kapsam: yalnızca production'da mock/demo verinin gerçek klinik/doktor verisiymiş gibi public kullanıcıya veya crawler'a sızmasını önlemek. Sitemap, robots, metadata, schema, i18n, Treatment entity, content pages, URL migration — **bunların hiçbiri bu turda yapılmadı.**

## 1. Root Cause

İnceleme iki AYRI, kümülatif kök neden ortaya çıkardı — biri "bütün klinik/doktor sahte" seviyesinde, diğeri daha ince ve daha önce fark edilmemiş bir seviyede:

**(a) Bütün-varlık seviyesinde: mock fallback prod/dev ayrımı yapmıyordu.**
AŞAMA 2.1'de `fetchClinics()`/`fetchClinic()` düzeltilmişti ama backend tamamen erişilemez olduğunda hâlâ *her ortamda* (dev veya prod fark etmeksizin) `mockClinics`'e düşüyordu — `HybridBadge` bunu "Demo Veri" olarak doğru etiketliyordu, ama **prod'da bu etiketin kendisi de, altındaki içerik de sızıyordu**. `/doctors` ve `/doctors/[id]` için durum daha kötüydü: backend'de bu kaynaklar için hiç public bir endpoint olmadığından (`backend/app/api/v1/doctors.py`'de sadece `/{id}/reviews`, `/{id}/appointments`, `/{id}/availability` var — liste veya tekil `GET` yok), bu iki sayfa **her zaman, koşulsuz olarak** mock-data gösteriyordu — prod'da bile.

**(b) Alan (field) seviyesinde: mapper fonksiyonları sahte varsayılan değerler üretiyordu.**
Bu, daha derin ve daha önce raporlanmamış bir bulgu: `web-patient/src/lib/mappers.ts` içindeki `mapClinicReadToUi()` ve `mapDoctorReadToUi()`, backend'in henüz sahip olmadığı alanlar (rating, fiyat aralığı, uzmanlık listesi) için **gerçekçi görünen sabit sahte değerler** kullanıyordu:

```ts
rating: fallback?.rating ?? 4.8,          // fallback yoksa HER KLİNİK "4.8 yıldız"
priceFrom: fallback?.priceFrom ?? 1000,   // HER KLİNİK "₺1.000'den başlayan"
priceTo: fallback?.priceTo ?? ... ?? 5000,
specialties: fallback?.specialties ?? ["Genel Sağlık"],
```

Bu, AŞAMA 2.1'in ele almadığı bir risk: **gerçek backend'den gelen, gerçekten var olan bir klinik/doktor bile**, backend'de henüz karşılığı olmayan alanlar için otomatik olarak sahte bir puan/fiyat kazanıyordu — bu, canlı API tamamen çalışırken bile oluşan bir "sahte rating/fiyat" durumu, "backend erişilemez" senaryosundan bağımsız. Sağlık turizmi bağlamında bir kliniğe/doktora ait olmayan bir puanın/fiyatın gösterilmesi ciddi bir güven riski.

Ayrıca `fetchClinic()`'in "hybrid" zenginleştirmesi (mock'tan galeri/fiyat/uzmanlık alanı doldurma) prod/dev ayrımı yapmadan **her zaman** devredeydi — bu da, gerçek bir klinik backend'de mock-data'daki seed klinikle aynı ID'yi taşırsa (örn. id=1, README'ye göre proje genelinde kullanılan seed/demo klinik), production'da o gerçek kliniğe demo galeri fotoğrafları ve demo fiyat aralığının iliştirilmesi anlamına geliyordu.

## 2. Data Flow — Before

```
fetchClinics()/fetchClinic()
  → API başarısız (HER ortamda) → mockClinics'e düş → source: "mock"
  → API başarılı → mapClinicReadToUi(row, fallback)
       → rating: fallback?.rating ?? 4.8        ← HER ZAMAN, prod dahil
       → priceFrom: fallback?.priceFrom ?? 1000 ← HER ZAMAN, prod dahil
       → fallback varsa → source: "hybrid"      ← prod/dev ayrımı yok

/doctors, /doctors/[id]
  → Backend'de public endpoint yok → HER ZAMAN mock-data → prod'da bile
```

## 3. Data Flow — After

```
lib/config.ts → isLiveMode() = (NODE_ENV === "production")
  (mevcut DemoLauncher.tsx'teki aynı sinyal, tek merkezi kaynağa taşındı)

fetchClinics()/fetchClinic()
  → API başarılı
       → resolveEnrichmentFallback(id):
            "live"  → her zaman undefined  → source: "api" (asla "hybrid" değil)
            "demo"  → mock varsa onu kullanır → source: "hybrid"
       → mapClinicReadToUi(row, fallback):
            rating/priceFrom/priceTo/specialties artık fallback yoksa
            0 / [] (dürüst sentinel) — asla 4.8 / 1000 / 5000 / ["Genel Sağlık"]
  → API başarısız (network hatası, 5xx, timeout...)
       → "live"  → { data: [] veya null, source: "unavailable" }
       → "demo"  → { data: mockClinics, source: "mock" }  (değişmedi)
  → API 404 döndü (backend "bu klinik yok" dedi — güvenilir sinyal)
       → HER modda { data: null } → sayfa notFound() çağırır (mock'a düşülmez)

/clinics/[id] page.tsx → loadClinic() üç durumlu:
  "ok" | "not_found" | "unavailable"
  - "not_found" → notFound() (404)
  - "unavailable" → <DataUnavailableNotice />
  - legacy mock ID'ler (örn. "c-1"): "live" modda "not_found" (bu ID şeması
    zaten hiçbir zaman gerçek olmadı); "demo" modda mock içerik (değişmedi)

/doctors, /doctors/[id]
  → "live"  → <DataUnavailableNotice /> (mock ASLA gösterilmez)
  → "demo"  → mock-data (değişmedi)

UI katmanı (ClinicCard, ClinicListCard, ClinicMap, ClinicDetailView,
DoctorCard, doctors/[id]/page.tsx, BookingWidget):
  rating > 0 / priceFrom > 0 kontrolü olmadan asla StarRating/fiyat basmıyor
  → 0 sentinel'i "bilgi mevcut değil" olarak yorumlanıyor, "0.0 ★" / "₺0"
    gibi kırık görünen sahte-gibi bir değer asla render edilmiyor
```

## 4. Environment Strategy

Yeni bir env var/mimari icat edilmedi — proje zaten `DemoLauncher.tsx` içinde `process.env.NODE_ENV === "production"` kontrolünü kullanıyordu (yalnızca demo başlatıcı butonunu gizlemek için). Bu turda bu AYNI sinyal `web-patient/src/lib/config.ts`'e taşınıp isimlendirildi:

```ts
export type DataMode = "live" | "demo";
export function getDataMode(): DataMode {
  return process.env.NODE_ENV === "production" ? "live" : "demo";
}
export function isLiveMode(): boolean {
  return getDataMode() === "live";
}
```

- `next build && next start` → `NODE_ENV=production` → `"live"` mode.
- `next dev` → `NODE_ENV=development` → `"demo"` mode.

Bu, "mevcut proje mimarisine uygun, yeni bir şey icat etmeyen" bir çözüm — tek değişiklik, dağınık `process.env.NODE_ENV === "production"` kontrollerini tek, test edilebilir, isimlendirilmiş bir fonksiyona toplamak.

## 5. Files Changed

| Dosya | Değişiklik |
|---|---|
| `web-patient/src/lib/config.ts` **(yeni)** | `isLiveMode()`/`getDataMode()` — tek doğruluk kaynağı |
| `web-patient/src/components/common/DataUnavailableNotice.tsx` **(yeni)** | Mock yerine gösterilen, dürüst, tarafsız boş/error state bileşeni |
| `web-patient/src/lib/api/types.ts` | `DataSource`'a `"unavailable"` eklendi, her değer belgelendi |
| `web-patient/src/components/common/HybridBadge.tsx` | `"unavailable"` için config eklendi (TypeScript exhaustiveness) |
| `web-patient/src/lib/mappers.ts` | `rating ?? 4.8` → `?? 0`; `priceFrom ?? 1000` → `?? 0`; `priceTo ?? 5000` → `?? 0`; `specialties ?? ["Genel Sağlık"]` → `?? []` (hem clinic hem doctor mapper) |
| `web-patient/src/lib/services/clinics.ts` | `resolveEnrichmentFallback()` ile hybrid zenginleştirme "live" modda devre dışı; API hatası ayrımı (404 vs. diğer); "live" modda mock yerine `"unavailable"` |
| `web-patient/src/app/clinics/[id]/page.tsx` | `loadClinic()` üç durumlu (`ok`/`not_found`/`unavailable`); legacy mock ID'ler "live" modda `not_found`; `generateStaticParams()` "live" modda `[]` |
| `web-patient/src/components/clinics/ClinicsExplorer.tsx` | `source === "unavailable"` durumunda `<DataUnavailableNotice />` |
| `web-patient/src/app/doctors/page.tsx` | "live" modda `<DataUnavailableNotice />`, mock hiç render edilmiyor |
| `web-patient/src/app/doctors/[id]/page.tsx` | Aynı "live" mode kontrolü; `generateStaticParams()` "live" modda `[]`; rating gösterimi `> 0` korumalı |
| `web-patient/src/components/clinics/ClinicCard.tsx` | rating/price `> 0` korumalı, aksi halde "Belirtilmemiş" |
| `web-patient/src/components/clinics/ClinicListCard.tsx` | Aynı |
| `web-patient/src/components/clinics/ClinicMap.tsx` | price `> 0` korumalı, aksi halde "—" |
| `web-patient/src/components/clinics/ClinicDetailView.tsx` | rating/price `> 0` korumalı |
| `web-patient/src/components/doctors/DoctorCard.tsx` | rating/price `> 0` korumalı |
| `web-patient/src/components/booking/BookingWidget.tsx` | price `> 0` korumalı, aksi halde "Fiyat bilgisi mevcut değil" |

Backend'de, auth/payment/database sistemlerinde **hiçbir değişiklik yapılmadı**.

## 6. Production Behavior (`isLiveMode() === true`)

- `/clinics`: canlı API'den gelen klinikler gösterilir, hiçbir mock zenginleştirmesi yapılmaz; API tamamen erişilemezse `DataUnavailableNotice` gösterilir (boş liste veya "0 klinik" değil, açıkça "şu anda görüntülenemiyor" mesajı).
- `/clinics/[id]`: gerçek klinik → yalnızca backend'in sağladığı alanlar (isim, açıklama, adres, şehir) + eksik alanlar için dürüst boş/"Belirtilmemiş" gösterimi. Backend 404 derse → gerçek 404. Backend'e ulaşılamazsa → `DataUnavailableNotice`. Legacy mock ID'ler (`/clinics/c-1` vb.) → 404.
- `/doctors`, `/doctors/[id]`: backend'de hiç public endpoint olmadığından **her zaman** `DataUnavailableNotice` — mock doktor hiçbir koşulda gösterilmez.
- `HybridBadge`'in "Demo Veri"/"Hibrit Veri" etiketleri **yapısal olarak üretilemez** (kozmetik bir gizleme değil — mock/hybrid provenance'ın kendisi hiç oluşmuyor).

## 7. Development Behavior (`isLiveMode() === false`)

Hiçbir şey değişmedi: API başarısızsa mock'a düşülür (`source: "mock"`), fallback varsa hybrid zenginleştirme çalışır (`source: "hybrid"`), `HybridBadge` bunları olduğu gibi gösterir, `/doctors` mock-data'dan render olur. AŞAMA 2.1'deki tüm davranış korunmuştur.

## 8. Test Matrix

| Senaryo | Yöntem | Sonuç |
|---|---|---|
| **A) Dev + API available** | `NEXT_PUBLIC_API_BASE_URL=<stub> npm run dev`, id=1 (mock karşılığı var) | `/clinics/1` → "Hibrit Veri", gerçek isim + mock galeri/fiyat/uzmanlık birleşik ✅ |
| **B) Dev + API unavailable** | `npm run dev`, backend yok (varsayılan 8000'de hiçbir şey çalışmıyor) | `/clinics`, `/clinics/c-1`, `/doctors`, `/doctors/d-1` → hepsi mock, "Demo Veri" rozeti, rating 4.9 vb. doğru gösteriliyor (değişmedi) ✅ |
| **C) Production + API available** | `NEXT_PUBLIC_API_BASE_URL=<stub> npm run build && npm run start`, id=1 ve id=999 (mock karşılığı yok) | `/clinics/1` → "Canlı API" (Hibrit DEĞİL), gerçek isim, rating yıldızı YOK, fiyat "Belirtilmemiş", mock galeri/uzmanlık sızmadı. `/clinics/999` → aynı. `/clinics` listesi → "Canlı API" ✅ |
| **D) Production + API unavailable** | `npm run build && npm run start`, backend hiç çalışmıyor | `/clinics`, `/clinics/999` → `DataUnavailableNotice`, sıfır sahte klinik ismi HTML'de. `/clinics/c-1` → HTTP 404. `/doctors`, `/doctors/d-1` → `DataUnavailableNotice`, sıfır sahte doktor ismi HTML'de ✅ |

Her senaryoda ham HTML (`curl`, tarayıcı değil) üzerinden doğrulandı — `grep` ile hem "beklenen içerik var" hem "yasak içerik yok" (`Anadolu Estetik`, `Dr. Emre Demir`, `4.9`, `Demo Veri` gibi mock imzaları) kontrol edildi.

Ek olarak: `npm run lint` ve `npm run build` her değişiklik turunda temiz geçti.

## 9. Remaining Risks

1. **`ClinicMap` boş sonuçlarda boş bir harita gösteriyor** — `source: "unavailable"` durumunda liste tarafı `DataUnavailableNotice` gösteriyor ama harita paneli hâlâ render ediliyor (boş, sahte marker yok, ama tutarsız bir UI). Küçük bir cila, veri bütünlüğü riski değil.
2. **`fetchClinics()` (liste) hâlâ blanket `"api"` etiketi kullanıyor** — per-clinic hybrid tespiti yapmıyor (AŞAMA 2.1'den kalan, bilinen bir sınırlama; `ClinicListCard`'a per-item rozet eklemek bu turun kapsamını aşardı).
3. **`/clinics/{id}/doctors` hâlâ backend'de auth gerektiriyor** — anonim ziyaretçiler hiçbir zaman gerçek "Klinik Doktorları" listesini göremiyor (AŞAMA 2.1'den kalan, bilinen bir backend sınırlaması — bu turda backend'e dokunulmadı).
4. **Backend'de hâlâ `GET /doctors` (liste) veya `GET /doctors/{id}` yok** — bu, `/doctors*`'un production'da tamamen işlevsiz (yalnızca "unavailable" gösteren) kalmasının kök nedeni. Gerçek kalıcı çözüm bir backend endpoint eklemek olurdu — bu bir backend değişikliği olduğu için bu turun kapsamı dışında.
5. **`isLiveMode()` yalnızca `NODE_ENV`'e bakıyor** — bilinçli olarak public bir "demo/staging" ortamı çalıştırmak isteyen bir deployment (prod build ama kasıtlı olarak mock göstermek istenen) için bir opt-in yolu yok. Bu, görev kapsamında "yeni bir env var icat etme" ilkesiyle bilinçli olarak basit tutuldu; ihtiyaç doğarsa ayrı bir görev olarak ele alınabilir.
