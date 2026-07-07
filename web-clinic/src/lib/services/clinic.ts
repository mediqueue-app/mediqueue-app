import type { ClinicMetrics, PatientLead } from "@/types";
import { getClinicMetrics, getPatientLeads } from "@/lib/mock-data";

export async function fetchDashboardOverview(): Promise<{
  leads: PatientLead[];
  metrics: ClinicMetrics;
}> {
  await delay(70);
  const leads = getPatientLeads();
  return {
    leads,
    metrics: getClinicMetrics(leads),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
