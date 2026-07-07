import { ArrowRight } from "lucide-react";
import { CurrentPlanCard } from "@/components/dashboard/billing/CurrentPlanCard";
import { PlanComparisonTable } from "@/components/dashboard/billing/PlanComparisonTable";
import { fetchPlanFeatures } from "@/lib/services/billing";

export default async function BillingPage() {
  const planFeatures = await fetchPlanFeatures();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Abonelik ve Planlar
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kliniğinizi büyüten global bir yönetim sistemine yükseltin.
        </p>
      </div>

      <CurrentPlanCard leadsUsed={11} leadsLimit={15} />

      <PlanComparisonTable features={planFeatures} />

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Kliniğinizi bir sonraki seviyeye taşıyın
        </h2>
        <p className="max-w-md text-sm text-slate-500">
          Sponsorlu görünürlük, sınırsız ekip erişimi ve yapay zeka destekli
          rekabet raporlarıyla uluslararası hasta akışınızı büyütün.
        </p>
        <button
          type="button"
          title="Demo modunda ödeme entegrasyonu yok"
          className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover"
        >
          Premium&apos;a Yükselt — Aylık $199
          <ArrowRight className="h-4.5 w-4.5" />
        </button>
        <p className="text-xs text-slate-400">
          İstediğiniz zaman iptal edebilirsiniz. Kurulum ücreti yoktur.
        </p>
      </div>
    </div>
  );
}
