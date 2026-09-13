"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

import { DemoCaptionPill } from "@/components/ui/DemoCaptionPill";

export function DoctorsHero() {
  const { t } = useLocale();
  const d = t.doctors;
  const { openLead } = useLeadCapture();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroBackdrop />
      <Container className="relative grid gap-12 pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:items-center">
        <FadeIn className="my-auto self-center py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {d.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-xl text-[2.35rem] leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
            {d.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            {d.intro}
          </p>
          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <Button onClick={() => openLead("clinic", "doctor")} size="lg">
              {d.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button href="#yol-haritasi" variant="ink" size="lg">
              {d.secondaryCta}
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="self-center">
          <DoctorSchedulePreview />
        </FadeIn>
      </Container>
    </section>
  );
}
