import type { MetadataRoute } from "next";

// web-doctor bir operasyon paneli — doktorlar için kimlik doğrulamalı bir
// arayüz, public arama sonuçlarında görünmemeli. Bkz. web-clinic/src/app/robots.ts
// içindeki aynı not (domain/deployment varsayımı henüz doğrulanamadı).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
