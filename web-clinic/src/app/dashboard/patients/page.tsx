import { PatientsExplorer } from "@/components/dashboard/patients/PatientsExplorer";
import { patientLeads } from "@/lib/mock-data";

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Hasta & Lead Yönetimi
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Gelen tüm hasta taleplerini filtreleyin, belgelerini inceleyin ve
          talepleri onaylayıp reddedin.
        </p>
      </div>

      <PatientsExplorer leads={patientLeads} />
    </div>
  );
}
