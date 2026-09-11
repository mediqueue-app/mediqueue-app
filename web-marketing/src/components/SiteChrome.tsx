"use client";

import { type ReactNode } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LeadCaptureModal } from "@/components/modals/LeadCaptureModal";
import { LeadCaptureProvider } from "@/lib/lead-capture";
import { LocaleProvider, useLocale } from "@/lib/locale";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <LeadCaptureProvider>
        <ChromeInner>{children}</ChromeInner>
      </LeadCaptureProvider>
    </LocaleProvider>
  );
}

function ChromeInner({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return (
    <div className="flex min-h-full flex-col">
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
      <LeadCaptureModal />
    </div>
  );
}
