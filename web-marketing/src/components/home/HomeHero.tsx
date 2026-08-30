"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { ComparePreview } from "@/components/patients/journey/ComparePreview";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

type Mode = "patient" | "clinic";
const STORAGE_KEY = "mediqueue-home-mode";

const spring = { type: "spring" as const, stiffness: 380, damping: 32 };

export function HomeHero() {
  const { t } = useLocale();
  const h = t.home;
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("patient");
  const copy = mode === "patient" ? h.patient : h.clinic;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "patient" || saved === "clinic") setMode(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function select(next: Mode) {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(58,106,214,0.14),transparent_55%),linear-gradient(180deg,var(--color-mist)_0%,#ffffff_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {h.platformEyebrow}
          </p>

          <div
            className="mt-8 inline-flex rounded-full border border-border bg-white p-1 shadow-sm"
            role="tablist"
            aria-label={h.platformEyebrow}
          >
            {(["patient", "clinic"] as const).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => select(key)}
                className={cn(
                  "relative min-h-11 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  mode === key ? "text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {mode === key && !reduced ? (
                  <motion.span
                    layoutId="home-mode-pill"
                    className="absolute inset-0 rounded-full bg-ink shadow-md"
                    transition={spring}
                  />
                ) : mode === key ? (
                  <span className="absolute inset-0 rounded-full bg-ink shadow-md" />
                ) : null}
                <span className="relative z-10">
                  {key === "patient" ? h.audiencePatient : h.audienceClinic}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={reduced ? false : { opacity: 0, x: mode === "patient" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: mode === "patient" ? 16 : -16 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl lg:mx-0"
            >
              <h1 className="font-display text-[2.35rem] leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
                {copy.headline}
                <span className="mt-1 block text-primary">{copy.headlineAccent}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {copy.subcopy}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={mode === "patient" ? "/patients" : "/clinics"}
                  size="lg"
                  className="shadow-[0_14px_36px_-10px_rgba(58,106,214,0.45)]"
                >
                  {copy.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <Button
                  href={mode === "patient" ? "/team" : "/clinics#yol-haritasi"}
                  variant="ink"
                  size="lg"
                >
                  {copy.secondaryCta}
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {h.proof.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-full border border-border bg-white/80 px-3.5 py-1.5 text-xs text-slate-600 backdrop-blur-sm"
                  >
                    <span className="font-semibold text-accent">{item.kicker}</span>
                    <span className="ml-2">{item.title}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`preview-${mode}`}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-white p-2 shadow-[0_32px_80px_-32px_rgba(12,26,61,0.22)]">
                {mode === "patient" ? (
                  <ComparePreview />
                ) : (
                  <ClinicRequestsPreview compact />
                )}
              </div>
              <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
                {copy.previewCaption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
