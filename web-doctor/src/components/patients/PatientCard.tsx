import Link from "next/link";
import type { Patient } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { countryCodeToFlagEmoji } from "@/lib/utils";

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
        {patient.avatarInitials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-slate-900">{patient.fullName}</p>
          <span className="text-base" aria-hidden>
            {countryCodeToFlagEmoji(patient.countryCode)}
          </span>
        </div>
        <p className="text-sm text-slate-500">{patient.treatmentType}</p>
        <p className="mt-1 text-xs text-slate-400">
          Son ziyaret: {patient.lastVisitDate}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <StatusBadge status={patient.treatmentStatus} variant="treatment" />
        <Link
          href={`/dashboard/patients/${patient.id}`}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Detay Gör
        </Link>
      </div>
    </div>
  );
}
