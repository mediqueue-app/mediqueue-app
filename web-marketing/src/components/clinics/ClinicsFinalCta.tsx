"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

export function ClinicsFinalCta() {
  const { t } = useLocale();
  const c = t.clinics;
  const { openLead } = useLeadCapture();

  return (
    <section id="basla" className="scroll-mt-28 pt-4 pb-12 sm:pb-16">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-10 text-center sm:px-12 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(58,106,214,0.28),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.18),_transparent_46%)]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {c.finalTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/80">
                {c.finalBody}
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => openLead("clinic", "clinic")}
                  size="lg"
                  className="shadow-[0_14px_36px_-10px_rgba(58,106,214,0.7)]"
                >
                  {c.finalCta}
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
