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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 lg:px-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Bugünün Programı</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            {total} randevu · {completed} tamamlandı
          </p>
        </div>
        <Link
          href="/dashboard/calendar"
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-light"
        >
          Takvim
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {total > 0 && (
        <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-2 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              %{total ? Math.round((completed / total) * 100) : 0}
            </span>
          </div>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-600">Bugün randevu yok</p>
          <p className="mt-1 text-xs text-slate-400">
            Takvimden müsaitlik ekleyebilirsiniz.
          </p>
          <Link
            href="/dashboard/calendar"
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover"
          >
            Takvime Git
          </Link>
        </div>
      ) : (
        <ul className="px-4 py-3 lg:px-5">
          {sorted.map((apt, index) => {
            const phase = getAppointmentPhase(apt, nowMinutes);
            const isLast = index === sorted.length - 1;
            const initials = getInitials(apt.patientName);

            return (
              <li key={apt.id} className="relative flex gap-4 pb-4">
                {!isLast && (
                  <span
                    className="absolute left-[19px] top-10 h-[calc(100%-12px)] w-px bg-slate-200"
                    aria-hidden
                  />
                )}

                <div className="relative z-10 flex w-10 shrink-0 flex-col items-center pt-1">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ring-2 ring-white",
                      phase === "current" &&
                        "bg-primary text-white shadow-md shadow-primary/30 ring-primary/20",
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
                    "min-w-0 flex-1 rounded-xl border p-3.5 transition-all hover:shadow-md",
                    phase === "current" &&
                      "border-primary/30 bg-primary-light/30 shadow-sm",
                    phase === "upcoming" && "border-slate-200 bg-white hover:border-primary/20",
                    phase === "done" && "border-slate-100 bg-slate-50/50 opacity-80"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "font-semibold text-slate-900",
                          phase === "done" && "line-through decoration-slate-400"
                        )}
                      >
                        {apt.patientName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {apt.treatmentType}
                      </p>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="h-3 w-3" />
                      {apt.time} – {endTime(apt.time, apt.durationMinutes)}
                    </span>
                    <span>{formatDuration(apt.durationMinutes)}</span>
                    {phase === "current" && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
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
