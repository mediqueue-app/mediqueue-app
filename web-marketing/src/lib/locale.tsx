"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Locale, type SiteContent } from "@/content";
import { LOCALE_STORAGE_KEY, localeCookieString } from "@/lib/locale-cookie";
import { switchLocaleUrl } from "@/lib/locale-path";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SiteContent;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.cookie = localeCookieString(next);
    setLocaleState(next);
    document.documentElement.lang = next;
    window.location.assign(
      switchLocaleUrl(
        next,
        window.location.pathname,
        window.location.search,
        window.location.hash
      )
    );
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
