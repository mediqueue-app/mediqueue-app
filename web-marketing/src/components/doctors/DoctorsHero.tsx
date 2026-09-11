"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { useLocale } from "@/lib/locale";

export function DoctorsHero() {
  const { t } = useLocale();
  const d = t.doctors;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroBackdrop withGrid />
      <Container className="relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-28">
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {d.eyebrow}
          </p>
          <h1 className="font-display mt-4 text-[2.35rem] leading-[1.12] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
            {d.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            {d.intro}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#basla" size="lg">
              {d.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button href="#ozellikler" variant="ink" size="lg">
              {d.secondaryCta}
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <DoctorSchedulePreview />
          <p className="mt-3 text-xs text-slate-500">{d.caption}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
