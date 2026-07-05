import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "amber"
  | "emerald"
  | "blue"
  | "red"
  | "slate"
  | "primary";

const toneClasses: Record<BadgeTone, string> = {
  amber: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100",
  blue: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100",
  red: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-100",
  slate: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  primary: "bg-primary-light text-primary ring-1 ring-inset ring-primary/20",
};

export function Badge({
  tone = "slate",
  icon,
  children,
  className,
}: {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
