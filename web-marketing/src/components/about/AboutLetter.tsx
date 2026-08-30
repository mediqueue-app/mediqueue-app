"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    <section className="border-t border-border/60 bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          <ScrollBlock className="lg:pr-14 xl:pr-20">
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.missionLabel}
            </p>
            <p className="font-display mt-6 text-2xl leading-[1.55] text-ink sm:text-[1.65rem] lg:text-[1.75rem]">
              {copy.missionBody}
            </p>
          </ScrollBlock>

          <div
            className="hidden w-px self-stretch bg-border lg:block"
            aria-hidden
          />

          <ScrollBlock className="lg:pl-14 xl:pl-20" delay={0.08}>
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              {copy.visionLabel}
            </p>
            <p className="font-display mt-6 text-2xl leading-[1.55] text-ink sm:text-[1.65rem] lg:text-[1.75rem]">
              {copy.visionBody}
            </p>
          </ScrollBlock>
        </div>

        <ScrollBlock className="mt-16 border-t border-border/60 pt-10 md:mt-20" delay={0.12}>
          <p className="font-inter max-w-3xl text-base leading-relaxed text-slate-500 sm:text-lg">
            {copy.note}{" "}
            {copy.achievementChips.map((chip, i) => (
              <span key={chip.label}>
                {i > 0 && (
                  <span className="mx-1.5 text-slate-300" aria-hidden>
                    ·
                  </span>
                )}
                <span
                  className="group/chip relative inline-flex cursor-default align-baseline"
                  title={chip.detail}
                >
                  <span className="rounded-full border border-primary/20 bg-primary-light/40 px-2.5 py-0.5 text-[13px] font-medium text-primary transition-colors group-hover/chip:border-primary/35 group-hover/chip:bg-primary-light/70">
                    {chip.label}
                  </span>
                </span>
              </span>
            ))}
          </p>
        </ScrollBlock>
      </Container>
    </section>
  );
}
