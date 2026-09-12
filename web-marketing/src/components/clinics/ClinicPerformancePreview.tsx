"use client";

import { FileText, Users, Wallet } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { DemoCaptionPill } from "@/components/ui/DemoCaptionPill";

const ICONS = [Users, FileText, Wallet];

export function ClinicPerformancePreview() {
  const { t } = useLocale();
  const c = t.clinics;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f5f6f8]/80 p-4 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
        <span className="ml-1 truncate rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
          clinic · {c.panelLabel}
        </span>
        <span className="ml-auto text-xs font-semibold text-slate-600">
          {c.performanceTitle}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {c.metrics.map((metric, i) => {
          const Icon = ICONS[i] ?? Users;
          return (
            <div
              key={metric.label}
              className="rounded-xl border border-white/80 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">
                  {metric.label}
                </p>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                {metric.value}
              </p>
              <p className="mt-1.5 text-xs text-slate-500">{metric.hint}</p>
            </div>
          );
        })}
      </div>
      <DemoCaptionPill className="mt-4">{c.metricCaption}</DemoCaptionPill>
    </div>
  );
}
