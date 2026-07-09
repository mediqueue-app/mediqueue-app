"use client";

import { useEffect, useState } from "react";
import { AiReviewSummaryCard } from "@/components/dashboard/analytics/AiReviewSummaryCard";
import { ReviewList } from "@/components/dashboard/reviews/ReviewList";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChartSkeleton } from "@/components/ui/Skeleton";
import { fetchReviewsData } from "@/lib/services/reviews";
import type { AiReviewSummary, PatientReview } from "@/types";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<PatientReview[] | null>(null);
  const [aiSummary, setAiSummary] = useState<AiReviewSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchReviewsData()
      .then((result) => {
        if (cancelled) return;
        setReviews(result.reviews);
        setAiSummary(result.aiSummary);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Yorumlar yüklenemedi");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Yorumlar"
        description="Hasta geri bildirimlerini izleyin ve eğilimleri anlayın."
      />

      {error ? (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {aiSummary ? (
        <AiReviewSummaryCard data={aiSummary} showDisclaimer />
      ) : (
        <ChartSkeleton />
      )}

      {reviews === null ? (
        <ChartSkeleton />
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </div>
  );
}
