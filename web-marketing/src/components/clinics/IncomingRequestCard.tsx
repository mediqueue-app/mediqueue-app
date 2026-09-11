"use client";

import { ArrowUpRight, Languages, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function IncomingRequestCard() {
  const { t } = useLocale();
  const c = t.clinics;
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl"
        aria-hidden
      />

      <motion.div
        className="absolute inset-x-6 top-8 -z-0 rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.22)] backdrop-blur-md"
        aria-hidden
        initial={reduced ? false : { opacity: 0, y: 16, rotate: -4 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <div className="flex items-center gap-3 opacity-70">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
            SL
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Sophie Laurent</p>
            <p className="text-xs text-slate-400">{t.previews.incomingRhinoplasty}</p>
          </div>
        </div>
      </motion.div>

      <motion.article
        className="relative z-10 mt-14 w-full"
        initial={reduced ? false : { opacity: 0, y: 28, rotate: 3 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: 1.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      >
        <div className="rounded-[1.6rem] border border-white/80 bg-white/85 p-6 shadow-[0_40px_90px_-28px_rgba(15,23,42,0.38)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60",
                    !reduced && "animate-ping"
                  )}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {c.requestLabel}
            </span>
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          </div>

          <div className="mt-5 flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-sm font-bold text-primary">
              AA
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-900">
                Ahmed Al-Farsi
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {t.previews.incomingCityAge}
              </p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-xs font-medium text-slate-400">
                {c.requestTreatment}
              </dt>
              <dd className="text-sm font-semibold text-slate-900">
                {t.previews.incomingTreatment}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-xs font-medium text-slate-400">
                {c.requestBudget}
              </dt>
              <dd className="text-sm font-semibold text-emerald-700">
                €2.000 – €3.500
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-1 text-xs font-medium text-slate-400">
                <Languages className="h-3.5 w-3.5" aria-hidden />
                {c.requestLanguage}
              </dt>
              <dd className="text-sm font-medium text-slate-700">
                {t.previews.incomingLanguages}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">{c.requestReview}</p>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
