"use client";

import type { ReactNode } from "react";
import { CalendarClock, CheckCircle2, MessageCircle, Pill } from "lucide-react";
import { useLocale } from "@/lib/locale";

export function RecoveryPreview() {
  const { locale } = useLocale();
  const tr = locale === "tr";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {tr ? "Hasta paneli" : "Patient panel"}
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">
          {tr ? "İyileşme Takibiniz" : "Your recovery tracking"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {tr ? "Gün 3 / 14 — İyileşme süreci" : "Day 3 / 14 — Recovery"}
        </p>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-medium text-slate-500">
            <span>{tr ? "İlerleme" : "Progress"}</span>
            <span>40%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-band">
            <div className="h-full w-[40%] rounded-full bg-primary" />
          </div>
        </div>
      </div>

      <ul className="divide-y divide-border">
        <Reminder
          icon={<CalendarClock className="h-4 w-4 text-primary" />}
          title={
            tr
              ? "Yarın: Video kontrol randevusu — 14:00"
              : "Tomorrow: Video check-in — 14:00"
          }
        />
        <Reminder
          icon={<Pill className="h-4 w-4 text-primary" />}
          title={tr ? "Bugün: Pansuman değişimi" : "Today: Dressing change"}
        />
        <Reminder
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          title={
            tr ? "Tamamlandı: İlk kontrol formu" : "Done: Initial check-in form"
          }
          done
        />
      </ul>

      <div className="border-t border-border p-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary-light py-3 text-sm font-semibold text-primary"
        >
          <MessageCircle className="h-4 w-4" />
          {tr ? "Asistanınızla Sohbet Et" : "Chat with your assistant"}
        </button>
        <p className="mt-2 text-center text-[11px] text-slate-400">
          {tr ? "7/24 dijital destek" : "24/7 digital support"}
        </p>
      </div>
    </div>
  );
}

function Reminder({
  icon,
  title,
  done = false,
}: {
  icon: ReactNode;
  title: string;
  done?: boolean;
}) {
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <span className="mt-0.5">{icon}</span>
      <p
        className={`text-sm leading-snug ${
          done ? "text-slate-400 line-through" : "text-slate-700"
        }`}
      >
        {title}
      </p>
    </li>
  );
}
