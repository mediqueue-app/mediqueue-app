import { Users, CheckCircle2, Stethoscope, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { QuickLeadsTable } from "@/components/dashboard/QuickLeadsTable";
import { fetchDashboardOverview } from "@/lib/services/clinic";

export default async function DashboardOverviewPage() {
  const { leads, metrics } = await fetchDashboardOverview();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Genel Bakış
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kliniğinizin bugünkü operasyon özeti.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Bugünkü Lead Sayısı"
          value={metrics.todayLeads}
          icon={Users}
          trend={{ value: "+18% geçen haftaya göre", positive: true }}
        />
        <KpiCard
          label="Onaylanan Randevu"
          value={metrics.approvedCount}
          icon={CheckCircle2}
          iconTone="emerald"
          trend={{ value: "Bugün için hedefin üzerinde", positive: true }}
        />
        <KpiCard
          label="Aktif Doktor"
          value={metrics.activeDoctors}
          icon={Stethoscope}
          iconTone="amber"
        />
        <KpiCard
          label="Dönüşüm Oranı"
          value={metrics.conversionRate}
          suffix="%"
          icon={TrendingUp}
          trend={{ value: "Kayıp oranı %34'ün altında", positive: true }}
        />
      </div>

      <QuickLeadsTable leads={leads} />
    </div>
  );
}
