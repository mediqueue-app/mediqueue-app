"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function TrustCredentials() {
  const { t } = useLocale();
  const p = t.patients;

  return (
    <section className="border-y border-border bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-border bg-slate-900 text-white">
            <div className="grid lg:grid-cols-[minmax(0,0.38fr)_1px_minmax(0,1fr)]">
              <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-14">
                <p className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  JCI
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-light">
                  {p.trustJci}
                </p>
                <div className="my-8 h-px w-full bg-white/15 lg:hidden" />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
                  {p.trustNational}
                </p>
              </div>

              <div className="hidden bg-white/10 lg:block" aria-hidden />

              <div className="flex flex-col justify-center border-t border-white/10 px-8 py-10 sm:px-12 sm:py-14 lg:border-t-0">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {p.trustTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
                  {p.trustBody}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
