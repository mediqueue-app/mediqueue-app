import { apiFetch } from "@/lib/api/client";
import { mapReviewRead } from "@/lib/api/mappers";
import type { ReviewRead } from "@/lib/api/types";
import { getToken, requireClinicId } from "@/lib/auth";
import {
  getAiReviewSummary,
  getPatientReviews,
} from "@/lib/mock-reviews";
import type { AiReviewSummary, PatientReview } from "@/types";

function useApi(): boolean {
  return Boolean(getToken());
}

export async function fetchReviewsData(): Promise<{
  reviews: PatientReview[];
  aiSummary: AiReviewSummary;
}> {
  if (!useApi()) {
    return {
      reviews: getPatientReviews(),
      aiSummary: getAiReviewSummary(),
    };
  }

  const clinicId = requireClinicId();
  const reviews = await apiFetch<ReviewRead[]>(
    `/clinics/${clinicId}/reviews`,
    { token: getToken() }
  );
  const mapped = reviews.map(mapReviewRead);
  const sampleSize = mapped.length;
  const positive = mapped.filter((r) => r.rating >= 4).length;

  return {
    reviews: mapped,
    aiSummary: {
      positivePercentage:
        sampleSize === 0 ? 0 : Math.round((positive / sampleSize) * 100),
      topKeyword: "—",
      sampleSize,
      themes: ["API yorumları", "Demo AI özeti Ay 2"],
    },
  };
}
