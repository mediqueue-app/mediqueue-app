"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { ComparePreview } from "@/components/patients/journey/ComparePreview";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";
import { cn } from "@/lib/cn";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";

type Mode = "patient" | "clinic";
const STORAGE_KEY = "mediqueue-home-mode";

const spring = { type: "spring" as const, stiffness: 380, damping: 32 };

export function HomeHero() {
  const { t } = useLocale();
  const { openLead } = useLeadCapture();
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
      <HeroBackdrop />

      <Container className="relative pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex rounded-full border border-border bg-white p-1 shadow-sm"
            role="tablist"
            aria-label="Mode switcher"
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

        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl pb-2 lg:py-4"
            >
              <div className="min-h-[160px] sm:min-h-[175px]">
                <h1 className="font-display text-[2.35rem] leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
                  {copy.headline}
                  <span className="mt-1 block text-primary">{copy.headlineAccent}</span>
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  {copy.subcopy}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                <Button
                  onClick={() => openLead(mode === "patient" ? "patient" : "clinic", mode === "clinic" ? "clinic" : undefined)}
                  size="lg"
                  className="shadow-[0_14px_36px_-10px_rgba(58,106,214,0.45)]"
                >
                  {copy.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <Button
                  href="/how-it-works"
                  variant="ink"
                  size="lg"
                >
                  {copy.secondaryCta}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`preview-${mode}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[460px] pb-2"
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
              <div className="mt-4 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-xs">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>{copy.previewCaption}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
