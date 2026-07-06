import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanFeature } from "@/types";

export function PlanComparisonTable({ features }: { features: PlanFeature[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.6fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr]">
        <div className="hidden items-end p-5 sm:flex">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Değer Önerisi
          </p>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 p-5 text-center">
          <p className="text-sm font-semibold text-slate-500">Temel Plan</p>
          <p className="text-xs text-slate-400">Şu anki planınız</p>
        </div>
        <div className="relative flex flex-col items-center justify-end gap-1 rounded-t-xl bg-primary-light/60 p-5 text-center ring-1 ring-inset ring-primary/20">
          <span className="absolute -top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
            ÖNERİLEN
          </span>
          <p className="text-sm font-semibold text-primary">Premium Plan</p>
          <p className="text-xs text-primary/70">Aylık $199</p>
        </div>

        {features.map((feature, i) => (
          <Fragment key={feature.title}>
            <div
              className={cn(
                "border-t border-slate-100 p-5",
                i === 0 && "border-t-0"
              )}
            >
              <p className="text-sm font-medium text-slate-800">
                {feature.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                {feature.description}
              </p>
            </div>
            <div
              className={cn(
                "flex items-center justify-center border-t border-slate-100 p-5 text-center text-xs text-slate-500",
                i === 0 && "border-t-0"
              )}
            >
              {feature.free}
            </div>
            <div
              className={cn(
                "flex items-center justify-center gap-1.5 border-t border-slate-100 bg-primary-light/30 p-5 text-center text-xs font-medium text-slate-800 ring-1 ring-inset ring-primary/10",
                i === 0 && "border-t-0",
                i === features.length - 1 && "rounded-b-xl"
              )}
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              {feature.premium}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
