"use client";

import { useCallback, useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function useDemoToast() {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback((text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2800);
  }, []);

  const Toast = message ? (
    <div
      role="status"
      className={cn(
        "fixed bottom-6 left-1/2 z-[100] flex max-w-sm -translate-x-1/2 items-center gap-2.5",
        "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg"
      )}
    >
      <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      {message}
    </div>
  ) : null;

  return { show, Toast };
}
