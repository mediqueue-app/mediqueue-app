"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ClinicPerformancePreview } from "@/components/clinics/ClinicPerformancePreview";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

function RoadmapPreview({
  step,
  hint,
}: {
  step: number;
  hint?: string;
}) {
  if (step === 2) {
    return <ClinicRequestsPreview />;
  }
  if (step === 3) {
    return <BilingualChatPreview />;
  }
  if (!hint) {
    return null;
  }
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-white/60 px-6 text-center">
      <p className="max-w-sm text-sm leading-relaxed text-slate-500">{hint}</p>
    </div>
  );
}

export function ClinicJourneyRoadmap() {
  const { t } = useLocale();
  const c = t.clinics;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = c.roadmapSteps;
  const progress = ((active + 1) / steps.length) * 100;
  const step = steps[active];

  return (
    <section id="yol-haritasi" className="scroll-mt-24 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {c.roadmapTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {c.roadmapIntro}
          </p>
        </FadeIn>

        <div className="mt-12 hidden xl:block">
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-5 h-px bg-border"
              aria-hidden
            />
            <motion.div
              className="absolute left-0 top-5 h-px bg-primary"
              aria-hidden
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: reduced ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <ol className="relative grid grid-cols-7 gap-1">
              {steps.map((s, i) => {
                const current = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group w-full text-left transition-colors",
                        current
                          ? "text-primary"
                          : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <span
                        className={cn(
                          "mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-colors",
                          current
                            ? "border-primary text-primary"
                            : "border-border text-slate-400 group-hover:border-slate-300"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block pr-1 text-xs font-semibold leading-snug text-slate-900 sm:text-sm">
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 xl:hidden">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                i === active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-slate-600"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <p className="font-display text-6xl font-semibold leading-none text-slate-100">
              {String(active + 1).padStart(2, "0")}
            </p>
            <h3 className="-mt-8 text-2xl font-bold tracking-tight text-slate-900">
              {step?.title}
            </h3>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-band/50 p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-border">
                    <Building2 className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {c.roadmapClinicLabel}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-700">
                  {step?.clinic}
                </p>
              </div>

              <div className="rounded-2xl border border-primary/15 bg-primary-light/50 p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center gap-2.5">
                  <BrandLogo size="xs" />
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {c.roadmapMqLabel}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-800">
                  {step?.mediQueue}
                </p>
              </div>
            </div>

            {active === 6 ? (
              <ClinicPerformancePreview />
            ) : step?.previewHint || active === 2 || active === 3 ? (
              <div className="mt-8 rounded-2xl border border-border bg-band p-3 sm:p-4">
                <RoadmapPreview step={active} hint={step?.previewHint} />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
