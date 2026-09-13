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
    <div className="w-full bg-white py-1 sm:py-2" id="hasta-analitigi">
      <div className="w-full">
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {a.eyebrow}
          </p>
          <h2
            id="clinic-analytics-title"
            className="font-display mt-1.5 max-w-2xl text-xl font-bold tracking-tight text-ink sm:text-2xl"
          >
            {a.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">
            {a.body}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-4 sm:mt-5">
          <OriginReachWidget
            scope="clinic"
            data={previewClinicOriginCountries}
            title={a.panelTitle}
            subtitle={panelSubtitle}
            countryColumnLabel={a.countryColumn}
            patientColumnLabel={a.patientColumn}
            emptyListText={a.emptyList}
            revealOnScroll
            variant="section"
            showListScrollControls
          />
        </FadeIn>

        <FadeIn delay={0.12} className="mt-4 sm:mt-5">
          <ul className="grid gap-4 sm:grid-cols-3">
            {a.highlights.map((item, i) => {
              const Icon = HIGHLIGHT_ICONS[i] ?? Globe2;
              return (
                <li key={item.title} className="flex gap-2.5 items-start">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-xs ring-1 ring-border mt-0.5">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}
