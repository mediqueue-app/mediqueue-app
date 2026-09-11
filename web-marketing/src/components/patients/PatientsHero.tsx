"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

export function PatientsHero() {
  const { t } = useLocale();
  const { openLead } = useLeadCapture();
  const p = t.patients;

  return (
    <section className="border-b border-border bg-white">
      <Container className="py-20 lg:py-28">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-[2.25rem] leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3rem]">
            {p.heroTag}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {p.heroSub}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openLead("patient")}>
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
