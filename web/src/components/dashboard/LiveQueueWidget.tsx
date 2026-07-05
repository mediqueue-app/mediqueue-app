"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QueueDensity } from "@/types";

const DENSITY_OPTIONS: {
  value: QueueDensity;
  label: string;
  activeClass: string;
}[] = [
  { value: "SAKİN", label: "Sakin", activeClass: "bg-emerald-600 text-white" },
  { value: "NORMAL", label: "Normal", activeClass: "bg-amber-500 text-white" },
  { value: "YOĞUN", label: "Yoğun", activeClass: "bg-red-600 text-white" },
];

export function LiveQueueWidget() {
  const [minutes, setMinutes] = useState(12);
  const [density, setDensity] = useState<QueueDensity>("NORMAL");

  const progress = useMemo(() => Math.min((minutes / 60) * 100, 100), [minutes]);

  return (
    <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-light/60 via-white to-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/30">
            <Timer className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
              Canlı Sıra Yönetimi · Platform USP
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Şu An:{" "}
              <span className="text-primary">{minutes} Dk</span> Bekleme
            </p>
            <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <button
              onClick={() => setMinutes((m) => Math.max(0, m - 5))}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="5 dakika azalt"
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">- 5 Dk</span>
            </button>
            <span className="w-16 text-center text-sm font-medium text-slate-600">
              5 Dk Ayarla
            </span>
            <button
              onClick={() => setMinutes((m) => m + 5)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="5 dakika artır"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">+ 5 Dk</span>
            </button>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {DENSITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDensity(opt.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  density === opt.value
                    ? opt.activeClass
                    : "text-slate-500 hover:bg-slate-100"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
