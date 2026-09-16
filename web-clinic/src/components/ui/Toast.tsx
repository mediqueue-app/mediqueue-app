"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePresence } from "@/lib/motion";

export type ToastTone = "success" | "danger" | "info";

export interface ToastMessage {
  /** Her yeni bildirimde artan kimlik — animasyonu yeniden tetikler. */
  id: number;
  message: string;
  tone: ToastTone;
}

const TONES: Record<
  ToastTone,
  { icon: typeof CheckCircle2; accent: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle2,
    accent: "bg-success",
    iconColor: "text-success",
  },
  danger: { icon: XCircle, accent: "bg-error", iconColor: "text-error" },
  info: { icon: Info, accent: "bg-secondary", iconColor: "text-secondary" },
};

/**
 * Hafif, kütüphanesiz bildirim (toast). Görünürlüğü ve içeriği ebeveyn
 * yönetir; süre dolunca kendini `onDismiss` ile kapatır. Sabit konumlu
 * (fixed) olduğundan sayfa mizanpajını veya kaydırmayı etkilemez.
 */
export function Toast({
  toast,
  onDismiss,
  duration = 3200,
}: {
  toast: ToastMessage | null;
  onDismiss: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onDismiss]);

  const [current, setCurrent] = useState(toast);
  useEffect(() => {
    if (toast) setCurrent(toast);
  }, [toast]);

  const { mounted, leaving } = usePresence(Boolean(toast));

  if (!mounted || !current) return null;

  const tone = TONES[current.tone];
  const Icon = tone.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-4 right-4 z-50 flex justify-center sm:left-auto sm:right-6 sm:justify-end"
    >
      <div
        key={current.id}
        className={cn(
          "mq-panel flex w-full max-w-sm items-center gap-3 overflow-hidden rounded-2xl border border-border bg-surface pr-3 shadow-lg shadow-slate-900/10",
          leaving && "is-leave"
        )}
      >
        <span className={cn("h-full w-1 self-stretch", tone.accent)} />
        <Icon className={cn("h-5 w-5 shrink-0", tone.iconColor)} />
        <p className="flex-1 py-3.5 text-sm font-medium text-foreground">
          {current.message}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Bildirimi kapat"
          className="touch-target shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
