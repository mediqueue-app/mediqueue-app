/**
 * Uygulamanın veri modu — bu projede zaten var olan bir ayrımın (bkz.
 * `DemoLauncher.tsx`'teki `process.env.NODE_ENV === "production"` kontrolü)
 * tek, merkezi ve isimlendirilmiş kaynağa taşınmış hali. Yeni bir env var
 * icat etmiyoruz; Next.js'in kendi NODE_ENV'i (`next build`+`next start` →
 * "production", `next dev` → "development") tek doğruluk kaynağı.
 *
 *  - "live": production build çalışıyor. Mock/demo veri hiçbir zaman
 *    fallback olarak KULLANILMAZ. Canlı API başarısız olursa kontrollü
 *    bir "unavailable" durumu gösterilir (bkz. DataSource, api/types.ts).
 *  - "demo": `next dev` (veya prod olmayan başka bir çalıştırma). Mock veri,
 *    backend erişilemezken fallback olarak kullanılabilir ve bu açıkça
 *    HybridBadge ile etiketlenir.
 *
 * Bkz. docs/ai-search/production-data-integrity-report.md
 */
export type DataMode = "live" | "demo";

export function getDataMode(): DataMode {
  return process.env.NODE_ENV === "production" ? "live" : "demo";
}

export function isLiveMode(): boolean {
  return getDataMode() === "live";
}

/**
 * Sitenin kendi public base URL'i — robots.txt/sitemap.xml gibi crawler
 * discovery dosyalarının mutlak URL üretmek için ihtiyaç duyduğu tek
 * doğruluk kaynağı.
 *
 * MEDIQUEUE henüz bir production domain'e bağlanmadı (bkz.
 * docs/ai-search/baseline-v1.md §0 ve crawler-discovery-report.md §4).
 * Bu yüzden burada var olmayan bir domain'i ("mediqueue.com" gibi) SAHTE
 * olarak hardcode etmiyoruz. Bunun yerine:
 *
 *  - `NEXT_PUBLIC_SITE_URL` set edilmişse onu kullanır (production domain
 *    netleştiğinde tek değişmesi gereken yer budur — bkz. .env.example).
 *  - Set edilmemişse `http://localhost:3002`'ye düşer — bu, "yanlışlıkla
 *    gerçek gibi görünen" bir URL değil, konfigürasyonun eksik olduğunu
 *    açıkça belli eden zararsız bir varsayılandır.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/+$/, "");
  return "http://localhost:3002";
}
