import type { AppointmentStatus, TreatmentStatus } from "@/types";
import { cn } from "@/lib/utils";

const appointmentStyles: Record<AppointmentStatus, string> = {
  ONAYLANDI: "bg-success-light text-success ring-success/20",
  BEKLIYOR: "bg-warning-light text-warning ring-warning/20",
  TAMAMLANDI: "bg-neutral-light text-neutral ring-border",
  IPTAL: "bg-error-light text-error ring-error/20",
};

const appointmentLabels: Record<AppointmentStatus, string> = {
  ONAYLANDI: "Onaylandı",
  BEKLIYOR: "Bekliyor",
  TAMAMLANDI: "Tamamlandı",
  IPTAL: "İptal",
};

const treatmentStyles: Record<TreatmentStatus, string> = {
  AKTIF: "bg-secondary-light text-secondary ring-secondary/20",
  TAMAMLANDI: "bg-neutral-light text-neutral ring-border",
  BEKLEMEDE: "bg-warning-light text-warning ring-warning/20",
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
