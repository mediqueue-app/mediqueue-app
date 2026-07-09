import { apiFetch } from "@/lib/api/client";
import { mapDoctorRead } from "@/lib/api/mappers";
import type { DoctorRead } from "@/lib/api/types";
import { getToken, requireClinicId } from "@/lib/auth";
import { getDoctors } from "@/lib/mock-data";
import type { Doctor } from "@/types";

function useApi(): boolean {
  return Boolean(getToken());
}

export async function fetchDoctors(): Promise<Doctor[]> {
  if (!useApi()) {
    return getDoctors();
  }

  const clinicId = requireClinicId();
  const doctors = await apiFetch<DoctorRead[]>(
    `/clinics/${clinicId}/doctors`,
    { token: getToken() }
  );
  return doctors.map(mapDoctorRead);
}
