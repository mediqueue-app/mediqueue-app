import { apiFetch } from "@/lib/api/client";
import { mapUserToDoctorProfile } from "@/lib/api/profile";
import type { UserRead } from "@/lib/api/types";
import { getStoredUser, getToken, setSession } from "@/lib/auth";
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

/**
 * Profil: GET /doctors/{id} backend'de yok.
 * JWT oturumundaki /auth/me (veya saklı user) ile profil kurulur.
 * Specialty/bio güncellemesi Kasım GET/PATCH doctor sonrası açılacak.
 */
export async function fetchCurrentDoctor(): Promise<DoctorProfile> {
  if (!useApi()) {
    const doctor = getCurrentDoctor();
    cachedDoctor = doctor;
    return doctor;
  }

  const token = getToken();
  let user = getStoredUser();
  try {
    user = await apiFetch<UserRead>("/auth/me", { token });
    if (user) setSession(token!, user);
  } catch {
    // saklı user ile devam
  }

  if (!user) {
    throw new Error("Oturum bulunamadı. Tekrar giriş yapın.");
  }

  const profile = mapUserToDoctorProfile(user);
  cachedDoctor = profile;
  return profile;
}

export async function updateCurrentDoctor(patch: {
  full_name?: string;
  specialty?: string;
  bio?: string;
  languages?: string[];
}): Promise<DoctorProfile> {
  // Backend doktor self-PATCH yok; yerel cache + toast için güncelle.
  const current = cachedDoctor ?? (await fetchCurrentDoctor());
  const next: DoctorProfile = {
    ...current,
    fullName: patch.full_name ?? current.fullName,
    specialty: patch.specialty ?? current.specialty,
    bio: patch.bio ?? current.bio,
    languages: (patch.languages as DoctorProfile["languages"]) ?? current.languages,
  };
  cachedDoctor = next;
  return next;
}
