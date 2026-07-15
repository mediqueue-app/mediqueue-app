import Image from "next/image";
import type { Patient } from "@/types";
import { countByTreatmentStatus } from "@/lib/patient-utils";

const HERO =
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1800&q=80";

export function PatientsPageHeader({ patients }: { patients: Patient[] }) {
  const total = patients.length;
  const active = countByTreatmentStatus(patients, "AKTIF");
  const waiting = countByTreatmentStatus(patients, "BEKLEMEDE");
  const completed = countByTreatmentStatus(patients, "TAMAMLANDI");

  const stats = [
    { label: "Toplam", value: total },
    { label: "Aktif", value: active },
    { label: "Bekleyen", value: waiting },
    { label: "Biten", value: completed },
  ];

  return (
    <section className="relative isolate min-h-[200px] overflow-hidden rounded-[1.75rem] sm:min-h-[220px]">
      <Image
        src={HERO}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 1440px) 100vw, 1440px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-sky-900/35" />

      <div className="relative flex h-full min-h-[200px] flex-col justify-between gap-6 p-6 sm:min-h-[220px] sm:p-8">
        <div>
          <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 ring-1 ring-white/20 backdrop-blur">
            Hasta portföyü
          </span>
          <h1 className="font-display mt-3 text-4xl tracking-tight text-white sm:text-5xl">
            Hastalarım
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Aktif ve geçmiş hastalar — tedavi akışını tek bakışta görün.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md"
            >
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
