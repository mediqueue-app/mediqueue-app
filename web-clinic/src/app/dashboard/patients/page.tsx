import { Suspense } from "react";
import { PatientsExplorer } from "@/components/dashboard/patients/PatientsExplorer";
import { PageHeader } from "@/components/shared/PageHeader";
import { fetchPatientLeads } from "@/lib/services/leads";

export default async function PatientsPage() {
  const leads = await fetchPatientLeads();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasta & Lead Yönetimi"
        description="Gelen tüm hasta taleplerini filtreleyin, belgelerini inceleyin ve talepleri onaylayıp reddedin."
      />

      <Suspense
        fallback={
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            Yükleniyor…
          </div>
        }
      >
        <PatientsExplorer leads={leads} />
      </Suspense>
    </div>
  );
}
