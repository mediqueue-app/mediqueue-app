import { PatientList } from "@/components/patients/PatientList";
import { PatientsPageHeader } from "@/components/patients/PatientsPageHeader";
import { fetchPatients } from "@/lib/services/patients";

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const patients = await fetchPatients("TUMU");

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <PatientsPageHeader patients={patients} />
      <PatientList initialPatients={patients} initialSearch={q ?? ""} />
    </div>
  );
}
