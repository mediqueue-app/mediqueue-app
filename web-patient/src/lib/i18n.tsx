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
import {
  getUiLocale,
  persistUiLocale,
  type UiLocale,
} from "@/lib/ui-locale";
import { translate } from "@/lib/i18n-core";

export { translate } from "@/lib/i18n-core";

type I18nContextValue = {
  locale: UiLocale;
  setLocale: (locale: UiLocale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<UiLocale>("tr");

  useEffect(() => {
    setLocaleState(getUiLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en-GB" : "tr";
  }, [locale]);

  const setLocale = useCallback((next: UiLocale) => {
    persistUiLocale(next);
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: "tr",
      setLocale: () => undefined,
      t: (key, vars) => translate("tr", key, vars),
    };
  }
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export function T({
  k,
  vars,
}: {
  k: string;
  vars?: Record<string, string | number>;
}) {
  return <>{useT()(k, vars)}</>;
}

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      className={className}
      role="group"
      aria-label={t("nav.language")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={
          locale === "en"
            ? "rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white"
            : "rounded-full px-2.5 py-1 text-xs font-semibold text-slate-500"
        }
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("tr")}
        className={
          locale === "tr"
            ? "rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white"
            : "rounded-full px-2.5 py-1 text-xs font-semibold text-slate-500"
        }
      >
        TR
      </button>
    </div>
  );
}
