"use client";

import { useMemo, useState } from "react";
import {
  FilterBar,
  DEFAULT_FILTERS,
  type PatientFilters,
} from "@/components/dashboard/patients/FilterBar";
import { LeadsTable } from "@/components/dashboard/patients/LeadsTable";
import { PatientDrawer } from "@/components/dashboard/patients/PatientDrawer";
import type { PatientLead } from "@/types";

export function PatientsExplorer({ leads }: { leads: PatientLead[] }) {
  const [filters, setFilters] = useState<PatientFilters>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<PatientLead | null>(null);

  const countries = useMemo(
    () => Array.from(new Set(leads.map((l) => l.country))).sort(),
    [leads]
  );

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (filters.country !== "TÜMÜ" && lead.country !== filters.country)
        return false;
      if (filters.branch !== "TÜMÜ" && lead.branch !== filters.branch)
        return false;
      if (filters.logistics === "VIP_TRANSFER" && !lead.hasVipTransfer)
        return false;
      if (filters.logistics === "OTEL" && !lead.needsHotel) return false;
      return true;
    });
  }, [leads, filters]);

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        countries={countries}
        filters={filters}
        onChange={setFilters}
      />
      <LeadsTable
        leads={filtered}
        onSelect={setSelected}
        selectedId={selected?.id}
      />
      <PatientDrawer lead={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
