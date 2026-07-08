import { Suspense } from "react";
import { AiReviewSummaryCard } from "@/components/dashboard/analytics/AiReviewSummaryCard";
import { ReviewList } from "@/components/dashboard/reviews/ReviewList";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChartSkeleton } from "@/components/ui/Skeleton";
import { fetchReviewsData } from "@/lib/services/reviews";

export default async function ReviewsPage() {
  const { reviews, aiSummary } = await fetchReviewsData();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Yorumlar"
        description="Hasta geri bildirimlerini izleyin ve eğilimleri anlayın."
      />

      <AiReviewSummaryCard data={aiSummary} showDisclaimer />

      <Suspense fallback={<ChartSkeleton />}>
        <ReviewList reviews={reviews} />
      </Suspense>
    </div>
  );
}
