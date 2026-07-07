import Link from "next/link";
import type { Appointment, AppointmentStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  AppointmentStatus,
  { card: string; accent: string }
> = {
  ONAYLANDI: {
    card: "bg-emerald-50 hover:bg-emerald-100/80",
    accent: "border-l-emerald-500",
  },
  BEKLIYOR: {
    card: "bg-amber-50 hover:bg-amber-100/80",
    accent: "border-l-amber-500",
  },
  TAMAMLANDI: {
    card: "bg-blue-50 hover:bg-blue-100/80",
    accent: "border-l-blue-500",
  },
  IPTAL: {
    card: "bg-red-50/80 opacity-80 hover:opacity-100",
    accent: "border-l-red-400",
  },
};

/** Haftalık ızgarada kullanılan, yüksekliğe göre içerik kısan blok. */
export function GridAppointmentBlock({
  appointment,
  heightPx,
}: {
  appointment: Appointment;
  heightPx: number;
}) {
  const s = statusStyles[appointment.status];
  const tiny = heightPx < 28;
  const short = heightPx < 44;
  const tall = heightPx >= 72;

  return (
    <Link
      href={`/dashboard/patients/${appointment.patientId}`}
      title={`${appointment.patientName} · ${appointment.time} · ${appointment.treatmentType}`}
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-[4px] border-l-[3px] shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md",
        s.card,
        s.accent,
        tiny ? "px-1 py-0" : "px-1.5 py-0.5"
      )}
    >
      <p
        className={cn(
          "truncate font-semibold leading-tight text-slate-900",
          tiny ? "text-[9px]" : short ? "text-[10px]" : "text-[11px]",
          appointment.status === "IPTAL" && "line-through"
        )}
      >
        {appointment.patientName}
      </p>
      {!tiny && (
        <p className={cn("truncate text-slate-600", short ? "text-[9px]" : "text-[10px]")}>
          {appointment.time}
        </p>
      )}
      {tall && (
        <p className="mt-auto truncate text-[9px] leading-tight text-slate-500">
          {appointment.treatmentType}
        </p>
      )}
    </Link>
  );
}
