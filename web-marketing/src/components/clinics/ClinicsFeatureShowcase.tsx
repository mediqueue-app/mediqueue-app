"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { ClinicPatientAnalytics } from "@/components/clinics/ClinicPatientAnalytics";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

const CLINIC_ICONS = {
  requests: LayoutDashboard,
  analytics: BarChart3,
  direct: Users,
  schedule: Calendar,
} as const;

export function ClinicsFeatureShowcase() {
  const { t } = useLocale();
  const block = t.screens.clinicsShowcase;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const features = block.items.map((item) => ({
    ...item,
    icon: CLINIC_ICONS[item.id as keyof typeof CLINIC_ICONS] ?? LayoutDashboard,
  }));

  const currentFeature = features[active];

  return (
    <section id="ozellikler" className="scroll-mt-28 border-b border-slate-200/80 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {block.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {block.intro}
          </p>
        </FadeIn>

        <div className="mt-14 lg:mt-18 grid gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
          <FadeIn delay={0.06}>
            <ul className="space-y-2.5">
              {features.map((f, i) => {
                const Icon = f.icon;
                const isSelected = i === active;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "flex w-full items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
                        isSelected
                          ? "border-primary/30 bg-primary-light/50 shadow-sm shadow-primary/10 ring-1 ring-primary/20"
                          : "border-slate-200/70 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors mt-0.5",
                          isSelected
                            ? "bg-primary text-white shadow-xs"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900">
                          {f.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-600 line-clamp-2">
                          {f.body}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={0.12}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="mb-3 flex items-center gap-2 lg:hidden">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                    {currentFeature.icon && <currentFeature.icon className="h-4 w-4" strokeWidth={1.75} />}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {currentFeature.title}
                  </span>
                </div>
                
                {currentFeature.id === "analytics" ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
                    <ClinicPatientAnalytics />
                  </div>
                ) : currentFeature.id === "direct" ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
                    <BilingualChatPreview />
                  </div>
                ) : currentFeature.id === "schedule" ? (
                  <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                    <DoctorSchedulePreview />
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
                    <ClinicRequestsPreview compact />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
