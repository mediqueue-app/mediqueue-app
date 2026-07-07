"use client";

import { useMemo, useState } from "react";
import {
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  UserPlus,
  Users,
} from "lucide-react";
import type { Patient, PatientFilterTab } from "@/types";
import { PatientCard } from "@/components/patients/PatientCard";
import {
  countByTreatmentStatus,
  sortPatients,
  type PatientSortKey,
} from "@/lib/patient-utils";
import { cn } from "@/lib/utils";

const TABS: { value: PatientFilterTab; label: string }[] = [
  { value: "TUMU", label: "Tümü" },
  { value: "AKTIF", label: "Aktif" },
  { value: "GECMIS", label: "Geçmiş" },
];

const SORT_OPTIONS: { value: PatientSortKey; label: string }[] = [
  { value: "lastVisit", label: "Son ziyaret" },
  { value: "name", label: "İsim (A–Z)" },
  { value: "status", label: "Durum" },
];

const PAGE_SIZE = 8;

export function PatientList({
  initialPatients,
  initialSearch = "",
}: {
  initialPatients: Patient[];
  initialSearch?: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [tab, setTab] = useState<PatientFilterTab>("TUMU");
  const [sortKey, setSortKey] = useState<PatientSortKey>("lastVisit");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const tabCounts = useMemo(
    () => ({
      TUMU: initialPatients.length,
      AKTIF: countByTreatmentStatus(initialPatients, "AKTIF"),
      GECMIS: countByTreatmentStatus(initialPatients, "TAMAMLANDI"),
    }),
    [initialPatients]
  );

  const filtered = useMemo(() => {
    let list = [...initialPatients];
    if (tab === "AKTIF") {
      list = list.filter((p) => p.treatmentStatus === "AKTIF");
    } else if (tab === "GECMIS") {
      list = list.filter((p) => p.treatmentStatus === "TAMAMLANDI");
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.treatmentType.toLowerCase().includes(q) ||
          p.nationality.toLowerCase().includes(q)
      );
    }
    return sortPatients(list, sortKey);
  }, [initialPatients, tab, search, sortKey]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="İsim, tedavi veya ülke ara..."
              aria-label="Hasta ara"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <select
                value={sortKey}
                onChange={(e) => {
                  setSortKey(e.target.value as PatientSortKey);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label="Sıralama"
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-8 text-xs font-semibold text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex rounded-xl border border-slate-200 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="Liste görünümü"
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Kart görünümü"
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => {
                setTab(t.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                tab === t.value
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              )}
            >
              {t.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  tab === t.value ? "bg-white/20 text-white" : "bg-white text-slate-500"
                )}
              >
                {tabCounts[t.value]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sonuç sayısı */}
      <p className="px-1 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">{filtered.length}</span> hasta
        gösteriliyor
        {search.trim() && (
          <>
            {" "}
            · &quot;{search.trim()}&quot; araması
          </>
        )}
      </p>

      {/* Liste / grid */}
      {visible.length === 0 ? (
        <EmptyState hasSearch={!!search.trim()} tab={tab} />
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-3"
          )}
        >
          {visible.map((patient) => (
            <PatientCard key={patient.id} patient={patient} variant={viewMode} />
          ))}
        </div>
      )}

      {visibleCount < filtered.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="mx-auto rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
        >
          Daha fazla göster ({filtered.length - visibleCount} kaldı)
        </button>
      )}
    </div>
  );
}

function EmptyState({
  hasSearch,
  tab,
}: {
  hasSearch: boolean;
  tab: PatientFilterTab;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
        {hasSearch ? (
          <Search className="h-6 w-6 text-slate-400" />
        ) : tab === "AKTIF" ? (
          <UserPlus className="h-6 w-6 text-slate-400" />
        ) : (
          <Users className="h-6 w-6 text-slate-400" />
        )}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700">
        {hasSearch ? "Eşleşen hasta bulunamadı" : "Bu filtrede hasta yok"}
      </p>
      <p className="mt-1 max-w-sm text-xs text-slate-400">
        {hasSearch
          ? "Farklı bir arama terimi deneyin veya filtreleri sıfırlayın."
          : tab === "GECMIS"
            ? "Tamamlanan tedaviler burada listelenir."
            : "Aktif hastalar platform eşleştirmesi sonrası burada görünür."}
      </p>
    </div>
  );
}
