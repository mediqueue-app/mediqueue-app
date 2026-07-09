"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, ChevronRight, FileText, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { fetchClinicApplications } from "@/lib/services/applications";
import type { ApplicationStatus, ClinicApplication } from "@/types";
import { cn, formatRelative } from "@/lib/utils";

const STATUS_META: Record<
  ApplicationStatus,
  { label: string; tone: BadgeTone }
> = {
  pending: { label: "İnceleniyor", tone: "warning" },
  approved: { label: "Onaylandı", tone: "success" },
  rejected: { label: "Reddedildi", tone: "danger" },
};

type FilterKey = "all" | ApplicationStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "pending", label: "İnceleniyor" },
  { key: "approved", label: "Onaylı" },
  { key: "rejected", label: "Reddedilen" },
];

export default function ApplicationsPage() {
  const [clinicApplications, setClinicApplications] = useState<ClinicApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("pending");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchClinicApplications()
      .then((data) => {
        if (!cancelled) {
          setClinicApplications(data);
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

  const counts = useMemo(() => {
    return {
      all: clinicApplications.length,
      pending: clinicApplications.filter((a) => a.status === "pending").length,
      approved: clinicApplications.filter((a) => a.status === "approved").length,
      rejected: clinicApplications.filter((a) => a.status === "rejected").length,
    } as Record<FilterKey, number>;
  }, [clinicApplications]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clinicApplications.filter((app) => {
      const matchesFilter = filter === "all" || app.status === filter;
      const matchesQuery =
        !q ||
        app.clinicName.toLowerCase().includes(q) ||
        app.city.toLowerCase().includes(q) ||
        app.contactName.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query, clinicApplications]);

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
        title="Başvuru Yönetimi"
        description="Klinik onay merkezi — “Klinik Ol” başvurularını inceleyin, evrakları doğrulayın ve karar verin."
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                filter === f.key
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                  filter === f.key
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Klinik veya şehir ara..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="hidden grid-cols-[2fr_1.2fr_1fr_0.8fr_auto] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:grid">
          <span>Klinik</span>
          <span>İletişim</span>
          <span>Uzmanlık</span>
          <span>Durum</span>
          <span className="text-right">Evrak</span>
        </div>

        <ul className="divide-y divide-slate-100">
          {rows.map((app) => (
            <li key={app.id}>
              <Link
                href={`/dashboard/applications/${app.id}`}
                className="grid grid-cols-1 items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50 lg:grid-cols-[2fr_1.2fr_1fr_0.8fr_auto] lg:gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {app.clinicName}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {app.id} · {app.city} · {formatRelative(app.submittedAt)}
                    </p>
                  </div>
                </div>

                <div className="min-w-0 text-sm">
                  <p className="truncate font-medium text-slate-700">
                    {app.contactName}
                  </p>
                  <p className="truncate text-xs text-slate-500">{app.email}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {app.specialties.slice(0, 2).map((sp) => (
                    <span
                      key={sp}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {sp}
                    </span>
                  ))}
                  {app.specialties.length > 2 && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      +{app.specialties.length - 2}
                    </span>
                  )}
                </div>

                <div>
                  <StatusBadge
                    label={STATUS_META[app.status].label}
                    tone={STATUS_META[app.status].tone}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <FileText className="h-3.5 w-3.5" />
                    {app.documents.length} belge
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              </Link>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="px-5 py-16 text-center text-sm text-slate-500">
              Bu filtreye uygun başvuru bulunamadı.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
