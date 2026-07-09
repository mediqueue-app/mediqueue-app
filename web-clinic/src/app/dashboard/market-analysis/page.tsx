import { Clock, Eye, Star } from "lucide-react";
import { MarketComparisonChart } from "@/components/dashboard/growth/MarketComparisonChart";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { fetchMarketAnalysis } from "@/lib/services/growth";
import { cn } from "@/lib/utils";

export default async function MarketAnalysisPage() {
  const { priceComparison, competitors: competitorTable } =
    await fetchMarketAnalysis();

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Rakip & Pazar Analizi"
        description="Kliniğinizi pazardaki ortalamalar ve rakiplerle kıyaslayın."
        action={<StatusBadge label="Yapay Zeka" tone="primary" dot={false} />}
      />

      <MarketComparisonChart data={priceComparison} />

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Anonim Rakip Karşılaştırması
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Yanıt süresi, profil puanı ve görünürlük skoru kıyaslaması
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Klinik
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Yanıt Süresi
                  </span>
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    Profil Puanı
                  </span>
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    Görünürlük
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {competitorTable.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "transition-colors",
                    row.isYou
                      ? "bg-primary-light/30 hover:bg-primary-light/40"
                      : "hover:bg-slate-50/70"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-semibold",
                          row.isYou ? "text-primary" : "text-slate-900"
                        )}
                      >
                        {row.label}
                      </span>
                      {row.isYou && (
                        <StatusBadge label="Siz" tone="primary" dot={false} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "font-medium",
                        row.isYou && row.responseHours <= 5
                          ? "text-emerald-600"
                          : "text-slate-700"
                      )}
                    >
                      {row.responseHours} saat
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {row.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            row.isYou ? "bg-primary" : "bg-slate-300"
                          )}
                          style={{ width: `${row.visibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {row.visibility}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
