import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProBadge({
  label = "PRO",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-indigo-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white",
        className
      )}
    >
      <Sparkles className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}
