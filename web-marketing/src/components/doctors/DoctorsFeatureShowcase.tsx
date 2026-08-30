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
    <section id="ozellikler" className="scroll-mt-24 bg-white py-16 md:py-20">
      <Container>
        <FadeIn>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {d.featuresTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {d.featuresIntro}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-14">
          <FadeIn delay={0.06}>
            <ul className="space-y-2 lg:space-y-1">
              {d.features.map((f, i) => {
                const FIcon = ICONS[f.id] ?? LayoutDashboard;
                const current = i === active;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        "flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-200",
                        current
                          ? "border-primary/25 bg-primary-light/40 shadow-sm shadow-primary/5"
                          : "border-transparent hover:border-border hover:bg-band/60"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                          current
                            ? "bg-primary text-white"
                            : "bg-band text-slate-500"
                        )}
                      >
                        <FIcon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-sm font-semibold text-slate-900">
                          {f.title}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-sm leading-relaxed text-slate-600",
                            current ? "line-clamp-none" : "line-clamp-2 lg:line-clamp-1"
                          )}
                        >
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
            <div className="relative min-h-[320px] lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={feature?.id}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
