"use client";

import { Check, X } from "lucide-react";
import type { AvailabilitySlot } from "@/types";
import { cn } from "@/lib/utils";

export function AvailabilityEditor({
  slots,
  onChange,
  persistHint = "Değişiklikler bu oturumda saklanır",
}: {
  slots: AvailabilitySlot[];
  onChange: (slots: AvailabilitySlot[]) => void;
  persistHint?: string;
}) {
  function toggleSlot(dayIndex: number, hourIndex: number) {
    const next = slots.map((day, di) => {
      if (di !== dayIndex) return day;
      return {
        ...day,
        slots: day.slots.map((slot, hi) =>
          hi === hourIndex ? { ...slot, available: !slot.available } : slot
        ),
      };
    });
    onChange(next);
  }

  function setDayAll(dayIndex: number, available: boolean) {
    const next = slots.map((day, di) => {
      if (di !== dayIndex) return day;
      return {
        ...day,
        slots: day.slots.map((slot) => ({ ...slot, available })),
      };
    });
    onChange(next);
  }

  const allHours = [...new Set(slots.flatMap((d) => d.slots.map((s) => s.hour)))].sort();

  const totalAvailable = slots.reduce(
    (sum, day) => sum + day.slots.filter((s) => s.available).length,
    0
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl bg-primary-light/50 px-4 py-3">
        <p className="text-sm text-slate-600">
          Toplam <span className="font-semibold text-primary">{totalAvailable}</span> müsait
          slot
        </p>
        <p className="text-xs text-slate-400">{persistHint}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                Gün
              </th>
              {allHours.map((hour) => (
                <th
                  key={hour}
                  className="px-1 py-2.5 text-center text-[10px] font-semibold text-slate-400"
                >
                  {hour}
                </th>
              ))}
              <th className="px-2 py-2.5 text-center text-[10px] font-semibold text-slate-400">
                Tümü
              </th>
            </tr>
          </thead>
          <tbody>
            {slots.map((day, dayIndex) => {
              const availableCount = day.slots.filter((s) => s.available).length;
              const allOn = availableCount === day.slots.length;
              const allOff = availableCount === 0;

              return (
                <tr
                  key={day.dayOfWeek}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="whitespace-nowrap px-3 py-2">
                    <p className="font-semibold text-slate-800">{day.label}</p>
                    <p className="text-[10px] text-slate-400">
                      {availableCount}/{day.slots.length} slot
                    </p>
                  </td>
                  {allHours.map((hour) => {
                    const hourIndex = day.slots.findIndex((s) => s.hour === hour);
                    if (hourIndex === -1) {
                      return (
                        <td key={hour} className="px-1 py-2 text-center">
                          <span className="inline-block h-8 w-8 rounded-lg bg-slate-50" />
                        </td>
                      );
                    }
                    const slot = day.slots[hourIndex];
                    return (
                      <td key={hour} className="px-1 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSlot(dayIndex, hourIndex)}
                          aria-label={`${day.label} ${hour} ${slot.available ? "müsait" : "kapalı"}`}
                          className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
                            slot.available
                              ? "border-primary/30 bg-primary text-white shadow-sm hover:bg-primary-hover"
                              : "border-slate-200 bg-slate-50 text-slate-300 hover:border-slate-300"
                          )}
                        >
                          {slot.available ? (
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                  <td className="px-2 py-2">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => setDayAll(dayIndex, true)}
                        disabled={allOn}
                        className="rounded-md px-2 py-0.5 text-[10px] font-medium text-primary hover:bg-primary-light disabled:opacity-40"
                      >
                        Aç
                      </button>
                      <button
                        type="button"
                        onClick={() => setDayAll(dayIndex, false)}
                        disabled={allOff}
                        className="rounded-md px-2 py-0.5 text-[10px] font-medium text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                      >
                        Kapat
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
