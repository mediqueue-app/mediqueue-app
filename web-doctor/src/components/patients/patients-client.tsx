"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Languages, MessageSquareWarning, Search } from "lucide-react";
import type { Appointment, AppointmentStatus } from "@/types";
import { appointments } from "@/lib/mock-doctor";
import { AppointmentStatusBadge } from "@/components/ui/status-badge";
import {
  countryCodeToFlagEmoji,
  formatDateShort,
  getCountryName,
  languageNames,
} from "@/lib/ui";
import { MedicalDossierDrawer } from "@/components/patients/medical-dossier-drawer";

const statusFilters: (AppointmentStatus | "TÜMÜ")[] = [
  "TÜMÜ",
  "BEKLEMEDE",
  "ONAYLANDI",
  "TAMAMLANDI",
];

export function PatientsClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "TÜMÜ">("TÜMÜ");
  const [selectedId, setSelectedId] = useState<string | null>(
    searchParams.get("patient")
  );

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => statusFilter === "TÜMÜ" || a.status === statusFilter)
      .filter((a) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          a.patientName.toLowerCase().includes(q) ||
          getCountryName(a.countryCode).toLowerCase().includes(q) ||
          a.branch.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => `${a.date}${a.timeSlot}`.localeCompare(`${b.date}${b.timeSlot}`));
  }, [query, statusFilter]);

  const selectedAppointment: Appointment | undefined = appointments.find(
    (a) => a.id === selectedId
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hasta, ülke veya branş ara..."
            className="w-full rounded-xl border border-slate-200/80 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-full border border-slate-200/80 bg-white p-1">
          {statusFilters.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === s
                  ? "bg-primary/10 text-primary"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="card-surface p-10 text-center text-sm text-slate-400">
            Arama kriterlerinize uyan hasta bulunamadı.
          </div>
        )}

        {filtered.map((appointment) => (
          <button
            key={appointment.id}
            type="button"
            onClick={() => setSelectedId(appointment.id)}
            className="card-surface flex flex-col gap-3 p-4 text-left sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl leading-none">
                {countryCodeToFlagEmoji(appointment.countryCode)}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {appointment.patientName}
                  <span className="ml-2 font-normal text-slate-400">
                    {appointment.patientAge}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  {getCountryName(appointment.countryCode)} · {appointment.branch}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                <Languages className="h-3.5 w-3.5" />
                {languageNames[appointment.spokenLanguage]}
              </span>
              {appointment.translatorNeeded && (
                <MessageSquareWarning className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className="text-xs font-medium text-slate-500">
                {formatDateShort(appointment.date)} · {appointment.timeSlot}
              </span>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
          </button>
        ))}
      </div>

      {selectedAppointment && (
        <MedicalDossierDrawer
          appointment={selectedAppointment}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
