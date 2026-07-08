import type {
  ActivityItem,
  ClinicMetrics,
  PatientLead,
  TrendPoint,
} from "@/types";
import type { ClinicProfile } from "@/types";
import {
  getClinicMetrics,
  getClinicProfile,
  getLeadTrend,
  getPatientLeads,
  getPendingLeadCount,
  getRecentActivities,
  getTodayLeads,
} from "@/lib/mock-data";

export function getClinicProfileSync(): ClinicProfile {
  return getClinicProfile();
}

export function getPendingLeadCountSync(): number {
  return getPendingLeadCount(getPatientLeads());
}

export async function fetchDashboardOverview(): Promise<{
  leads: PatientLead[];
  pendingLeads: PatientLead[];
  metrics: ClinicMetrics;
  trend: TrendPoint[];
  activities: ActivityItem[];
}> {
  await delay(70);
  const leads = getPatientLeads();
  const pendingLeads = leads
    .filter(
      (l) => l.status === "BEKLEMEDE" || l.status === "ALTERNATIF_TARIH"
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return {
    leads,
    pendingLeads,
    metrics: getClinicMetrics(leads),
    trend: getLeadTrend(),
    activities: getRecentActivities(),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getTodayLeads };
