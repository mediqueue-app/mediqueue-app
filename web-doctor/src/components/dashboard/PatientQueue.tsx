"use client";

import Link from "next/link";
import { ArrowRight, Clock, PhoneCall, Sparkles } from "lucide-react";
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
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-primary via-primary-hover to-slate-900" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative border-b border-white/10 px-5 pb-10 pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Sıradaki
              </p>
              <h2 className="font-display mt-1 text-xl text-white">Hasta Kuyruğu</h2>
            </div>
            <Sparkles className="h-5 w-5 text-white/70" />
          </div>
        </div>

        <div className="relative -mt-8 px-5 pb-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-lg font-bold text-white shadow-lg shadow-primary/25">
                  {initials}
                </div>
                {urgent && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                    <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-500 ring-2 ring-white" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold tracking-tight text-slate-900">
                  {patientName}
                </p>
                <p className="text-sm text-slate-500">{treatmentType}</p>
                <div
                  className={cn(
                    "mt-3 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold",
                    urgent
                      ? "bg-amber-50 text-amber-800"
                      : "bg-slate-50 text-slate-700"
                  )}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {scheduledTime}
                  <span className="text-slate-300">·</span>~{minutesUntil} dk
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                <PhoneCall className="h-4 w-4" />
                Hastayı Çağır
              </button>
              <Link
                href={`/dashboard/patients/${patientId}`}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:bg-primary-light"
              >
                Profil
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {Toast}
    </>
  );
}
