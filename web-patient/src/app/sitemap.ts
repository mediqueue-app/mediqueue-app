import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/config";
import { fetchClinics } from "@/lib/services/clinics";

// Yalnızca public, indexable, anlamlı sayfalar. Auth/transactional/utility
// route'lar (`/auth/login`, `/auth/register`, `/appointments`) bilerek
// dışarıda bırakıldı — bkz. docs/ai-search/crawler-discovery-report.md §3.
//
// "lastModified" hiçbir statik sayfa için set edilmiyor: güvenilir bir
// "son güncelleme" veri kaynağımız yok, ve `new Date()` gibi "bugünün
// tarihi"ni yazmak sahte bir freshness sinyali üretir (bkz. görev talimatı
// §6). Alan opsiyonel olduğu için hiç yazılmaması, yanlış yazılmasından
// daha doğru.
const STATIC_ROUTES = ["", "/clinics", "/doctors", "/treatments", "/how-it-works"];

// Next.js, bu route'ta hiçbir per-request sinyal (headers()/cookies())
// kullanılmadığını görürse build zamanında TEK SEFERLİK statik bir dosya
// üretip sonsuza kadar onu servis edebilir. Bu ciddi bir risk: build anında
// backend erişilemezse (örn. deploy sırasında geçici bir kesinti), sitemap
// yeni bir deploy yapılana kadar sonsuza dek yalnızca statik sayfaları
// içerir hale gelir. Saatlik yeniden doğrulama (ISR) ile bu riski
// yönetiyoruz — tam "her istekte canlı sorgula" kadar maliyetli değil, ama
// build-time'da donmuyor da.
export const revalidate = 3600; // saniye — 1 saat

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  // `fetchClinics()` (bkz. lib/services/clinics.ts) zaten "live" modda mock'a
  // hiç düşmüyor — API başarısızsa `source: "unavailable"` döner. Yine de
  // burada `source === "api"` kontrolünü AÇIKÇA tekrar ediyoruz: bu,
  // mock/hybrid/unavailable hiçbir durumda sitemap'e bir klinik ID'sinin
  // sızmayacağını tek bir satırda garanti eden, kolayca denetlenebilir bir
  // kural. Aynı fonksiyon "demo" modda (yerel geliştirme, backend kapalı)
  // `source: "mock"` dönebilir — o durumda da bu filtre onu dışarıda bırakır.
  const { data: clinics, source } = await fetchClinics();
  const seenIds = new Set<number>();
  const clinicEntries: MetadataRoute.Sitemap =
    source === "api"
      ? clinics
          .filter((c): c is typeof c & { apiId: number } => c.apiId != null)
          .filter((c) => {
            if (seenIds.has(c.apiId)) return false;
            seenIds.add(c.apiId);
            return true;
          })
          .map((c) => ({ url: `${siteUrl}/clinics/${c.apiId}` }))
      : [];

  // /doctors/[id] BİLEREK sitemap'e eklenmiyor: backend'de public bir
  // doktor liste/detay endpoint'i yok (bkz. ssr-fix-report.md §2,
  // production-data-integrity-report.md §1) — gerçek bir doktor ID
  // kaynağımız olmadığı için, doktor detay URL'leri ya sahte (mock ID'ler)
  // ya da hiç var olur.

  return [...staticEntries, ...clinicEntries];
}
