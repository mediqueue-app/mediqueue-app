"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Stethoscope,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Users,
  MessageSquare,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";
import { cn } from "@/lib/cn";

const STEP_ICONS = [Search, Send, Stethoscope];
const PIPELINE_ICONS = [Filter, Users, MessageSquare];

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-[220ms] ease-out",
              isOpen
                ? "border-primary/30 bg-white shadow-md ring-1 ring-primary/10"
                : "border-slate-200/80 bg-white hover:border-slate-300 shadow-xs"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-slate-900 focus-visible:outline-none"
            >
              <span className="flex items-center gap-3">
                <HelpCircle
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isOpen ? "text-primary" : "text-slate-400"
                  )}
                />
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-[220ms] ease-out",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function HowPage() {
  const { t } = useLocale();
  const h = t.how;
  const { openLead } = useLeadCapture();

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-slate-50/50">
        <HeroBackdrop />
        <Container className="relative pt-8 pb-8 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12">
          <FadeIn className="max-w-3xl">
            <h1 className="font-display text-[2.35rem] leading-[1.12] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
              {h.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {h.intro}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => openLead("patient")} size="lg">
                {h.patientCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
              <Button onClick={() => openLead("clinic", "clinic")} variant="ink" size="lg">
                {h.clinicCta}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 3 Steps Section */}
      <section className="border-b border-slate-200/80 bg-white py-16 md:py-20">
        <Container>
          <FadeIn className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {h.stepsKicker}
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {h.stepsTitle}
            </h2>
          </FadeIn>

          <ol className="mt-14 lg:mt-18 grid gap-6 md:grid-cols-3 lg:gap-8">
            {h.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Search;
              return (
                <FadeIn key={step.title} delay={i * 0.08}>
                  <li className="relative flex h-full flex-col rounded-3xl border border-slate-200/90 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary shadow-2xs">
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </span>
                        <span className="font-display text-3xl font-bold text-slate-300">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Platform Mechanics Section */}
      <section className="border-b border-slate-200/80 bg-slate-50/70 py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-white sm:px-12 sm:py-16 lg:p-16 shadow-xl">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
                aria-hidden
              />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-white/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  {h.marketplaceBadge}
                </span>

                <h2 className="font-display mt-6 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
                  {h.techTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                  {h.techBody}
                </p>

                <div className="mt-12 lg:mt-14 grid gap-5 md:grid-cols-3">
                  {h.pipeline.map((col, idx) => {
                    const FIcon = PIPELINE_ICONS[idx] ?? Filter;
                    return (
                      <div
                        key={col.title}
                        className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-xs transition-all duration-300 hover:bg-white/15"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/30 mb-4">
                          <FIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold text-white">{col.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/70">
                          {col.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SSS / FAQ Section */}
      <section id="faq" className="scroll-mt-28 border-b border-slate-200/80 bg-white py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {h.faqEyebrow}
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {h.faqTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {h.faqSubtitle}
            </p>
          </FadeIn>

          <div className="mt-14 lg:mt-16">
            <FaqAccordion items={h.faqItems} />
          </div>

          <FadeIn className="mx-auto mt-12 max-w-xl text-center">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 text-center">
              <p className="text-sm font-bold text-slate-900">
                {h.faqExtraTitle}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {h.faqExtraBody}
              </p>
              <div className="mt-4">
                <Button href="/contact" variant="ink" size="md">
                  {h.faqExtraCta}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
