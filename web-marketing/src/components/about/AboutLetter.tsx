"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target, Compass, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

function ScrollBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AboutLetter() {
  const { t } = useLocale();
  const copy = t.team;

  return (
    <section className="bg-slate-50/50 py-16 md:py-20 border-b border-slate-200/80">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Mission Card */}
          <ScrollBlock delay={0}>
            <div className="relative flex h-full flex-col justify-between rounded-[2rem] border border-slate-200/90 bg-white p-8 shadow-md sm:p-10 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
              <Quote className="pointer-events-none absolute right-8 top-8 h-20 w-20 text-primary/10" />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-2xs">
                    <Target className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {copy.missionLabel}
                  </span>
                </div>
                <p className="font-display text-xl leading-relaxed text-slate-900 sm:text-2xl sm:leading-relaxed font-semibold">
                  "{copy.missionBody}"
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span>MediQueue Hasta & Hekim Güvencesi</span>
              </div>
            </div>
          </ScrollBlock>

          {/* Vision Card */}
          <ScrollBlock delay={0.08}>
            <div className="relative flex h-full flex-col justify-between rounded-[2rem] border border-slate-200/90 bg-white p-8 shadow-md sm:p-10 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg">
              <Quote className="pointer-events-none absolute right-8 top-8 h-20 w-20 text-emerald-500/10" />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-2xs border border-emerald-100">
                    <Compass className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                    {copy.visionLabel}
                  </span>
                </div>
                <p className="font-display text-xl leading-relaxed text-slate-900 sm:text-2xl sm:leading-relaxed font-semibold">
                  "{copy.visionBody}"
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>Küresel Şeffaf Sağlık Pazar Yeri</span>
              </div>
            </div>
          </ScrollBlock>
        </div>
      </Container>
    </section>
  );
}
