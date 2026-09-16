"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PatientDetailView } from "@/components/patients/PatientDetailDrawer";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { toUserError } from "@/lib/api/client";
import { fetchPatientById } from "@/lib/services/patients";
import type { Patient } from "@/types";

export default function PatientDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [patient, setPatient] = useState<Patient | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchPatientById(id)
      .then((result) => {
        if (!cancelled) setPatient(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(toUserError(err));
          setPatient(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  if (error) {
    return (
      <PageLoadError
        message={error}
        onRetry={() => {
          setError(null);
          setPatient(undefined);
          setReloadKey((k) => k + 1);
        }}
      />
    );
  }

  if (patient === undefined) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  if (patient === null) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-600">Hasta bulunamadı.</p>
        <Link
          href="/dashboard/patients"
          className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Listeye dön
        </Link>
      </div>
    );
  }

  return <PatientDetailView patient={patient} />;
}
