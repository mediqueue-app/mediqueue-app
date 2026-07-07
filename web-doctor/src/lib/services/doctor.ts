import type { DoctorProfile } from "@/types";
import { getCurrentDoctor } from "@/lib/mock-data";

export async function fetchCurrentDoctor(): Promise<DoctorProfile> {
  await delay(40);
  return getCurrentDoctor();
}

/** Client component'ler için senkron erişim (mock — Ay 2'de kaldırılacak). */
export function getCurrentDoctorSync(): DoctorProfile {
  return getCurrentDoctor();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
