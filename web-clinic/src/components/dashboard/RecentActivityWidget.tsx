import { formatDateTimeTr } from "@/lib/utils";
import type { ActivityItem } from "@/types";
import { cn } from "@/lib/utils";

const toneClasses: Record<ActivityItem["tone"], string> = {
  primary: "bg-primary-light text-primary",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  neutral: "bg-slate-100 text-slate-500",
};

export function RecentActivityWidget({
  activities,
}: {
  activities: ActivityItem[];
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Son Aktiviteler
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Klinik operasyonlarından son güncellemeler
        </p>
      </div>
      <ul className="space-y-4">
        {activities.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                toneClasses[item.tone]
              )}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
              <p className="mt-1 text-[11px] text-slate-400">
                {formatDateTimeTr(item.timestamp)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
