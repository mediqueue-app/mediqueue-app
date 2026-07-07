import Link from "next/link";
import { ArrowRight, Clock, PhoneCall } from "lucide-react";
import { getInitials } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

export function PatientQueue({
  patientId,
  patientName,
  treatmentType,
  scheduledTime,
  minutesUntil,
}: {
  patientId: string;
  patientName: string;
  treatmentType: string;
  scheduledTime: string;
  minutesUntil: number;
}) {
  const initials = getInitials(patientName);
  const urgent = minutesUntil <= 20;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-sm",
        urgent
          ? "border-primary/25 bg-gradient-to-br from-primary-light/60 via-white to-white"
          : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100/80 px-5 py-3.5">
        <h2 className="text-sm font-semibold text-slate-900">Sıradaki Hasta</h2>
        {urgent && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Yakında
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-md shadow-primary/25">
              {initials}
            </div>
            {urgent && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white ring-2 ring-white">
                !
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-slate-900">{patientName}</p>
            <p className="text-sm text-slate-500">{treatmentType}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {scheduledTime}
              <span className="text-slate-300">·</span>
              <span className={cn(urgent && "font-semibold text-primary")}>
                ~{minutesUntil} dk
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            <PhoneCall className="h-4 w-4" />
            Hastayı Çağır
          </button>
          <Link
            href={`/dashboard/patients/${patientId}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Profil
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
