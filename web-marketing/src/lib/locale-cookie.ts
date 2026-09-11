export const LOCALE_COOKIE = "mq-locale";
export const LOCALE_STORAGE_KEY = "mq-locale";

export type StoredLocale = "en" | "tr";

export function parseLocale(value: string | null | undefined): StoredLocale {
  return value === "en" ? "en" : "tr";
}

export function localeCookieString(locale: StoredLocale): string {
  return `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
