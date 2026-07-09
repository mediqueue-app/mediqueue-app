import {
  appointmentStatusStyles,
  doctorStatusStyles,
} from "@/lib/ui";
import type { AppointmentStatus, DoctorStatus } from "@/types";

export function DoctorStatusBadge({
  status,
  className = "",
}: {
  status: DoctorStatus;
  className?: string;
}) {
  const styles = doctorStatusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles.bg} ${styles.text} ${styles.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}

export function AppointmentStatusBadge({
  status,
  className = "",
}: {
  status: AppointmentStatus;
  className?: string;
}) {
  const styles = appointmentStatusStyles[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles.bg} ${styles.text} ${styles.border} ${className}`}
    >
      {status}
    </span>
  );
}
