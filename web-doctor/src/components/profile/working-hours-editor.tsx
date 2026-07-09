"use client";

import type { WorkingHoursRange } from "@/types";

export function WorkingHoursEditor({
  workingHours,
  onChange,
}: {
  workingHours: WorkingHoursRange[];
  onChange: (workingHours: WorkingHoursRange[]) => void;
}) {
  function updateDay(day: WorkingHoursRange["day"], patch: Partial<WorkingHoursRange>) {
    onChange(
      workingHours.map((wh) => (wh.day === day ? { ...wh, ...patch } : wh))
    );
  }

  return (
    <div className="flex flex-col divide-y divide-slate-100">
      {workingHours.map((wh) => (
        <div
          key={wh.day}
          className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <button
              type="button"
              role="switch"
              aria-checked={wh.isActive}
              onClick={() => updateDay(wh.day, { isActive: !wh.isActive })}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                wh.isActive ? "bg-primary" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  wh.isActive ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={wh.isActive ? "" : "text-slate-400"}>{wh.day}</span>
          </label>

          <div className="flex items-center gap-2 pl-12 sm:pl-0">
            <input
              type="time"
              value={wh.startTime}
              disabled={!wh.isActive}
              onChange={(e) => updateDay(wh.day, { startTime: e.target.value })}
              className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-sm text-slate-700 disabled:bg-slate-50 disabled:text-slate-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-xs text-slate-400">—</span>
            <input
              type="time"
              value={wh.endTime}
              disabled={!wh.isActive}
              onChange={(e) => updateDay(wh.day, { endTime: e.target.value })}
              className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-sm text-slate-700 disabled:bg-slate-50 disabled:text-slate-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
