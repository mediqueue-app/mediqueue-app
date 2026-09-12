"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ShieldCheck, HeartPulse } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { useLocale } from "@/lib/locale";

export function AboutHero() {
  const { t } = useLocale();
  const copy = t.team;
  const reduced = useReducedMotion();

  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-slate-50/40 border-b border-slate-200/80 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <HeroBackdrop withGrid />

      <Container className="relative">
        <motion.div {...anim(0)} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light/80 px-4 py-1.5 text-xs font-bold text-primary mb-6 shadow-2xs">
            <Sparkles className="h-4 w-4" />
            <span>{copy.heroEyebrow}</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem] leading-[1.1]">
            {copy.heroLeadBold}{" "}
            <span className="bg-gradient-to-r from-primary via-primary-dark to-slate-900 bg-clip-text text-transparent font-semibold italic">
              {copy.heroLeadLight}
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed">
            {copy.heroIntro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200/80 pt-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-2 text-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              %100 Doğrulanmış Sağlık Ağı
            </span>
            <span className="flex items-center gap-2 text-slate-800">
              <HeartPulse className="h-4 w-4 text-primary" />
              Sıfır Komisyonlu İletişim
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
