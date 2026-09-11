"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Stethoscope, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import {
  DoctorCalendarPreview,
  DoctorProfilePreview,
} from "@/components/doctors/DoctorFeaturePreviews";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

function StepCustomPreview({ step }: { step: number }) {
  if (step === 0) {
    return <DoctorProfilePreview />;
  }
  if (step === 1) {
    return <DoctorProfilePreview />;
  }
  if (step === 2) {
    return <DoctorCalendarPreview />;
  }
  if (step === 3) {
    return <ClinicRequestsPreview compact />;
  }
  if (step === 4) {
    return <BilingualChatPreview />;
  }
  if (step === 5) {
    return <DoctorSchedulePreview />;
  }
  return null;
}

export function DoctorJourneyRoadmap() {
  const { t } = useLocale();
  const d = t.doctors;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = d.roadmapSteps;
  const progress = ((active + 1) / steps.length) * 100;
  const step = steps[active];

  return (
    <section id="yol-haritasi" className="scroll-mt-24 bg-[#f8fafc] py-20 md:py-24">
      <Container>
        <FadeIn className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Doktor Çalışma Akışı</span>
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            {d.roadmapTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {d.roadmapIntro}
          </p>
        </FadeIn>

        {/* Timeline Desktop Navigation */}
        <div className="mt-12 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-slate-200" aria-hidden />
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
            <ol className="relative grid grid-cols-6 gap-1">
              {steps.map((s, i) => {
                const current = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group w-full text-left transition-colors focus-visible:outline-none",
                        current ? "text-primary" : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <span
                        className={cn(
                          "mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all shadow-sm",
                          current
                            ? "border-primary text-primary ring-4 ring-primary/10"
                            : "border-slate-200 text-slate-400 group-hover:border-slate-300"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block pr-1 text-xs font-bold leading-snug text-slate-900 sm:text-sm">
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                i === active
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {s.title}
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white text-base font-bold shadow-md shadow-primary/25">
                0{active + 1}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {step?.title}
              </h3>
            </div>

            {/* Doctor vs MediQueue Action Cards */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Stethoscope className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {d.roadmapDoctorLabel}
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                    Hekim Adımı
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed font-medium text-slate-800">
                  {step?.doctor}
                </p>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary-light/50 p-6 shadow-sm ring-1 ring-primary/10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <BrandLogo size="xs" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {d.roadmapMqLabel}
                    </span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                    Otomatik Panelleşme
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed font-semibold text-slate-900">
                  {step?.mediQueue}
                </p>
              </div>
            </div>

            {/* Live Interactive UI Mock Preview */}
            <div className="mt-6">
              <StepCustomPreview step={active} />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
