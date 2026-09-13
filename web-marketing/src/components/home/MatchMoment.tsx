"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, BadgeCheck, Building2, Check, UserRound } from "lucide-react";
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
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50 py-16 text-slate-900 md:py-20"
      aria-labelledby="match-moment-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(58,106,214,0.06),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(13,148,136,0.07),transparent_40%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            <Check className="h-3.5 w-3.5 text-teal-600" />
            {m.eyebrow}
          </span>
          <h2
            id="match-moment-title"
            className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {m.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{m.body}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Connection line — passes through card centers */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 hidden h-0.5 -translate-y-1/2 bg-slate-200 lg:block"
              aria-hidden
            >
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-primary via-teal-500 to-primary"
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
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-teal-200 bg-white shadow-xl shadow-teal-500/15 ring-4 ring-white">
                <ArrowLeftRight className="h-6 w-6 text-teal-600" strokeWidth={2} />
                {!reduced && active ? (
                  <span className="absolute inset-0 animate-ping rounded-full border border-teal-400/40" />
                ) : null}
              </div>
            </motion.div>

            {/* Patient request */}
            <motion.article
              className="relative z-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.08)] sm:p-7"
              initial={reduced ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : -40 }}
              transition={{ duration: duration * 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <UserRound className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {m.patientLabel}
                  </span>
                  <p className="text-base font-bold text-slate-900">{t.previews.matchPatientDemo}</p>
                </div>
              </div>
              <div className="mt-5 space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  {m.patientTags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700"
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
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-teal-300 bg-white shadow-lg shadow-teal-500/20">
                <ArrowLeftRight className="h-5 w-5 text-teal-600" strokeWidth={2} />
              </div>
              <p className="text-sm font-bold text-teal-700">{m.matchBadge}</p>
              <p className="max-w-[14rem] text-center text-[11px] font-medium uppercase tracking-wide text-slate-500">
                {m.noBroker}
              </p>
            </motion.div>

            {/* Clinic profile */}
            <motion.article
              className="relative z-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.08)] sm:p-7"
              initial={reduced ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: active ? 1 : 0, x: active ? 0 : 40 }}
              transition={{
                duration: duration * 0.7,
                delay: reduced ? 0 : delay * 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                  <Building2 className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {m.clinicLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-slate-900">{t.previews.clinicCode}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                      JCI
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  {m.clinicTags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-semibold",
                        i === 0
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-slate-50 text-slate-700"
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
            className="mt-8 hidden flex-col items-center gap-1 lg:flex"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : delay + 0.45 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/25">
              <Check className="h-4 w-4" />
              {m.matchBadge}
            </span>
            <p className="mt-1 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              {m.noBroker}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
