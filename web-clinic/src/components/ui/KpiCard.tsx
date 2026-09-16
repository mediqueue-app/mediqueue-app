import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type IconTone = "primary" | "emerald" | "amber" | "violet" | "rose" | "sky";

const ICON_TONES: Record<IconTone, string> = {
  primary: "bg-primary-light text-primary",
  emerald: "bg-success-light text-success",
  amber: "bg-warning-light text-warning",
  violet: "bg-secondary-light text-secondary",
  rose: "bg-error-light text-error",
  sky: "bg-secondary-light text-secondary",
};

export function KpiCard({
  label,
  value,
  suffix,
  icon: Icon,
  delta,
  deltaSuffix = "%",
  deltaLabel,
  iconTone = "primary",
  hint,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  delta?: number;
  deltaSuffix?: string;
  deltaLabel?: string;
  iconTone?: IconTone;
  hint?: string;
}) {
  const positive = delta !== undefined ? delta >= 0 : true;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
            {suffix && (
              <span className="ml-1 text-lg font-semibold text-slate-400">
                {suffix}
              </span>
            )}
          </p>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            ICON_TONES[iconTone]
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      {(delta !== undefined || deltaLabel || hint) && (
        <div className="mt-4 flex items-center gap-2">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                positive
                  ? "bg-success-light text-success"
                  : "bg-error-light text-error"
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {Math.abs(delta)}
              {deltaSuffix}
            </span>
          )}
          <span className="text-xs text-slate-500">
            {deltaLabel ?? hint ?? "önceki aya göre"}
          </span>
        </div>
      )}
    </div>
  );
}
