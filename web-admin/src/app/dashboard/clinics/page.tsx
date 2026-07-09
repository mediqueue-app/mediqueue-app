"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  MapPin,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { fetchClinics } from "@/lib/services/clinics";
import type { Clinic, EntityStatus } from "@/types";
import { cn, formatNumber, formatTRY } from "@/lib/utils";

export default function ClinicsPage() {
  const [seedClinics, setSeedClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<Record<string, EntityStatus>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchClinics()
      .then((data) => {
        if (!cancelled) {
          setSeedClinics(data);
          setStatuses(Object.fromEntries(data.map((c) => [c.id, c.status])));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function toggleStatus(id: string) {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === "active" ? "passive" : "active",
    }));
  }

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seedClinics;
    return seedClinics.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const activeCount = Object.values(statuses).filter(
    (s) => s === "active"
  ).length;
  const totalDoctors = seedClinics.reduce((sum, c) => sum + c.doctorCount, 0);
  const totalRevenue = seedClinics.reduce(
    (sum, c) => sum + c.revenueContribution,
    0
  );

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Klinik Yönetimi"
        description="Onaylı klinikler, pazar yerindeki görünürlükleri ve kayıtlı doktor kadrosu."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          label="Onaylı Klinik"
          value={seedClinics.length}
          icon={BadgeCheck}
          hint={`${activeCount} vitrinde aktif`}
          iconTone="primary"
        />
        <KpiCard
          label="Toplam Doktor"
          value={formatNumber(totalDoctors)}
          icon={Stethoscope}
          hint="tüm klinikler"
          iconTone="violet"
        />
        <KpiCard
          label="Aylık Gelir Katkısı"
          value={formatTRY(totalRevenue)}
          icon={Star}
          hint="komisyon öncesi"
          iconTone="emerald"
        />
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Klinik, şehir veya uzmanlık ara..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((clinic) => {
          const status = statuses[clinic.id];
          const isActive = status === "active";
          const isOpen = expanded === clinic.id;

          return (
            <div
              key={clinic.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
                    {clinic.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900">
                        {clinic.name}
                      </h3>
                      {clinic.featured && (
                        <StatusBadge label="Vitrin" tone="info" dot={false} />
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {clinic.city}, {clinic.country}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                        {clinic.rating} ({formatNumber(clinic.reviewCount)})
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Stethoscope className="h-3.5 w-3.5" />
                        {clinic.doctorCount} doktor
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {clinic.accreditation.map((acc) => (
                        <span
                          key={acc}
                          className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
                        >
                          {acc}
                        </span>
                      ))}
                      {clinic.specialties.map((sp) => (
                        <span
                          key={sp}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">
                      {formatTRY(clinic.revenueContribution)}
                    </p>
                    <p className="text-[11px] text-slate-400">aylık katkı</p>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isActive ? "text-emerald-600" : "text-slate-400"
                      )}
                    >
                      {isActive ? "Aktif" : "Pasif"}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isActive}
                      onClick={() => toggleStatus(clinic.id)}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        isActive ? "bg-primary" : "bg-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                          isActive ? "translate-x-[22px]" : "translate-x-0.5"
                        )}
                      />
                    </button>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : clinic.id)}
                className="flex w-full items-center justify-between border-t border-slate-100 px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <span>Doktor kadrosu ({clinic.doctors.length})</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <ul className="divide-y divide-slate-100 border-t border-slate-100 bg-slate-50/50">
                  {clinic.doctors.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center gap-3 px-5 py-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-primary ring-1 ring-slate-200">
                        {doc.name
                          .replace(/(Prof\.|Dr\.|Op\.|Dt\.)/g, "")
                          .trim()
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {doc.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {doc.specialty}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                        {doc.rating}
                      </span>
                      <StatusBadge
                        label={doc.status === "active" ? "Aktif" : "Pasif"}
                        tone={doc.status === "active" ? "success" : "neutral"}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
