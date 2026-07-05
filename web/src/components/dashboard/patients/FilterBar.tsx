"use client";

import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { BRANCHES } from "@/lib/mock-data";

export interface PatientFilters {
  country: string;
  branch: string;
  logistics: "TÜMÜ" | "VIP_TRANSFER" | "OTEL";
}

export const DEFAULT_FILTERS: PatientFilters = {
  country: "TÜMÜ",
  branch: "TÜMÜ",
  logistics: "TÜMÜ",
};

export function FilterBar({
  countries,
  filters,
  onChange,
}: {
  countries: string[];
  filters: PatientFilters;
  onChange: (filters: PatientFilters) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <SlidersHorizontal className="h-4 w-4" />
        Filtrele
      </div>

      <select
        value={filters.country}
        onChange={(e) => onChange({ ...filters, country: e.target.value })}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
      >
        <option value="TÜMÜ">Tüm Ülkeler</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters.branch}
        onChange={(e) => onChange({ ...filters, branch: e.target.value })}
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
      >
        <option value="TÜMÜ">Tüm Branşlar</option>
        {BRANCHES.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        value={filters.logistics}
        onChange={(e) =>
          onChange({
            ...filters,
            logistics: e.target.value as PatientFilters["logistics"],
          })
        }
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
      >
        <option value="TÜMÜ">Tüm Lojistik Durumlar</option>
        <option value="VIP_TRANSFER">VIP Transfer İstiyor</option>
        <option value="OTEL">Otel İstiyor</option>
      </select>

      <button
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Filtreleri Temizle
      </button>
    </div>
  );
}
