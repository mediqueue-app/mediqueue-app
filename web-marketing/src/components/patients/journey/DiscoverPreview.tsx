"use client";

import type { ReactNode } from "react";
import { BadgeCheck, Building2, ChevronRight, MapPin, Search } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function DiscoverPreview() {
  const { t } = useLocale();
  const x = t.screens.discover;
  const note = t.patients.discoverPrivacyNote;
  const clinics = t.previews.compareClinics;

  return (
    <div>
      <div className="mb-4 rounded-xl border border-border bg-white p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-band px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="text-sm text-slate-500">
            {x.search}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip active>{x.hair}</FilterChip>
          <FilterChip>{x.city}</FilterChip>
          <FilterChip>{x.month}</FilterChip>
        </div>
      </div>

      <div className="flex items-stretch gap-3 overflow-x-auto pb-1">
        {clinics.map((c) => (
          <article
            key={c.code}
            className="w-[9.5rem] shrink-0 overflow-hidden rounded-xl border border-border bg-white sm:w-auto sm:min-w-0 sm:flex-1"
          >
            <div className="relative flex h-24 items-center justify-center bg-band">
              <div className="absolute inset-4 rounded-lg bg-slate-200/60 blur-sm" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                <Building2 className="h-6 w-6" strokeWidth={1.5} />
              </span>
            </div>
            <div className="space-y-2 p-3">
              <p className="text-xs font-semibold tracking-wide text-slate-500">
                {c.code}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-semibold text-primary">
                <BadgeCheck className="h-3 w-3" />
                JCI
              </span>
              <p className="text-sm font-medium text-slate-900">{c.specialty}</p>
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />
                {c.region}
              </p>
            </div>
          </article>
        ))}
        <div
          className="flex w-10 shrink-0 items-center justify-center self-center rounded-xl border border-dashed border-slate-300 bg-band text-slate-400 sm:w-12"
          aria-hidden
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-400">{note}</p>
    </div>
  );
}

function FilterChip({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1.5 text-xs font-semibold",
        active
          ? "bg-primary text-white"
          : "border border-border bg-white text-slate-600"
      )}
    >
      {children}
    </span>
  );
}
