import type { MetadataRoute } from "next";

// web-admin bir süperadmin paneli (bugün itibarıyla prototip/mock) —
// kesinlikle public arama sonuçlarında görünmemeli. Bkz. web-clinic/src/app/robots.ts
// içindeki aynı not (domain/deployment varsayımı henüz doğrulanamadı).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
