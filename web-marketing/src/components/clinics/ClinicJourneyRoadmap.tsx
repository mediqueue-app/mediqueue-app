"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ClinicPerformancePreview } from "@/components/clinics/ClinicPerformancePreview";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

function StepCustomPreview({ step }: { step: number }) {
  const { locale } = useLocale();
  const tr = locale === "tr";

  if (step === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-bold tracking-tight text-slate-900">
              {tr ? "Akreditasyon & Kurumsal Doğrulama" : "Accreditation & Profile Verification"}
            </span>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {tr ? "Aktif Onaylı Profil" : "Verified Active Profile"}
          </span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-xs font-medium text-slate-500">{tr ? "JCI & Sağlık Lisansı" : "JCI & Ministry License"}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> {tr ? "Doğrulandı" : "Verified"}
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-xs font-medium text-slate-500">{tr ? "Çok Dilli Profil Sunumu" : "Multilingual Profile Presentation"}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> TR · EN
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-xs font-medium text-slate-500">{tr ? "Hasta Mahremiyeti" : "Patient Privacy"}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> {tr ? "KVKK & GDPR Uyumlu" : "GDPR & HIPAA Compliant"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return <ClinicRequestsPreview compact />;
  }

  if (step === 2) {
    return <BilingualChatPreview />;
  }

  if (step === 3) {
    return <ClinicPerformancePreview />;
  }

  return null;
}

export function ClinicJourneyRoadmap() {
  const { t, locale } = useLocale();
  const tr = locale === "tr";
  const c = t.clinics;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = c.roadmapSteps;
  const progress = ((active + 1) / steps.length) * 100;
  const step = steps[active];

  return (
    <section id="yol-haritasi" className="scroll-mt-28 bg-[#f8fafc] pt-6 md:pt-8 pb-20 md:pb-28 lg:pb-32">
      <Container>
        <FadeIn className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary">
            <span>{tr ? "Adım Adım Büyüme Rehberi" : "Step-by-Step Growth Guide"}</span>
          </div>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            {c.roadmapTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {c.roadmapIntro}
          </p>
        </FadeIn>

        {/* Timeline Desktop Navigation */}
        <div className="relative mt-16 lg:mt-20 hidden lg:block">
          {/* Continuous background track line behind circle centers */}
          <div
            className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2 bg-slate-200"
            aria-hidden
          />
          {/* Continuous active progress blue line */}
          <div
            className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2 pointer-events-none"
            aria-hidden
          >
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <ol className="relative grid grid-cols-4 gap-4">
            {steps.map((sItem, i) => {
              const current = i === active;
              const isPast = i < active;
              return (
                <li key={sItem.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative z-10 flex w-full flex-col items-center text-center transition-colors focus-visible:outline-none",
                      current
                        ? "text-primary"
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <span
                      className={cn(
                        "mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all shadow-xs",
                        current
                          ? "border-primary text-primary ring-4 ring-primary/10"
                          : isPast
                          ? "border-primary bg-primary-light text-primary"
                          : "border-slate-300 text-slate-400 group-hover:border-slate-400"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-sm font-semibold leading-snug text-slate-900 text-center max-w-[180px]">
                      {sItem.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile Horizontal Pill Scroll */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {steps.map((sItem, i) => (
            <button
              key={sItem.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                i === active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-slate-600"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {sItem.title}
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 lg:mt-18"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-base font-bold shadow-md shadow-primary/25">
                0{active + 1}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {step?.title}
              </h3>
            </div>

            {/* Clinic vs MediQueue Action Cards */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Building2 className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {c.roadmapClinicLabel}
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                    {tr ? "Sizin Adımınız" : "Your Action"}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed font-medium text-slate-800">
                  {step?.clinic}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-6 shadow-sm ring-1 ring-emerald-500/10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/mediqueue-icon.png"
                      alt="MediQueue"
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-emerald-500/15"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      {c.roadmapMqLabel}
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-100/90 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    {tr ? "Sistem Güvencesi" : "Platform Automation"}
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
