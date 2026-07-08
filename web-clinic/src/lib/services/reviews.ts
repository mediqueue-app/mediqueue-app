import type { AiReviewSummary, PatientReview } from "@/types";
import {
  getAiReviewSummary,
  getPatientReviews,
} from "@/lib/mock-reviews";

export async function fetchReviewsData(): Promise<{
  reviews: PatientReview[];
  aiSummary: AiReviewSummary;
}> {
  await delay(70);
  return {
    reviews: getPatientReviews(),
    aiSummary: getAiReviewSummary(),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
