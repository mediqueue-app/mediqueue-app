import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function SoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary",
        className
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Yakında
    </span>
  );
}

export function ComingSoonOverlay({
  children,
  title = "Yakında Aktif Edilecek",
  description = "Bu modül canlı verilerle çok yakında hizmetinizde olacak.",
  className,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none opacity-60 blur-[3px] saturate-[0.85]"
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/40 p-6 backdrop-blur-[1px]">
        <div className="flex max-w-sm flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 px-6 py-6 text-center shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Sparkles className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
          <SoonPill className="mt-4" />
        </div>
      </div>
    </div>
  );
}
