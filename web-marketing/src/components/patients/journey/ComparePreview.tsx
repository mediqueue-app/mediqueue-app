"use client";

import { BadgeCheck, Building2 } from "lucide-react";
import { StarRating } from "@/components/patients/journey/StarRating";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function ComparePreview() {
  const { t } = useLocale();
  const p = t.previews;

  const filters = [
    { label: p.requests.pending, count: 2 },
    { label: p.requests.approved, count: 1 },
    { label: p.requests.all, count: 3 },
  ] as const;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f5f6f8] shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
        <span className="ml-2 truncate rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
          {p.compareChromeLabel}
        </span>
      </div>

      <div className="p-4">
        <p className="text-lg font-bold text-slate-900">{p.compareTitle}</p>
        <p className="mt-0.5 text-sm text-slate-500">
          <span>{p.compareSubtitle}</span>
        </p>

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

        <div className="mt-4 flex flex-col gap-3">
          {p.compareClinics.map((c) => (
            <article
              key={c.code}
              className="w-full rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all hover:border-slate-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Building2 className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {c.code}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                      <BadgeCheck className="h-3 w-3" />
                      JCI
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs font-medium text-slate-700">
                    {c.specialty}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <StarRating value={c.rating} />
                    <span className="font-bold text-slate-900">
                      {c.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-500">
                      ({c.reviews} {p.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
