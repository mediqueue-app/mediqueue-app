import { cn } from "@/lib/utils";

export type HybridSource = "api" | "mock";

const LABELS: Record<HybridSource, string> = {
  api: "Canlı API",
  mock: "Mock · Yakında",
};

/**
 * Per-module live vs mock indicator (web-doctor local).
 * Align with Furkan’s shared component when it lands in web-patient.
 */
export function HybridSourceBadge({
  source,
  className,
}: {
  source: HybridSource;
  className?: string;
}) {
  const isLive = source === "api";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold tracking-wide",
        isLive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
        className
      )}
      title={
        isLive
          ? "Bu bölüm gerçek backend API kullanıyor"
          : "Bu bölüm henüz mock; gerçek API bağlanınca Canlı API olacak"
      }
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isLive ? "bg-emerald-500" : "bg-amber-500"
        )}
        aria-hidden
      />
      {LABELS[source]}
    </span>
  );
}
