import Link from "next/link";
import { Clock, Stethoscope } from "lucide-react";
import type { Appointment, AppointmentStatus } from "@/types";
import { formatDuration, getInitials, parseTimeToMinutes } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  AppointmentStatus,
  { card: string; dot: string; label: string }
> = {
  ONAYLANDI: {
    card: "border-emerald-200 bg-emerald-50/90 hover:bg-emerald-50",
    dot: "bg-emerald-500",
    label: "Onaylandı",
  },
  BEKLIYOR: {
    card: "border-amber-200 bg-amber-50/90 hover:bg-amber-50",
    dot: "bg-amber-500",
    label: "Bekliyor",
  },
  TAMAMLANDI: {
    card: "border-blue-200 bg-blue-50/90 hover:bg-blue-50",
    dot: "bg-blue-500",
    label: "Tamamlandı",
  },
  IPTAL: {
    card: "border-red-200 bg-red-50/80 opacity-75 hover:opacity-90",
    dot: "bg-red-400",
    label: "İptal",
  },
};

function endTime(time: string, durationMinutes: number): string {
  const total = parseTimeToMinutes(time) + durationMinutes;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function AppointmentSlot({
  appointment,
  variant = "card",
  showLink = true,
}: {
  appointment: Appointment;
  variant?: "compact" | "card" | "timeline";
  showLink?: boolean;
}) {
  const s = statusStyles[appointment.status];
  const initials = getInitials(appointment.patientName);
  const timeRange = `${appointment.time} – ${endTime(appointment.time, appointment.durationMinutes)}`;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-md border px-2 py-1 text-left shadow-sm",
          s.card
        )}
      >
        <p className="truncate text-[11px] font-semibold text-slate-900">
          {appointment.patientName}
        </p>
        <p className="truncate text-[10px] text-slate-600">{appointment.time}</p>
      </div>
    );
  }

  const content = (
    <div
      className={cn(
        "group rounded-xl border p-3 transition-shadow hover:shadow-md",
        s.card,
        variant === "timeline" && "flex gap-3"
      )}
    >
      {variant === "timeline" && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-primary shadow-sm">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "font-semibold text-slate-900",
              variant === "timeline" ? "text-sm" : "text-xs",
              appointment.status === "IPTAL" && "line-through"
            )}
          >
            {appointment.patientName}
          </p>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-slate-600"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
            {s.label}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
          <Stethoscope className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">{appointment.treatmentType}</span>
        </p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="h-3 w-3 shrink-0" />
          {timeRange}
          <span className="text-slate-300">·</span>
          {formatDuration(appointment.durationMinutes)}
        </p>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href={`/dashboard/patients/${appointment.patientId}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
