"use client";

import { useState } from "react";
import { Search, CalendarCheck, Stethoscope, ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

const ICONS = [Search, CalendarCheck, Stethoscope];

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all hover:border-slate-300"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-slate-900 focus-visible:outline-none"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-600">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function HowPage() {
  const { t } = useLocale();
  const h = t.how;

  return (
    <div className="overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-border">
        <HeroBackdrop />
        <Container className="relative py-20 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {h.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.35rem] leading-[1.12] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.2rem]">
            {h.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {h.intro}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <ol className="grid gap-6 md:grid-cols-3">
            {h.steps.map((step, i) => {
              const Icon = ICONS[i] ?? Search;
              return (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <span className="absolute right-5 top-5 font-display text-4xl text-mist">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="font-display relative mt-4 text-lg tracking-tight text-ink">
                    {step.title}
                  </h2>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="bg-band py-16 md:py-20">
        <Container>
          <div className="overflow-hidden rounded-[1.75rem] bg-ink px-6 py-12 text-white sm:px-10 sm:py-14">
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
              {h.techTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              {h.techBody}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {h.pipeline.map((col) => (
                <div
                  key={col.title}
                  className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10"
                >
                  <p className="text-sm font-semibold text-white">{col.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {col.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/patients" size="lg">
                {t.home.finalPatientCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
              <Button
                href="/clinics"
                size="lg"
                className="border-0 bg-white text-ink hover:bg-white/90"
              >
                {t.home.finalClinicCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SSS / FAQ Section */}
      <section id="faq" className="scroll-mt-20 bg-slate-50 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {h.faqEyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {h.faqTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {h.faqSubtitle}
            </p>
          </div>

          <div className="mt-12">
            <FaqAccordion items={h.faqItems} />
          </div>
        </Container>
      </section>
    </div>
  );
}
