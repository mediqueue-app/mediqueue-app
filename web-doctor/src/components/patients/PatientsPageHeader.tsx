import { Users } from "lucide-react";
import type { Patient } from "@/types";
import { countByTreatmentStatus } from "@/lib/patient-utils";

export function PatientsPageHeader({ patients }: { patients: Patient[] }) {
  const total = patients.length;
  const active = countByTreatmentStatus(patients, "AKTIF");
  const waiting = countByTreatmentStatus(patients, "BEKLEMEDE");
  const completed = countByTreatmentStatus(patients, "TAMAMLANDI");

  const stats = [
    { label: "Toplam", value: total, tone: "text-slate-900" },
    { label: "Aktif tedavi", value: active, tone: "text-emerald-600" },
    { label: "Beklemede", value: waiting, tone: "text-amber-600" },
    { label: "Tamamlandı", value: completed, tone: "text-slate-500" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">
              Hastalarım
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Aktif ve geçmiş hastalarınızı görüntüleyin, tedavi süreçlerini
              takip edin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-center"
            >
              <p className={`text-xl font-semibold ${s.tone}`}>{s.value}</p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
