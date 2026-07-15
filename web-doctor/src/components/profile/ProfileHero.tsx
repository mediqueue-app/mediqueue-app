import Image from "next/image";
import { BadgeCheck, Languages, Star } from "lucide-react";
import type { DoctorProfile } from "@/types";
import { HybridSourceBadge } from "@/components/shared/HybridSourceBadge";

const HERO =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1800&q=80";

export function ProfileHero({ doctor }: { doctor: DoctorProfile }) {
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
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-primary/40" />

      <div className="relative flex h-full min-h-[200px] flex-col justify-between gap-6 p-6 sm:min-h-[220px] sm:p-8 lg:flex-row lg:items-end">
        <div className="flex items-end gap-4 sm:gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-2xl font-bold text-white shadow-xl shadow-primary/40 ring-4 ring-white/20 sm:h-24 sm:w-24 sm:text-3xl">
            {doctor.avatarInitials}
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 ring-1 ring-white/20 backdrop-blur">
                Hesap ayarları
              </span>
              <HybridSourceBadge source="api" />
            </div>
            <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Profil Ayarları
            </h1>
            <p className="mt-1.5 text-sm text-white/70">
              {doctor.title} {doctor.fullName} · {doctor.specialty}
            </p>
            <p className="mt-1 text-xs text-white/50">{doctor.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <p className="text-2xl font-bold tracking-tight">
                {doctor.rating.toFixed(1)}
              </p>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
              {doctor.reviewCount} değerlendirme
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              <p className="text-sm font-bold">Doğrulanmış</p>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
              Klinik onaylı
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-sky-300" />
              <p className="text-sm font-bold">{doctor.languages.length} dil</p>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
              Eşleştirme
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
