import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavBadge } from "@/lib/navigation";

const BADGE_STYLES: Record<
  NavBadge,
  { label: string; className: string; sparkle?: boolean }
> = {
  pro: {
    label: "Pro",
    className:
      "bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-white shadow-sm shadow-amber-500/20",
  },
  premium: {
    label: "Premium",
    className:
      "bg-gradient-to-r from-amber-400/90 via-amber-500/90 to-orange-500/90 text-white shadow-sm shadow-amber-400/25",
  },
  ai: {
    label: "AI",
    className:
      "bg-gradient-to-r from-violet-500/90 to-primary/90 text-white shadow-sm shadow-violet-500/25",
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
          "absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-2 ring-slate-900",
          type === "ai"
            ? "bg-gradient-to-br from-violet-500 to-primary"
            : "bg-gradient-to-br from-amber-400 to-amber-600"
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
