"use client";

import { BadgeCheck, Building2 } from "lucide-react";
import { StarRating } from "@/components/patients/journey/StarRating";
import { useLocale } from "@/lib/locale";

const CLINICS = [
  { code: "Klinik #A1B2", specialty: "Saç Ekimi (DHI)", rating: 4.8, reviews: 128 },
  { code: "Klinik #C3D4", specialty: "Saç Ekimi (FUE)", rating: 4.6, reviews: 94 },
  { code: "Klinik #E5F6", specialty: "Saç Ekimi (Sapphire)", rating: 4.9, reviews: 211 },
] as const;

export function ComparePreview() {
  const { t, locale } = useLocale();

  return (
    <div>
      <div className="space-y-3">
        {CLINICS.map((c) => (
          <article
            key={c.code}
            className="flex gap-3 rounded-xl border border-border bg-white p-3"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-band text-slate-400">
              <Building2 className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-slate-500">{c.code}</p>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-light px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  <BadgeCheck className="h-2.5 w-2.5" />
                  JCI
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {c.specialty}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <StarRating value={c.rating} />
                <span className="text-sm font-semibold text-slate-900">
                  {c.rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-500">
                  ({c.reviews}{" "}
                  {locale === "tr" ? "değerlendirme" : "reviews"})
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        {t.patients.discoverPrivacyNote}
      </p>
    </div>
  );
}
