"use client";

import Link from "next/link";
import { ArrowRight, Clock, PhoneCall } from "lucide-react";
import { useDemoToast } from "@/components/ui/DemoToast";
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
  const { show, Toast } = useDemoToast();

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">Hasta Kuyruğu</h2>
          <p className="mt-0.5 text-xs text-slate-500">Sıradaki hasta ve bekleme süresi</p>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-slate-900">{patientName}</p>
              <p className="text-sm text-slate-500">{treatmentType}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {scheduledTime}
                <span className="text-slate-300">·</span>
                <span className={cn(urgent && "font-semibold text-primary")}>
                  ~{minutesUntil} dk bekleme
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                show(
                  `${patientName} çağrıldı — bekleme alanı bildirimi demo modunda simüle edildi.`
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <PhoneCall className="h-4 w-4" />
              Hastayı Çağır
            </button>
            <Link
              href={`/dashboard/patients/${patientId}`}
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Profil
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
      {Toast}
    </>
  );
}
