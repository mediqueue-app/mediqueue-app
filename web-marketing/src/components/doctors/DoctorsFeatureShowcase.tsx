"use client";

import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import {
  DoctorOverviewPreview,
  DoctorPatientsPreview,
  DoctorCalendarPreview,
  DoctorMessagesPreview,
  DoctorProfilePreview,
} from "@/components/doctors/DoctorFeaturePreviews";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = {
  overview: LayoutDashboard,
  patients: Users,
  calendar: Calendar,
  messages: MessageSquare,
  profile: UserCircle,
};

const PREVIEWS: Record<string, () => ReactNode> = {
  overview: DoctorOverviewPreview,
  patients: DoctorPatientsPreview,
  calendar: DoctorCalendarPreview,
  messages: DoctorMessagesPreview,
  profile: DoctorProfilePreview,
};

export function DoctorsFeatureShowcase() {
  const { t } = useLocale();
  const d = t.doctors;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const feature = d.features[active];
  const Preview = feature ? PREVIEWS[feature.id] : null;
  const Icon = feature ? ICONS[feature.id] : LayoutDashboard;

  return (
    <section id="ozellikler" className="scroll-mt-28 border-b border-slate-200/80 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary mb-5">
            <span>{d.featuresEyebrow}</span>
          </div>
          <h2 className="font-display max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {d.featuresTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {d.featuresIntro}
          </p>
        </FadeIn>

        <div className="mt-14 lg:mt-18 grid gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
          <FadeIn delay={0.06}>
            <ul className="space-y-2.5">
              {d.features.map((f, i) => {
                const FIcon = ICONS[f.id] ?? LayoutDashboard;
                const current = i === active;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "flex w-full items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200",
                        current
                          ? "border-primary/30 bg-primary-light/50 shadow-sm shadow-primary/10 ring-1 ring-primary/20"
                          : "border-slate-200/70 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors mt-0.5",
                          current
                            ? "bg-primary text-white shadow-xs"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <FIcon className="h-[18px] w-[18px]" strokeWidth={1.75} />
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
                key={feature?.id}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <div className="mb-3 flex items-center gap-2 lg:hidden">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {feature?.title}
                  </span>
                </div>
                {Preview ? <Preview /> : null}
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
