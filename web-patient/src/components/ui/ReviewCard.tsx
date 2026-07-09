import { Star } from "lucide-react";
import type { Review } from "@/lib/mock-data";
import { initials } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf0fc] text-sm font-semibold text-[#3a6ad6]">
          {initials(review.author)}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {review.author}
          </p>
          <p className="text-xs text-slate-400">{review.date}</p>
        </div>
        <span className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < review.rating
                  ? "h-4 w-4 fill-amber-400 text-amber-400"
                  : "h-4 w-4 text-slate-200"
              }
            />
          ))}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {review.comment}
      </p>
    </div>
  );
}
