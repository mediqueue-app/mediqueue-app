import type { PlanFeature } from "@/types";
import { getPlanFeatures } from "@/lib/mock-data";

export async function fetchPlanFeatures(): Promise<PlanFeature[]> {
  await delay(50);
  return getPlanFeatures();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
