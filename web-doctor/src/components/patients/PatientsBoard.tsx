"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock3,
  FolderHeart,
  MoreVertical,
  UserPlus,
  Users,
} from "lucide-react";
import type { Patient } from "@/types";
import { PatientList } from "@/components/patients/PatientList";
import {
  BRANCH_LABELS,
  countByTreatmentStatus,
  formatLastVisit,
  getTimelineProgress,
} from "@/lib/patient-utils";
import { countryCodeToFlagEmoji, cn } from "@/lib/utils";

export function PatientsBoard({
  patients,
  initialSearch = "",
}: {
  patients: Patient[];
  initialSearch?: string;
}) {
  const total = patients.length;
  const active = countByTreatmentStatus(patients, "AKTIF");
  const waiting = countByTreatmentStatus(patients, "BEKLEMEDE");
  const completed = countByTreatmentStatus(patients, "TAMAMLANDI");

  const incoming = useMemo(() => {
    const pool =
      waiting > 0
        ? patients.filter((p) => p.treatmentStatus === "BEKLEMEDE")
        : patients;
    return [...pool]
      .sort((a, b) => b.lastVisitDate.localeCompare(a.lastVisitDate))
      .slice(0, 4);
  }, [patients, waiting]);

  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const visibleNew = incoming.filter((p) => !acceptedIds.includes(p.id));

  const featured =
    patients.find((p) => p.treatmentStatus === "AKTIF") ??
    patients[0] ??
    null;
  const featuredProgress = featured ? getTimelineProgress(featured) : null;

  return (
    <div className="animate-fade-in-up flex flex-col gap-5 lg:gap-6">
      {/* MediQueue kimlik şeridi */}
      <section className="overflow-hidden rounded-[1.5rem] border border-slate-800/10 bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/10 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/40">
                <FolderHeart className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <div>
                <p className="text-[13px] font-bold tracking-tight">
                  MEDI<span className="text-sky-300">·</span>QUEUE
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  Hasta portföyü
                </p>
              </div>
            </div>
            <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
              Hastalarım
            </h1>
            <p className="mt-2 max-w-lg text-sm text-white/65">
              Uluslararası hastalar, tedavi aşamaları ve belgeler — tek bakışta
              yönetin.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <MiniStat label="Toplam" value={String(total)} />
            <MiniStat label="Aktif" value={String(active)} />
            <MiniStat label="Bekleyen" value={String(waiting)} />
          </div>
        </div>
      </section>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard
          label="Toplam hasta"
          value={String(total)}
          icon={Users}
          tone="blue"
        />
        <KpiCard
          label="Aktif tedavi"
          value={String(active)}
          icon={Clock3}
          tone="emerald"
        />
        <KpiCard
          label="Beklemede"
          value={String(waiting)}
          icon={UserPlus}
          tone="amber"
        />
        <KpiCard
          label="Tamamlanan"
          value={String(completed)}
          icon={CheckCircle2}
          tone="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-6">
        <div className="flex min-w-0 flex-col gap-5">
          {/* Yeni / bekleyen — MEDIX kartları */}
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
              <span className="text-xs font-medium text-slate-400">
                Kabul sonrası aktif listeye düşer
              </span>
            </div>

            {visibleNew.length === 0 ? (
              <div className="rounded-[1.25rem] border border-slate-100 bg-white px-5 py-8 text-center text-sm text-slate-400 shadow-sm">
                Bekleyen yeni hasta yok
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visibleNew.slice(0, 2).map((patient) => {
                  const note =
                    patient.highlightNote ??
                    `${patient.treatmentType} · ${patient.nationality}. Belgeler hasta dosyasında.`;
                  return (
                    <article
                      key={patient.id}
                      className="flex flex-col rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-sm font-bold text-white">
                          {patient.avatarInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {patient.fullName}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Calendar className="h-3 w-3" />
                            {formatLastVisit(patient.lastVisitDate)}
                            <span>·</span>
                            {countryCodeToFlagEmoji(patient.countryCode)}{" "}
                            {patient.nationality}
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

          <PatientList
            initialPatients={patients}
            initialSearch={initialSearch}
          />
        </div>

        {/* Sağ: öne çıkan dosya */}
        <aside className="xl:sticky xl:top-20 xl:self-start">
          {featured && featuredProgress ? (
            <section className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Öne çıkan dosya
                </p>
                <h3 className="mt-1 text-sm font-bold text-slate-900">
                  Aktif hasta özeti
                </h3>
              </div>

              <div className="p-5">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-primary/35 p-5 text-white">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/40 blur-2xl" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold ring-2 ring-white/20">
                      {featured.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {featured.fullName}
                      </p>
                      <p className="mt-0.5 text-xs text-white/65">
                        {countryCodeToFlagEmoji(featured.countryCode)}{" "}
                        {featured.nationality}
                      </p>
                      <span className="mt-1.5 inline-block rounded-md bg-sky-400/90 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                        {BRANCH_LABELS[featured.branch]}
                      </span>
                    </div>
                  </div>

                  <p className="relative mt-4 text-xs leading-relaxed text-white/70">
                    {featured.highlightNote ??
                      `${featured.treatmentType} — tedavi yolculuğu devam ediyor.`}
                  </p>

                  <div className="relative mt-4">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-white/60">
                      <span>{featuredProgress.activeLabel || "İlerleme"}</span>
                      <span>%{featuredProgress.percent}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-sky-300"
                        style={{ width: `${featuredProgress.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                    <p className="text-lg font-bold text-slate-900">
                      {featured.documents.length}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">
                      belge
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                    <p className="text-lg font-bold text-slate-900">
                      {featured.languages.join(" · ")}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">dil</p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/patients/${featured.id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Dosyayı aç
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
              Hasta seçilmedi
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
        {label}
      </p>
      <p className="mt-0.5 text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof Users;
  tone: "blue" | "emerald" | "amber" | "violet";
}) {
  const tones = {
    blue: "bg-sky-50 text-sky-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
  };

  return (
    <div className="flex items-center gap-3 rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-sm">
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
    </div>
  );
}
