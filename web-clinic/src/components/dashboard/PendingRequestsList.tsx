"use client";

import Link from "next/link";
import { ArrowRight, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { leadStatusLabel, leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/country";
import { mockDateKey } from "@/lib/mock-date";
import { formatRelativeDay } from "@/lib/utils";
import type { PatientLead } from "@/types";

export function PendingRequestsList({
  leads,
}: {
  leads: PatientLead[];
}) {
  const todayKey = mockDateKey(0);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Bekleyen Talepler
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Değerlendirme bekleyen son talepler
          </p>
        </div>
        <Link
          href="/dashboard/patients"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Tümünü Gör
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-200 px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
            <Inbox className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-slate-700">
            Bekleyen talep yok
          </p>
          <p className="text-xs text-slate-500">
            Yeni talepler geldiğinde burada görünecek.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="flex items-center gap-4 rounded-xl border border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50/80"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-lg">
                {countryCodeToFlagEmoji(lead.countryCode)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900">
                  {lead.fullName}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {lead.branch} · {formatRelativeDay(lead.requestedDate, todayKey)}
                </p>
              </div>
              <Badge tone={leadStatusTone(lead.status)}>
                {leadStatusLabel(lead.status)}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
