import { Clock } from "lucide-react";
import type { Appointment } from "@/types";
import { AppointmentStatusBadge } from "@/components/ui/status-badge";
import { countryCodeToFlagEmoji } from "@/lib/ui";

export function AppointmentTimeline({
  appointments,
  focusId,
}: {
  appointments: Appointment[];
  focusId?: string;
}) {
  if (appointments.length === 0) {
    return (
      <div className="card-surface flex items-center justify-center gap-2 p-8 text-sm text-slate-400">
        <Clock className="h-4 w-4" />
        Bugün için planlanmış randevu bulunmuyor.
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-slate-700">
        Günlük Randevu Akışı
      </h3>
      <div className="flex flex-col space-y-4">
        {appointments.map((appointment) => {
          const isFocus = appointment.id === focusId;
          return (
            <div
              key={appointment.id}
              className={`card-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between ${
                isFocus ? "ring-1 ring-primary/30" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm font-bold text-slate-700">
                  {appointment.timeSlot}
                </span>
                <span className="text-xl leading-none">
                  {countryCodeToFlagEmoji(appointment.countryCode)}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {appointment.patientName}
                  </p>
                  <p className="text-xs text-slate-400">{appointment.branch}</p>
                </div>
              </div>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
