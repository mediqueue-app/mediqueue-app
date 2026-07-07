"use client";

import type { Appointment } from "@/types";
import { GridAppointmentBlock } from "@/components/calendar/GridAppointmentBlock";
import {
  CALENDAR_END_HOUR,
  CALENDAR_START_HOUR,
  HOUR_LABELS,
  HOUR_ROW_PX,
  formatWeekdayShort,
  isToday,
  layoutDayAppointments,
  toDateKey,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

const GUTTER = 3;

export function WeekTimeGrid({
  weekDays,
  appointmentsByDate,
  selectedDate,
  onSelectDate,
}: {
  weekDays: Date[];
  appointmentsByDate: Map<string, Appointment[]>;
  selectedDate: string;
  onSelectDate: (key: string) => void;
}) {
  const gridHeight = (CALENDAR_END_HOUR - CALENDAR_START_HOUR) * HOUR_ROW_PX;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <div className="min-w-[840px]">
          {/* Gün başlıkları */}
          <div className="grid grid-cols-[56px_repeat(7,minmax(100px,1fr))] border-b border-slate-200 bg-slate-50/80">
            <div className="border-r border-slate-100" />
            {weekDays.map((day) => {
              const key = toDateKey(day);
              const today = isToday(day);
              const selected = key === selectedDate;
              const count = appointmentsByDate.get(key)?.length ?? 0;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectDate(key)}
                  className={cn(
                    "border-r border-slate-100 px-2 py-3 text-center transition-colors last:border-r-0",
                    selected && "bg-primary-light/50",
                    !selected && "hover:bg-slate-100/60"
                  )}
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {formatWeekdayShort(day)}
                  </p>
                  <p
                    className={cn(
                      "mx-auto mt-1 flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold",
                      today && "bg-primary text-white shadow-sm shadow-primary/30",
                      !today && selected && "bg-primary/10 text-primary",
                      !today && !selected && "text-slate-900"
                    )}
                  >
                    {day.getDate()}
                  </p>
                  {count > 0 && (
                    <p className="mt-1 text-[10px] font-medium text-slate-500">
                      {count} randevu
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Zaman ızgarası */}
          <div className="grid grid-cols-[56px_repeat(7,minmax(100px,1fr))]">
            {/* Saat etiketleri */}
            <div className="relative border-r border-slate-100" style={{ height: gridHeight }}>
              {HOUR_LABELS.map((hour, i) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 flex items-start justify-end border-b border-slate-100 pr-2"
                  style={{ top: i * HOUR_ROW_PX, height: HOUR_ROW_PX }}
                >
                  <span className="-translate-y-2 text-[10px] font-medium text-slate-400">
                    {String(hour).padStart(2, "0")}:00
                  </span>
                </div>
              ))}
            </div>

            {/* Gün sütunları */}
            {weekDays.map((day) => {
              const key = toDateKey(day);
              const dayAppointments = appointmentsByDate.get(key) ?? [];
              const positioned = layoutDayAppointments(dayAppointments);
              const selected = key === selectedDate;
              const today = isToday(day);

              return (
                <div
                  key={key}
                  className={cn(
                    "relative border-r border-slate-100 last:border-r-0",
                    selected && "bg-primary-light/15",
                    today && !selected && "bg-slate-50/50"
                  )}
                  style={{ height: gridHeight }}
                >
                  {/* Arka plan çizgileri — randevuların altında */}
                  {HOUR_LABELS.map((hour, i) => (
                    <div
                      key={hour}
                      className={cn(
                        "pointer-events-none absolute left-0 right-0 border-b border-slate-100",
                        i % 2 === 1 && "bg-slate-50/40"
                      )}
                      style={{ top: i * HOUR_ROW_PX, height: HOUR_ROW_PX, zIndex: 0 }}
                    />
                  ))}

                  <div
                    className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-slate-200"
                    style={{ top: (13 - CALENDAR_START_HOUR) * HOUR_ROW_PX, zIndex: 0 }}
                  />

                  {/* Randevu blokları */}
                  {positioned.map(({ appointment, top, height, columnIndex, columnCount }) => {
                    const widthPct = 100 / columnCount;
                    const leftPct = columnIndex * widthPct;

                    return (
                      <div
                        key={appointment.id}
                        className="absolute"
                        style={{
                          top: top + 1,
                          height,
                          left: `calc(${leftPct}% + ${GUTTER}px)`,
                          width: `calc(${widthPct}% - ${GUTTER * 2}px)`,
                          zIndex: 10 + columnIndex,
                        }}
                      >
                        <GridAppointmentBlock
                          appointment={appointment}
                          heightPx={height}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 bg-slate-50/50 px-4 py-2.5">
        <span className="text-[11px] text-slate-400">
          {CALENDAR_START_HOUR}:00 – {CALENDAR_END_HOUR}:00
        </span>
        <span className="text-[11px] text-slate-300">|</span>
        <span className="text-[11px] text-slate-400">
          Çakışan randevular yan yana gösterilir
        </span>
      </div>
    </div>
  );
}
