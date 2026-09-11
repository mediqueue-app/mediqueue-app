"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { content, type Locale, type SiteContent } from "@/content";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SiteContent;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "mq-locale";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function localeFromPath(pathname: string): Locale | null {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/tr" || pathname.startsWith("/tr/")) return "tr";
  return null;
}

function localeFromSearch(search: string): Locale | null {
  const params = new URLSearchParams(search);
  const value = params.get("lang") ?? params.get("locale");
  if (value === "en" || value === "tr") return value;
  return null;
}

function localeFromBrowser(): Locale | null {
  const languages = [
    window.navigator.language,
    ...(window.navigator.languages ?? []),
  ]
    .filter(Boolean)
    .map((item) => item.toLowerCase());
  if (languages.some((item) => item === "tr" || item.startsWith("tr-"))) {
    return "tr";
  }
  return null;
}

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const fromUrl =
    localeFromPath(window.location.pathname) ??
    localeFromSearch(window.location.search);
  if (fromUrl) {
    window.localStorage.setItem(STORAGE_KEY, fromUrl);
    return fromUrl;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "tr") return stored;

  return localeFromBrowser() ?? "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, (): Locale => "en");

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
    emit();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: content[locale] }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
