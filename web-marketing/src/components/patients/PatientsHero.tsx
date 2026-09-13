"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PatientDiscoveryCard } from "@/components/patients/PatientDiscoveryCard";
import { FadeIn } from "@/components/clinics/FadeIn";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

import { DemoCaptionPill } from "@/components/ui/DemoCaptionPill";

function splitHook(tag: string) {
  const i = tag.indexOf(". ");
  if (i === -1) return { lead: tag, rest: "" };
  return { lead: tag.slice(0, i + 1), rest: tag.slice(i + 2) };
}

export function PatientsHero() {
  const { t } = useLocale();
  const p = t.patients;
  const { openLead } = useLeadCapture();
  const { lead, rest } = splitHook(p.heroTag);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroBackdrop />
      <Container className="relative grid gap-12 pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:items-center">
        <FadeIn className="my-auto py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {p.seoTitle}
          </p>
          <h1 className="font-display mt-4 max-w-xl text-[2.35rem] leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
            {lead}
            {rest ? (
              <span className="mt-2 block text-primary">{rest}</span>
            ) : null}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            {p.heroSub}
          </p>
          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <Button onClick={() => openLead("patient")} size="lg">
              {p.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button href="#neden" variant="ink" size="lg">
              {p.secondaryCta}
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <PatientDiscoveryCard />
        </FadeIn>
      </Container>
    </section>
  );
}
