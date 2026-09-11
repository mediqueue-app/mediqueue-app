"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function DoctorsFinalCta() {
  const { t } = useLocale();
  const d = t.doctors;

  return (
    <section id="basla" className="scroll-mt-24 pb-28 pt-8">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-8 py-20 text-center sm:px-16 sm:py-24">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(58,106,214,0.28),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.18),_transparent_46%)]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-5xl">
                {d.finalTitle}
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                {d.finalBody}
              </p>
              <div className="mt-10">
                <Button
                  href="#yol-haritasi"
                  size="lg"
                  className="shadow-[0_14px_36px_-10px_rgba(58,106,214,0.7)]"
                >
                  {d.finalCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
