"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarPlus,
  Check,
  FileText,
  FolderHeart,
  MessageSquare,
  MoreHorizontal,
  Stethoscope,
} from "lucide-react";
import type { Patient, PatientDetailTab } from "@/types";
import { PatientInfoTab } from "@/components/patients/PatientInfoTab";
import { AppointmentHistoryTab } from "@/components/patients/AppointmentHistoryTab";
import { NextTreatmentTab } from "@/components/patients/NextTreatmentTab";
import { MedicalRecordTab } from "@/components/patients/MedicalRecordTab";
import { MedicalRecordPlaceholder } from "@/components/patients/MedicalRecordPlaceholder";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { HybridSourceBadge } from "@/components/shared/HybridSourceBadge";
import {
  BRANCH_LABELS,
  formatLastVisit,
  getTimelineProgress,
} from "@/lib/patient-utils";
import { countryCodeToFlagEmoji, cn } from "@/lib/utils";

const ALL_TABS: {
  id: PatientDetailTab;
  label: string;
  icon: typeof FileText;
}[] = [
  { id: "info", label: "Hasta Bilgisi", icon: FileText },
  { id: "appointments", label: "Randevu Geçmişi", icon: CalendarPlus },
  { id: "next_treatment", label: "Sıradaki Tedavi", icon: Stethoscope },
  { id: "medical_record", label: "Tıbbi Kayıt", icon: FileText },
];

export function PatientDetailView({ patient }: { patient: Patient }) {
  const [tab, setTab] = useState<PatientDetailTab>("info");
  const [toast, setToast] = useState<string | null>(null);
  const isDentistry = patient.branch === "dentistry" && patient.medicalRecord;
  const branchLabel = BRANCH_LABELS[patient.branch] ?? patient.treatmentType;
  const progress = getTimelineProgress(patient);

  function showDemoToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  }

  return (
    <div className="animate-fade-in-up flex flex-col gap-5 lg:gap-6">
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          <Check className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      <Link
        href="/dashboard/patients"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Hasta listesine dön
      </Link>

      {/* MediQueue kimlik şeridi */}
      <section className="overflow-hidden rounded-[1.5rem] border border-slate-800/10 bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/10 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-xl font-bold text-white shadow-lg shadow-primary/40 ring-2 ring-white/15 sm:h-20 sm:w-20 sm:text-2xl">
              {patient.avatarInitials}
            </div>
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <FolderHeart className="h-4 w-4 text-sky-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    Hasta dosyası
                  </span>
                </div>
                <HybridSourceBadge source="mock" />
              </div>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
                {patient.fullName}
              </h1>
              {patient.highlightNote && (
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                  {patient.highlightNote}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
                  {countryCodeToFlagEmoji(patient.countryCode)}{" "}
                  {patient.nationality}
                </span>
                <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
                  {patient.age} yaş · {patient.gender}
                </span>
                <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
                  {branchLabel}
                </span>
                <StatusBadge status={patient.treatmentStatus} variant="treatment" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/messages"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <MessageSquare className="h-4 w-4" />
              Mesajlaş
            </Link>
            <button
              type="button"
              onClick={() =>
                showDemoToast(
                  "Randevu oluşturma demo modunda simüle edildi — Ay 2'de aktif olacak."
                )
              }
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:brightness-110"
            >
              <CalendarPlus className="h-4 w-4" />
              Randevu Oluştur
            </button>
            <button
              type="button"
              onClick={() =>
                showDemoToast("Ek işlemler menüsü Ay 2'de eklenecek.")
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
              aria-label="Diğer işlemler"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label="Belgeler"
          value={String(patient.documents.length)}
          hint="yüklü dosya"
        />
        <Kpi
          label="Diller"
          value={patient.languages.join(" · ")}
          hint="konuşulan"
        />
        <Kpi
          label="Randevu"
          value={String(patient.appointmentHistory.length)}
          hint="geçmiş kayıt"
        />
        <Kpi
          label="Son ziyaret"
          value={formatLastVisit(patient.lastVisitDate)}
          hint="tarih"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-6">
        <div className="flex min-w-0 flex-col gap-4">
          <nav
            className="flex gap-1 overflow-x-auto rounded-[1.25rem] border border-slate-100 bg-white p-1.5 shadow-sm"
            aria-label="Hasta detay sekmeleri"
          >
            {ALL_TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                    tab === t.id
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  )}
                >
                  <Icon className="h-4 w-4 opacity-80" />
                  {t.label}
                </button>
              );
            })}
          </nav>

          <div className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm lg:p-6">
            {tab === "info" && <PatientInfoTab patient={patient} />}
            {tab === "appointments" && (
              <AppointmentHistoryTab patient={patient} />
            )}
            {tab === "next_treatment" && (
              <NextTreatmentTab patient={patient} />
            )}
            {tab === "medical_record" &&
              (isDentistry ? (
                <MedicalRecordTab medicalRecord={patient.medicalRecord!} />
              ) : (
                <MedicalRecordPlaceholder
              branchLabel={branchLabel}
              branchKey={patient.branch}
            />
              ))}
          </div>
        </div>

        {/* Sağ özet — MEDIX tarzı */}
        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <section className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Tedavi özeti
              </p>
              <h3 className="mt-1 text-sm font-bold text-slate-900">
                Yolculuk durumu
              </h3>
            </div>
            <div className="p-5">
              <div className="rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-primary/35 p-4 text-white">
                <p className="text-xs text-white/60">Aktif adım</p>
                <p className="mt-1 text-sm font-semibold">
                  {progress.activeLabel || "Tedavi tamamlandı"}
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-white/55">
                    <span>
                      {progress.current}/{progress.total} adım
                    </span>
                    <span>%{progress.percent}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-sky-300"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <dl className="mt-4 space-y-2.5 text-sm">
                <Row label="Tedavi" value={patient.treatmentType} />
                <Row label="Branş" value={branchLabel} />
                <Row
                  label="Durum"
                  value={
                    <StatusBadge
                      status={patient.treatmentStatus}
                      variant="treatment"
                    />
                  }
                />
              </dl>

              <Link
                href="/dashboard/messages"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <MessageSquare className="h-4 w-4" />
                Mesajlara git
              </Link>
            </div>
          </section>

          {patient.documents.length > 0 && (
            <section className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900">Belgeler</h3>
              <ul className="mt-3 space-y-2">
                {patient.documents.slice(0, 3).map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {doc.fileName}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {doc.fileSizeKb} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTab("info")}
                      className="shrink-0 text-[11px] font-semibold text-primary hover:underline"
                    >
                      Gör
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 truncate text-lg font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="text-[10px] text-slate-400">{hint}</p>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="text-right text-xs font-semibold text-slate-800">{value}</dd>
    </div>
  );
}
