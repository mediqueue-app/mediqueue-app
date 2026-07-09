"use client";

import { Suspense, useEffect, useState } from "react";
import { PatientsExplorer } from "@/components/dashboard/patients/PatientsExplorer";
import { PageHeader } from "@/components/shared/PageHeader";
import { fetchPatientLeads } from "@/lib/services/leads";
import type { PatientLead } from "@/types";

function PatientsContent() {
  const [leads, setLeads] = useState<PatientLead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPatientLeads()
      .then((result) => {
        if (!cancelled) setLeads(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Hastalar yüklenemedi");
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

  if (leads === null) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return <PatientsExplorer leads={leads} />;
}

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasta & Lead Yönetimi"
        description="Gelen tüm hasta taleplerini filtreleyin, belgelerini inceleyin ve talepleri onaylayıp reddedin."
      />

      <Suspense
        fallback={
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            Yükleniyor…
          </div>
        }
      >
        <PatientsContent />
      </Suspense>
    </div>
  );
}
