"use client";

import { useMemo, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { patients } from "@/lib/mock-data";
import type { PatientStatus } from "@/types";
import {
  cn,
  formatDateTr,
  formatNumber,
  formatRelative,
  formatTRY,
  initials,
} from "@/lib/utils";

const STATUS_META: Record<PatientStatus, { label: string; tone: BadgeTone }> = {
  active: { label: "Aktif", tone: "success" },
  inactive: { label: "Pasif", tone: "neutral" },
  banned: { label: "Engelli", tone: "danger" },
};

type FilterKey = "all" | PatientStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "active", label: "Aktif" },
  { key: "inactive", label: "Pasif" },
  { key: "banned", label: "Engelli" },
];

export default function PatientsPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      const matchesFilter = filter === "all" || p.status === filter;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const activeCount = patients.filter((p) => p.status === "active").length;
  const totalSpend = patients.reduce((sum, p) => sum + p.totalSpend, 0);
  const totalAppointments = patients.reduce((sum, p) => sum + p.appointments, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasta Yönetimi"
        description="Platforma kayıtlı tüm hastalar, ülke dağılımı, harcama ve aktiflik durumları."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          label="Kayıtlı Hasta"
          value={formatNumber(patients.length)}
          icon={UserRound}
          hint={`${activeCount} aktif`}
          iconTone="primary"
        />
        <KpiCard
          label="Toplam Randevu"
          value={formatNumber(totalAppointments)}
          icon={UserRound}
          hint="tüm zamanlar"
          iconTone="violet"
        />
        <KpiCard
          label="Toplam Harcama"
          value={formatTRY(totalSpend)}
          icon={UserRound}
          hint="hasta bazlı"
          iconTone="emerald"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                filter === f.key
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hasta, e-posta veya ülke ara..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="hidden grid-cols-[2fr_1.2fr_1fr_1fr_0.8fr] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:grid">
          <span>Hasta</span>
          <span>Ülke</span>
          <span>Randevu / Harcama</span>
          <span>Son Aktiflik</span>
          <span>Durum</span>
        </div>

        <ul className="divide-y divide-slate-100">
          {rows.map((p) => (
            <li
              key={p.id}
              className="grid grid-cols-1 items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50 lg:grid-cols-[2fr_1.2fr_1fr_1fr_0.8fr] lg:gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                  {initials(p.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {p.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{p.email}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium text-slate-700">{p.country}</p>
                <p className="text-xs text-slate-500">
                  Katılım: {formatDateTr(p.joinedAt)}
                </p>
              </div>

              <div className="text-sm">
                <p className="font-medium text-slate-700">
                  {p.appointments} randevu
                </p>
                <p className="text-xs text-slate-500">{formatTRY(p.totalSpend)}</p>
              </div>

              <div className="text-sm text-slate-500">
                {formatRelative(p.lastActiveAt)}
              </div>

              <div>
                <StatusBadge
                  label={STATUS_META[p.status].label}
                  tone={STATUS_META[p.status].tone}
                />
              </div>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="px-5 py-16 text-center text-sm text-slate-500">
              Kayıt bulunamadı.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
