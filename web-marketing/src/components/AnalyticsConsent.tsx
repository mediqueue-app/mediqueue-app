"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useLocale } from "@/lib/locale";
import { ANALYTICS_CONSENT_COOKIE } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const MAX_AGE = 60 * 60 * 24 * 365;

function readConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ANALYTICS_CONSENT_COOKIE}=`));
  const value = match?.split("=")[1];
  if (value === "granted" || value === "denied") return value;
  return null;
}

function writeConsent(value: "granted" | "denied") {
  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function AnalyticsConsent() {
  const { t } = useLocale();
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  if (!ready) return null;

  const loadGa = Boolean(GA_ID && consent === "granted");

  return (
    <>
      {loadGa ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `,
            }}
          />
        </>
      ) : null}

      {consent === null ? (
        <div
          role="dialog"
          aria-label={t.cookie.message}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white/95 p-4 shadow-[0_-12px_40px_-20px_rgba(15,23,42,0.25)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-600">
              {t.cookie.message}{" "}
              <LocaleLink
                href="/privacy"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {t.cookie.privacy}
              </LocaleLink>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => {
                  writeConsent("denied");
                  setConsent("denied");
                }}
                className="min-h-10 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {t.cookie.reject}
              </button>
              <button
                type="button"
                onClick={() => {
                  writeConsent("granted");
                  setConsent("granted");
                }}
                className="min-h-10 rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
