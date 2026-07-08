"use client";

import type { ToothRecord, ToothStatus } from "@/types";
import {
  LOWER_LEFT_FDI,
  LOWER_RIGHT_FDI,
  UPPER_LEFT_FDI,
  UPPER_RIGHT_FDI,
} from "@/lib/dental";
import { cn } from "@/lib/utils";

function statusClasses(status: ToothStatus, selected: boolean) {
  if (selected) return "border-2 border-emerald-500 bg-white ring-2 ring-emerald-100";
  switch (status) {
    case "treated":
      return "border-primary bg-primary text-white";
    case "pending_treatment":
      return "border-amber-400 bg-amber-50 text-amber-900";
    default:
      return "border-slate-200 bg-white text-slate-600";
  }
}

function JawRow({
  rightTeeth,
  leftTeeth,
  teethMap,
  selectedTooth,
  onSelectTooth,
}: {
  rightTeeth: readonly number[];
  leftTeeth: readonly number[];
  teethMap: Map<number, ToothRecord>;
  selectedTooth: number | null;
  onSelectTooth: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex gap-1.5">
        {rightTeeth.map((num) => {
          const tooth = teethMap.get(num);
          if (!tooth) return null;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onSelectTooth(num)}
              aria-label={`${num} numaralı diş`}
              aria-pressed={selectedTooth === num}
              className={cn(
                "flex h-10 w-8 flex-col items-center justify-center rounded-lg text-[10px] font-bold transition-all duration-150 hover:shadow-sm",
                statusClasses(tooth.status, selectedTooth === num)
              )}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="h-10 w-px bg-slate-200" aria-hidden />
      <div className="flex gap-1.5">
        {leftTeeth.map((num) => {
          const tooth = teethMap.get(num);
          if (!tooth) return null;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onSelectTooth(num)}
              aria-label={`${num} numaralı diş`}
              aria-pressed={selectedTooth === num}
              className={cn(
                "flex h-10 w-8 flex-col items-center justify-center rounded-lg text-[10px] font-bold transition-all duration-150 hover:shadow-sm",
                statusClasses(tooth.status, selectedTooth === num)
              )}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Odontogram({
  teeth,
  selectedTooth,
  onSelectTooth,
}: {
  teeth: ToothRecord[];
  selectedTooth: number | null;
  onSelectTooth: (n: number) => void;
}) {
  const teethMap = new Map(teeth.map((t) => [t.toothNumber, t]));
  const treated = teeth.filter((t) => t.status === "treated").length;
  const pending = teeth.filter((t) => t.status === "pending_treatment").length;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Odontogram · FDI
        </p>
        {(treated > 0 || pending > 0) && (
          <p className="text-xs text-slate-400">
            {treated > 0 && <span className="text-primary">{treated} tedavi</span>}
            {treated > 0 && pending > 0 && " · "}
            {pending > 0 && (
              <span className="text-amber-600">{pending} bekleyen</span>
            )}
          </p>
        )}
      </div>

      <div className="space-y-6 px-4 py-6">
        <div>
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Üst çene
          </p>
          <JawRow
            rightTeeth={UPPER_RIGHT_FDI}
            leftTeeth={UPPER_LEFT_FDI}
            teethMap={teethMap}
            selectedTooth={selectedTooth}
            onSelectTooth={onSelectTooth}
          />
        </div>
        <div>
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Alt çene
          </p>
          <JawRow
            rightTeeth={LOWER_RIGHT_FDI}
            leftTeeth={LOWER_LEFT_FDI}
            teethMap={teethMap}
            selectedTooth={selectedTooth}
            onSelectTooth={onSelectTooth}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 border-t border-slate-100 px-4 py-3">
        {[
          { label: "Sağlıklı", className: "border border-slate-200 bg-white" },
          { label: "Tedavi görmüş", className: "bg-primary" },
          { label: "Bekleyen", className: "border border-amber-400 bg-amber-50" },
        ].map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600"
          >
            <span className={cn("h-3 w-3 rounded-sm", item.className)} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
