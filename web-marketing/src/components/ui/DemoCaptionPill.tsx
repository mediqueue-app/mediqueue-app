"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function DemoCaptionPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative z-20 mt-6 flex justify-center", className)}>
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-1.5 shadow-xs shadow-slate-900/5 backdrop-blur-md transition-all hover:border-slate-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold tracking-tight text-slate-600">
          {children}
        </span>
      </div>
    </div>
  );
}
