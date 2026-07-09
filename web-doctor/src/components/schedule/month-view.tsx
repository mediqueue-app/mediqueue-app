"use client";

import type { ScheduleSlot } from "@/types";
import { getMonthMatrix, isSameMonth } from "@/lib/schedule-grid";
import { getDayNumber } from "@/lib/ui";
import { TODAY_ISO } from "@/lib/mock-doctor";

const weekdayHeaders = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export function MonthView({
  anchorDate,
  slots,
  onSelectDay,
}: {
  anchorDate: string;
  slots: ScheduleSlot[];
  onSelectDay: (date: string) => void;
}) {
  const matrix = getMonthMatrix(anchorDate);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-2 px-1">
        {weekdayHeaders.map((label) => (
          <p
            key={label}
            className="py-1 text-center text-xs font-semibold text-slate-400"
          >
            {label}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {matrix.map((date) => {
          const inCurrentMonth = isSameMonth(date, anchorDate);
          const isToday = date === TODAY_ISO;
          const daySlots = slots.filter((s) => s.date === date);
          const patientCount = daySlots.filter((s) => s.appointmentId).length;
          const hasSurgery = daySlots.some((s) => s.type === "AMELİYAT");

          return (
            <button
              key={date}
              type="button"
              onClick={() => onSelectDay(date)}
              className={`flex h-24 flex-col items-start gap-1.5 rounded-xl border p-2.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                inCurrentMonth
                  ? "border-slate-200/70 bg-white"
                  : "border-slate-100 bg-slate-50/40"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  isToday
                    ? "bg-primary text-white"
                    : inCurrentMonth
                      ? "text-slate-700"
                      : "text-slate-300"
                }`}
              >
                {getDayNumber(date)}
              </span>

              <div className="mt-auto flex flex-wrap items-center gap-1">
                {patientCount > 0 && (
                  <span className="rounded-full bg-primary-light px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    {patientCount} randevu
                  </span>
                )}
                {hasSurgery && (
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" title="Ameliyat bloğu" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
