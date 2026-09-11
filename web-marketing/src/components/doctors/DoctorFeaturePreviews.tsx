"use client";

import type { ReactNode } from "react";
import { ArrowRight, Clock, Star } from "lucide-react";
import { useLocale } from "@/lib/locale";

const NAMES = ["Ahmed Al-Farsi", "Sophie Laurent", "James Whitfield"] as const;
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
  const { t } = useLocale();
  const d = t.previews.doctor;
  const stats = [
    { n: "3", l: d.statAppointments },
    { n: "2", l: d.statMessages },
    { n: "1", l: d.statNew },
  ];

  return (
    <PreviewShell label={d.overviewKicker} title={d.overviewTitle}>
      <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {stats.map((s) => (
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
        {NAMES.slice(0, 2).map((name, i) => (
          <li key={name} className="flex items-center justify-between py-2 text-sm">
            <span className="font-medium text-slate-800">{name}</span>
            <span className="text-xs text-slate-500">{d.stages[i]}</span>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}

export function DoctorPatientsPreview() {
  const { t } = useLocale();
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.patientsKicker} title={d.patientsTitle}>
      <ul className="divide-y divide-slate-100 px-4 py-2">
        {NAMES.map((name, i) => (
          <li key={name} className="flex items-center gap-3 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-[10px] font-bold text-primary">
              {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
              <p className="truncate text-xs text-slate-500">{d.treatments[i]}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              {d.stages[i]}
            </span>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}

export function DoctorCalendarPreview() {
  const { t } = useLocale();
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.calendarKicker} title={d.calendarTitle}>
      <div className="px-4 py-4">
        <div className="grid grid-cols-5 gap-1.5">
          {d.days.map((day) => (
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
  const { t } = useLocale();
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.messagesKicker} title={d.messagesTitle}>
      <div className="space-y-3 px-4 py-4">
        <div className="rounded-xl bg-slate-100 px-3 py-2">
          <p className="text-[10px] font-semibold text-slate-500">Ahmed Al-Farsi</p>
          <p className="mt-1 text-xs text-slate-700">{d.patientMsg1}</p>
        </div>
        <div className="ml-6 rounded-xl bg-primary-light px-3 py-2">
          <p className="text-[10px] font-semibold text-primary">{d.you}</p>
          <p className="mt-1 text-xs text-slate-800">{d.doctorMsg1}</p>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2">
          <p className="text-[10px] font-semibold text-slate-500">Sophie Laurent</p>
          <p className="mt-1 text-xs text-slate-700">{d.patientMsg2}</p>
        </div>
      </div>
    </PreviewShell>
  );
}

export function DoctorProfilePreview() {
  const { t } = useLocale();
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.profileKicker} title={d.profileTitle}>
      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
            Dr
          </span>
          <div>
            <p className="text-base font-bold text-slate-900">{d.profileName}</p>
            <p className="text-xs text-slate-500">{d.profileMeta}</p>
            <div className="mt-2 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
              <span className="ml-1 text-xs text-slate-500">{d.reviewsCount}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-600">{d.profileBio}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          {d.editProfile}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </PreviewShell>
  );
}

export function DoctorSchedulePreviewMini() {
  const { t } = useLocale();
  const d = t.previews.doctor;
  const items = t.previews.schedule.items;

  return (
    <PreviewShell label={d.scheduleKicker} title={d.scheduleTitle}>
      <ul className="px-4 py-3">
        {items.map((apt) => (
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
