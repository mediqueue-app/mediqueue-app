"use client";

import { useEffect, useState } from "react";
import { emptyCopyFor, type EmptyCopy, type EmptyCopyKey } from "@/lib/empty-copy";

export type UiLocale = "tr" | "en";

const STORAGE_KEY = "mq-ui-locale";

export function persistUiLocale(locale: UiLocale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode */
  }
  document.cookie = `${STORAGE_KEY}=${locale};path=/;max-age=31536000;SameSite=Lax`;
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

export function useEmptyCopy(key: EmptyCopyKey): EmptyCopy {
  const locale = useUiLocale();
  return emptyCopyFor(key, locale);
}
