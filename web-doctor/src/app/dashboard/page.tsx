"use client";

import { useEffect, useState } from "react";
import { DashboardHero, getNextAppointment } from "@/components/dashboard/DashboardHero";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { PatientQueue } from "@/components/dashboard/PatientQueue";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { fetchTodayAppointments } from "@/lib/services/appointments";
import {
  fetchQuickStats,
  fetchQueuePatient,
  fetchRecentActivities,
} from "@/lib/services/messages";
import { fetchCurrentDoctor } from "@/lib/services/doctor";
import type { Appointment, DoctorProfile } from "@/types";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof fetchQuickStats>
  > | null>(null);
  const [queue, setQueue] = useState<Awaited<
    ReturnType<typeof fetchQueuePatient>
  > | null>(null);
  const [activities, setActivities] = useState<
    Awaited<ReturnType<typeof fetchRecentActivities>>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchTodayAppointments(),
      fetchQuickStats(),
      fetchQueuePatient(),
      fetchRecentActivities(),
      fetchCurrentDoctor(),
    ])
      .then(([appts, nextStats, nextQueue, nextActivities, nextDoctor]) => {
        if (cancelled) return;
        setAppointments(appts);
        setStats(nextStats);
        setQueue(nextQueue);
        setActivities(nextActivities);
        setDoctor(nextDoctor);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Dashboard yüklenemedi");
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

  if (!appointments || !doctor || !stats || !queue) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  const nextAppointment = getNextAppointment(appointments);

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <DashboardHero
        doctor={doctor}
        todayCount={appointments.length}
        pendingMessages={stats.pendingMessageCount}
        nextAppointment={nextAppointment}
      />

      <TodaySchedule appointments={appointments} />

      <QuickStats {...stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentActivity activities={activities.slice(0, 5)} />
        </div>
        <PatientQueue {...queue} />
      </div>
    </div>
  );
}
