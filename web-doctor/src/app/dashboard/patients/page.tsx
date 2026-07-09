"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PatientList } from "@/components/patients/PatientList";
import { PatientsPageHeader } from "@/components/patients/PatientsPageHeader";
import { fetchPatients } from "@/lib/services/patients";
import type { Patient } from "@/types";

function PatientsPageContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPatients("TUMU")
      .then((result) => {
        if (!cancelled) setPatients(result);
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

  if (patients === null) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <PatientsPageHeader patients={patients} />
      <PatientList initialPatients={patients} initialSearch={q} />
    </div>
  );
}

export default function PatientsPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          Yükleniyor…
        </div>
      }
    >
      <PatientsPageContent />
    </Suspense>
  );
}
