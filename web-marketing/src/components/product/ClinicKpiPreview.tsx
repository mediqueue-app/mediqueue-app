"use client";

import { CalendarClock, Eye, Inbox, Users } from "lucide-react";
import { useLocale } from "@/lib/locale";

const ICONS = [Inbox, Users, Eye, CalendarClock] as const;
const TONES = [
  "bg-primary-light text-primary",
  "bg-emerald-50 text-emerald-600",
  "bg-accent-light text-accent",
  "bg-amber-50 text-amber-600",
] as const;

export function ClinicKpiPreview() {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {t.previews.kpi.map((k, i) => {
        const Icon = ICONS[i] ?? Inbox;
        return (
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
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONES[i] ?? TONES[0]}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
