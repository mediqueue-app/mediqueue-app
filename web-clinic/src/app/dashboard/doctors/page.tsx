"use client";

import { useEffect, useState } from "react";
import { DoctorsGrid } from "@/components/dashboard/doctors/DoctorsGrid";
import { PageHeader } from "@/components/shared/PageHeader";
import { fetchDoctors } from "@/lib/services/doctors";
import { fetchPatientLeads } from "@/lib/services/leads";
import type { Doctor, PatientLead } from "@/types";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const [leads, setLeads] = useState<PatientLead[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchDoctors(), fetchPatientLeads()])
      .then(([nextDoctors, nextLeads]) => {
        if (cancelled) return;
        setDoctors(nextDoctors);
        setLeads(nextLeads);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Doktorlar yüklenemedi");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Doktorlar"
        description="Kadronuzu yönetin, müsaitlik durumlarını ve performansı takip edin."
      />

      {error ? (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {doctors === null ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          Yükleniyor…
        </div>
      ) : (
        <DoctorsGrid doctors={doctors} leads={leads} />
      )}
    </div>
  );
}
