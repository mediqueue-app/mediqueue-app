"use client";

import { ArrowUpRight, Clock, Sparkles, Star, UserCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";
import { DemoCaptionPill } from "@/components/ui/DemoCaptionPill";

export function DoctorSchedulePreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.doctors;
  const s = t.previews.schedule;
  const doc = t.previews.doctor;
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl"
        aria-hidden
      />

      {/* Floating Back Card - peeks cleanly above top edge */}
      <motion.div
        className="absolute inset-x-6 -top-5 -z-0 rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-4 shadow-sm"
        aria-hidden
        initial={reduced ? false : { opacity: 0, y: 12, rotate: -3 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <div className="flex items-center gap-3 opacity-60">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">
            <UserCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">
              {tr ? "Haftalık Müsaitlik Takvimi" : "Weekly Availability Calendar"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Foreground Card - solid bg-white so no ghost text bleeds through */}
      <motion.article
        className="relative z-10 mt-6 w-full"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      >
        <div className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-[0_28px_70px_-20px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/20">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-primary opacity-60",
                    !reduced && "animate-ping"
                  )}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              {tr ? "Bugünün Hekim Programı" : "Today's Doctor Schedule"}
            </span>
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          </div>

          <div className="mt-5 flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-sm font-bold text-primary">
              Dr
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-base font-semibold tracking-tight text-slate-900">
                  {doc.profileName}
                </p>
              </div>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <span>{doc.profileMeta}</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-0.5 font-bold text-amber-600">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {doc.reviewsCount}
                </span>
              </p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-xs">
            {s.items.map((apt) => (
              <div key={apt.time} className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-1.5 font-medium text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="font-bold text-slate-900">{apt.time}</span>
                </dt>
                <dd className="text-right">
                  <p className="font-semibold text-slate-900">{apt.name}</p>
                  <p className="text-[11px] text-slate-500">{apt.treatment}</p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-600">
              {tr ? "Günlük Akışı & Hastaları Yönet" : "Manage Daily Flow & Patients"}
            </p>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </motion.article>

      <DemoCaptionPill className="mt-5">{d.caption}</DemoCaptionPill>
    </div>
  );
}
