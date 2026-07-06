import type { Appointment } from "@/types";
import { Clock } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function TodaySchedule({
  appointments,
}: {
  appointments: Appointment[];
}) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Bugünün Programı</h2>
        <p className="mt-8 text-center text-sm text-slate-400">
          Bugün randevunuz yok
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-semibold text-slate-900">Bugünün Programı</h2>
        <p className="text-xs text-slate-500">{appointments.length} randevu</p>
      </div>
      <ul className="divide-y divide-slate-50">
        {appointments.map((apt) => (
          <li key={apt.id} className="flex items-center gap-4 px-6 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              <Clock className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">{apt.patientName}</p>
              <p className="text-xs text-slate-500">{apt.treatmentType}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">{apt.time}</p>
              <StatusBadge status={apt.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
