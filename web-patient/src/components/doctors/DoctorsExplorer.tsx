"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SearchX, MapPin } from "lucide-react";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { doctors, cities } from "@/lib/mock-data";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

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
  const t = useT();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [specialty, setSpecialty] = useState(searchParams.get("spec") ?? "Tümü");

  useEffect(() => {
    const params = new URLSearchParams();
    const q = query.trim();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    if (specialty && specialty !== "Tümü") params.set("spec", specialty);
    const qs = params.toString();
    const href = qs ? `${pathname}?${qs}` : pathname;
    const current = `${pathname}${searchKey ? `?${searchKey}` : ""}`;
    if (href !== current) {
      router.replace(href, { scroll: false });
    }
  }, [query, city, specialty, pathname, router, searchKey]);

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
            alt={t("doctorsPage.heroAlt")}
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
              <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-primary/25 md:rounded-full">
                <Search className="h-5 w-5 shrink-0 text-primary" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("doctorsPage.searchPh")}
                  className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </label>

              <span className="mx-1 hidden w-px self-center bg-slate-200 md:block md:h-8" />

              <label className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-primary/25 md:w-56 md:rounded-full">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
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
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover md:my-0.5 md:mr-0.5"
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
                  ? "border-primary bg-primary text-white"
                  : "border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
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
          <LocalizedEmpty
            className="mt-5"
            copyKey="doctorSearch"
            icon={SearchX}
            onAction={() => {
              setQuery("");
              setCity("");
              setSpecialty("Tümü");
            }}
          />
        )}
      </div>
    </div>
  );
}
