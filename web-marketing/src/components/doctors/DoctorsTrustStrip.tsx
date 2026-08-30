"use client";

import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function DoctorsTrustStrip() {
  const { t } = useLocale();
  const d = t.doctors;

  return (
    <section className="border-y border-border bg-white py-8 md:py-10">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
              {d.trustMessage}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
