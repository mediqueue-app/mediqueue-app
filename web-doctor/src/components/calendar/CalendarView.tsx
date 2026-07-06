"use client";

import { useMemo, useState } from "react";
import type { Appointment, CalendarViewMode } from "@/types";
import { AppointmentSlot } from "@/components/calendar/AppointmentSlot";
import { AvailabilityEditor } from "@/components/calendar/AvailabilityEditor";
import { availabilitySlots as initialAvailability } from "@/lib/mock-data";
import type { AvailabilitySlot } from "@/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function CalendarView({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [viewMode, setViewMode] = useState<CalendarViewMode>("HAFTA");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] =
    useState<AvailabilitySlot[]>(initialAvailability);

  const dates = useMemo(() => {
    const unique = [...new Set(appointments.map((a) => a.date))].sort();
    return unique;
  }, [appointments]);

  const selectedAppointments = selectedDate
    ? appointments.filter((a) => a.date === selectedDate)
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["HAFTA", "AY"] as CalendarViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium",
                viewMode === mode
                  ? "bg-primary text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              )}
            >
              {mode === "HAFTA" ? "Haftalık" : "Aylık"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAvailability(true)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Müsaitlik Düzenle
        </button>
      </div>

      <div
        className={cn(
          "grid gap-3",
          viewMode === "HAFTA" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3 lg:grid-cols-7"
        )}
      >
        {dates.map((date) => {
          const dayAppointments = appointments.filter((a) => a.date === date);
          const d = new Date(date + "T12:00:00");
          return (
            <button
              key={date}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={cn(
                "rounded-xl border p-4 text-left transition-colors hover:border-primary/40",
                selectedDate === date
                  ? "border-primary bg-primary-light/30"
                  : "border-slate-200 bg-white"
              )}
            >
              <p className="text-xs font-medium uppercase text-slate-400">
                {d.toLocaleDateString("tr-TR", { weekday: "short" })}
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {d.getDate()}{" "}
                {d.toLocaleDateString("tr-TR", { month: "short" })}
              </p>
              <div className="mt-2 space-y-1">
                {dayAppointments.slice(0, viewMode === "AY" ? 2 : 4).map((apt) => (
                  <AppointmentSlot key={apt.id} appointment={apt} />
                ))}
                {dayAppointments.length > (viewMode === "AY" ? 2 : 4) && (
                  <p className="text-xs text-slate-400">
                    +{dayAppointments.length - (viewMode === "AY" ? 2 : 4)} daha
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("tr-TR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h3>
          <div className="mt-4 space-y-2">
            {selectedAppointments.length === 0 ? (
              <p className="text-sm text-slate-400">Bu gün randevu yok.</p>
            ) : (
              selectedAppointments.map((apt) => (
                <AppointmentSlot key={apt.id} appointment={apt} />
              ))
            )}
          </div>
        </div>
      )}

      {showAvailability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Müsaitlik Düzenle
              </h2>
              <button
                type="button"
                onClick={() => setShowAvailability(false)}
                aria-label="Kapat"
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AvailabilityEditor slots={availability} onChange={setAvailability} />
            <button
              type="button"
              onClick={() => setShowAvailability(false)}
              className="mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
