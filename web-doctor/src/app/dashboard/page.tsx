"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OperationsBoard } from "@/components/dashboard/OperationsBoard";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { toUserError } from "@/lib/api/client";
import { isAuthenticated } from "@/lib/auth";
import { loginRedirect } from "@/lib/history-layer";
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
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [stats, setStats] = useState<QuickStats | null>(null);
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

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
        if (cancelled) return;
        if (!isAuthenticated()) {
          router.replace(loginRedirect("/login"));
          return;
        }
        setError(toUserError(err));
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey, router]);

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
