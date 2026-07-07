import { Star, UserCircle } from "lucide-react";
import type { DoctorProfile } from "@/types";

export function ProfileHero({ doctor }: { doctor: DoctorProfile }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-primary-light/30 p-5 shadow-sm lg:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg shadow-primary/25">
            {doctor.avatarInitials}
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">
              Profil Ayarları
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Platformda görünen doktor profilinizi düzenleyin.
            </p>
            <p className="mt-2 text-xs text-slate-400">{doctor.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <div>
              <p className="text-lg font-bold text-slate-900">{doctor.rating.toFixed(1)}</p>
              <p className="text-[10px] font-medium text-amber-700">
                {doctor.reviewCount} değerlendirme
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
            <UserCircle className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Doğrulanmış</p>
              <p className="text-[10px] text-slate-400">Klinik onaylı profil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
