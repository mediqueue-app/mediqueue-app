import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import type { Doctor } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#3a6ad6]/30 hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        <Avatar
          src={doctor.photo}
          name={doctor.name}
          className="h-16 w-16 shrink-0 rounded-full ring-2 ring-[#eaf0fc]"
        />
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900 group-hover:text-[#3a6ad6]">
            {doctor.name}
          </h3>
          <p className="truncate text-sm text-slate-500">{doctor.title}</p>
          <div className="mt-1">
            <StarRating rating={doctor.rating} reviewCount={doctor.reviewCount} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#eaf0fc] px-2.5 py-1 text-xs font-medium text-[#3a6ad6]">
          {doctor.specialty}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {doctor.experienceYears} yıl deneyim
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {doctor.city}
        </span>
        <span className="flex items-center gap-1 font-medium text-emerald-600">
          <Clock className="h-4 w-4" />
          {doctor.nextAvailable}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
        <div>
          <p className="text-xs text-slate-400">Muayene ücreti</p>
          <p className="text-lg font-bold text-slate-900">
            {formatPrice(doctor.priceFrom)}
          </p>
        </div>
        <span className="rounded-full bg-[#3a6ad6] px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-[#2f57b3]">
          Randevu Al
        </span>
      </div>
    </Link>
  );
}
