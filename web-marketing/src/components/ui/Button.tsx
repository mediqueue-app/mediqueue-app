import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = ComponentProps<"button"> & {
  href?: string;
  variant?: "primary" | "ink" | "ghost";
  size?: "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold no-underline transition-colors duration-200 cursor-pointer",
    "min-h-11 rounded-full",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-7 py-3.5 text-[15px]",
    variant === "primary" &&
      "bg-primary text-white shadow-sm hover:bg-primary-hover",
    variant === "ink" &&
      "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
    variant === "ghost" && "text-primary hover:underline underline-offset-4",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as any}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
