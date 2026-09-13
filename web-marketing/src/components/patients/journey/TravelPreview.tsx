"use client";

import type { ReactNode } from "react";
import {
  Car,
  Check,
  Languages,
  Plane,
} from "lucide-react";
import { StarRating } from "@/components/patients/journey/StarRating";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function TravelPreview() {
  const { locale } = useLocale();
  const tr = locale === "tr";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f5f6f8] shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]/80" />
        <span className="ml-2 truncate rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
          patient · {tr ? "Seyahat & Transfer Koordinasyonu" : "Travel & Transfer Coordination"}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-xs text-slate-500">
          {tr
            ? "Aşağıdaki hizmetler isteğe bağlıdır — dilediğinizi seçebilirsiniz."
            : "The services below are optional — choose what you need."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
        <OptionalCard
          selected
          label={tr ? "Uçuş koordinasyonu" : "Flight coordination"}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xl font-bold text-slate-900">FRA</p>
              <p className="text-[11px] text-slate-500">Frankfurt</p>
            </div>
            <div className="flex flex-1 items-center gap-1.5 px-1">
              <div className="h-px flex-1 border-t border-dashed border-slate-300" />
              <Plane className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.75} />
              <div className="h-px flex-1 border-t border-dashed border-slate-300" />
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-900">IST</p>
              <p className="text-[11px] text-slate-500">İstanbul</p>
            </div>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <dt className="text-slate-400">{tr ? "Tarih" : "Date"}</dt>
              <dd className="font-semibold text-slate-800">12 Eyl 2026</dd>
            </div>
            <div>
              <dt className="text-slate-400">{tr ? "Koltuk" : "Seat"}</dt>
              <dd className="font-semibold text-slate-800">14A</dd>
            </div>
          </dl>
        </OptionalCard>

        <OptionalCard selected={false} label={tr ? "Konaklama" : "Accommodation"}>
          <p className="text-sm font-semibold text-slate-900">
            {tr ? "Partner otel" : "Partner hotel"}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={4} />
            <span className="text-xs text-slate-500">
              {tr ? "4 yıldız" : "4 stars"}
            </span>
          </div>
          <p className="mt-2.5 inline-flex rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary">
            {tr ? "3 gece konaklama" : "3 nights"}
          </p>
        </OptionalCard>

        <OptionalCard
          selected={false}
          label={tr ? "VIP ulaşım" : "VIP transfer"}
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-band text-slate-600">
              <Car className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {tr ? "Havalimanı ↔ klinik" : "Airport ↔ clinic"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {tr ? "Özel transfer aracı" : "Private transfer vehicle"}
              </p>
            </div>
          </div>
        </OptionalCard>

        <OptionalCard
          selected={false}
          label={tr ? "Tercüman" : "Interpreter"}
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-band text-slate-600">
              <Languages className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {tr ? "Almanca · Türkçe" : "German · Turkish"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {tr
                  ? "Klinik görüşmelerinde eşlik"
                  : "Support during clinic visits"}
              </p>
            </div>
          </div>
        </OptionalCard>
      </div>
    </div>
  </div>
  );
}

function OptionalCard({
  children,
  selected,
  label,
}: {
  children: ReactNode;
  selected: boolean;
  label: string;
}) {
  const { locale } = useLocale();
  const optionalLabel = locale === "tr" ? "İsteğe bağlı" : "Optional";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border bg-white transition-colors",
        selected
          ? "border-primary ring-1 ring-primary/20"
          : "border-border hover:border-slate-300"
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
              selected
                ? "border-primary bg-primary text-white"
                : "border-slate-300 bg-white"
            )}
            aria-hidden
          >
            {selected ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
          </span>
          <span className="truncate text-sm font-semibold text-slate-900">
            {label}
          </span>
        </div>
        <OptionalBadge>{optionalLabel}</OptionalBadge>
      </div>
      <div className="p-3">{children}</div>
    </article>
  );
}

function OptionalBadge({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-full bg-band px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </span>
  );
}
