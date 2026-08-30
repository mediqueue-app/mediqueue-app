"use client";

import { Search, CalendarCheck, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

const ICONS = [Search, CalendarCheck, Stethoscope];

export function HowPage() {
  const { t } = useLocale();
  const h = t.how;

  return (
    <Container className="py-14 md:py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
        {h.eyebrow}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-[2.25rem] leading-[1.12] tracking-[-0.03em] text-slate-900 sm:text-5xl">
        {h.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">{h.intro}</p>

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {h.steps.map((step, i) => {
          const Icon = ICONS[i] ?? Search;
          return (
            <li
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="absolute right-5 top-5 text-4xl font-black text-slate-100">
                0{i + 1}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>

      <section className="mt-16 rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10">
        <h2 className="font-display text-2xl sm:text-3xl">{h.techTitle}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          {h.techBody}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {h.pipeline.map((col) => (
            <div
              key={col.title}
              className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10"
            >
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <p className="mt-2 text-sm text-white/65">{col.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
