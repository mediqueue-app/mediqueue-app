"use client";

import { useEffect, useState } from "react";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarPageHeader } from "@/components/calendar/CalendarPageHeader";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { toUserError } from "@/lib/api/client";
import { fetchCalendarAppointments } from "@/lib/services/appointments";
import type { Appointment } from "@/types";

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchCalendarAppointments()
      .then((result) => {
        if (!cancelled) setAppointments(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(toUserError(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  if (error) {
    return (
      <PageLoadError
        message={error}
        onRetry={() => {
          setError(null);
          setReloadKey((k) => k + 1);
        }}
      />
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
