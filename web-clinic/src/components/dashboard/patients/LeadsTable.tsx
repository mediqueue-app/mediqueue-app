"use client";

import { CalendarClock, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { leadStatusLabel, leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/country";
import { mockDateKey } from "@/lib/mock-date";
import { formatRelativeDay } from "@/lib/utils";
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
  const todayKey = mockDateKey(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="px-6 py-4">Hasta</th>
              <th className="px-6 py-4">Ülke</th>
              <th className="px-6 py-4">Tedavi</th>
              <th className="px-6 py-4">Tarih</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelect(lead)}
                className={cn(
                  "cursor-pointer border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/80",
                  selectedId === lead.id && "bg-primary-light/40"
                )}
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{lead.fullName}</p>
                  <p className="text-xs text-slate-400">{lead.id}</p>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="mr-1.5">
                    {countryCodeToFlagEmoji(lead.countryCode)}
                  </span>
                  {lead.country}
                </td>
                <td className="px-6 py-4 text-slate-600">{lead.branch}</td>
                <td className="px-6 py-4 text-slate-600">
                  {formatRelativeDay(lead.requestedDate, todayKey)}
                </td>
                <td className="px-6 py-4">
                  <Badge tone={leadStatusTone(lead.status)}>
                    {leadStatusLabel(lead.status)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(lead.id, "ONAYLANDI");
                      }}
                      disabled={lead.status === "ONAYLANDI" || lead.status === "TAMAMLANDI"}
                      className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Check className="mr-1 inline h-3.5 w-3.5" />
                      Onayla
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(lead.id, "ALTERNATIF_TARIH");
                      }}
                      disabled={lead.status === "ALTERNATIF_TARIH"}
                      className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <CalendarClock className="mr-1 inline h-3.5 w-3.5" />
                      Alternatif
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(lead.id, "IPTAL_EDILDI");
                      }}
                      disabled={lead.status === "IPTAL_EDILDI"}
                      className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <X className="mr-1 inline h-3.5 w-3.5" />
                      İptal
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    Eşleşen talep bulunamadı
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Filtreleri değiştirerek tekrar deneyin.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
