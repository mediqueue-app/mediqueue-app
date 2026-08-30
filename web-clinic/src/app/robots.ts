import type { MetadataRoute } from "next";

// web-clinic bir operasyon paneli — klinik personeli için kimlik
// doğrulamalı bir yönetim arayüzü, public arama sonuçlarında görünmemeli.
// NOT: robots.txt yalnızca bu app kendi domain'inde/subdomain'inde
// serve edildiğinde etkilidir (bkz. docs/ai-search/crawler-discovery-report.md
// §1 — bu repo'da henüz bir deployment/domain konfigürasyonu yok, bu
// yüzden bu varsayım doğrulanamadı). Asıl koruma zaten mevcut JWT
// authentication'dır; bu dosya yalnızca ek, kibar bir crawler sinyalidir.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
