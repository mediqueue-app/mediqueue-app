import { CurrentPlanCard } from "@/components/dashboard/billing/CurrentPlanCard";
import { PlanComparisonTable } from "@/components/dashboard/billing/PlanComparisonTable";
import { UpgradeButton } from "@/components/dashboard/billing/UpgradeButton";
import { PageHeader } from "@/components/shared/PageHeader";
import { fetchBillingUsage, fetchPlanFeatures } from "@/lib/services/billing";

export default async function BillingPage() {
  const [planFeatures, usage] = await Promise.all([
    fetchPlanFeatures(),
    fetchBillingUsage(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Abonelik ve Planlar"
        description="Kliniğinizi büyüten global bir yönetim sistemine yükseltin."
      />

      <CurrentPlanCard
        leadsUsed={usage.leadsUsed}
        leadsLimit={usage.leadsLimit}
      />

      <PlanComparisonTable features={planFeatures} />

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Kliniğinizi bir sonraki seviyeye taşıyın
        </h2>
        <p className="max-w-md text-sm text-slate-500">
          Sponsorlu görünürlük, sınırsız ekip erişimi ve yapay zeka destekli
          rekabet raporlarıyla uluslararası hasta akışınızı büyütün.
        </p>
        <UpgradeButton />
        <p className="text-xs text-slate-400">
          İstediğiniz zaman iptal edebilirsiniz. Kurulum ücreti yoktur.
        </p>
      </div>
    </div>
  );
}
