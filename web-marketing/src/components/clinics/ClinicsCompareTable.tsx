"use client";

import { Check, X, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";

export function ClinicsCompareTable() {
  const { locale, t } = useLocale();
  const c = t.clinics;

  return (
    <section id="karsilastirma" className="scroll-mt-28 border-y border-slate-200/80 bg-gradient-to-b from-slate-50 via-slate-100/40 to-white pt-6 md:pt-8 pb-20 md:pb-28">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-4 w-4" />
            {c.compareEyebrow}
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            {c.compareTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg max-w-2xl mx-auto">
            {locale === "tr"
              ? "Aylık sabit ajans ücretleri veya sonucu garanti edilmeyen dijital reklam harcamaları yerine; dil, bütçe ve tedavi ihtiyacı doğrulanmış hastalarla sıfır riskle büyüyün."
              : "Scale with zero financial risk by connecting with patients verified by language, budget, and treatment needs, instead of high agency retainers."}
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-16 lg:mt-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-8">
            {/* Left Card — Traditional Methods */}
            <div className="relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-slate-50/60 p-7 sm:p-9 shadow-sm">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/80 px-3 py-1 text-xs font-bold text-slate-700">
                      <X className="h-3.5 w-3.5 text-slate-500" />
                      {c.compareBeforeLabel}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                      {locale === "tr"
                        ? "Geleneksel Sağlık Turizmi Yöntemleri"
                        : "Traditional Health Tourism Agencies"}
                    </h3>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {c.compareRows.map((row) => (
                    <li key={row.title} className="flex min-h-[5.5rem] items-start gap-3.5 rounded-2xl border border-slate-200/60 bg-white/80 p-4.5 shadow-2xs">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200/70 text-slate-500">
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{row.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{row.before}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex min-h-[3.25rem] items-center justify-center rounded-2xl border border-slate-200/70 bg-slate-100/80 p-4 text-center text-xs font-semibold text-slate-700">
                {locale === "tr"
                  ? "⚠️ Harcanan bütçenin dönüşüm garantisi yoktur; risk kliniğe aittir."
                  : "⚠️ Ad budgets carry zero conversion guarantee; financial risk rests on the clinic."}
              </div>
            </div>

            {/* Right Card — MediQueue Model */}
            <div className="relative flex h-full flex-col justify-between rounded-3xl border-2 border-emerald-500/90 bg-white p-7 sm:p-9 shadow-xl shadow-emerald-950/5 ring-4 ring-emerald-500/10">
              <div className="pointer-events-none absolute -top-4 right-8 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30">
                <Sparkles className="h-3.5 w-3.5" />
                {locale === "tr" ? "Tavsiye Edilen Güvenli Model" : "Recommended Risk-Free Model"}
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-emerald-100 pb-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-bold text-emerald-800">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      {c.compareAfterLabel}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                      {locale === "tr"
                        ? "MediQueue Güvenceli Pazar Yeri"
                        : "MediQueue Risk-Free Marketplace"}
                    </h3>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {c.compareRows.map((row) => (
                    <li
                      key={row.title}
                      className="flex min-h-[5.5rem] items-start gap-3.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4.5 shadow-2xs"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">{row.title}</p>
                        <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-900">{row.after}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-emerald-600 p-4 text-center text-xs font-bold text-white shadow-md shadow-emerald-600/25">
                {locale === "tr"
                  ? "✨ Sıfır abonelik ücreti — Yalnızca gelen hasta için ödersiniz."
                  : "✨ Zero subscription fees — You pay only when a patient arrives."}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
