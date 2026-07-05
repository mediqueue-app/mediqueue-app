"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/mock-data";
import type { PatientLead } from "@/types";
import { cn } from "@/lib/utils";

export function QuickLeadsTable({ leads }: { leads: PatientLead[] }) {
  const [rows, setRows] = useState(leads);

  function updateStatus(id: string, status: PatientLead["status"]) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row))
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Bugün Gelen Hasta Talepleri
          </h2>
          <p className="text-xs text-slate-500">
            Gelen leadleri anında değerlendirin, kayıp yaşamadan randevuya
            dönüştürün.
          </p>
        </div>
        <Badge tone="primary">{rows.length} Talep</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3">Hasta</th>
              <th className="px-5 py-3">Ülke</th>
              <th className="px-5 py-3">Branş</th>
              <th className="px-5 py-3">Talep Tarihi</th>
              <th className="px-5 py-3">Durum</th>
              <th className="px-5 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
              >
                <td className="px-5 py-3">
                  <p className="font-medium text-slate-900">{lead.fullName}</p>
                  <p className="text-xs text-slate-400">{lead.id}</p>
                </td>
                <td className="px-5 py-3 text-slate-600">
                  <span className="mr-1.5">
                    {countryCodeToFlagEmoji(lead.countryCode)}
                  </span>
                  {lead.country}
                </td>
                <td className="px-5 py-3 text-slate-600">{lead.branch}</td>
                <td className="px-5 py-3 text-slate-600">
                  {lead.requestedDate}
                </td>
                <td className="px-5 py-3">
                  <Badge tone={leadStatusTone(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => updateStatus(lead.id, "ONAYLANDI")}
                      disabled={lead.status === "ONAYLANDI"}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
                        lead.status === "ONAYLANDI"
                          ? "cursor-not-allowed bg-emerald-50 text-emerald-300"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Onayla
                    </button>
                    <button
                      onClick={() => updateStatus(lead.id, "REDDEDİLDİ")}
                      disabled={lead.status === "REDDEDİLDİ"}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
                        lead.status === "REDDEDİLDİ"
                          ? "cursor-not-allowed bg-red-50 text-red-300"
                          : "bg-red-50 text-red-700 hover:bg-red-100"
                      )}
                    >
                      <X className="h-3.5 w-3.5" />
                      Reddet
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
