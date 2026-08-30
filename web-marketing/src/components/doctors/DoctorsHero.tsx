"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function DoctorsHero() {
  const { t } = useLocale();
  const d = t.doctors;

  return (
    <section className="relative overflow-hidden bg-[#eef1f6]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_18%,transparent_72%)]"
        aria-hidden
      />
      <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-28">
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {d.eyebrow}
          </p>
          <h1 className="font-display mt-3 text-[2.25rem] leading-[1.12] tracking-[-0.03em] text-slate-900 sm:text-5xl">
            {d.title}
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-600">
            {d.intro}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href="#basla"
              size="lg"
              className="shadow-[0_14px_36px_-10px_rgba(58,106,214,0.55)]"
            >
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
