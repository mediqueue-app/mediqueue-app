import type { PatientLead } from "@/types";
import { getPatientLeads } from "@/lib/mock-data";

export async function fetchPatientLeads(): Promise<PatientLead[]> {
  await delay(70);
  return getPatientLeads();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
