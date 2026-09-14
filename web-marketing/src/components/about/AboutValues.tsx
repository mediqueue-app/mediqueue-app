"use client";

import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Stethoscope, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

const VALUE_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Stethoscope,
  Sparkles,
  CheckCircle2,
};

export function AboutValues() {
  const { t } = useLocale();
  const copy = t.team;
  const values = copy.values;

  if (!values || values.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-20 border-b border-slate-200/80">
      <Container>
        <FadeIn className="max-w-2xl mb-14 lg:mb-18">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary mb-3">
            <span>{copy.valuesEyebrow}</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.valuesTitle}
          </h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[v.icon] ?? ShieldCheck;
            return (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-2xs">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <span className="font-display text-2xl font-extrabold text-slate-300">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-tight text-slate-900">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {v.body}
                    </p>
                  </div>

                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
