"use client";

import { useEffect, useState } from "react";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarPageHeader } from "@/components/calendar/CalendarPageHeader";
import { fetchCalendarAppointments } from "@/lib/services/appointments";
import type { Appointment } from "@/types";

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCalendarAppointments()
      .then((result) => {
        if (!cancelled) setAppointments(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Takvim yüklenemedi");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (appointments === null) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <CalendarPageHeader appointments={appointments} />
      <CalendarView appointments={appointments} />
    </div>
  );
}
