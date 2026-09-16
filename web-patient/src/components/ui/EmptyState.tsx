"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { EmptyCopyKey } from "@/lib/empty-copy";
import { useEmptyCopy } from "@/lib/empty-copy";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
  onAction,
  compact = false,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
  className?: string;
}) {
  const actionClass = cn(
    "inline-flex items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover",
    compact ? "mt-4 px-4 py-2" : "mt-6 px-5 py-2.5"
  );

  const action =
    actionLabel && actionHref ? (
      <Link href={actionHref} className={actionClass}>
        {actionLabel}
      </Link>
    ) : actionLabel && onAction ? (
      <button type="button" onClick={onAction} className={actionClass}>
        {actionLabel}
      </button>
    ) : null;

  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center",
        compact ? "px-4 py-8" : "px-6 py-16",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-2xl bg-primary-light text-primary",
          compact ? "h-12 w-12" : "h-16 w-16"
        )}
      >
        <Icon className={compact ? "h-6 w-6" : "h-8 w-8"} aria-hidden />
      </span>
      <h2
        className={cn(
          "font-bold text-slate-900",
          compact ? "mt-3 text-sm" : "mt-5 text-lg"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-sm text-slate-500",
          compact ? "mt-1 text-xs leading-relaxed" : "mt-1 text-sm"
        )}
      >
        {description}
      </p>
      {action}
    </div>
  );
}

export function LocalizedEmpty({
  copyKey,
  icon,
  actionHref,
  onAction,
  compact,
  className,
}: {
  copyKey: EmptyCopyKey;
  icon: LucideIcon;
  actionHref?: string;
  onAction?: () => void;
  compact?: boolean;
  className?: string;
}) {
  const copy = useEmptyCopy(copyKey);
  return (
    <EmptyState
      icon={icon}
      title={copy.title}
      description={copy.description}
      actionLabel={copy.action}
      actionHref={actionHref}
      onAction={onAction}
      compact={compact}
      className={className}
    />
  );
}
