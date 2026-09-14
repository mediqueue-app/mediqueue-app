"use client";

import { LocaleLink } from "@/components/ui/LocaleLink";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

type LegalKey = "privacy" | "terms" | "disclaimer";

export function LegalPage({ kind }: { kind: LegalKey }) {
  const { t } = useLocale();
  const doc = t.legal[kind];

  return (
    <Container className="py-10 md:py-16">
      <LocaleLink
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 mb-6"
      >
        <ArrowLeft className="h-4 w-4 text-primary" />
        <span>{t.legal.backHome}</span>
      </LocaleLink>
      <p className="text-xs text-slate-500">
        {t.legal.updatedLabel}: {doc.updated}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-[2.15rem] leading-[1.15] tracking-tight text-ink sm:text-5xl">
        {doc.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        {doc.intro}
      </p>
      <div className="mt-12 max-w-3xl space-y-8">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {section.body}
            </p>
          </section>
        ))}
      </div>
      <p className="mt-14 max-w-3xl border-t border-border pt-6 text-sm leading-relaxed text-slate-500">
        {t.footer.medicalDisclaimer}
      </p>
    </Container>
  );
}
