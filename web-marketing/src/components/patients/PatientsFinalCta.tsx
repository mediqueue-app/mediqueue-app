"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function PatientsFinalCta() {
  const { t } = useLocale();
  const p = t.patients;

  return (
    <section className="bg-band pb-28 pt-8">
      <Container>
        <FadeIn>
          <div className="rounded-2xl border border-border bg-white px-8 py-14 text-center sm:px-16 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {p.finalTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              {p.finalBody}
            </p>
            <div className="mt-9">
              <Button href="/patients" size="lg">
                {p.finalCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
