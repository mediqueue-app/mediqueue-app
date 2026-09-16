"use client";

import type { Appointment } from "@/types";
import {
  STATUS_DOT,
  formatMonthYear,
  isToday,
  toDateKey,
} from "@/lib/calendar-utils";
import { formatWeekdayHeaders } from "@/lib/datetime";
import { cn } from "@/lib/utils";

export function MonthGrid({
  weeks,
  focusDate,
  appointmentsByDate,
  selectedDate,
  onSelectDate,
}: {
  weeks: (Date | null)[][];
  focusDate: Date;
  appointmentsByDate: Map<string, Appointment[]>;
  selectedDate: string;
  onSelectDate: (key: string) => void;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">
          {formatMonthYear(focusDate)}
        </p>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
        {formatWeekdayHeaders().map((label, i) => (
          <div
            key={`${i}-${label}`}
            className="border-r border-slate-100 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400 last:border-r-0"
          >
            {label}
          </div>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 border-b border-slate-100 last:border-b-0">
          {week.map((day, di) => {
            if (!day) {
              return (
                <div
                  key={`empty-${wi}-${di}`}
                  className="min-h-[100px] border-r border-slate-100 bg-slate-50/30 last:border-r-0"
                />
              );
            }

            const key = toDateKey(day);
            const inMonth = day.getMonth() === focusDate.getMonth();
            const today = isToday(day);
            const selected = key === selectedDate;
            const dayAppointments = appointmentsByDate.get(key) ?? [];

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectDate(key)}
                className={cn(
                  "relative min-h-[100px] border-r border-slate-100 p-2 text-left transition-colors last:border-r-0",
                  !inMonth && "bg-slate-50/40 opacity-50",
                  selected && "bg-primary-light/40 ring-2 ring-inset ring-primary/30",
                  !selected && "hover:bg-slate-50"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold",
                    today && "bg-primary text-white shadow-sm",
                    !today && selected && "text-primary",
                    !today && !selected && "text-slate-700"
                  )}
                >
                  {day.getDate()}
                </span>

                <div className="mt-1.5 space-y-1">
                  {dayAppointments.slice(0, 2).map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-1 rounded-md bg-white/80 px-1.5 py-0.5 shadow-sm ring-1 ring-slate-100"
                    >
                      <span
                        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_DOT[apt.status])}
                      />
                      <span className="truncate text-[10px] font-medium text-slate-700">
                        {apt.time} {apt.patientName.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <p className="pl-1 text-[10px] font-medium text-primary">
                      +{dayAppointments.length - 2} randevu daha
                    </p>
                  )}
                </div>

                {dayAppointments.length === 0 && inMonth && (
                  <p className="mt-2 text-[10px] text-slate-300">Boş</p>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
