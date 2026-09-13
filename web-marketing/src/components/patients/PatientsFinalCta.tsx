"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

export function PatientsFinalCta() {
  const { t } = useLocale();
  const p = t.patients;
  const { openLead } = useLeadCapture();

  return (
    <section className="scroll-mt-28 pt-4 pb-12 sm:pb-16">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-10 text-center sm:px-12 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(58,106,214,0.28),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(13,148,136,0.18),_transparent_46%)]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {p.finalTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/80">
                {p.finalBody}
              </p>
              <div className="mt-6">
                <Button onClick={() => openLead("patient")} size="lg">
                  {p.finalCta}
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
