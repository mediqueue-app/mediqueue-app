import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/clinics",
    "/patients",
    "/doctors",
    "/how-it-works",
    "/team",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  return routes.flatMap((path) => {
    const tr = `${SITE_URL}${path}`;
    const en = `${SITE_URL}${path === "" ? "/en" : `/en${path}`}`;
    const isHome = path === "";
    const isPriority = path === "/clinics" || path === "/patients";
    const changeFrequency: "weekly" | "monthly" = isHome ? "weekly" : "monthly";
    const entry = {
      lastModified: new Date(),
      changeFrequency,
      priority: isHome ? 1.0 : isPriority ? 0.9 : 0.8,
    };
    return [
      { url: tr, ...entry },
      { url: en, ...entry, priority: entry.priority * 0.95 },
    ];
  });
}
