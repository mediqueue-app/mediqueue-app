"use client";

import Link from "next/link";
import { CalendarPlus, Clock, Users } from "lucide-react";
import type { Appointment } from "@/types";
import { AppointmentSlot } from "@/components/calendar/AppointmentSlot";
import {
  countByStatus,
  formatDayLong,
  formatDuration,
  parseDateKey,
} from "@/lib/calendar-utils";

export function DayAgendaPanel({
  selectedDate,
  appointments,
}: {
  selectedDate: string;
  appointments: Appointment[];
}) {
  const date = parseDateKey(selectedDate);
  const sorted = [...appointments].sort((a, b) => a.time.localeCompare(b.time));
  const totalMinutes = sorted.reduce((sum, a) => sum + a.durationMinutes, 0);
  const confirmed = countByStatus(sorted, "ONAYLANDI");
  const pending = countByStatus(sorted, "BEKLIYOR");

  return (
    <aside className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-6 lg:h-fit">
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Gün Özeti
        </p>
        <h3 className="mt-1 text-lg font-semibold capitalize text-slate-900">
          {formatDayLong(date)}
        </h3>
      </div>

      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        <Stat icon={Users} label="Randevu" value={String(sorted.length)} />
        <Stat icon={Clock} label="Toplam" value={formatDuration(totalMinutes)} />
        <Stat
          icon={CalendarPlus}
          label="Onaylı"
          value={String(confirmed)}
          sub={pending > 0 ? `${pending} bekliyor` : undefined}
        />
      </div>

      <div className="flex-1 px-5 py-4">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <CalendarPlus className="h-5 w-5 text-slate-400" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Bu gün randevu yok
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Müsaitlik düzenleyerek yeni slot açabilirsiniz.
            </p>
          </div>
        ) : (
          <ol className="relative space-y-0">
            {sorted.map((apt, index) => {
              const isLast = index === sorted.length - 1;
              return (
                <li key={apt.id} className="relative flex gap-4 pb-6">
                  {!isLast && (
                    <span
                      className="absolute left-[19px] top-8 h-[calc(100%-8px)] w-px bg-slate-200"
                      aria-hidden
                    />
                  )}
                  <div className="flex w-10 shrink-0 flex-col items-center">
                    <span className="rounded-lg bg-slate-100 px-1.5 py-1 text-[10px] font-bold text-slate-600">
                      {apt.time}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <AppointmentSlot
                      appointment={apt}
                      variant="timeline"
                      showLink
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {sorted.length > 0 && (
        <div className="border-t border-slate-100 px-5 py-3">
          <Link
            href={`/dashboard/patients/${sorted[0].patientId}`}
            className="text-xs font-medium text-primary hover:underline"
          >
            İlk hastanın profiline git →
          </Link>
        </div>
      )}
    </aside>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="px-3 py-3 text-center">
      <Icon className="mx-auto h-4 w-4 text-slate-400" />
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
      <p className="text-[10px] font-medium text-slate-500">{label}</p>
      {sub && <p className="mt-0.5 text-[10px] text-amber-600">{sub}</p>}
    </div>
  );
}
