"use client";

import { countryCodeToFlagEmoji } from "@/lib/country";
import { formatDateTimeTr } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import type { PatientReview } from "@/types";

export function ReviewList({ reviews }: { reviews: PatientReview[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Hasta Yorumları</h2>
        <p className="mt-1 text-sm text-slate-500">
          Platform üzerinden gelen geri bildirimler
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {reviews.map((review) => (
          <li key={review.id} className="px-6 py-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">
                  {countryCodeToFlagEmoji(review.countryCode)}{" "}
                  {review.patientName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {review.service} · {review.doctorName}
                </p>
              </div>
              <div className="text-right">
                <StarRating value={review.rating} size="md" showValue />
                <p className="mt-1 text-[11px] text-slate-400">
                  {formatDateTimeTr(review.createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {review.comment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
