import type { Patient } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function AppointmentHistoryTab({ patient }: { patient: Patient }) {
  return (
    <ul className="divide-y divide-slate-100">
      {patient.appointmentHistory.map((apt) => (
        <li key={apt.id} className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-slate-900">{apt.treatmentType}</p>
            <p className="text-sm text-slate-500">
              {apt.date} · {apt.time}
            </p>
            {apt.outcomeNote && (
              <p className="mt-1 text-xs text-slate-500">{apt.outcomeNote}</p>
            )}
          </div>
          <StatusBadge status={apt.status} />
        </li>
      ))}
      {patient.appointmentHistory.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">
          Randevu geçmişi bulunmuyor.
        </p>
      )}
    </ul>
  );
}
