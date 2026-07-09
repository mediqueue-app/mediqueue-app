import type { LucideIcon } from "lucide-react";

export function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  accent?: "primary" | "amber" | "emerald" | "slate";
}) {
  const accentStyles: Record<string, string> = {
    primary: "bg-primary-light text-primary",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="card-surface flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={`flex items-center justify-center rounded-xl p-3 ${accentStyles[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      </div>
    </div>
  );
}
