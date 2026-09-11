"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

export function HomeFinalCta() {
  const { t } = useLocale();
  const h = t.home;

  return (
    <section className="bg-band py-16 md:py-20">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="flex flex-col rounded-[1.75rem] border border-border bg-white p-8 shadow-sm sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              {t.home.audiencePatient}
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {h.finalPatientTitle}
            </h2>
            <p className="mt-4 flex-1 text-base leading-relaxed text-slate-600">
              {h.finalPatientBody}
            </p>
            <Button href="/patients" size="lg" className="mt-8 w-full sm:w-auto">
              {h.finalPatientCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-ink p-8 text-white sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,106,214,0.35),transparent_55%)]"
              aria-hidden
            />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-light">
              {t.home.audienceClinic}
            </p>
            <h2 className="font-display relative mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {h.finalClinicTitle}
            </h2>
            <p className="relative mt-4 flex-1 text-base leading-relaxed text-white/75">
              {h.finalClinicBody}
            </p>
            <Button
              href="/clinics#basla"
              size="lg"
              className="relative mt-8 w-full bg-white text-ink hover:bg-white/90 sm:w-auto"
            >
              {h.finalClinicCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </article>
        </div>
      </Container>
    </section>
  );
}
