const PRODUCTION_SITE_URL = "https://www.getmediqueue.com";
const DEVELOPMENT_SITE_URL = "http://localhost:3004";

const PRODUCTION_HOSTS = ["getmediqueue.com", "www.getmediqueue.com"];

export function resolveSiteUrl(
  raw?: string,
  isProduction = process.env.NODE_ENV === "production"
): string {
  const fallback = isProduction ? PRODUCTION_SITE_URL : DEVELOPMENT_SITE_URL;
  const value = (raw ?? fallback).replace(/\/$/, "");
  try {
    const host = new URL(value).hostname;
    if (PRODUCTION_HOSTS.includes(host)) return PRODUCTION_SITE_URL;
  } catch {
    return fallback;
  }
  // A production build never publishes a canonical for an unapproved host, so a
  // missing or misconfigured NEXT_PUBLIC_SITE_URL still resolves to www.
  return isProduction ? PRODUCTION_SITE_URL : value;
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/medyqueue";
export const COMPANY_INSTAGRAM = "https://www.instagram.com/mediqueue/";
export const COMPANY_EMAIL = "contact@getmediqueue.com";
export const ANALYTICS_CONSENT_COOKIE = "mq-analytics";
