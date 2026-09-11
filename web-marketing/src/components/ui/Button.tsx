import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type SharedProps = {
  className?: string;
  variant?: "primary" | "ink" | "ghost";
  size?: "md" | "lg";
  children?: ReactNode;
};

type LinkButtonProps = SharedProps &
  Omit<ComponentProps<typeof Link>, "href" | "className" | "children"> & {
    href: string;
  };

type ActionButtonProps = SharedProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

function buttonClass(
  variant: SharedProps["variant"] = "primary",
  size: SharedProps["size"] = "md",
  className?: string
) {
  return cn(
    "inline-flex items-center justify-center font-semibold no-underline transition-colors duration-200",
    "min-h-11 rounded-full",
    size === "md" && "px-5 py-2.5 text-sm",
    size === "lg" && "px-7 py-3.5 text-[15px]",
    variant === "primary" &&
      "bg-primary text-white shadow-sm hover:bg-primary-hover",
    variant === "ink" &&
      "border border-slate-200 bg-white text-slate-900 hover:bg-primary-light",
    variant === "ghost" && "text-primary hover:underline underline-offset-4",
    className
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const classes = buttonClass(variant, size, className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ActionButtonProps;
  const { href: _href, type = "button", ...rest } = buttonProps;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
