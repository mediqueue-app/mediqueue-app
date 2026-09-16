"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, Camera, MapPin } from "lucide-react";
import { useHistoryLayer } from "@/lib/history-layer";
import { usePresence } from "@/lib/motion";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type PermissionKind = "camera" | "location" | "notifications";

const ICONS = {
  camera: Camera,
  location: MapPin,
  notifications: Bell,
} as const;

export function PermissionPrimer({
  open,
  kind,
  title,
  description,
  confirmLabel,
  onContinue,
  onClose,
}: {
  open: boolean;
  kind: PermissionKind;
  title: string;
  description: string;
  confirmLabel: string;
  onContinue: () => void;
  onClose: () => void;
}) {
  const t = useT();
  const close = useHistoryLayer(open, onClose);
  const { mounted, leaving } = usePresence(open);
  const Icon = ICONS[kind];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mq-perm-title"
      aria-describedby="mq-perm-desc"
      className={cn(
        "fixed inset-0 z-[80] flex items-center justify-center px-4",
        leaving && "pointer-events-none"
      )}
    >
      <button
        type="button"
        aria-label={t("permission.close")}
        className={cn(
          "mq-overlay absolute inset-0 bg-slate-900/50 backdrop-blur-sm",
          leaving && "is-leave"
        )}
        onClick={close}
      />
      <div
        className={cn(
          "mq-panel relative w-full max-w-md overflow-hidden rounded-2xl bg-surface text-foreground shadow-2xl",
          leaving && "is-leave"
        )}
      >
        <div className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h2 id="mq-perm-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
          <p
            id="mq-perm-desc"
            className="mt-2 text-sm leading-relaxed text-slate-600"
          >
            {description}
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={close}
            className="min-h-12 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("permission.later")}
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="min-h-12 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/25 hover:bg-primary-hover"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
