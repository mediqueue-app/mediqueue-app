"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { doctors, cities } from "@/lib/mock-data";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  "Tümü",
  "Estetik & Plastik Cerrahi",
  "Saç Ekimi",
  "Göz Sağlığı & Lazer",
  "Diş Tedavisi & İmplant",
  "Dermatoloji & Cilt Bakımı",
  "Ortopedi & Fizik Tedavi",
  "Check-up & Dahiliye",
  "Kadın Doğum",
];

export function DoctorsExplorer() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [specialty, setSpecialty] = useState("Tümü");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesCity = !city || d.city === city;
      const matchesSpecialty = specialty === "Tümü" || d.specialty === specialty;
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.focusAreas.some((f) => f.toLowerCase().includes(q));
      return matchesCity && matchesSpecialty && matchesQuery;
    });
  }, [query, city, specialty]);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
            alt="Hastane ve uzman hekim ortamı"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80" />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            Doğrulanmış uzman hekimler
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Dünya standartlarında doktorlar,
            <br className="hidden sm:block" /> sizin için eşleştirildi.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            Uzmanlık, deneyim ve hasta puanlarına göre size en uygun hekimi
            saniyeler içinde bulun.
          </p>

          <div className="mx-auto mt-9 max-w-3xl">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 md:flex-row md:items-center md:gap-0 md:rounded-full">
              <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-[#3a6ad6]/25 md:rounded-full">
                <Search className="h-5 w-5 shrink-0 text-[#3a6ad6]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Doktor, uzmanlık veya tedavi ara..."
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </label>

              <span className="mx-1 hidden w-px self-center bg-slate-200 md:block md:h-8" />

              <label className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-[#3a6ad6]/25 md:w-56 md:rounded-full">
                <MapPin className="h-5 w-5 shrink-0 text-[#3a6ad6]" />
                <input
                  list="doctor-city-options"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Tüm şehirler"
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
                <datalist id="doctor-city-options">
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full bg-[#3a6ad6] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2f57b3] md:my-0.5 md:mr-0.5"
              >
                <Search className="h-5 w-5" />
                <span>Ara</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpecialty(s)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                specialty === s
                  ? "border-[#3a6ad6] bg-[#3a6ad6] text-white"
                  : "border-slate-200 text-slate-600 hover:border-[#3a6ad6]/40 hover:text-[#3a6ad6]"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{results.length}</span>{" "}
          doktor bulundu
        </p>

        {results.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            Aramanıza uygun doktor bulunamadı. Filtreleri değiştirmeyi deneyin.
          </div>
        )}
      </div>
    </div>
  );
}
