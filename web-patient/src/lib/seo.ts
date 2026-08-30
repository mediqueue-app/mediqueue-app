import type { Metadata } from "next";

/**
 * Merkezi metadata (title/description/canonical/Open Graph/Twitter) üretim
 * yardımcısı. `metadataBase` root layout.tsx'te bir kez (`getSiteUrl()`
 * üzerinden) set edildiği için, buradaki `path` değerleri relative
 * kalabilir — Next.js bunları otomatik olarak mutlak URL'e çözer.
 *
 * NOT: Next.js metadata çözümlemesinde iç içe alanlar (örn. `openGraph`)
 * parent/child arasında DEEP MERGE edilmez — bir sayfa kendi `openGraph`
 * objesini tanımlarsa bu, layout'takini tamamen değiştirir. Bu yüzden bu
 * fonksiyon her çağrıldığında openGraph/twitter alanlarının TAMAMINI
 * (title, description, url dahil) üretir; eksik bırakmak parent'tan
 * miras almaz, sessizce boş kalır.
 *
 * Bkz. docs/ai-search/metadata-architecture-report.md
 */

export const SITE_NAME = "MediQueue";

/**
 * MEDIQUEUE'nun bugün için (henüz i18n yok, bkz. AŞAMA 0/1 audit)
 * içeriğini sunduğu tek dil/locale. Open Graph `locale` alanı gerçek
 * `<html lang="tr">` ile tutarlı kalsın diye burada sabitlendi.
 */
export const SITE_LOCALE = "tr_TR";

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  titleIsFullyBranded = false,
}: {
  /** Sayfaya özgü, ÇIPLAK başlık (örn. "Klinikler") — layout'taki `template` bunu HTML `<title>` için otomatik olarak "Klinikler | MediQueue" haline getirir. */
  title: string;
  description: string;
  /** Kök'e göre relative path, örn. "/clinics" veya "/" — asla query string içermemeli (bkz. §5, query parameter canonicalization). */
  path: string;
  /**
   * Gerçek, entity-specific içerik üretilemediği (örn. backend'de public
   * bir kaynak olmadığı) durumlarda true. Bkz.
   * docs/ai-search/metadata-architecture-report.md §4 (doctor detail limitation).
   */
  noIndex?: boolean;
  /**
   * `title` zaten marka son ekini içeriyorsa (yalnızca root layout'un ana
   * sayfa başlığı bunu yapar, bkz. layout.tsx) true geç — aksi halde OG/
   * Twitter başlığına "%s | MediQueue" iki kez eklenir.
   */
  titleIsFullyBranded?: boolean;
}): Metadata {
  // Next.js'in `title.template`'i yalnızca üst düzey HTML <title>
  // etiketine uygulanır — `openGraph.title`/`twitter.title` bundan
  // otomatik faydalanmaz (ayrı, düz string alanlardır). Sosyal medya
  // önizlemelerinde marka adının görünmesi için burada AÇIKÇA ekliyoruz.
  const brandedTitle = titleIsFullyBranded ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: brandedTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
