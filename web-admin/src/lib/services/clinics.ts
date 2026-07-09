import { clinics } from "@/lib/mock-data";

export async function fetchClinics() {
  return clinics;
}

export async function fetchActiveClinicCount() {
  return clinics.filter((c) => c.status === "active").length;
}
