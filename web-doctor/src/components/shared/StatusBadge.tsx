import type { AppointmentStatus, TreatmentStatus } from "@/types";
import { cn } from "@/lib/utils";

const appointmentStyles: Record<AppointmentStatus, string> = {
  ONAYLANDI: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  BEKLIYOR: "bg-amber-50 text-amber-700 ring-amber-100",
  TAMAMLANDI: "bg-blue-50 text-blue-700 ring-blue-100",
  IPTAL: "bg-red-50 text-red-700 ring-red-100",
};

const appointmentLabels: Record<AppointmentStatus, string> = {
  ONAYLANDI: "Onaylandı",
  BEKLIYOR: "Bekliyor",
  TAMAMLANDI: "Tamamlandı",
  IPTAL: "İptal",
};

const treatmentStyles: Record<TreatmentStatus, string> = {
  AKTIF: "bg-primary-light text-primary ring-primary/20",
  TAMAMLANDI: "bg-slate-100 text-slate-600 ring-slate-200",
  BEKLEMEDE: "bg-amber-50 text-amber-700 ring-amber-100",
};

const treatmentLabels: Record<TreatmentStatus, string> = {
  AKTIF: "Aktif Tedavi",
  TAMAMLANDI: "Tamamlandı",
  BEKLEMEDE: "Beklemede",
};

export function StatusBadge({
  status,
  variant = "appointment",
  className,
}: {
  status: AppointmentStatus | TreatmentStatus;
  variant?: "appointment" | "treatment";
  className?: string;
}) {
  const isAppointment = variant === "appointment";
  const styles = isAppointment
    ? appointmentStyles[status as AppointmentStatus]
    : treatmentStyles[status as TreatmentStatus];
  const label = isAppointment
    ? appointmentLabels[status as AppointmentStatus]
    : treatmentLabels[status as TreatmentStatus];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        styles,
        className
      )}
    >
      {label}
    </span>
  );
}
