"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { useLocale } from "@/lib/locale";

export function PatientsHero() {
  const { t } = useLocale();
  const p = t.patients;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroBackdrop />
      <Container className="relative pt-8 pb-16 lg:pt-12 lg:pb-20">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {p.seoTitle}
          </p>
          <h1 className="font-display mt-4 text-[2.35rem] leading-[1.12] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
            {p.heroTag}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {p.heroSub}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#yolculuk" size="lg">
              {p.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button href="#neden" variant="ink" size="lg">
              {p.secondaryCta}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
