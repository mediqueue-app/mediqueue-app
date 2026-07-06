import { User } from "lucide-react";

export function PatientQueue({
  patientName,
  treatmentType,
  scheduledTime,
  minutesUntil,
}: {
  patientName: string;
  treatmentType: string;
  scheduledTime: string;
  minutesUntil: number;
}) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-light/50 to-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Hasta Kuyruğu</h2>
      <div className="mt-4 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
          <User className="h-6 w-6" aria-hidden />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">{patientName}</p>
          <p className="text-sm text-slate-500">{treatmentType}</p>
          <p className="mt-2 text-sm text-primary">
            Saat {scheduledTime} · yaklaşık {minutesUntil} dk sonra
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Hastayı Çağır
      </button>
    </div>
  );
}
