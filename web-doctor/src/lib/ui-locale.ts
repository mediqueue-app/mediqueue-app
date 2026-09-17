"use client";

import { useSyncExternalStore } from "react";

export type UiLocale = "tr" | "en";

const STORAGE_KEY = "mq-ui-locale";
const listeners = new Set<() => void>();

function subscribeUiLocale(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function emitUiLocale() {
  listeners.forEach((listener) => listener());
}

export function persistUiLocale(locale: UiLocale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode */
  }
  const secure =
    typeof window !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${STORAGE_KEY}=${locale};path=/;max-age=31536000;SameSite=Lax${secure}`;
  emitUiLocale();
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
  return useSyncExternalStore(subscribeUiLocale, getUiLocale, () => "tr");
}
