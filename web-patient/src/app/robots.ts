import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/config";

// web-patient MEDIQUEUE'nun PUBLIC-facing uygulamasıdır — crawl edilebilir
// olması istenen tek app bu. `/auth/*` ve `/appointments` gerçek, mock
// olmayan sayfalardır ama private/transactional oldukları için (bir
// kullanıcının kendi randevu/giriş akışı) arama sonuçlarında anlamlı
// değildir; robots.txt bunları kibarca dışarıda bırakır — ama bu bir
// güvenlik mekanizması değildir (bkz. crawler-discovery-report.md §7),
// bu sayfalar zaten auth kontrolüyle korunuyor.
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/", "/appointments"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
