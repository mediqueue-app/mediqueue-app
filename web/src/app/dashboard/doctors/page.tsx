import { DoctorsGrid } from "@/components/dashboard/doctors/DoctorsGrid";
import { doctors } from "@/lib/mock-data";

export default function DoctorsPage() {
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
