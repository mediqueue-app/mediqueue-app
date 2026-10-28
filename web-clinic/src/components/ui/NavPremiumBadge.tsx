import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavBadge } from "@/lib/navigation";

const BADGE_STYLES: Record<
  NavBadge,
  { label: string; className: string; sparkle?: boolean }
> = {
  pro: {
    label: "Pro",
    className: "bg-amber-500 text-white",
  },
  premium: {
    label: "Premium",
    className: "bg-amber-500 text-white",
  },
  ai: {
    label: "AI",
    className: "bg-primary text-white",
    sparkle: true,
  },
};

export function NavPremiumBadge({
  type,
  active = false,
  collapsed = false,
}: {
  type: NavBadge;
  active?: boolean;
  collapsed?: boolean;
}) {
  const style = BADGE_STYLES[type];

  if (collapsed) {
    return (
      <span
        className={cn(
          "absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-2 ring-white",
          type === "ai" ? "bg-primary" : "bg-amber-500"
        )}
        aria-hidden
      >
        {type === "ai" ? (
          <Sparkles className="h-2 w-2 text-white" strokeWidth={2.5} />
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
        active ? "bg-white/20 text-white shadow-none" : style.className
      )}
    >
      {style.sparkle && (
        <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
      )}
      {style.label}
    </span>
  );
}
