"use client";

import { type ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { DocumentTitle } from "@/components/DocumentTitle";
import { LocaleProvider, useLocale } from "@/lib/locale";
import { LeadCaptureProvider } from "@/lib/lead-capture";
import { LeadCaptureModal } from "@/components/modals/LeadCaptureModal";
import type { Locale } from "@/content";

export function SiteChrome({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <LeadCaptureProvider>
        <ChromeInner>{children}</ChromeInner>
        <LeadCaptureModal />
      </LeadCaptureProvider>
    </LocaleProvider>
  );
}

function ChromeInner({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return (
    <div className="flex min-h-full flex-col">
      <DocumentTitle />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t.nav.skip}
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
