import { ArrowRight, Clock } from "lucide-react";

const APPOINTMENTS = [
  { time: "09:30", name: "Ahmed Al-Farsi", treatment: "Saç Ekimi (DHI)", status: "ONAYLANDI" },
  { time: "11:00", name: "Sophie Laurent", treatment: "Rinoplasti", status: "ONAYLANDI" },
  { time: "14:15", name: "James Whitfield", treatment: "Diş İmplantı", status: "BEKLIYOR" },
];

/** Layout from web-doctor TodaySchedule. */
export function DoctorSchedulePreview() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-sm">
      <div className="relative overflow-hidden border-b border-slate-100 px-5 py-5">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-light/60 via-transparent to-emerald-50/40" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Günlük akış
            </p>
            <h3 className="font-display mt-1 text-2xl tracking-tight text-slate-900">
              Bugünün Programı
            </h3>
            <p className="mt-1 text-sm text-slate-500">3 randevu · 0 tamamlandı</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700">
            Tam takvim
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <ul className="px-4 py-4">
        {APPOINTMENTS.map((apt, i) => (
          <li key={apt.time} className="relative flex gap-4 pb-4 last:pb-0">
            {i < APPOINTMENTS.length - 1 && (
              <span className="absolute left-[21px] top-12 h-[calc(100%-16px)] w-px bg-slate-200" />
            )}
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-xs font-bold text-primary">
              {apt.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {apt.name}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  {apt.time}
                </span>
              </div>
              <p className="text-xs text-slate-500">{apt.treatment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
