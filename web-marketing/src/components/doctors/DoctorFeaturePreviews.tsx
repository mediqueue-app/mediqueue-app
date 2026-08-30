import type { ReactNode } from "react";
import { ArrowRight, Clock, Star } from "lucide-react";

const PATIENTS = [
  { name: "Ahmed Al-Farsi", treatment: "Saç Ekimi (DHI)", stage: "Randevu onaylandı" },
  { name: "Sophie Laurent", treatment: "Rinoplasti", stage: "Teklif gönderildi" },
  { name: "James Whitfield", treatment: "Diş İmplantı", stage: "Yeni talep" },
];

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum"];
const HOURS = ["09:00", "11:00", "14:00", "16:00"];

function PreviewShell({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-sm">
      <div className="relative overflow-hidden border-b border-slate-100 px-5 py-4">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-light/60 via-transparent to-emerald-50/40" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {label}
          </p>
          <h3 className="font-display mt-1 text-xl tracking-tight text-slate-900">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

export function DoctorOverviewPreview() {
  return (
    <PreviewShell label="Günlük akış" title="Özet">
      <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {[
          { n: "3", l: "Randevu" },
          { n: "2", l: "Mesaj" },
          { n: "1", l: "Yeni talep" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3 text-center"
          >
            <p className="text-2xl font-bold text-primary">{s.n}</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">{s.l}</p>
          </div>
        ))}
      </div>
      <ul className="border-t border-slate-100 px-4 py-3">
        {PATIENTS.slice(0, 2).map((p) => (
          <li key={p.name} className="flex items-center justify-between py-2 text-sm">
            <span className="font-medium text-slate-800">{p.name}</span>
            <span className="text-xs text-slate-500">{p.stage}</span>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}

export function DoctorPatientsPreview() {
  return (
    <PreviewShell label="Hasta listesi" title="Hastalarım">
      <ul className="divide-y divide-slate-100 px-4 py-2">
        {PATIENTS.map((p) => (
          <li key={p.name} className="flex items-center gap-3 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-[10px] font-bold text-primary">
              {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{p.name}</p>
              <p className="truncate text-xs text-slate-500">{p.treatment}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              {p.stage}
            </span>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}

export function DoctorCalendarPreview() {
  return (
    <PreviewShell label="Müsaitlik" title="Takvim">
      <div className="px-4 py-4">
        <div className="grid grid-cols-5 gap-1.5">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-[10px] font-semibold text-slate-400">
              {day}
            </div>
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className={`flex h-8 items-center justify-center rounded-lg text-[10px] font-medium ${
                [2, 5, 8, 11].includes(i)
                  ? "bg-primary text-white"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              {[2, 5, 8, 11].includes(i) ? HOURS[[2, 5, 8, 11].indexOf(i)]?.slice(0, 2) : ""}
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {HOURS.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary-light/50 px-2 py-1 text-[10px] font-semibold text-primary"
            >
              <Clock className="h-3 w-3" />
              {h}
            </span>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}

export function DoctorMessagesPreview() {
  return (
    <PreviewShell label="Hasta iletişimi" title="Mesajlar">
      <div className="space-y-3 px-4 py-4">
        <div className="rounded-xl bg-slate-100 px-3 py-2">
          <p className="text-[10px] font-semibold text-slate-500">Ahmed Al-Farsi</p>
          <p className="mt-1 text-xs text-slate-700">
            Merhaba doktor, DHI saç ekimi için uygun tarihleriniz neler?
          </p>
        </div>
        <div className="ml-6 rounded-xl bg-primary-light px-3 py-2">
          <p className="text-[10px] font-semibold text-primary">Siz</p>
          <p className="mt-1 text-xs text-slate-800">
            Hello Ahmed — I have slots on Tuesday and Thursday next week.
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2">
          <p className="text-[10px] font-semibold text-slate-500">Sophie Laurent</p>
          <p className="mt-1 text-xs text-slate-700">
            Could you share the rhinoplasty recovery timeline?
          </p>
        </div>
      </div>
    </PreviewShell>
  );
}

export function DoctorProfilePreview() {
  return (
    <PreviewShell label="Hasta görünümü" title="Profil">
      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
            Dr
          </span>
          <div>
            <p className="text-base font-bold text-slate-900">Dr. Ayşe Yılmaz</p>
            <p className="text-xs text-slate-500">Plastik Cerrahi · 12 yıl deneyim</p>
            <div className="mt-2 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
              <span className="ml-1 text-xs text-slate-500">4.9 (128)</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-600">
          Saç ekimi, rinoplasti ve estetik cerrahi alanlarında uluslararası hasta deneyimi.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Profili düzenle
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </PreviewShell>
  );
}

export function DoctorSchedulePreviewMini() {
  return (
    <PreviewShell label="Günlük akış" title="Bugünün Programı">
      <ul className="px-4 py-3">
        {[
          { time: "09:30", name: "Ahmed Al-Farsi", treatment: "Saç Ekimi (DHI)" },
          { time: "11:00", name: "Sophie Laurent", treatment: "Rinoplasti" },
          { time: "14:15", name: "James Whitfield", treatment: "Diş İmplantı" },
        ].map((apt) => (
          <li key={apt.time} className="flex items-center gap-3 border-b border-slate-100 py-2.5 last:border-0">
            <span className="text-xs font-bold text-primary">{apt.time}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{apt.name}</p>
              <p className="truncate text-xs text-slate-500">{apt.treatment}</p>
            </div>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}
