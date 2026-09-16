import Link from "next/link";
import {
  Stethoscope,
  BriefcaseBusiness,
  MapPin,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import type { Doctor } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <Avatar
          src={doctor.photo}
          name={doctor.name}
          className="h-full w-full text-4xl transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm ring-1 ring-black/5 backdrop-blur">
          <BadgeCheck className="h-3.5 w-3.5" />
          Doğrulanmış Uzman
        </span>

        <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 shadow-sm ring-1 ring-black/5 backdrop-blur">
          <StarRating rating={doctor.rating} reviewCount={doctor.reviewCount} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-primary">
          {doctor.name}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{doctor.specialty}</span>
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 shrink-0 text-slate-400" />
            <span>{doctor.experienceYears} yıl deneyim</span>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {doctor.city}
          </span>
          <span>
            <span className="font-semibold text-slate-600">
              {formatPrice(doctor.priceFrom)}
            </span>{" "}
            &apos;den itibaren
          </span>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition-colors group-hover:text-primary">
            Profili Görüntüle
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
