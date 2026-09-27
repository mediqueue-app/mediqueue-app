"use client";

import { useEffect, useState } from "react";

export type UiLocale = "tr" | "en";

const STORAGE_KEY = "mq-ui-locale";

// `Secure` would make the browser drop the cookie on http://localhost, and
// there is no `window` to inspect during SSR.
function secureCookieSuffix(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? ";Secure" : "";
}

export function persistUiLocale(locale: UiLocale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode */
  }
  document.cookie = `${STORAGE_KEY}=${locale};path=/;max-age=31536000;SameSite=Lax${secureCookieSuffix()}`;
}

export function getUiLocale(): UiLocale {
  if (typeof window === "undefined") return "tr";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "tr") return stored;
  } catch {
    /* private mode */
  }
  const html = document.documentElement.lang?.toLowerCase() ?? "";
  if (html.startsWith("en")) return "en";
  if (html.startsWith("tr")) return "tr";
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("en")) return "en";
  return "tr";
}

export function useUiLocale(): UiLocale {
  const [locale, setLocale] = useState<UiLocale>("tr");
  useEffect(() => {
    setLocale(getUiLocale());
  }, []);
  return locale;
}
