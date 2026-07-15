"use client";

import { useState, type ReactNode } from "react";
import { CalendarClock, CheckCircle2, Clock3 } from "lucide-react";
import type { Patient, PatientAppointment } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";

const DEMO_HISTORY: PatientAppointment[] = [
  {
    id: "DEMO-AH1",
    date: "2026-07-02",
    time: "10:00",
    treatmentType: "İlk değerlendirme",
    status: "TAMAMLANDI",
    outcomeNote: "Ön muayene tamamlandı; tedavi planı oluşturuldu.",
  },
  {
    id: "DEMO-AH2",
    date: "2026-07-08",
    time: "14:30",
    treatmentType: "Kontrol randevusu",
    status: "ONAYLANDI",
    outcomeNote: "Görüntüleme sonuçları görüşülecek.",
  },
  {
    id: "DEMO-AH3",
    date: "2026-07-16",
    time: "11:00",
    treatmentType: "Takip seansı",
    status: "BEKLIYOR",
  },
];

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AppointmentHistoryTab({ patient }: { patient: Patient }) {
  const items =
    patient.appointmentHistory.length > 0
      ? patient.appointmentHistory
      : DEMO_HISTORY.map((a) => ({
          ...a,
          treatmentType: `${patient.treatmentType} · ${a.treatmentType}`,
        }));

  const completed = items.filter((a) => a.status === "TAMAMLANDI").length;
  const upcoming = items.filter(
    (a) => a.status === "ONAYLANDI" || a.status === "BEKLIYOR"
  ).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Randevu geçmişi</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Onaylı, tamamlanan ve bekleyen görüşmeler
          </p>
        </div>
        <div className="flex gap-2">
          <StatChip
            icon={<CheckCircle2 className="h-3.5 w-3.5" />}
            label="Tamamlanan"
            value={String(completed)}
          />
          <StatChip
            icon={<Clock3 className="h-3.5 w-3.5" />}
            label="Yaklaşan"
            value={String(upcoming)}
          />
        </div>
      </div>

      <ul className="space-y-3">
        {items.map((apt) => (
          <li
            key={apt.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-slate-100">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900">
                  {apt.treatmentType}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatDate(apt.date)} · {apt.time}
                </p>
                {apt.outcomeNote && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {apt.outcomeNote}
                  </p>
                )}
              </div>
            </div>
            <StatusBadge status={apt.status} />
          </li>
        ))}
      </ul>

      {patient.appointmentHistory.length === 0 && (
        <p className="text-center text-[11px] text-slate-400">
          Demo kayıtlar gösteriliyor — API bağlanınca gerçek geçmiş gelecek.
        </p>
      )}
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm ring-1 ring-slate-100"
      )}
    >
      <span className="text-primary">{icon}</span>
      {label}
      <span className="text-slate-900">{value}</span>
    </span>
  );
}
