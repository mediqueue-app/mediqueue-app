"use client";

import { useEffect, useState } from "react";
import { Database, Wifi } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { cn } from "@/lib/utils";

export type DataSourceMode = "api" | "mock";

interface HybridIndicatorProps {
  mode?: DataSourceMode;
  className?: string;
  compact?: boolean;
}

export function HybridIndicator({
  mode,
  className,
  compact = false,
}: HybridIndicatorProps) {
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    if (mode) {
      setIsLive(mode === "api");
    } else {
      setIsLive(isAuthenticated());
    }
  }, [mode]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all shadow-sm",
        isLive
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
        className
      )}
      title={
        isLive
          ? "Canlı PostgreSQL backend API üzerinden çalışıyor (JWT Aktif)"
          : "Demo / Mock modunda çalışıyor (JWT Yok)"
      }
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            isLive ? "bg-emerald-400" : "bg-amber-400"
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            isLive ? "bg-emerald-500" : "bg-amber-500"
          )}
        />
      </span>

      {compact ? (
        <span>{isLive ? "API" : "Mock"}</span>
      ) : (
        <span className="flex items-center gap-1.5">
          {isLive ? (
            <>
              <Wifi className="h-3 w-3" />
              <span>Canlı API</span>
            </>
          ) : (
            <>
              <Database className="h-3 w-3" />
              <span>Demo / Mock</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
