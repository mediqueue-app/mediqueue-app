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
  const { t } = useLocale();
  const a = t.clinics.analytics;

  const panelSubtitle = useMemo(() => {
    const total = previewClinicOriginCountries.reduce(
      (sum, c) => sum + c.patientCount,
      0
    );
    const countries = previewClinicOriginCountries.length;
    return a.panelSubtitle
      .replace("{patients}", formatNumber(total))
      .replace("{countries}", String(countries));
  }, [a.panelSubtitle]);

  return (
    <section
      id="hasta-analitigi"
      className="scroll-mt-24 border-t border-border bg-band py-16 md:py-20"
      aria-labelledby="clinic-analytics-title"
    >
      <Container>
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {a.eyebrow}
          </p>
          <h2
            id="clinic-analytics-title"
            className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {a.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            {a.body}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
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

        <FadeIn delay={0.12} className="mt-10">
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {a.highlights.map((item, i) => {
              const Icon = HIGHLIGHT_ICONS[i] ?? Globe2;
              return (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-border">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
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
