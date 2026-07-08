"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarPlus, Check, MoreHorizontal } from "lucide-react";
import type { Patient, PatientDetailTab } from "@/types";
import { PatientInfoTab } from "@/components/patients/PatientInfoTab";
import { AppointmentHistoryTab } from "@/components/patients/AppointmentHistoryTab";
import { NextTreatmentTab } from "@/components/patients/NextTreatmentTab";
import { MedicalRecordTab } from "@/components/patients/MedicalRecordTab";
import { MedicalRecordPlaceholder } from "@/components/patients/MedicalRecordPlaceholder";
import { cn } from "@/lib/utils";

const BRANCH_LABELS: Record<string, string> = {
  dentistry: "Diş Tedavisi",
  hair_transplant: "Saç Ekimi",
  aesthetic: "Estetik Cerrahi",
  ophthalmology: "Göz (LASIK)",
  bariatric: "Bariatrik Cerrahi",
  orthopedics: "Ortopedi",
  ivf: "Tüp Bebek (IVF)",
  cardiology: "Kardiyoloji",
};

const ALL_TABS: { id: PatientDetailTab; label: string }[] = [
  { id: "info", label: "Hasta Bilgisi" },
  { id: "appointments", label: "Randevu Geçmişi" },
  { id: "next_treatment", label: "Sıradaki Tedavi" },
  { id: "medical_record", label: "Tıbbi Kayıt" },
];

export function PatientDetailView({ patient }: { patient: Patient }) {
  const [tab, setTab] = useState<PatientDetailTab>("info");
  const [toast, setToast] = useState<string | null>(null);
  const isDentistry = patient.branch === "dentistry" && patient.medicalRecord;
  const tabs = ALL_TABS;

  function showDemoToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  }

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          <Check className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      <Link
        href="/dashboard/patients"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Hasta listesine dön
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-light text-xl font-semibold text-primary">
            {patient.avatarInitials}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {patient.fullName}
            </h1>
            {patient.highlightNote && (
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                {patient.highlightNote}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Demo modunda randevu oluşturma Ay 2'de eklenecek"
            onClick={() =>
              showDemoToast(
                "Randevu oluşturma demo modunda simüle edildi — Ay 2'de aktif olacak."
              )
            }
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            <CalendarPlus className="h-4 w-4" />
            Randevu Oluştur
          </button>
          <button
            type="button"
            title="Demo modunda ek işlemler yakında"
            onClick={() =>
              showDemoToast("Ek işlemler menüsü Ay 2'de eklenecek.")
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            aria-label="Diğer işlemler"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-b border-slate-200"
        aria-label="Hasta detay sekmeleri"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {tab === "info" && <PatientInfoTab patient={patient} />}
        {tab === "appointments" && <AppointmentHistoryTab patient={patient} />}
        {tab === "next_treatment" && <NextTreatmentTab patient={patient} />}
        {tab === "medical_record" &&
          (isDentistry ? (
            <MedicalRecordTab medicalRecord={patient.medicalRecord!} />
          ) : (
            <MedicalRecordPlaceholder
              branchLabel={BRANCH_LABELS[patient.branch] ?? patient.treatmentType}
            />
          ))}
      </div>
    </div>
  );
}
