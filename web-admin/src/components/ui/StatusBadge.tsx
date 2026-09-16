import { cn } from "@/lib/utils";

export type BadgeTone =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "info";

const TONE_STYLES: Record<BadgeTone, { bg: string; text: string; dot: string }> = {
  primary: { bg: "bg-primary-light", text: "text-primary", dot: "bg-primary" },
  success: { bg: "bg-success-light", text: "text-success", dot: "bg-success" },
  warning: { bg: "bg-warning-light", text: "text-warning", dot: "bg-warning" },
  danger: { bg: "bg-error-light", text: "text-error", dot: "bg-error" },
  neutral: { bg: "bg-neutral-light", text: "text-neutral", dot: "bg-neutral-muted" },
  info: { bg: "bg-secondary-light", text: "text-secondary", dot: "bg-secondary" },
};

export function StatusBadge({
  label,
  tone = "neutral",
  dot = true,
  className,
}: {
  label: string;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}) {
  const styles = TONE_STYLES[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        styles.bg,
        styles.text,
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />}
      {label}
    </span>
  );
}
