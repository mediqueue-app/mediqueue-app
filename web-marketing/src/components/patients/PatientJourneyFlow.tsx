"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { ComparePreview } from "@/components/patients/journey/ComparePreview";
import { DiscoverPreview } from "@/components/patients/journey/DiscoverPreview";
import { RecoveryPreview } from "@/components/patients/journey/RecoveryPreview";
import { RequestFormPreview } from "@/components/patients/journey/RequestFormPreview";
import { TravelPreview } from "@/components/patients/journey/TravelPreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

function JourneyPreview({ step }: { step: number }) {
  switch (step) {
    case 0:
      return <DiscoverPreview />;
    case 1:
      return <ComparePreview />;
    case 2:
      return <RequestFormPreview />;
    case 3:
      return <BilingualChatPreview />;
    case 4:
      return <TravelPreview />;
    case 5:
      return <RecoveryPreview />;
    default:
      return <DiscoverPreview />;
  }
}

export function PatientJourneyFlow() {
  const { t } = useLocale();
  const p = t.patients;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = p.journeySteps;
  const progress = ((active + 1) / steps.length) * 100;

  return (
    <section id="yolculuk" className="scroll-mt-24 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <h2 className="font-display max-w-2xl text-3xl tracking-tight text-ink sm:text-4xl">
            {p.journeyTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {p.journeyIntro}
          </p>
        </FadeIn>

        <div className="mt-12 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-border" aria-hidden />
            <motion.div
              className="absolute left-0 top-5 h-px bg-primary"
              aria-hidden
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <ol className="relative grid grid-cols-6 gap-2">
              {steps.map((step, i) => {
                const current = i === active;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group w-full text-left transition-colors",
                        current ? "text-primary" : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <span
                        className={cn(
                          "mb-4 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-colors",
                          current
                            ? "border-primary text-primary"
                            : "border-border text-slate-400 group-hover:border-slate-300"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-sm font-semibold leading-snug text-slate-900">
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {steps.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                i === active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-slate-600"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {step.title}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-6xl font-semibold leading-none text-slate-100">
                {String(active + 1).padStart(2, "0")}
              </p>
              <h3 className="-mt-8 text-2xl font-bold tracking-tight text-slate-900">
                {steps[active]?.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                {steps[active]?.body}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`preview-${active}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-band p-3 sm:p-4"
            >
              <JourneyPreview step={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
