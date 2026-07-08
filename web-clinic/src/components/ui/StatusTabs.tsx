import type { LeadStatus } from "@/types";
import { LEAD_STATUS_OPTIONS } from "@/lib/status";
import { cn } from "@/lib/utils";

export function StatusTabs({
  value,
  onChange,
  counts,
}: {
  value: LeadStatus | "TÜMÜ";
  onChange: (value: LeadStatus | "TÜMÜ") => void;
  counts: Record<LeadStatus | "TÜMÜ", number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {LEAD_STATUS_OPTIONS.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-150",
              active
                ? "bg-primary text-white shadow-sm shadow-primary/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {option.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              )}
            >
              {counts[option.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
