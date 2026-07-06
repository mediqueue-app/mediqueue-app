"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Patient, PatientFilterTab } from "@/types";
import { PatientCard } from "@/components/patients/PatientCard";
import { cn } from "@/lib/utils";

const TABS: { value: PatientFilterTab; label: string }[] = [
  { value: "AKTIF", label: "Aktif Hastalar" },
  { value: "GECMIS", label: "Geçmiş Hastalar" },
  { value: "TUMU", label: "Tümü" },
];

const PAGE_SIZE = 8;

export function PatientList({ initialPatients }: { initialPatients: Patient[] }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<PatientFilterTab>("TUMU");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = [...initialPatients];
    if (tab === "AKTIF") {
      list = list.filter((p) => p.treatmentStatus === "AKTIF");
    } else if (tab === "GECMIS") {
      list = list.filter((p) => p.treatmentStatus === "TAMAMLANDI");
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.fullName.toLowerCase().includes(q));
    }
    return list;
  }, [initialPatients, tab, search]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="İsim ile ara..."
          aria-label="Hasta ara"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => {
              setTab(t.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              tab === t.value
                ? "bg-primary text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {visible.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
        {visible.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-400">
            Eşleşen hasta bulunamadı.
          </p>
        )}
      </div>

      {visibleCount < filtered.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="mx-auto rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Daha Fazla Yükle ({filtered.length - visibleCount} kaldı)
        </button>
      )}
    </div>
  );
}
