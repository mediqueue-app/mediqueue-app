const PRODUCTION_SITE_URL = "https://www.getmediqueue.com";

export function resolveSiteUrl(raw?: string): string {
  const value = (raw ?? "http://localhost:3004").replace(/\/$/, "");
  try {
    const host = new URL(value).hostname;
    if (
      host === "getmediqueue.com" ||
      host === "www.getmediqueue.com" ||
      host === "mediqueue.co" ||
      host === "www.mediqueue.co"
    ) {
      return PRODUCTION_SITE_URL;
    }
  } catch {
    /* keep fallback */
  }
  return value;
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/mediqueue";
export const COMPANY_INSTAGRAM = "https://www.instagram.com/mediqueue/";
