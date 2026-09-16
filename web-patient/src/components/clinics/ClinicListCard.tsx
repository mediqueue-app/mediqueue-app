"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, BadgeCheck, Navigation, Plane, ArrowRight } from "lucide-react";
import type { Clinic } from "@/lib/mock-data";
import { SmartImage } from "@/components/ui/SmartImage";
import { StarRating } from "@/components/ui/StarRating";
import { amenityIcon } from "@/components/clinics/amenity-icons";
import { clinicHref, cn, formatPrice } from "@/lib/utils";

function stableInt(seed: string, min: number, max: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return min + (h % (max - min + 1));
}

export function ClinicListCard({
  clinic,
  active,
  onHover,
}: {
  clinic: Clinic;
  active?: boolean;
  onHover?: (id: string | null) => void;
}) {
  const [fav, setFav] = useState(false);
  const centerKm = stableInt(clinic.id + "c", 2, 9);
  const airportKm = stableInt(clinic.id + "a", 8, 34);
  const highlights = clinic.amenities.slice(0, 3);

  return (
    <article
      onMouseEnter={() => onHover?.(clinic.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all sm:flex-row",
        active
          ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
          : "border-slate-200 hover:border-primary/40 hover:shadow-lg"
      )}
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
        <SmartImage
          src={clinic.coverImage}
          alt={clinic.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => setFav((v) => !v)}
          aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
          className="absolute right-1 top-1 flex h-12 w-12 items-center justify-center"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur">
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                fav ? "fill-primary text-primary" : "text-slate-500"
              )}
            />
          </span>
        </button>
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
          <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          Akredite
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={clinicHref(clinic)}
              className="truncate font-semibold text-slate-900 hover:text-primary"
            >
              {clinic.name}
            </Link>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={clinic.rating} reviewCount={clinic.reviewCount} />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5 text-primary" />
              Merkeze {centerKm} km
            </span>
            <span className="flex items-center gap-1">
              <Plane className="h-3.5 w-3.5 text-primary" />
              Havaalanına {airportKm} km
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {highlights.map((a) => {
              const Icon = amenityIcon(a);
              return (
                <span
                  key={a}
                  className="flex items-center gap-1.5 text-xs text-slate-600"
                >
                  <Icon className="h-3.5 w-3.5 text-slate-400" />
                  {a}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-end justify-between border-t border-slate-100 pt-3 sm:w-40 sm:flex-col sm:items-end sm:justify-between sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0 sm:text-right">
          <div>
            <p className="text-[11px] text-slate-400">Başlangıç</p>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(clinic.priceFrom)}
            </p>
            <p className="text-[11px] text-slate-400">&apos;den başlayan</p>
          </div>
          <Link
            href={clinicHref(clinic)}
            className="mt-0 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:mt-3"
          >
            Profili İncele
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
