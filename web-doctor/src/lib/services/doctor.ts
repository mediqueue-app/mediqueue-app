import { apiFetch } from "@/lib/api/client";
import { mapDoctorProfile } from "@/lib/api/mappers";
import type { DoctorRead, DoctorUpdate } from "@/lib/api/types";
import { getStoredUser, getToken, requireDoctorId } from "@/lib/auth";
import { getCurrentDoctor } from "@/lib/mock-data";
import type { DoctorProfile } from "@/types";

let cachedDoctor: DoctorProfile | null = null;

function useApi(): boolean {
  return Boolean(getToken());
}

export function getCurrentDoctorSync(): DoctorProfile {
  return cachedDoctor ?? getCurrentDoctor();
}

export function setDoctorCache(doctor: DoctorProfile): void {
  cachedDoctor = doctor;
}

export async function fetchCurrentDoctor(): Promise<DoctorProfile> {
  if (!useApi()) {
    const doctor = getCurrentDoctor();
    cachedDoctor = doctor;
    return doctor;
  }

  const doctorId = requireDoctorId();
  const user = getStoredUser();
  const doctor = await apiFetch<DoctorRead>(`/doctors/${doctorId}`, {
    token: getToken(),
  });
  const profile = mapDoctorProfile(doctor, user?.email ?? "");
  cachedDoctor = profile;
  return profile;
}

export async function updateCurrentDoctor(
  patch: DoctorUpdate
): Promise<DoctorProfile> {
  const doctorId = requireDoctorId();
  const user = getStoredUser();
  const doctor = await apiFetch<DoctorRead>(`/doctors/${doctorId}`, {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify(patch),
  });
  const profile = mapDoctorProfile(doctor, user?.email ?? "");
  cachedDoctor = profile;
  return profile;
}
