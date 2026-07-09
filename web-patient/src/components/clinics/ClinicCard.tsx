import Link from "next/link";
import { MapPin, BadgeCheck } from "lucide-react";
import type { Clinic } from "@/lib/mock-data";
import { SmartImage } from "@/components/ui/SmartImage";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";

export function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Link
      href={`/clinics/${clinic.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-[#3a6ad6]/30 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={clinic.coverImage}
          alt={clinic.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          <BadgeCheck className="h-3.5 w-3.5 text-[#3a6ad6]" />
          Akredite Klinik
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 group-hover:text-[#3a6ad6]">
            {clinic.name}
          </h3>
          <StarRating rating={clinic.rating} showCount={false} />
        </div>

        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          {clinic.district}, {clinic.city}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {clinic.specialties.map((s) => (
            <span
              key={s}
              className="rounded-full bg-[#eaf0fc] px-2.5 py-1 text-xs font-medium text-[#3a6ad6]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-slate-400">Başlangıç fiyatı</p>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(clinic.priceFrom)}
            </p>
          </div>
          <span className="text-sm font-semibold text-[#3a6ad6] group-hover:underline">
            İncele →
          </span>
        </div>
      </div>
    </Link>
  );
}
