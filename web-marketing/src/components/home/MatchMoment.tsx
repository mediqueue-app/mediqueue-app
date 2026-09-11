"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, BadgeCheck, Building2, UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function MatchMoment() {
  const { t } = useLocale();
  const m = t.home.match;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) {
      setActive(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const duration = reduced ? 0 : 0.85;
  const delay = reduced ? 0 : 0.12;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-white md:py-28"
      aria-labelledby="match-moment-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(58,106,214,0.22),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(13,148,136,0.18),transparent_40%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">
            {m.eyebrow}
          </p>
          <h2
            id="match-moment-title"
            className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {m.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{m.body}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Connection line — passes through card centers */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 hidden h-px -translate-y-1/2 bg-white/10 lg:block"
              aria-hidden
            >
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ scaleX: reduced ? 1 : 0 }}
                animate={{ scaleX: active ? 1 : 0 }}
                transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Match circle — dead center between cards */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 0.85,
              }}
              transition={{ duration: 0.5, delay: reduced ? 0 : delay + 0.35 }}
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-ink bg-accent/20 shadow-[0_0_40px_-8px_rgba(13,148,136,0.65)] ring-4 ring-ink">
                <ArrowLeftRight className="h-6 w-6 text-accent-light" strokeWidth={1.75} />
                {!reduced && active ? (
                  <span className="absolute inset-0 animate-ping rounded-full border border-accent/30" />
                ) : null}
              </div>
            </motion.div>

            {/* Patient request */}
            <motion.article
              className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6"
              initial={reduced ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : -40 }}
              transition={{ duration: duration * 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
                  <UserRound className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold text-white/90">{m.patientLabel}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80">{t.previews.matchPatientDemo}</p>
                <div className="flex flex-wrap gap-2">
                  {m.patientTags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                      transition={{
                        duration: 0.4,
                        delay: reduced ? 0 : delay + i * 0.08,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Mobile match badge — between stacked cards */}
            <motion.div
              className="relative z-20 flex flex-col items-center gap-2 lg:hidden"
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 0.85,
              }}
              transition={{ duration: 0.5, delay: reduced ? 0 : delay + 0.35 }}
            >
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/20 shadow-[0_0_40px_-8px_rgba(13,148,136,0.65)]">
                <ArrowLeftRight className="h-5 w-5 text-accent-light" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-bold text-accent-light">{m.matchBadge}</p>
              <p className="max-w-[14rem] text-center text-[11px] uppercase tracking-wide text-white/50">
                {m.noBroker}
              </p>
            </motion.div>

            {/* Clinic profile */}
            <motion.article
              className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6"
              initial={reduced ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : 40 }}
              transition={{
                duration: duration * 0.7,
                delay: reduced ? 0 : delay * 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent-light">
                  <Building2 className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold text-white/90">{m.clinicLabel}</p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-white/80">{t.previews.clinicCode}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary-light">
                    <BadgeCheck className="h-3 w-3" />
                    JCI
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.clinicTags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium",
                        i === 0
                          ? "border-accent/30 bg-accent/15 text-accent-light"
                          : "border-white/15 bg-white/10 text-white/90"
                      )}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                      transition={{
                        duration: 0.4,
                        delay: reduced ? 0 : delay + 0.2 + i * 0.08,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>

          {/* Match labels — below cards, centered under the circle (desktop) */}
          <motion.div
            className="mt-6 hidden flex-col items-center gap-1 lg:flex"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : delay + 0.45 }}
          >
            <p className="text-sm font-bold text-accent-light">{m.matchBadge}</p>
            <p className="text-center text-[11px] uppercase tracking-wide text-white/50">
              {m.noBroker}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
