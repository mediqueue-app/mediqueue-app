"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  Clock,
  Star,
  MessageSquare,
  ShieldCheck,
  Calendar as CalendarIcon,
  UserCheck,
  Send,
  Building2,
} from "lucide-react";
import { useLocale } from "@/lib/locale";

const NAMES = [
  "Ahmed Al-Farsi",
  "Sophie Laurent",
  "James Whitfield",
  "Elena Rostova",
] as const;

function PreviewShell({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  const { locale } = useLocale();
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
      <div className="relative overflow-hidden border-b border-slate-100 bg-slate-50/60 px-5 sm:px-6 py-4">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-light/60 via-transparent to-emerald-50/40" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {label}
            </p>
            <h3 className="font-display mt-0.5 text-xl font-bold tracking-tight text-slate-900">
              {title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {locale === "tr" ? "Canlı Demo" : "Live Demo"}
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6 space-y-4">{children}</div>
    </div>
  );
}

export function DoctorOverviewPreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.previews.doctor;
  const stats = [
    { n: "4", l: d.statAppointments },
    { n: "3", l: d.statMessages },
    { n: "2", l: d.statNew },
  ];

  return (
    <PreviewShell label={d.overviewKicker} title={d.overviewTitle}>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-center shadow-2xs"
          >
            <p className="text-2xl font-bold text-primary">{s.n}</p>
            <p className="mt-0.5 text-xs font-medium text-slate-600">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {tr ? "Bugünün Programı & Hastaları" : "Today's Schedule & Patients"}
        </p>
        <ul className="space-y-2">
          {NAMES.slice(0, 3).map((name, i) => (
            <li
              key={name}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/40 px-3.5 py-2.5 text-sm"
            >
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm">{name}</p>
                  <p className="text-[11px] text-slate-500">{d.treatments[i]}</p>
                </div>
              </div>
              <span className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary">
                {d.stages[i]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-primary">
        <span>{tr ? "Günün Özeti Hazır" : "Daily Overview Ready"}</span>
        <span className="inline-flex items-center gap-1 hover:underline cursor-pointer">
          {tr ? "Tüm Akışı Gör" : "View Full Flow"} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </PreviewShell>
  );
}

export function DoctorPatientsPreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.patientsKicker} title={d.patientsTitle}>
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 border-b border-slate-100 pb-2.5">
        <span className="flex items-center gap-1.5 font-bold text-slate-800">
          <UserCheck className="h-4 w-4 text-primary" />
          {tr ? "4 Aktif Hasta Kaydı" : "4 Active Patient Records"}
        </span>
        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
          {tr ? "Tüm Kayıtlar Doğrulanmış" : "All Records Verified"}
        </span>
      </div>

      <ul className="divide-y divide-slate-100">
        {NAMES.map((name, i) => (
          <li key={name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-xs font-bold text-primary">
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs sm:text-sm font-bold text-slate-900">{name}</p>
              <p className="truncate text-[11px] text-slate-500">{d.treatments[i]}</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
              {d.stages[i]}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
        <span>{tr ? "Birebir Hekim-Hasta Mesajlaşması Aktif" : "Direct Doctor-Patient Chat Active"}</span>
        <span className="text-primary font-semibold">{tr ? "Detaylı Liste →" : "Detailed List →"}</span>
      </div>
    </PreviewShell>
  );
}

export function DoctorCalendarPreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.calendarKicker} title={d.calendarTitle}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <span className="text-xs font-bold text-slate-800">{tr ? "Temmuz 2026" : "July 2026"}</span>
        <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
          {tr ? "Haftalık Müsaitlik Takvimi" : "Weekly Availability Calendar"}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {d.days.map((day, idx) => (
          <div
            key={day}
            className={`rounded-xl border p-2 text-center ${
              idx === 2
                ? "border-primary bg-primary-light/50 ring-2 ring-primary/20"
                : "border-slate-100 bg-slate-50/60"
            }`}
          >
            <div className="text-[10px] font-bold text-slate-400">{day}</div>
            <div className="mt-0.5 text-xs font-bold text-slate-800">{14 + idx}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-primary-light/60 p-2.5 border border-primary/20">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">09:00 - 10:30</span>
          </div>
          <span className="text-xs font-semibold text-slate-900">
            Ahmed Al-Farsi ({tr ? "Saç Ekimi DHI" : "Hair Transplant DHI"})
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 border border-slate-200/60">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">11:00 - 12:00</span>
          </div>
          <span className="text-xs font-medium text-slate-700">
            Sophie Laurent ({tr ? "Konsültasyon" : "Consultation"})
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 p-2.5 border border-emerald-200/60">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">14:00 - 15:30</span>
          </div>
          <span className="text-xs font-semibold text-slate-900">
            James Whitfield ({tr ? "Rinoplasti Takip" : "Rhinoplasty Follow-up"})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
        <span className="flex items-center gap-1 font-semibold text-emerald-700">
          <CalendarIcon className="h-3.5 w-3.5" />
          {tr ? "Çakışma Kontrolü Aktif" : "Conflict Prevention Active"}
        </span>
        <span className="font-semibold text-primary">{tr ? "Saatleri Yönet →" : "Manage Slots →"}</span>
      </div>
    </PreviewShell>
  );
}

export function DoctorMessagesPreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.messagesKicker} title={d.messagesTitle}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <MessageSquare className="h-3.5 w-3.5" />
          {tr ? "Otomatik Çevirili Sohbet" : "Auto-Translated Chat"}
        </span>
        <span className="text-emerald-600 font-semibold">{tr ? "Aktif Görüşme" : "Active Session"}</span>
      </div>

      <div className="space-y-2.5">
        <div className="rounded-xl bg-slate-100/90 p-3">
          <p className="text-[10px] font-bold text-slate-600">
            Ahmed Al-Farsi ({tr ? "Arapça / Almanca" : "Arabic / German"})
          </p>
          <p className="mt-1 text-xs text-slate-800">{d.patientMsg1}</p>
        </div>

        <div className="ml-5 rounded-xl bg-primary-light p-3 border border-primary/15">
          <p className="text-[10px] font-bold text-primary">
            {d.you} ({tr ? "Türkçe → Almanca Otomatik" : "English → German Auto"})
          </p>
          <p className="mt-1 text-xs text-slate-900">{d.doctorMsg1}</p>
        </div>

        <div className="rounded-xl bg-slate-100/90 p-3">
          <p className="text-[10px] font-bold text-slate-600">
            Sophie Laurent ({tr ? "Fransızca" : "French"})
          </p>
          <p className="mt-1 text-xs text-slate-800">{d.patientMsg2}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2">
        <input
          type="text"
          disabled
          placeholder={
            tr
              ? "Mesajınızı Türkçe yazın, otomatik çevrilir..."
              : "Type your message, translated automatically..."
          }
          className="w-full bg-transparent text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none"
        />
        <Send className="h-4 w-4 text-primary shrink-0" />
      </div>
    </PreviewShell>
  );
}

export function DoctorProfilePreview() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.previews.doctor;

  return (
    <PreviewShell label={d.profileKicker} title={d.profileTitle}>
      <div className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-base font-bold text-primary shadow-2xs">
          Dr
        </span>
        <div>
          <p className="text-base font-bold text-slate-900">{d.profileName}</p>
          <p className="text-xs font-medium text-slate-500">{d.profileMeta}</p>
          <div className="mt-1.5 flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="ml-1 text-xs font-bold text-slate-700">{d.reviewsCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
          <Building2 className="h-3.5 w-3.5 text-slate-500" />
          Sample Clinic C
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
          <Building2 className="h-3.5 w-3.5 text-slate-500" />
          XYZ Clinic
        </span>
      </div>

      <p className="text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-2.5">
        {d.profileBio}
      </p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          {tr ? "JCI Akredite Hekim Rozeti" : "JCI Accredited Doctor Badge"}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          {d.editProfile}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </PreviewShell>
  );
}

export function DoctorSchedulePreviewMini() {
  const { locale, t } = useLocale();
  const tr = locale === "tr";
  const d = t.previews.doctor;
  const items = t.previews.schedule.items;

  return (
    <PreviewShell label={d.scheduleKicker} title={d.scheduleTitle}>
      <ul className="divide-y divide-slate-100 space-y-2">
        {items.map((apt) => (
          <li key={apt.time} className="flex items-center gap-3.5 py-2.5 first:pt-0 last:pb-0">
            <span className="text-xs font-bold text-primary">{apt.time}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{apt.name}</p>
              <p className="truncate text-xs text-slate-500">{apt.treatment}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-2 text-right text-xs font-semibold text-primary">
        {tr ? "Tüm Programı Gör →" : "View Full Schedule →"}
      </div>
    </PreviewShell>
  );
}
