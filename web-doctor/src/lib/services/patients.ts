import type { Patient, PatientFilterTab } from "@/types";
import { getPatients } from "@/lib/mock-data";

export async function fetchPatients(
  filter: PatientFilterTab = "TUMU",
  search = ""
): Promise<Patient[]> {
  await delay(80);
  let result = getPatients();

  if (filter === "AKTIF") {
    result = result.filter((p) => p.treatmentStatus === "AKTIF");
  } else if (filter === "GECMIS") {
    result = result.filter((p) => p.treatmentStatus === "TAMAMLANDI");
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((p) => p.fullName.toLowerCase().includes(q));
  }

  return result;
}

export async function fetchPatientById(id: string): Promise<Patient | null> {
  await delay(60);
  return getPatients().find((p) => p.id === id) ?? null;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
