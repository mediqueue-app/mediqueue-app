"use client";

import type { AvailabilitySlot } from "@/types";
import { cn } from "@/lib/utils";

export function AvailabilityEditor({
  slots,
  onChange,
}: {
  slots: AvailabilitySlot[];
  onChange: (slots: AvailabilitySlot[]) => void;
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Müsait olduğunuz saatleri işaretleyin. Değişiklikler şimdilik yalnızca
        bu oturumda saklanır.
      </p>
      {slots.map((day, dayIndex) => (
        <div key={day.dayOfWeek}>
          <p className="mb-2 text-sm font-semibold text-slate-800">{day.label}</p>
          <div className="flex flex-wrap gap-2">
            {day.slots.map((slot, hourIndex) => (
              <button
                key={slot.hour}
                type="button"
                onClick={() => toggleSlot(dayIndex, hourIndex)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  slot.available
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-400 line-through"
                )}
              >
                {slot.hour}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
