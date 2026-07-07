"use client";

import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/country";
import type { PatientLead } from "@/types";
import { cn } from "@/lib/utils";

export function LeadsTable({
  leads,
  onSelect,
  onUpdateStatus,
  selectedId,
}: {
  leads: PatientLead[];
  onSelect: (lead: PatientLead) => void;
  onUpdateStatus: (id: string, status: PatientLead["status"]) => void;
  selectedId?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="px-6 py-3">Hasta</th>
              <th className="px-6 py-3">Ülke</th>
              <th className="px-6 py-3">Branş</th>
              <th className="px-6 py-3">Talep Tarihi</th>
              <th className="px-6 py-3">Durum</th>
              <th className="px-6 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelect(lead)}
                className={`cursor-pointer border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50 ${
                  selectedId === lead.id ? "bg-primary-light/60" : ""
                }`}
              >
                <td className="px-6 py-3">
                  <p className="font-medium text-slate-900">{lead.fullName}</p>
                  <p className="text-xs text-slate-400">{lead.id}</p>
                </td>
                <td className="px-6 py-3 text-slate-600">
                  <span className="mr-1.5">
                    {countryCodeToFlagEmoji(lead.countryCode)}
                  </span>
                  {lead.country}
                </td>
                <td className="px-6 py-3 text-slate-600">{lead.branch}</td>
                <td className="px-6 py-3 text-slate-600">
                  {lead.requestedDate}
                </td>
                <td className="px-6 py-3">
                  <Badge tone={leadStatusTone(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(lead.id, "ONAYLANDI");
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(lead.id, "REDDEDİLDİ");
                      }}
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
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-sm text-slate-400"
                >
                  Seçilen filtrelere uygun hasta talebi bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
