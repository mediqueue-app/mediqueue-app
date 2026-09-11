import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/clinics",
    "/patients",
    "/doctors",
    "/team",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/how-it-works",
    "/en",
    "/tr",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
