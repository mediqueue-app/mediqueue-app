"use client";

import { useEffect, useState } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { fetchDashboardOverview } from "@/lib/services/clinic";
import type {
  ActivityItem,
  ClinicMetrics,
  PatientLead,
  TrendPoint,
} from "@/types";

type OverviewData = {
  leads: PatientLead[];
  pendingLeads: PatientLead[];
  metrics: ClinicMetrics;
  trend: TrendPoint[];
  activities: ActivityItem[];
};

export default function DashboardOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDashboardOverview()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Veri yüklenemedi");
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

  if (!data) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <DashboardOverview
      initialLeads={data.leads}
      initialPendingLeads={data.pendingLeads}
      initialMetrics={data.metrics}
      trend={data.trend}
      activities={data.activities}
    />
  );
}
