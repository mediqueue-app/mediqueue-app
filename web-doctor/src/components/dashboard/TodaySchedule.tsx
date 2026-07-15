import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react";
import type { Appointment } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDuration, getInitials, parseTimeToMinutes } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

function endTime(time: string, durationMinutes: number): string {
  const total = parseTimeToMinutes(time) + durationMinutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function getAppointmentPhase(
  apt: Appointment,
  nowMinutes: number
): "done" | "current" | "upcoming" {
  const start = parseTimeToMinutes(apt.time);
  const end = start + apt.durationMinutes;

  if (apt.status === "TAMAMLANDI" || apt.status === "IPTAL" || end <= nowMinutes) {
    return "done";
  }
  if (start <= nowMinutes && nowMinutes < end) return "current";
  return "upcoming";
}

export function TodaySchedule({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const sorted = [...appointments].sort((a, b) => a.time.localeCompare(b.time));

  const completed = sorted.filter(
    (a) => getAppointmentPhase(a, nowMinutes) === "done"
  ).length;
  const total = sorted.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="relative overflow-hidden border-b border-slate-100 px-5 py-5 lg:px-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-light/60 via-transparent to-emerald-50/40" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Günlük akış
            </p>
            <h2 className="font-display mt-1 text-2xl tracking-tight text-slate-900">
              Bugünün Programı
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {total} randevu · {completed} tamamlandı
            </p>
          </div>
          <Link
            href="/dashboard/calendar"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary/30 hover:bg-primary-light hover:text-primary"
          >
            Tam takvim
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {total > 0 && (
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>İlerleme</span>
              <span>%{pct}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
                style={{ width: `${pct}%` }}
              >
                <span className="progress-shine absolute inset-0" />
              </div>
            </div>
          </div>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <div className="animate-soft-float flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light to-white ring-1 ring-primary/15">
            <Calendar className="h-7 w-7 text-primary" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800">
            Bugün randevu yok
          </p>
          <p className="mt-1 max-w-xs text-sm text-slate-500">
            Müsaitlik ekleyerek yeni talepler için hazır olun.
          </p>
          <Link
            href="/dashboard/calendar"
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Takvime Git
          </Link>
        </div>
      ) : (
        <ul className="px-4 py-4 lg:px-5">
          {sorted.map((apt, index) => {
            const phase = getAppointmentPhase(apt, nowMinutes);
            const isLast = index === sorted.length - 1;
            const initials = getInitials(apt.patientName);

            return (
              <li key={apt.id} className="relative flex gap-4 pb-4">
                {!isLast && (
                  <span
                    className="absolute left-[21px] top-12 h-[calc(100%-16px)] w-px bg-gradient-to-b from-slate-200 to-transparent"
                    aria-hidden
                  />
                )}

                <div className="relative z-10 flex w-11 shrink-0 flex-col items-center pt-1">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-bold ring-4 ring-white",
                      phase === "current" &&
                        "bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg shadow-primary/30",
                      phase === "upcoming" && "bg-primary-light text-primary",
                      phase === "done" && "bg-slate-100 text-slate-400"
                    )}
                  >
                    {initials}
                  </span>
                </div>

                <Link
                  href={`/dashboard/patients/${apt.patientId}`}
                  className={cn(
                    "panel-lift min-w-0 flex-1 rounded-2xl border p-4",
                    phase === "current" &&
                      "border-primary/25 bg-gradient-to-br from-primary-light/80 to-white",
                    phase === "upcoming" &&
                      "border-slate-100 bg-white hover:border-primary/20",
                    phase === "done" && "border-slate-100 bg-slate-50/70 opacity-75"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-base font-semibold text-slate-900",
                          phase === "done" && "line-through decoration-slate-400"
                        )}
                      >
                        {apt.patientName}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-slate-500">
                        {apt.treatmentType}
                      </p>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 font-semibold text-slate-700">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {apt.time} – {endTime(apt.time, apt.durationMinutes)}
                    </span>
                    <span>{formatDuration(apt.durationMinutes)}</span>
                    {phase === "current" && (
                      <span className="rounded-lg bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Şimdi
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
