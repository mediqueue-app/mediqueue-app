"use client";

import { Clock, Star } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function DoctorSchedulePreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const s = t.previews.schedule;
  const doc = t.previews.doctor;

  const filters = [
    { label: tr ? "Bekleyen" : "Pending", count: 2 },
    { label: tr ? "Onaylanan" : "Approved", count: 1 },
    { label: tr ? "Tümü" : "All", count: 3 },
  ] as const;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f5f6f8] shadow-sm">
      {/* Chrome Window Header Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
        <span className="ml-2 truncate rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
          {tr ? "doctor · Bugünün Programı" : "doctor · Today's Schedule"}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-4">
        <p className="text-lg font-bold text-slate-900">
          {tr ? "Bugünün Programı" : "Today's Schedule"}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">
          <span>{tr ? "Hastalarım, Takvim & Hekim Paneli." : "Patients, Calendar & Doctor Dashboard."}</span>
        </p>

        {/* Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <span
              key={f.label}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium",
                i === 0
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                  i === 0 ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                )}
              >
                {f.count}
              </span>
            </span>
          ))}
        </div>

        {/* Schedule List */}
        <div className="mt-4 flex flex-col gap-3">
          {/* Doctor Header Badge Card */}
          <div className="w-full rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                Dr
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {doc.profileName}
                </p>
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
          </div>

          {/* Appointment Items */}
          {s.items.map((apt) => (
            <article
              key={apt.time}
              className="w-full rounded-2xl border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:border-slate-200"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-light text-primary font-bold">
                    <Clock className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-bold text-slate-900">{apt.time}</span>
                </div>
                <div className="text-right min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900">{apt.name}</p>
                  <p className="truncate text-[11px] text-slate-500">{apt.treatment}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
