"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Stethoscope, MapPin, CalendarDays } from "lucide-react";
import { cities, treatments } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";

export function SearchBar() {
  const t = useT();
  const router = useRouter();
  const [symptom, setSymptom] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (symptom) params.set("q", symptom);
    if (city) params.set("city", city);
    if (date) params.set("date", date);
    router.push(`/clinics?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-1.5 rounded-2xl bg-white p-2 shadow-md ring-1 ring-slate-200/70 md:flex-row md:items-stretch md:gap-0 md:rounded-full"
    >
      <label className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-slate-50 focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-primary/25 md:rounded-full">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <Stethoscope className="h-5 w-5" />
        </span>
        <span className="flex flex-1 flex-col text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {t("search.symptom")}
          </span>
          <input
            list="treatment-options"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder={t("search.symptomPh")}
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
          />
          <datalist id="treatment-options">
            {treatments.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
        </span>
      </label>

      <span className="mx-1 hidden w-px self-center bg-slate-200 md:block md:h-8" />

      <label className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-slate-50 focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-primary/25 md:rounded-full">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="flex flex-1 flex-col text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {t("search.city")}
          </span>
          <input
            list="city-options"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t("search.cityPh")}
            className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
          />
          <datalist id="city-options">
            {cities.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </span>
      </label>

      <span className="mx-1 hidden w-px self-center bg-slate-200 md:block md:h-8" />

      <label className="group flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-slate-50 focus-within:bg-slate-50 focus-within:ring-2 focus-within:ring-primary/25 md:rounded-full">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <CalendarDays className="h-5 w-5" />
        </span>
        <span className="flex flex-1 flex-col text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {t("search.date")}
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none scheme-light dark:scheme-dark"
          />
        </span>
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover md:my-1 md:mr-1"
      >
        <Search className="h-5 w-5" />
        <span className="md:hidden">{t("search.submit")}</span>
      </button>
    </form>
  );
}
