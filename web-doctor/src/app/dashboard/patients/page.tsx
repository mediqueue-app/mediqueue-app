"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PatientsBoard } from "@/components/patients/PatientsBoard";
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
      <div className="rounded-[1.5rem] border border-slate-100 bg-white p-10 text-center text-sm text-slate-400 shadow-sm">
        Yükleniyor…
      </div>
    );
  }

  return <PatientsBoard patients={patients} initialSearch={q} />;
}

export default function PatientsPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-[1.5rem] border border-slate-100 bg-white p-10 text-center text-sm text-slate-400 shadow-sm">
          Yükleniyor…
        </div>
      }
    >
      <PatientsPageContent />
    </Suspense>
  );
}
