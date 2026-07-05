import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  suffix,
  icon: Icon,
  trend,
  iconTone = "primary",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  iconTone?: "primary" | "emerald" | "amber";
}) {
  const iconToneClasses = {
    primary: "bg-primary-light text-primary",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  } as const;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            {value}
            {suffix && (
              <span className="ml-1 text-base font-medium text-slate-400">
                {suffix}
              </span>
            )}
          </p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            iconToneClasses[iconTone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <p
          className={cn(
            "mt-3 text-xs font-medium",
            trend.positive ? "text-emerald-600" : "text-red-600"
          )}
        >
          {trend.value}
        </p>
      )}
    </div>
  );
}
