import { DoctorsGrid } from "@/components/dashboard/doctors/DoctorsGrid";
import { fetchDoctors } from "@/lib/services/doctors";

export default async function DoctorsPage() {
  const doctors = await fetchDoctors();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Doktor ve Takvim Yönetimi
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Doktorlarınızın uzmanlık alanlarını, dillerini ve anlık müsaitlik
          durumlarını yönetin.
        </p>
      </div>

      <DoctorsGrid doctors={doctors} />
    </div>
  );
}
