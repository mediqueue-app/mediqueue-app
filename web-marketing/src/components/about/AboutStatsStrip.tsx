"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function AboutStatsStrip() {
  const { t } = useLocale();
  const copy = t.team;
  const stats = copy.stats;

  if (!stats || stats.length === 0) return null;

  return (
    <section className="border-b border-slate-200/80 bg-white py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((st, i) => (
            <FadeIn key={st.label} delay={i * 0.07}>
              <div className="flex flex-col border-l-2 border-primary/30 pl-4 sm:pl-6">
                <span className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  {st.value}
                </span>
                <span className="mt-2 text-base font-bold text-slate-800">
                  {st.label}
                </span>
                <span className="mt-1 text-xs text-slate-500 leading-snug">
                  {st.hint}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
