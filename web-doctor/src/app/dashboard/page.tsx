"use client";

import { useEffect, useState } from "react";
import { OperationsBoard } from "@/components/dashboard/OperationsBoard";
import { fetchTodayAppointments } from "@/lib/services/appointments";
import {
  fetchQuickStats,
  fetchRecentActivities,
} from "@/lib/services/messages";
import { fetchCurrentDoctor } from "@/lib/services/doctor";
import { fetchPatients } from "@/lib/services/patients";
import type {
  ActivityItem,
  Appointment,
  DoctorProfile,
  Patient,
  QuickStats,
} from "@/types";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [stats, setStats] = useState<QuickStats | null>(null);
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchTodayAppointments(),
      fetchQuickStats(),
      fetchCurrentDoctor(),
      fetchPatients(),
      fetchRecentActivities(),
    ])
      .then(([appts, nextStats, nextDoctor, nextPatients, nextActivities]) => {
        if (cancelled) return;
        setAppointments(appts);
        setStats(nextStats);
        setDoctor(nextDoctor);
        setPatients(nextPatients);
        setActivities(nextActivities);
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

  if (!appointments || !doctor || !stats || !patients) {
    return (
      <div className="rounded-[1.5rem] border border-slate-100 bg-white p-10 text-center text-sm text-slate-400 shadow-sm">
        Yükleniyor…
      </div>
    );
  }

  return (
    <OperationsBoard
      doctor={doctor}
      appointments={appointments}
      stats={stats}
      patients={patients}
      activities={activities}
    />
  );
}
