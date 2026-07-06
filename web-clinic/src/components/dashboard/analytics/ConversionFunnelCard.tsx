import { ChevronRight } from "lucide-react";
import type { FunnelStage } from "@/types";

function conversionBetween(current: FunnelStage, previous: FunnelStage) {
  if (previous.isRate || current.isRate) return null;
  if (previous.value === 0) return null;
  return Math.round((current.value / previous.value) * 1000) / 10;
}

export function ConversionFunnelCard({ stages }: { stages: FunnelStage[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Dönüşüm Hunisi</h2>
      <p className="mt-1 text-xs text-slate-500">
        Görüntülenmeden tedavi başarısına kadar hasta yolculuğunuz.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-6">
        {stages.map((stage, i) => {
          const previous = i > 0 ? stages[i - 1] : null;
          const rate = previous ? conversionBetween(stage, previous) : null;
          const isLast = i === stages.length - 1;

          return (
            <div key={stage.label} className="flex items-center gap-2">
              {i > 0 && (
                <div className="flex flex-col items-center gap-1 px-1">
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                  {rate !== null && (
                    <span className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      %{rate.toLocaleString("tr-TR")}
                    </span>
                  )}
                </div>
              )}
              <div
                className={
                  isLast
                    ? "rounded-xl border border-primary/20 bg-primary-light/60 px-4 py-3"
                    : "px-1 py-3"
                }
              >
                <p
                  className={
                    isLast
                      ? "text-2xl font-semibold tracking-tight text-primary"
                      : "text-2xl font-semibold tracking-tight text-slate-900"
                  }
                >
                  {stage.isRate ? "%" : ""}
                  {stage.value.toLocaleString("tr-TR")}
                  {stage.suffix && !stage.isRate && (
                    <span className="ml-0.5 text-base font-medium text-slate-400">
                      {stage.suffix}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {stage.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
