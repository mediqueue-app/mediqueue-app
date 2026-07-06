import type { Appointment, AppointmentStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusColors: Record<AppointmentStatus, string> = {
  ONAYLANDI: "border-l-emerald-500 bg-emerald-50",
  BEKLIYOR: "border-l-amber-500 bg-amber-50",
  TAMAMLANDI: "border-l-blue-500 bg-blue-50",
  IPTAL: "border-l-red-400 bg-red-50 line-through opacity-70",
};

export function AppointmentSlot({ appointment }: { appointment: Appointment }) {
  return (
    <div
      className={cn(
        "rounded-lg border-l-4 px-3 py-2 text-sm",
        statusColors[appointment.status]
      )}
    >
      <p className="font-medium text-slate-900">{appointment.patientName}</p>
      <p className="text-xs text-slate-600">
        {appointment.time} · {appointment.treatmentType}
      </p>
    </div>
  );
}
