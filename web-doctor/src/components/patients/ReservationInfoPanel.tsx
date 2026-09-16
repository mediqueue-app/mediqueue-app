"use client";

import {
  Bell,
  ChevronDown,
  Clock,
  Pencil,
  Shield,
  X,
} from "lucide-react";
import type { Patient, PatientAppointment } from "@/types";
import { cn } from "@/lib/utils";
import { formatAppointmentRange, parseDateKey } from "@/lib/datetime";

function formatAppointmentDate(date: string, time: string): string {
  return formatAppointmentRange(date, time, 60);
}

function getUpcomingAppointment(
  history: PatientAppointment[]
): PatientAppointment | null {
  const sorted = [...history].sort(
    (a, b) => parseDateKey(b.date).getTime() - parseDateKey(a.date).getTime()
  );
  return sorted.find((a) => a.status !== "IPTAL") ?? sorted[0] ?? null;
}

const STATUS_LABELS: Record<string, string> = {
  AKTIF: "Kayıtlı",
  BEKLEMEDE: "Beklemede",
  TAMAMLANDI: "Tamamlandı",
};

export function ReservationInfoPanel({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const appointment = getUpcomingAppointment(patient.appointmentHistory);
  const reservationId = `#RSV${patient.id.replace("P-", "").padStart(4, "0")}`;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Üst bar */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs text-slate-400">
            Rezervasyon ID{" "}
            <span className="font-semibold text-slate-700">{reservationId}</span>
          </p>
          <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            Manuel Randevu
          </span>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="touch-slop flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            aria-label="Düzenle"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="touch-slop flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hasta başlığı */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {patient.avatarInitials}
          </div>
          <h2 className="text-lg font-bold text-slate-900">{patient.fullName}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Durum değiştir</span>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {STATUS_LABELS[patient.treatmentStatus] ?? "Kayıtlı"}
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 3 sütun özet */}
      <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-slate-50/80 p-4">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-slate-400">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              Tedavi
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {appointment?.treatmentType ?? patient.treatmentType}
          </p>
        </div>
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              Tarih ve Saat
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {appointment
              ? formatAppointmentDate(appointment.date, appointment.time)
              : "—"}
          </p>
        </div>
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-slate-400">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              Diş Hekimi
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Op. Dr. Elif Yılmaz
          </p>
        </div>
      </div>

      {/* Ödeme */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            Ödeme{" "}
            <span className="font-semibold text-slate-800">
              Fatura #{patient.id.replace("P-", "10")}
            </span>
          </span>
          <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600">
            Ödenmedi
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
        >
          <Bell className="h-3.5 w-3.5" />
          Hatırlatma Gönder
        </button>
      </div>

      {/* Genel bilgi */}
      <div className="mt-6">
        <h3 className="mb-4 text-sm font-bold text-slate-900">Genel bilgi</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {[
            { label: "Ad Soyad", value: patient.fullName },
            { label: "Telefon", value: patient.phone },
            { label: "Yaş", value: String(patient.age) },
            { label: "E-posta", value: patient.email },
            { label: "Cinsiyet", value: patient.gender },
            {
              label: "Adres",
              value: patient.address ?? "—",
              wide: true,
            },
          ].map((field) => (
            <div
              key={field.label}
              className={cn(field.wide && "col-span-2")}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {field.label}
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
