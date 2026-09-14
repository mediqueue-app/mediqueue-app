"use client";

import type { ReactNode } from "react";
import { CalendarClock, CheckCircle2, MessageCircle, Pill } from "lucide-react";
import { useLocale } from "@/lib/locale";

export function RecoveryPreview() {
  const { t } = useLocale();
  const x = t.screens.recovery;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-b border-border px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {x.panel}
        </p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">{x.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{x.day}</p>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-medium text-slate-500">
            <span>{x.progress}</span>
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
          title={x.tomorrow}
        />
        <Reminder
          icon={<Pill className="h-4 w-4 text-primary" />}
          title={x.today}
        />
        <Reminder
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          title={x.done}
          done
        />
      </ul>

      <div className="border-t border-border p-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary-light py-3 text-sm font-semibold text-primary"
        >
          <MessageCircle className="h-4 w-4" />
          {x.chat}
        </button>
        <p className="mt-2 text-center text-[11px] text-slate-400">{x.support}</p>
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
