import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function StarRating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative h-4 w-4">
            <Star className="h-4 w-4 text-slate-200" strokeWidth={1.75} />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  strokeWidth={1.75}
                />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
