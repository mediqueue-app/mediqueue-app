import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const LASTMOD = "2026-09-15";

const ROUTES: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/en", changeFrequency: "weekly", priority: 0.8 },
  { path: "/clinics", changeFrequency: "monthly", priority: 0.9 },
  { path: "/en/clinics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/patients", changeFrequency: "monthly", priority: 0.9 },
  { path: "/en/patients", changeFrequency: "monthly", priority: 0.8 },
  { path: "/doctors", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/doctors", changeFrequency: "monthly", priority: 0.7 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/how-it-works", changeFrequency: "monthly", priority: 0.7 },
  { path: "/team", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/team", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/en/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/en/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
  { path: "/en/terms", changeFrequency: "monthly", priority: 0.5 },
  { path: "/disclaimer", changeFrequency: "monthly", priority: 0.4 },
  { path: "/en/disclaimer", changeFrequency: "monthly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: LASTMOD,
    changeFrequency,
    priority,
  }));
}
