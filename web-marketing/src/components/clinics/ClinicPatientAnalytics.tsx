"use client";

import { useMemo } from "react";
import { Globe2, Inbox, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import {
  OriginReachWidget,
  previewClinicOriginCountries,
  formatNumber,
} from "@/lib/global-reach";

const HIGHLIGHT_ICONS = [Globe2, TrendingUp, Inbox];

export function ClinicPatientAnalytics() {
  const { t, locale } = useLocale();
  const a = t.clinics.analytics;

  const panelSubtitle = useMemo(() => {
    const total = previewClinicOriginCountries.reduce(
      (sum, c) => sum + c.patientCount,
      0
    );
    const countries = previewClinicOriginCountries.length;
    return a.panelSubtitle
      .replace("{patients}", formatNumber(total, locale))
      .replace("{countries}", String(countries));
  }, [a.panelSubtitle, locale]);

  return (
    <section
      id="hasta-analitigi"
      className="scroll-mt-28 border-b border-slate-200/80 bg-white py-12 md:py-16"
      aria-labelledby="clinic-analytics-title"
    >
      <Container>
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {a.eyebrow}
          </p>
          <h2
            id="clinic-analytics-title"
            className="font-display mt-2 max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {a.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            {a.body}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-8">
          <OriginReachWidget
            scope="clinic"
            data={previewClinicOriginCountries}
            title={a.panelTitle}
            subtitle={panelSubtitle}
            countryColumnLabel={a.countryColumn}
            patientColumnLabel={a.patientColumn}
            emptyListText={a.emptyList}
            demoCaption={a.demoCaption}
            revealOnScroll
            variant="section"
            showListScrollControls
          />
        </FadeIn>

        <FadeIn delay={0.12} className="mt-8">
          <ul className="grid gap-6 sm:grid-cols-3">
            {a.highlights.map((item, i) => {
              const Icon = HIGHLIGHT_ICONS[i] ?? Globe2;
              return (
                <li key={item.title} className="flex gap-3 items-start">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm ring-1 ring-border mt-0.5">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
