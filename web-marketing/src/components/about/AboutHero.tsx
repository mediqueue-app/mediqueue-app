"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

export function AboutHero() {
  const { t } = useLocale();
  const copy = t.team;
  const reduced = useReducedMotion();

  const line = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_20%_-5%,rgba(58,106,214,0.07),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative flex min-h-[78vh] flex-col justify-center py-24 md:py-32 lg:py-36">
        <motion.p
          {...line(0)}
          className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
        >
          {copy.heroEyebrow}
        </motion.p>

        <h1 className="mt-8 max-w-5xl">
          <motion.span
            {...line(0.1)}
            className="block font-inter text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]"
          >
            {copy.heroLeadBold}
          </motion.span>
          <motion.span
            {...line(0.22)}
            className="mt-1 block font-display text-[2.5rem] font-normal italic leading-[1.06] tracking-[-0.02em] text-slate-600 sm:mt-2 sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.75rem]"
          >
            {copy.heroLeadLight}
          </motion.span>
        </h1>

        <motion.p
          {...line(0.38)}
          className="font-inter mt-10 max-w-2xl text-lg leading-[1.75] text-slate-600 sm:text-xl sm:leading-[1.8]"
        >
          {copy.heroIntro}
        </motion.p>
      </Container>
    </section>
  );
}
