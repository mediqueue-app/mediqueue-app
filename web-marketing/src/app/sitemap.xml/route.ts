import { SITE_URL } from "@/lib/site";

const ROUTES = [
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
] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function lastmodDate() {
  return new Date().toISOString().slice(0, 10);
}

function urlsFor(path: (typeof ROUTES)[number]) {
  const tr = path === "" ? SITE_URL : `${SITE_URL}${path}`;
  const en = path === "" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;
  const isHome = path === "";
  const isPriority = path === "/clinics" || path === "/patients";
  const changefreq = isHome ? "weekly" : "monthly";
  const trPriority = isHome ? "1.0" : isPriority ? "0.9" : "0.8";
  const enPriority = isHome ? "0.95" : isPriority ? "0.85" : "0.76";
  return { tr, en, changefreq, trPriority, enPriority };
}

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string,
  tr: string,
  en: string
) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(tr)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(tr)}" />
  </url>`;
}

export function GET() {
  const lastmod = lastmodDate();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ROUTES.flatMap((path) => {
  const { tr, en, changefreq, trPriority, enPriority } = urlsFor(path);
  return [
    urlEntry(tr, lastmod, changefreq, trPriority, tr, en),
    urlEntry(en, lastmod, changefreq, enPriority, tr, en),
  ];
}).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
