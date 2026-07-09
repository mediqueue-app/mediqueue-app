"use client";

import { useRouter } from "next/navigation";
import { Clock, Scissors } from "lucide-react";
import type { ScheduleSlot } from "@/types";
import { getAppointmentById } from "@/lib/mock-doctor";
import { countryCodeToFlagEmoji, slotTypeStyles, timeToMinutes } from "@/lib/ui";
import { DAY_END_MIN, DAY_START_MIN } from "@/lib/schedule-grid";

export function SlotBlock({
  slot,
  onToggle,
  dense = false,
}: {
  slot: ScheduleSlot;
  onToggle?: (slot: ScheduleSlot) => void;
  dense?: boolean;
}) {
  const router = useRouter();
  const styles = slotTypeStyles[slot.type];
  const start = timeToMinutes(slot.startTime);
  const end = timeToMinutes(slot.endTime);
  const totalRange = DAY_END_MIN - DAY_START_MIN;
  const top = ((start - DAY_START_MIN) / totalRange) * 100;
  const height = ((end - start) / totalRange) * 100;

  const appointment = slot.appointmentId ? getAppointmentById(slot.appointmentId) : undefined;
  const isPatientLinked = Boolean(appointment);
  const isInteractive = !isPatientLinked && Boolean(onToggle);

  function handleClick() {
    if (isPatientLinked && appointment) {
      router.push(`/dashboard/patients?patient=${appointment.id}`);
      return;
    }
    onToggle?.(slot);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!isPatientLinked && !isInteractive}
      title={
        isPatientLinked
          ? `${appointment?.patientName} · Tıbbi dosyayı görüntülemek için tıklayın`
          : `${slot.startTime} - ${slot.endTime} · durumu değiştirmek için tıklayın`
      }
      style={{ top: `${top}%`, height: `${height}%` }}
      className={`group absolute inset-x-1 flex flex-col justify-start gap-0.5 overflow-hidden rounded-lg border-l-4 px-2.5 py-1.5 text-left shadow-sm transition-all ${styles.bg} ${styles.accent} ${
        styles.dashedOutline ?? ""
      } ${
        isPatientLinked || isInteractive
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
          : "cursor-default"
      }`}
    >
      {isPatientLinked && appointment ? (
        <>
          <p className={`shrink-0 truncate text-xs font-semibold ${styles.text}`}>
            {appointment.patientName}
          </p>
          <div className="flex shrink-0 items-center justify-between gap-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
              <Clock className="h-3 w-3 shrink-0" />
              {slot.startTime}–{slot.endTime}
            </span>
            {!dense && (
              <span className="shrink-0 text-sm leading-none">
                {countryCodeToFlagEmoji(appointment.countryCode)}
              </span>
            )}
          </div>
        </>
      ) : slot.type === "AMELİYAT" ? (
        <>
          <p className={`flex shrink-0 items-center gap-1 truncate text-xs font-semibold ${styles.text}`}>
            <Scissors className="h-3 w-3 shrink-0" />
            {dense ? "Ameliyat" : "Ameliyat Bloğu"}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-rose-500/80">
            <Clock className="h-3 w-3 shrink-0" />
            {slot.startTime}–{slot.endTime}
          </span>
          {!dense && slot.label && (
            <span className="shrink-0 truncate text-[11px] text-rose-600/70">{slot.label}</span>
          )}
        </>
      ) : (
        <>
          <p className={`shrink-0 truncate text-xs font-semibold ${styles.text}`}>
            {slot.type === "MÜSAİT" ? "Müsait" : "Bloklandı"}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium opacity-70">
            <Clock className="h-3 w-3 shrink-0" />
            {slot.startTime}–{slot.endTime}
          </span>
        </>
      )}
    </button>
  );
}
