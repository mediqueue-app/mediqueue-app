import {
  clinicApplications,
  getApplicationById as getMockApplicationById,
} from "@/lib/mock-data";

export async function fetchClinicApplications() {
  return clinicApplications;
}

export async function fetchApplicationById(id: string) {
  return getMockApplicationById(id);
}

export function getPendingApplicationCountSync() {
  return clinicApplications.filter((a) => a.status === "pending").length;
}
