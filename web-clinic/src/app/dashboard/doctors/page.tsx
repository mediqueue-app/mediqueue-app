import { DoctorsGrid } from "@/components/dashboard/doctors/DoctorsGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { fetchDoctors } from "@/lib/services/doctors";
import { fetchPatientLeads } from "@/lib/services/leads";

export default async function DoctorsPage() {
  const [doctors, leads] = await Promise.all([
    fetchDoctors(),
    fetchPatientLeads(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Doktorlar"
        description="Kadronuzu yönetin, müsaitlik durumlarını ve performansı takip edin."
      />

      <DoctorsGrid doctors={doctors} leads={leads} />
    </div>
  );
}
