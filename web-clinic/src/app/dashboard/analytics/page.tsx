import { Download } from "lucide-react";
import { ConversionFunnelCard } from "@/components/dashboard/analytics/ConversionFunnelCard";
import { RegionalComparisonCard } from "@/components/dashboard/analytics/RegionalComparisonCard";
import { AiReviewSummaryCard } from "@/components/dashboard/analytics/AiReviewSummaryCard";
import { RankedShareList } from "@/components/dashboard/analytics/RankedShareList";
import { countryCodeToFlagEmoji } from "@/lib/country";
import { fetchAnalyticsData } from "@/lib/services/analytics";

export default async function AnalyticsPage() {
  const {
    conversionFunnel,
    regionalComparison,
    aiReviewSummary,
    patientOriginDistribution,
    branchRevenueDistribution,
  } = await fetchAnalyticsData();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Gelişmiş Analitik & Rakip Kıyaslama
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kliniğinizin platformdaki performansını ve bölgesel konumunu
            derinlemesine keşfedin.
          </p>
        </div>
        <button
          type="button"
          title="Demo modunda PDF indirme Ay 2'de eklenecek"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
        >
          <Download className="h-4 w-4" />
          İndirilebilir PDF Raporu Al
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wide">
            PRO
          </span>
        </button>
      </div>

      <ConversionFunnelCard stages={conversionFunnel} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RegionalComparisonCard data={regionalComparison} />
        <AiReviewSummaryCard data={aiReviewSummary} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RankedShareList
          title="Hasta Menşei Dağılımı"
          subtitle="Uluslararası hastalarınızın geldiği ülkeler."
          items={patientOriginDistribution.map((o) => ({
            label: o.country,
            percentage: o.percentage,
            prefix:
              o.countryCode === "UN" ? "🌍" : countryCodeToFlagEmoji(o.countryCode),
          }))}
        />
        <RankedShareList
          title="Branşlara Göre Gelir Dağılımı"
          subtitle="En çok gelir getiren tedavi branşlarınız."
          items={branchRevenueDistribution.map((b) => ({
            label: b.branch,
            percentage: b.percentage,
          }))}
        />
      </div>
    </div>
  );
}
