import { TrendingUp } from "lucide-react";
import type { RegionalComparison } from "@/types";

export function RegionalComparisonCard({
  data,
}: {
  data: RegionalComparison;
}) {
  const max = Math.max(data.clinicForeignPatients, data.regionAverageForeignPatients);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Bölgesel Rekabet Karşılaştırması
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {data.region} · {data.period}
          </p>
        </div>
        <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
          <TrendingUp className="h-3.5 w-3.5" />+{data.percentAboveAverage}%
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        <span className="font-semibold text-slate-900">{data.region}</span>{" "}
        bölgesindeki benzer klinikler {data.period.toLowerCase()} ortalama{" "}
        <span className="font-semibold text-slate-900">
          {data.regionAverageForeignPatients}
        </span>{" "}
        yabancı hasta ağırladı. Siz sektör ortalamasının{" "}
        <span className="font-semibold text-emerald-700">
          %{data.percentAboveAverage}
        </span>{" "}
        üzerindesiniz!
      </p>

      <div className="mt-5 space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Sizin Kliniğiniz</span>
            <span className="text-sm font-semibold text-slate-900">
              {data.clinicForeignPatients}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(data.clinicForeignPatients / max) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Bölge Ortalaması</span>
            <span className="text-sm font-semibold text-slate-600">
              {data.regionAverageForeignPatients}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-300"
              style={{
                width: `${(data.regionAverageForeignPatients / max) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
