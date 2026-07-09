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
  success: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  warning: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  danger: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  neutral: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  info: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
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
