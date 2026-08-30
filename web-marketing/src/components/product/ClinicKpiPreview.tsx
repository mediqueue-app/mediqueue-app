import { CalendarClock, Eye, Inbox, Users } from "lucide-react";

/** Matches web-clinic KpiCard + Dashboard labels. */
const KPIS = [
  { label: "Yeni Randevu Talepleri", value: "12", icon: Inbox, tone: "bg-primary-light text-primary" },
  { label: "Aktif Hastalar", value: "34", icon: Users, tone: "bg-emerald-50 text-emerald-600" },
  { label: "Platform Görünürlüğü", value: "8.4k", icon: Eye, tone: "bg-violet-50 text-violet-600" },
  { label: "Aylık Beklenen Gelir", value: "₺186k", icon: CalendarClock, tone: "bg-amber-50 text-amber-600" },
];

export function ClinicKpiPreview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {KPIS.map((k) => (
        <div
          key={k.label}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{k.label}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {k.value}
              </p>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${k.tone}`}
            >
              <k.icon className="h-5 w-5" strokeWidth={2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
