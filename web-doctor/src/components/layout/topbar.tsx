"use client";

import { usePathname } from "next/navigation";
import { CheckCircle2, MessageCircle, PlaneTakeoff, Scissors } from "lucide-react";
import type { DoctorProfile, DoctorStatus } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { doctorStatusStyles, formatDateLong } from "@/lib/ui";
import { useDoctorStatus } from "@/context/doctor-status-context";
import { TODAY_ISO } from "@/lib/mock-doctor";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Operasyon Üssü",
    subtitle: "Bugünkü programınıza ve öncelikli hastalarınıza genel bakış",
  },
  "/dashboard/schedule": {
    title: "Randevu ve Slot Takvimi",
    subtitle: "Müsaitlik durumunuzu yönetin, ameliyat bloklarınızı planlayın",
  },
  "/dashboard/patients": {
    title: "Uluslararası Hasta Tıbbi Dosyaları",
    subtitle: "Gelen hastalarınızın ön değerlendirme dosyalarını inceleyin",
  },
  "/dashboard/profile": {
    title: "Hekim Vitrin Profilim",
    subtitle: "Küresel hasta adaylarının gördüğü profili düzenleyin",
  },
};

const switchableStatuses: DoctorStatus[] = [
  "MÜSAİT",
  "KONSÜLTASYONDA",
  "AMELİYATTA",
  "İZİNLİ",
];

const statusIcons: Record<DoctorStatus, typeof CheckCircle2> = {
  "MÜSAİT": CheckCircle2,
  "KONSÜLTASYONDA": MessageCircle,
  "AMELİYATTA": Scissors,
  "İZİNLİ": PlaneTakeoff,
};

export function Topbar({ doctor }: { doctor: DoctorProfile }) {
  const pathname = usePathname();
  const { status, setStatus } = useDoctorStatus();
  const page = pageTitles[pathname] ?? pageTitles["/dashboard"];

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200/80 bg-white/80 px-6 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          {page.title}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">{page.subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-xs font-medium text-slate-400">{formatDateLong(TODAY_ISO)}</p>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-slate-300 bg-slate-50/60 p-1">
          {switchableStatuses.map((s) => {
            const isActive = s === status;
            const styles = doctorStatusStyles[s];
            const Icon = statusIcons[s];
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                aria-pressed={isActive}
                title={`Durumu "${s}" olarak ayarla`}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? `${styles.bg} ${styles.text} ${styles.border} shadow-sm`
                    : "border-transparent text-slate-400 hover:bg-white hover:text-slate-600"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden md:inline">{s}</span>
              </button>
            );
          })}
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <Avatar name={doctor.fullName} size="sm" />
      </div>
    </header>
  );
}
