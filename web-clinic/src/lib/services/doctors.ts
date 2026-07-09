/**
 * Doctor roster — hybrid: GET /clinics/{id}/doctors when JWT present.
 */
import { apiFetch } from "@/lib/api/client";
import { mapDoctorReadToUi } from "@/lib/api/mappers";
import type { DoctorRead } from "@/lib/api/types";
import { getToken, requireClinicId } from "@/lib/auth";
import { doctors as mockDoctors, type Doctor } from "@/lib/clinic-mock";
import { useApi } from "@/lib/services/shared";

let cachedDoctors: Doctor[] | null = null;

export function getDoctorsSync(): Doctor[] {
  return cachedDoctors ?? mockDoctors;
}

export async function fetchDoctors(): Promise<Doctor[]> {
  if (!useApi()) {
    cachedDoctors = mockDoctors;
    return mockDoctors;
  }

  const clinicId = requireClinicId();
  const doctors = await apiFetch<DoctorRead[]>(
    `/clinics/${clinicId}/doctors`,
    { token: getToken() }
  );
  const mapped = doctors.map(mapDoctorReadToUi);
  cachedDoctors = mapped;
  return mapped;
}

export async function addDoctorLocally(doctor: Doctor): Promise<Doctor[]> {
  const current = getDoctorsSync();
  const next = [...current, doctor];
  cachedDoctors = next;
  return next;
}
