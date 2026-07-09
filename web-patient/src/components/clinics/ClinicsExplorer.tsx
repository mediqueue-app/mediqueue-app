"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { clinics, cities } from "@/lib/mock-data";
import { ClinicCard } from "@/components/clinics/ClinicCard";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  "Tümü",
  "Estetik & Plastik Cerrahi",
  "Saç Ekimi",
  "Göz Sağlığı & Lazer",
  "Diş Tedavisi & İmplant",
  "Dermatoloji & Cilt Bakımı",
  "Ortopedi & Fizik Tedavi",
  "Kadın Doğum",
];

export function ClinicsExplorer() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [specialty, setSpecialty] = useState("Tümü");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clinics.filter((c) => {
      const matchesCity = !city || c.city === city;
      const matchesSpecialty =
        specialty === "Tümü" || c.specialties.includes(specialty);
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q));
      return matchesCity && matchesSpecialty && matchesQuery;
    });
  }, [query, city, specialty]);

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Klinik veya tedavi ara..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 sm:w-52">
            <SlidersHorizontal className="h-5 w-5 text-slate-400" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            >
              <option value="">Tüm şehirler</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpecialty(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                specialty === s
                  ? "border-[#3a6ad6] bg-[#3a6ad6] text-white"
                  : "border-slate-200 text-slate-600 hover:border-[#3a6ad6]/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        <span className="font-semibold text-slate-900">{results.length}</span>{" "}
        klinik bulundu
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          Aramanıza uygun klinik bulunamadı. Filtreleri değiştirmeyi deneyin.
        </div>
      )}
    </div>
  );
}
