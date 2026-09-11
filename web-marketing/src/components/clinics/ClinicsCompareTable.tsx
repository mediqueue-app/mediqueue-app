"use client";

import { Check, X, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CompareBrandHeader } from "@/components/ui/CompareBrandHeader";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function ClinicsCompareTable() {
  const { locale, t } = useLocale();
  const c = t.clinics;

  return (
    <section id="karsilastirma" className="scroll-mt-24 bg-[#f8fafc] py-20 md:py-24">
      <Container>
        <FadeIn className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary">
            <ShieldCheck className="h-4 w-4" />
            <span>{c.compareEyebrow}</span>
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            {c.compareTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Geleneksel yüksek reklam harcamaları ve belirsiz hasta talepleri yerine, doğrudan tedavisi netleşmiş hastalarla sıfır bütçe riskiyle büyüyün.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
          <div className="grid gap-5">
            {c.compareRows.map((row, index) => (
              <article
                key={row.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-white p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md",
                  row.highlight
                    ? "border-primary/40 ring-1 ring-primary/20"
                    : "border-slate-200/90 hover:border-slate-300"
                )}
              >
                {/* Header row with criteria title */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">
                      0{index + 1}
                    </span>
                    <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                      {row.title}
                    </h3>
                  </div>
                  {row.highlight && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200/60">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                      {locale === "tr" ? "Öne Çıkan Avantaj" : "Featured Advantage"}
                    </span>
                  )}
                </div>

                {/* Grid Comparison Columns */}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {/* Before / Traditional */}
                  <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <X className="h-3 w-3 stroke-[2.5]" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                        {c.compareBeforeLabel}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {row.before}
                    </p>
                  </div>

                  {/* After / MediQueue */}
                  <div
                    className={cn(
                      "rounded-xl border p-4 shadow-sm transition-colors",
                      row.highlight
                        ? "border-primary/30 bg-primary-light/60 ring-1 ring-primary/20"
                        : "border-primary/20 bg-primary-light/30"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm shadow-primary/30">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        <CompareBrandHeader suffix={c.compareAfterLabel} />
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm font-semibold leading-relaxed text-slate-900">
                      {row.after}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
