"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IncomingRequestCard } from "@/components/clinics/IncomingRequestCard";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

function splitHook(tag: string) {
  const i = tag.indexOf(". ");
  if (i === -1) return { lead: tag, rest: "" };
  return { lead: tag.slice(0, i + 1), rest: tag.slice(i + 2) };
}

export function ClinicsHero() {
  const { t } = useLocale();
  const { openLead } = useLeadCapture();
  const c = t.clinics;
  const { lead, rest } = splitHook(c.heroTag);

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_18%,transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_at_top_right,_rgba(58,106,214,0.12),_transparent_52%),radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.08),_transparent_46%)]"
        aria-hidden
      />
      <Container className="relative grid items-center gap-16 py-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20 lg:py-32">
        <FadeIn>
          <h1 className="max-w-xl text-[2.4rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem]">
            {lead}
            {rest ? (
              <span className="mt-3 block text-slate-900">{rest}</span>
            ) : null}
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-600">
            {c.heroSub}
          </p>
          <div className="mt-11 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="shadow-[0_14px_36px_-10px_rgba(58,106,214,0.55)]"
              onClick={() => openLead("clinic")}
            >
              {c.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button href="#yol-haritasi" variant="ink" size="lg">
              {c.secondaryCta}
            </Button>
          </div>
        </FadeIn>
        <IncomingRequestCard />
      </Container>
    </section>
  );
}
