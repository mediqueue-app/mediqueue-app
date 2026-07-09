"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Stethoscope,
  Users,
} from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadTrendChart } from "@/components/dashboard/LeadTrendChart";
import { PendingRequestsList } from "@/components/dashboard/PendingRequestsList";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";
import { PageHeader } from "@/components/shared/PageHeader";
import { getClinicMetrics } from "@/lib/mock-data";
import type {
  ActivityItem,
  ClinicMetrics,
  PatientLead,
  TrendPoint,
} from "@/types";

export function DashboardOverview({
  initialLeads,
  initialPendingLeads,
  initialMetrics,
  trend,
  activities,
}: {
  initialLeads: PatientLead[];
  initialPendingLeads: PatientLead[];
  initialMetrics: ClinicMetrics;
  trend: TrendPoint[];
  activities: ActivityItem[];
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [trendData, setTrendData] = useState(trend);
  const [activityData, setActivityData] = useState(activities);
  const metrics = useMemo(
    () => (leads.length ? getClinicMetrics(leads) : initialMetrics),
    [leads, initialMetrics]
  );

  useEffect(() => {
    setLeads(initialLeads);
    setTrendData(trend);
    setActivityData(activities);
  }, [initialLeads, trend, activities]);

  const pendingLeads = useMemo(
    () =>
      leads
        .filter(
          (l) =>
            l.status === "BEKLEMEDE" || l.status === "ALTERNATIF_TARIH"
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5),
    [leads]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-8"
    >
      <PageHeader
        title="Özet"
        description="Kliniğinizin aylık performansı ve bekleyen işlemler."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Bu Ay Yeni Talep"
          value={metrics.monthlyLeads}
          icon={Users}
          delta={metrics.monthlyLeadsDelta}
        />
        <KpiCard
          label="Onay Oranı"
          value={metrics.approvalRate}
          suffix="%"
          icon={CheckCircle2}
          iconTone="emerald"
          delta={metrics.approvalRateDelta}
        />
        <KpiCard
          label="Ort. Yanıt Süresi"
          value={metrics.avgResponseHours}
          suffix="sa"
          icon={Clock3}
          iconTone="amber"
          delta={metrics.avgResponseDelta}
          deltaLabel="önceki aya göre (saat)"
        />
        <KpiCard
          label="Aktif Doktor"
          value={metrics.activeDoctors}
          icon={Stethoscope}
          delta={metrics.activeDoctorsDelta}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LeadTrendChart data={trendData} />
        </div>
        <RecentActivityWidget activities={activityData} />
      </div>

      <PendingRequestsList
        leads={pendingLeads.length > 0 ? pendingLeads : initialPendingLeads}
      />
    </motion.div>
  );
}
