import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  size = "sm",
  showValue = false,
}: {
  value: number;
  size?: "sm" | "md";
  showValue?: boolean;
}) {
  const iconSize = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = value >= index + 1;
          return (
            <Star
              key={index}
              className={cn(
                iconSize,
                filled ? "fill-amber-400 text-amber-400" : "text-slate-200"
              )}
              strokeWidth={1.75}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-slate-600">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
