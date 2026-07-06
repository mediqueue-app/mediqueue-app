import { PatientList } from "@/components/patients/PatientList";
import { fetchPatients } from "@/lib/services/patients";

export default async function PatientsPage() {
  const patients = await fetchPatients("TUMU");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Hastalarım
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Aktif ve geçmiş hastalarınızı görüntüleyin, tedavi süreçlerini takip edin.
        </p>
      </div>
      <PatientList initialPatients={patients} />
    </div>
  );
}
