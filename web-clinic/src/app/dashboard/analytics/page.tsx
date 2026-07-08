import { ConversionFunnelCard } from "@/components/dashboard/analytics/ConversionFunnelCard";
import { RegionalComparisonCard } from "@/components/dashboard/analytics/RegionalComparisonCard";
import { RankedShareList } from "@/components/dashboard/analytics/RankedShareList";
import { TreatmentDemandChart } from "@/components/dashboard/analytics/TreatmentDemandChart";
import { AnalyticsPdfButton } from "@/components/dashboard/analytics/AnalyticsPdfButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { countryCodeToFlagEmoji } from "@/lib/country";
import { fetchAnalyticsData } from "@/lib/services/analytics";

export default async function AnalyticsPage() {
  const {
    conversionFunnel,
    regionalComparison,
    patientOriginDistribution,
    treatmentDemand,
  } = await fetchAnalyticsData();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Analitik"
        description="Dönüşüm hunisi, talep dağılımı ve bölgesel kıyaslama."
        action={<AnalyticsPdfButton />}
      />

      <ConversionFunnelCard stages={conversionFunnel} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TreatmentDemandChart data={treatmentDemand} />
        <RegionalComparisonCard data={regionalComparison} />
      </div>

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
    </div>
  );
}
