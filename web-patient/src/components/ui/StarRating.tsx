import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}) {
  const dimension = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5">
        <Star className={cn(dimension, "fill-amber-400 text-amber-400")} />
        <span
          className={cn(
            "font-semibold text-slate-900",
            size === "md" ? "text-sm" : "text-xs"
          )}
        >
          {rating.toFixed(1)}
        </span>
      </span>
      {showCount && reviewCount !== undefined && (
        <span
          className={cn(
            "text-slate-400",
            size === "md" ? "text-sm" : "text-xs"
          )}
        >
          ({reviewCount} değerlendirme)
        </span>
      )}
    </div>
  );
}
