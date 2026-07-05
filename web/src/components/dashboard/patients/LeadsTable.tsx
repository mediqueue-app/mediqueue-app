"use client";

import { Plane, BedDouble, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/mock-data";
import type { PatientLead } from "@/types";

export function LeadsTable({
  leads,
  onSelect,
  selectedId,
}: {
  leads: PatientLead[];
  onSelect: (lead: PatientLead) => void;
  selectedId?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3">Hasta</th>
              <th className="px-5 py-3">Ülke</th>
              <th className="px-5 py-3">Branş</th>
              <th className="px-5 py-3">Talep Tarihi</th>
              <th className="px-5 py-3">Lojistik</th>
              <th className="px-5 py-3">Durum</th>
              <th className="px-5 py-3" />
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
                  <div className="flex items-center gap-1.5">
                    {lead.hasVipTransfer && (
                      <span
                        title="VIP Transfer"
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600"
                      >
                        <Plane className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {lead.needsHotel && (
                      <span
                        title="Otel Talebi"
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-500"
                      >
                        <BedDouble className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {!lead.hasVipTransfer && !lead.needsHotel && (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <Badge tone={leadStatusTone(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-300" />
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-slate-400"
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
