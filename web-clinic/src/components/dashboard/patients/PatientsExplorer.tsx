"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { LeadsTable } from "@/components/dashboard/patients/LeadsTable";
import { PatientDrawer } from "@/components/dashboard/patients/PatientDrawer";
import { StatusTabs } from "@/components/ui/StatusTabs";
import { updateLeadStatus } from "@/lib/services/leads";
import type { LeadStatus, PatientLead } from "@/types";

export function PatientsExplorer({ leads }: { leads: PatientLead[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [status, setStatus] = useState<LeadStatus | "TÜMÜ">("TÜMÜ");
  const [query, setQuery] = useState(initialQuery);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rows, setRows] = useState(leads);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRows(leads);
  }, [leads]);

  const counts = useMemo(() => {
    const base: Record<LeadStatus | "TÜMÜ", number> = {
      TÜMÜ: rows.length,
      BEKLEMEDE: 0,
      ONAYLANDI: 0,
      ALTERNATIF_TARIH: 0,
      IPTAL_EDILDI: 0,
      TAMAMLANDI: 0,
    };
    for (const lead of rows) {
      base[lead.status] += 1;
    }
    return base;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((lead) => {
      if (status !== "TÜMÜ" && lead.status !== status) return false;
      if (!q) return true;
      return (
        lead.fullName.toLowerCase().includes(q) ||
        lead.id.toLowerCase().includes(q) ||
        lead.branch.toLowerCase().includes(q) ||
        lead.country.toLowerCase().includes(q)
      );
    });
  }, [rows, status, query]);

  const selected = useMemo(
    () => rows.find((lead) => lead.id === selectedId) ?? null,
    [rows, selectedId]
  );

  async function updateStatus(id: string, nextStatus: PatientLead["status"]) {
    setError(null);
    const previous = rows;
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
    );
    try {
      const updated = await updateLeadStatus(id, nextStatus);
      setRows((prev) =>
        prev.map((row) => (row.id === id ? updated : row))
      );
    } catch (err) {
      setRows(previous);
      setError(err instanceof Error ? err.message : "Durum güncellenemedi");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {error ? (
        <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="relative mb-4 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hasta adı, ID veya branş ara..."
            aria-label="Hasta ara"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <StatusTabs value={status} onChange={setStatus} counts={counts} />
      </div>

      <LeadsTable
        leads={filtered}
        onSelect={(lead) => setSelectedId(lead.id)}
        onUpdateStatus={updateStatus}
        selectedId={selectedId ?? undefined}
      />

      <PatientDrawer
        lead={selected}
        onClose={() => setSelectedId(null)}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}
