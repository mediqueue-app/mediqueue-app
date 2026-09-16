import { apiFetch, isTimeoutOrNetwork } from "@/lib/api/client";
import type { ReviewRead } from "@/lib/api/types";
import { getToken, requireDoctorId } from "@/lib/auth";

function useApi(): boolean {
  return Boolean(getToken());
}

export const mockReviews: ReviewRead[] = [
  {
    id: 1,
    patient_id: 101,
    clinic_id: 1,
    doctor_id: 1,
    rating: 5,
    comment: "Op. Dr. Emre Bey saç ekimi sürecimin başından sonuna kadar çok ilgiliydi. Sonuçlardan çok memnunum.",
    created_at: "2026-07-20T10:00:00Z",
  },
  {
    id: 2,
    patient_id: 102,
    clinic_id: 1,
    doctor_id: 1,
    rating: 4,
    comment: "Klinik ortamı çok temiz ve profesyoneldi. Almanca tercüman desteği harika işledi.",
    created_at: "2026-07-18T14:30:00Z",
  },
];

export async function fetchDoctorReviews(): Promise<ReviewRead[]> {
  if (!useApi()) {
    return mockReviews;
  }

  try {
    const doctorId = requireDoctorId();
    return await apiFetch<ReviewRead[]>(`/doctors/${doctorId}/reviews`, {
      token: getToken(),
    });
  } catch (err) {
    if (isTimeoutOrNetwork(err)) throw err;
    return mockReviews;
  }
}
