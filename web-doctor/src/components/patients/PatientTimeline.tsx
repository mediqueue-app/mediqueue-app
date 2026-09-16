import type { TimelineStep } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { formatDate } from "@/lib/datetime";

export function PatientTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const dotClass =
          step.status === "TAMAMLANDI"
            ? "bg-emerald-500 text-white"
            : step.status === "AKTIF"
              ? "bg-primary text-white ring-4 ring-primary/20"
              : "bg-slate-200 text-slate-400";

        return (
          <li key={step.id} className="relative flex gap-4 pb-8">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-full w-0.5",
                  step.status === "TAMAMLANDI" ? "bg-emerald-200" : "bg-slate-200"
                )}
                aria-hidden
              />
            )}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                dotClass
              )}
            >
              {step.status === "TAMAMLANDI" ? (
                <Check className="h-4 w-4" />
              ) : (
                step.id
              )}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p
                className={cn(
                  "text-sm font-semibold",
                  step.status === "BEKLIYOR" ? "text-slate-400" : "text-slate-900"
                )}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
              {step.completedAt && (
                <p className="mt-1 text-xs text-emerald-600">
                  Tamamlandı: {formatDate(step.completedAt, { style: "medium" })}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
