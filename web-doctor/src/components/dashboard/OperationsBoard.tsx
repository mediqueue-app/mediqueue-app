"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Maximize2,
  MessageSquare,
  MoreVertical,
  Star,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import type {
  ActivityItem,
  Appointment,
  DoctorProfile,
  Patient,
  QuickStats,
} from "@/types";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { getInitials } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Günaydın";
  if (hour < 18) return "İyi günler";
  return "İyi akşamlar";
}

export function OperationsBoard({
  doctor,
  appointments,
  stats,
  patients,
  activities = [],
}: {
  doctor: DoctorProfile;
  appointments: Appointment[];
  stats: QuickStats;
  patients: Patient[];
  activities?: ActivityItem[];
}) {
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const firstName = doctor.fullName.split(" ")[0];
  const dateLabel = now.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const sortedToday = useMemo(
    () => [...appointments].sort((a, b) => a.time.localeCompare(b.time)),
    [appointments]
  );

  const nextApt =
    sortedToday.find(
      (a) => a.status !== "TAMAMLANDI" && a.status !== "IPTAL"
    ) ??
    sortedToday[0] ??
    null;

  const nextPatient = nextApt
    ? patients.find((p) => p.id === nextApt.patientId) ?? null
    : null;

  const weekDays = useMemo(() => {
    const base = new Date();
    const day = base.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + mondayOffset + i);
      return {
        label: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"][d.getDay()],
        num: d.getDate(),
        isToday:
          d.getDate() === base.getDate() && d.getMonth() === base.getMonth(),
      };
    });
  }, []);

  const monthLabel = now.toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });

  const incomingPatients = useMemo(() => {
    const waiting = patients.filter((p) => p.treatmentStatus === "BEKLEMEDE");
    const pool = waiting.length > 0 ? waiting : patients;
    return [...pool]
      .sort((a, b) => b.lastVisitDate.localeCompare(a.lastVisitDate))
      .slice(0, 4);
  }, [patients]);

  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const visibleNew = incomingPatients.filter(
    (p) => !acceptedIds.includes(p.id)
  );

  return (
    <div className="animate-fade-in-up space-y-5 lg:space-y-6">
      {/* MediQueue kimlik — kompakt, cinematic değil */}
      <section className="overflow-hidden rounded-[1.5rem] border border-slate-800/10 bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/10 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/40">
                <Stethoscope className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <div>
                <p className="text-[13px] font-bold tracking-tight">
                  MEDI<span className="text-sky-300">·</span>QUEUE
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Doktor Portalı
                </p>
              </div>
            </div>
            <p className="text-sm text-white/55">{dateLabel}</p>
            <h1 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">
              {greeting}, {doctor.title} {firstName}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-white/65">
              Bugünün programı hazır. Onaylı randevular, yeni hasta talepleri ve
              sıradaki görüşme tek bakışta.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/dashboard/calendar"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-primary-light"
              >
                Takvimi aç
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/messages"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Mesajlar
                {stats.pendingMessageCount > 0 && (
                  <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold">
                    {stats.pendingMessageCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <MiniStat
              label="Bugün"
              value={`${appointments.length}`}
              hint="randevu"
            />
            <MiniStat
              label="Sıradaki"
              value={nextApt?.time ?? "—"}
              hint={nextApt?.patientName.split(" ")[0] ?? "boş"}
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
        <div className="flex min-w-0 flex-col gap-5">
          {/* KPI — sade */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <SummaryCard
              label="Bugünkü randevu"
              value={String(appointments.length)}
              icon={CalendarDays}
              tone="blue"
              href="/dashboard/calendar"
            />
            <SummaryCard
              label="Bekleyen mesaj"
              value={String(stats.pendingMessageCount)}
              icon={MessageSquare}
              tone="violet"
              href="/dashboard/messages"
            />
            <SummaryCard
              label="Bu ay hasta"
              value={String(stats.monthlyPatientCount)}
              icon={Users}
              tone="emerald"
              href="/dashboard/patients"
            />
            <SummaryCard
              label="Ortalama puan"
              value={stats.averageRating.toFixed(1)}
              icon={Star}
              tone="amber"
              href="/dashboard/profile"
            />
          </div>

          {/* Yeni hastalar — MEDIX kartları */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-slate-900">
                  Yeni hastalar
                </h2>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[11px] font-bold text-white">
                  {visibleNew.length}
                </span>
              </div>
              <Link
                href="/dashboard/patients"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Tümünü gör
              </Link>
            </div>

            {visibleNew.length === 0 ? (
              <div className="rounded-[1.25rem] border border-slate-100 bg-white px-5 py-8 text-center text-sm text-slate-400 shadow-sm">
                Bekleyen yeni hasta yok
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visibleNew.slice(0, 2).map((patient) => {
                  const apt = appointments.find(
                    (a) => a.patientId === patient.id
                  );
                  const dateStr = new Date(
                    `${patient.lastVisitDate}T12:00:00`
                  ).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                  });
                  const note =
                    patient.highlightNote ??
                    patient.medicalNotes[0]?.content ??
                    `${patient.treatmentType} · ${patient.nationality} hastası. Belgeler hasta dosyasında.`;

                  return (
                    <article
                      key={patient.id}
                      className="flex flex-col rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-sm font-bold text-white">
                          {patient.avatarInitials ||
                            getInitials(patient.fullName)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {patient.fullName}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Calendar className="h-3 w-3" />
                            {dateStr}
                            {apt ? `, ${apt.time}` : ""}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">
                        {note}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setAcceptedIds((ids) => [...ids, patient.id])
                          }
                          className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition hover:bg-primary-hover"
                        >
                          Kabul et
                        </button>
                        <Link
                          href={`/dashboard/patients/${patient.id}`}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                          aria-label="Hasta detayı"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* MediQueue karakter — günlük timeline */}
          <TodaySchedule appointments={appointments} />
        </div>

        {/* Sağ panel — MEDIX */}
        <aside className="flex min-w-0 flex-col gap-5 xl:sticky xl:top-20 xl:self-start">
          <section className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold capitalize text-slate-900">
                {monthLabel}
              </h3>
              <Link href="/dashboard/calendar" aria-label="Takvim">
                <Maximize2 className="h-4 w-4 text-slate-400 hover:text-primary" />
              </Link>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekDays.map((day) => (
                <div
                  key={`${day.label}-${day.num}`}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="text-[10px] font-medium text-slate-400">
                    {day.label}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                      day.isToday
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "text-slate-700"
                    )}
                  >
                    {String(day.num).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-sm font-bold text-slate-900">Sıradaki hasta</h3>
              <div className="flex gap-1">
                <Link
                  href="/dashboard/messages"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-primary"
                  aria-label="Mesajlar"
                >
                  <MessageSquare className="h-4 w-4" />
                </Link>
                <Link
                  href={
                    nextApt
                      ? `/dashboard/patients/${nextApt.patientId}`
                      : "/dashboard/patients"
                  }
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-primary"
                  aria-label="Detay"
                >
                  <Maximize2 className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {nextApt ? (
              <div className="px-5 pb-5 pt-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-primary/40 p-5 text-white">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/35 blur-2xl" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold ring-2 ring-white/20">
                      {getInitials(nextApt.patientName)}
                    </div>
                    <div>
                      <p className="font-semibold">{nextApt.patientName}</p>
                      <span className="mt-1 inline-block rounded-md bg-sky-400/90 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                        {nextApt.treatmentType}
                      </span>
                    </div>
                  </div>
                  <p className="relative mt-4 text-xs leading-relaxed text-white/70">
                    {nextPatient?.highlightNote ??
                      "Onaylı randevu — dosya ve belgeler hazır. Görüşme öncesi kısa notları inceleyin."}
                  </p>
                  <div className="relative mt-4 flex flex-wrap gap-3 text-[11px] text-white/80">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {now.toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "short",
                      })}
                      , {nextApt.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <UserPlus className="h-3.5 w-3.5" />
                      {nextApt.durationMinutes} dk
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/patients/${nextApt.patientId}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Hasta dosyasını aç
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="px-5 py-10 text-center text-sm text-slate-400">
                Sıradaki randevu yok
              </div>
            )}
          </section>
        </aside>
      </div>

      {activities.length > 0 ? <RecentActivity activities={activities} /> : null}
    </div>
  );
}

function MiniStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
        {label}
      </p>
      <p className="mt-0.5 text-xl font-bold tracking-tight">{value}</p>
      <p className="text-[11px] text-white/50">{hint}</p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
  href,
}: {
  label: string;
  value: string;
  icon: typeof CalendarDays;
  tone: "blue" | "violet" | "emerald" | "amber";
  href: string;
}) {
  const tones = {
    blue: "bg-sky-50 text-sky-600",
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20"
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
          tones[tone]
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-slate-400">{label}</p>
        <p className="text-xl font-bold tracking-tight text-slate-900">{value}</p>
      </div>
    </Link>
  );
}
