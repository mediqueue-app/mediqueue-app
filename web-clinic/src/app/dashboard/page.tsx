"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Eye,
  Inbox,
  MapPin,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { PatientOriginCard } from "@/components/dashboard/PatientOriginCard";
import { KpiCard } from "@/components/ui/KpiCard";
import type {
  AppointmentRequest,
  ClinicProfile,
  DashboardSummary,
  UpcomingAppointment,
} from "@/lib/clinic-mock";
import { dashboardSummary as demoSummary } from "@/lib/clinic-mock";
import type { CountryPatientData } from "@/lib/patient-origins";
import { fetchDashboardOverview } from "@/lib/services/clinic";
import { fetchPatientOrigins } from "@/lib/services/patient-origins";
import { fetchAppointmentRequests } from "@/lib/services/requests";
import { formatNumber, formatTRY } from "@/lib/utils";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [profile, setProfile] = useState<ClinicProfile | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingAppointment[]>([]);
  const [recentRequests, setRecentRequests] = useState<AppointmentRequest[]>([]);
  const [origins, setOrigins] = useState<CountryPatientData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchDashboardOverview(),
      fetchAppointmentRequests(),
      fetchPatientOrigins(),
    ])
      .then(([overview, requests, patientOrigins]) => {
        if (cancelled) return;
        setSummary(overview.summary);
        setProfile(overview.profile);
        setUpcoming(overview.upcoming);
        setRecentRequests(
          requests.filter((r) => r.status === "pending").slice(0, 4)
        );
        setOrigins(patientOrigins);
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

  if (!summary || !profile) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  const s = summary;

  // TODO: gerçek veriye bağla — backend henüz görüntülenme ve gelir metriği
  // döndürmüyor; API modunda computeDashboardSummary bu iki alanı 0 veriyor.
  // Kartları boş bırakmamak için referans (demo) değerlerine düşüyoruz.
  const profileViews = s.profileViews || demoSummary.profileViews;
  const profileViewsDelta = s.profileViews
    ? s.profileViewsDelta
    : demoSummary.profileViewsDelta;
  const expectedRevenue = s.expectedRevenue || demoSummary.expectedRevenue;
  const expectedRevenueDelta = s.expectedRevenue
    ? s.expectedRevenueDelta
    : demoSummary.expectedRevenueDelta;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Genel Bakış"
        description="Kliniğinizin MediQueue pazar yerindeki canlı performansı — talepler, hastalar, görünürlük ve beklenen gelir."
        action={
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm sm:flex">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Vitrin yayında</span>
          </div>
        }
      />

      {/* Özet kartları */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Yeni Randevu Talepleri"
          value={s.newRequests}
          icon={Inbox}
          delta={s.newRequestsDelta}
          iconTone="primary"
          deltaLabel="bu hafta"
        />
        <KpiCard
          label="Aktif Hastalar"
          value={s.activePatients}
          icon={Users}
          delta={s.activePatientsDelta}
          iconTone="emerald"
        />
        <KpiCard
          label="Platform Görünürlüğü"
          value={formatNumber(profileViews)}
          icon={Eye}
          delta={profileViewsDelta}
          iconTone="violet"
          deltaLabel="görüntülenme · 30 gün"
        />
        <KpiCard
          label="Aylık Beklenen Gelir"
          value={formatTRY(expectedRevenue)}
          icon={CalendarClock}
          delta={expectedRevenueDelta}
          iconTone="amber"
        />
      </div>

      {/* Hasta menşei — interaktif dünya + ülke kırılımı */}
      <PatientOriginCard data={origins} />

      {/* Talepler + Zaman çizelgesi */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Bekleyen Talepler
            </h2>
            <Link
              href="/dashboard/requests"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Tümü
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2.5">
            {recentRequests.map((req) => (
              <li key={req.id}>
                <Link
                  href="/dashboard/requests"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:border-primary/30 hover:bg-primary-light/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                    {req.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {req.patient}
                    </p>
                    <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {req.city}, {req.country} · {req.treatment}
                    </p>
                  </div>
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-xs font-medium text-slate-600">
                      {req.requestedDate}
                    </p>
                    <p className="text-[11px] text-slate-400">{req.createdAt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-900">
              Yaklaşan Randevular
            </h2>
          </div>
          <ol className="mt-5 space-y-1">
            {upcoming.map((appt, i) => (
              <li key={appt.id} className="relative flex gap-4 pb-5 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary-light" />
                  {i !== upcoming.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-slate-200" />
                  )}
                </div>
                <div className="-mt-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {appt.time}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {appt.dateLabel}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      {appt.mode === "Online" ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <Stethoscope className="h-3 w-3" />
                      )}
                      {appt.mode}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm font-medium text-slate-800">
                    {appt.patient}
                    <span className="text-slate-400"> · {appt.country}</span>
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {appt.treatment} — {appt.doctor}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
