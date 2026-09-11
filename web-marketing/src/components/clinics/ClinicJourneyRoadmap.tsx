"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  BadgePercent,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ClinicPerformancePreview } from "@/components/clinics/ClinicPerformancePreview";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { BilingualChatPreview } from "@/components/patients/journey/BilingualChatPreview";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

function StepCustomPreview({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Akreditasyon & Güvenlik Denetimi
            </span>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
            Onaylı Katılımcı
          </span>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">JCI Akreditasyonu</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> Doğrulandı
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">Sağlık Turizmi Sertifikası</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> Aktif Lisanslı
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">GDPR & Hasta Gizliliği</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> Şifreli Altyapı
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="truncate text-base font-bold text-slate-900">
                Anadolu Estetik & Cerrahi Merkezi
              </h4>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                Profil Yayında
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Estetik & Plastik Cerrahi · Saç Ekimi · Rinoplasti
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                TR · EN · AR
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                ₺12.000 – ₺45.000
              </span>
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
                4.9 ★ (128 Değerlendirme)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return <ClinicRequestsPreview compact />;
  }

  if (step === 3) {
    return <BilingualChatPreview />;
  }

  if (step === 4) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-primary" />
            <span className="text-sm font-bold text-slate-900">
              Randevu Onaylandı & Seyahat Planı
            </span>
          </div>
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary">
            24 Temmuz 2026
          </span>
        </div>
        <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50/70 p-3.5">
            <p className="font-medium text-slate-400">Hasta & Ülke</p>
            <p className="mt-0.5 text-sm font-bold text-slate-800">
              Ahmed Al-Farsi (Doha, Katar)
            </p>
          </div>
          <div className="rounded-xl bg-slate-50/70 p-3.5">
            <p className="font-medium text-slate-400">Seyahat Koordinasyonu</p>
            <p className="mt-0.5 text-sm font-bold text-slate-800">
              Uçuş & Otel Hazır (Klinik Sıfır Operasyon Yükü)
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <BadgePercent className="h-6 w-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900">
          Gerçekleşen Tedaviye Dayalı Komisyon
        </h4>
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-500">
          Hasta fiilen kliniğinize gelip tedavisi başlayana kadar hiçbir komisyon yansıtılmaz. Ön ödeme riski ve kayıp talep maliyeti sıfırdır.
        </p>
      </div>
    );
  }

  if (step === 6) {
    return <ClinicPerformancePreview />;
  }

  return null;
}

export function ClinicJourneyRoadmap() {
  const { t } = useLocale();
  const c = t.clinics;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = c.roadmapSteps;
  const progress = ((active + 1) / steps.length) * 100;
  const step = steps[active];

  return (
    <section id="yol-haritasi" className="scroll-mt-24 bg-[#f8fafc] py-20 md:py-24">
      <Container>
        <FadeIn className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Adım Adım Büyüme Rehberi</span>
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            {c.roadmapTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {c.roadmapIntro}
          </p>
        </FadeIn>

        {/* Timeline Desktop Navigation */}
        <div className="mt-12 hidden xl:block">
          <div className="relative">
            <div
              className="absolute left-0 right-0 top-5 h-px bg-slate-200"
              aria-hidden
            />
            <motion.div
              className="absolute left-0 top-5 h-px bg-primary"
              aria-hidden
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: reduced ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <ol className="relative grid grid-cols-7 gap-1">
              {steps.map((s, i) => {
                const current = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group w-full text-left transition-colors focus-visible:outline-none",
                        current
                          ? "text-primary"
                          : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <span
                        className={cn(
                          "mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition-all shadow-sm",
                          current
                            ? "border-primary text-primary ring-4 ring-primary/10"
                            : "border-slate-200 text-slate-400 group-hover:border-slate-300"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block pr-1 text-xs font-bold leading-snug text-slate-900 sm:text-sm">
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mobile Horizontal Pill Scroll */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 xl:hidden">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                i === active
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600"
              )}
            >
              {String(i + 1).padStart(2, "0")} · {s.title}
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white text-base font-bold shadow-md shadow-primary/25">
                0{active + 1}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {step?.title}
              </h3>
            </div>

            {/* Clinic vs MediQueue Action Cards */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Building2 className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {c.roadmapClinicLabel}
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                    Sizin Adımınız
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed font-medium text-slate-800">
                  {step?.clinic}
                </p>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary-light/50 p-6 shadow-sm ring-1 ring-primary/10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <BrandLogo size="xs" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {c.roadmapMqLabel}
                    </span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                    Otomatik Destek
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed font-semibold text-slate-900">
                  {step?.mediQueue}
                </p>
              </div>
            </div>

            {/* Live Interactive UI Mock Preview */}
            <div className="mt-6">
              <StepCustomPreview step={active} />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
