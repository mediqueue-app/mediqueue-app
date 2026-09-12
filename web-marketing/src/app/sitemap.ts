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
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path === "/clinics" || path === "/patients" ? 0.9 : 0.8,
  }));
}
