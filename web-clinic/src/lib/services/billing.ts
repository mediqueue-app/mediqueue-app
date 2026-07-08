import type { PlanFeature } from "@/types";
import { getPatientLeads, getPlanFeatures } from "@/lib/mock-data";

export async function fetchPlanFeatures(): Promise<PlanFeature[]> {
  await delay(50);
  return getPlanFeatures();
}

export async function fetchBillingUsage(): Promise<{
  leadsUsed: number;
  leadsLimit: number;
}> {
  await delay(50);
  return {
    leadsUsed: getPatientLeads().length,
    leadsLimit: 15,
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
