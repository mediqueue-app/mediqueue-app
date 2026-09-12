"use client";

import { useState, type ReactNode } from "react";
import {
  CalendarDays,
  CheckCheck,
  Languages,
  MapPin,
  MessageSquare,
  Stethoscope,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useLocale } from "@/lib/locale";

export function ClinicRequestsPreview({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  const copy = t.previews.requests;
  const [selectedId, setSelectedId] = useState(copy.items[0]?.id ?? "r1");
  const selected = copy.items.find((req) => req.id === selectedId) ?? copy.items[0];

  if (!selected) return null;

  const filters = [
    { key: "pending", label: copy.pending, count: 2 },
    { key: "approved", label: copy.approved, count: 1 },
    { key: "all", label: copy.all, count: 3 },
  ] as const;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f5f6f8] shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
        <span className="ml-2 truncate rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
          {copy.chromeLabel}
        </span>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-slate-900">{copy.title}</p>
        <p className="mt-0.5 text-sm text-slate-500">
          <span>{copy.subtitle}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <span
              key={f.key}
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
        <div
          className={cn(
            "mt-4 grid gap-4",
            compact ? "grid-cols-1" : "lg:grid-cols-5"
          )}
        >
          <div className="flex flex-col gap-3 lg:col-span-2">
            {copy.items.map((req) => {
              const active = selected.id === req.id;
              return (
                <button
                  key={req.id}
                  type="button"
                  onClick={() => setSelectedId(req.id)}
                  className={cn(
                    "w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all",
                    active
                      ? "border-primary/40 ring-1 ring-primary/20"
                      : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                      {req.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {req.patient}
                        </p>
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                          {copy.waiting}
                        </span>
                      </div>
                      <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {req.city}, {req.country}
                      </p>
                      <p className="mt-1.5 truncate text-xs font-medium text-slate-700">
                        {req.treatment}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {!compact && (
            <div className="hidden lg:col-span-3 lg:block">
              <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
                      {selected.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {selected.patient}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {selected.age} {copy.yearsOld} · {selected.gender} · {selected.createdAt}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                    {copy.waiting}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6">
                  <Detail icon={<Stethoscope className="h-4 w-4" />} label={copy.treatmentLabel} value={selected.treatment} />
                  <Detail icon={<CalendarDays className="h-4 w-4" />} label={copy.dateLabel} value={selected.requestedDate} />
                  <Detail icon={<MapPin className="h-4 w-4" />} label={copy.cityLabel} value={`${selected.city}, ${selected.country}`} />
                  <Detail icon={<Tag className="h-4 w-4" />} label={copy.budgetLabel} value={selected.budget} />
                  <Detail icon={<Languages className="h-4 w-4" />} label={copy.languagesLabel} value={selected.language} />
                </div>
                <div className="px-6 pb-6">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {copy.notesLabel}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {selected.symptom}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 border-t border-slate-100 p-6">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
                    <CheckCheck className="h-4 w-4" />
                    {copy.approve}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-600 ring-1 ring-red-100">
                    {copy.reject}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
