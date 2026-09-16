"use client";

import { useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useHistoryLayer } from "@/lib/history-layer";
import { usePresence } from "@/lib/motion";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  busy = false,
  error = null,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  busy?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const t = useT();
  const close = useHistoryLayer(open, onClose);
  const { mounted, leaving } = usePresence(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, close]);

  if (!mounted) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="mq-confirm-title"
      aria-describedby="mq-confirm-desc"
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center px-4",
        leaving && "pointer-events-none"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label={t("confirm.close")}
        className={cn(
          "mq-overlay absolute inset-0 bg-slate-900/50 backdrop-blur-sm",
          leaving && "is-leave"
        )}
        onClick={() => {
          if (!busy) close();
        }}
      />
      <div
        className={cn(
          "mq-panel relative w-full max-w-md overflow-hidden rounded-2xl bg-surface text-foreground shadow-2xl",
          leaving && "is-leave"
        )}
      >
        <div className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 id="mq-confirm-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <p
            id="mq-confirm-desc"
            className="mt-2 text-sm leading-relaxed text-slate-600"
          >
            {description}
          </p>
          {error ? (
            <p className="mq-feedback mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={close}
            disabled={busy}
            className="min-h-12 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
          >
            {cancelLabel ?? t("confirm.cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={cn(
              "inline-flex min-h-12 items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-600/25 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {busy ? t("confirm.busy") : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
