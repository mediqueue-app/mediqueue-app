"use client";

import { LocaleLink } from "@/components/ui/LocaleLink";
import { cn } from "@/lib/cn";
import { BrandLogo } from "@/components/ui/BrandLogo";

type LogoSize = "nav" | "footer" | "lg" | "xl" | "md";

export function Logo({
  className,
  size = "nav",
}: {
  className?: string;
  size?: LogoSize;
}) {
  return (
    <LocaleLink
      href="/"
      className={cn("inline-flex shrink-0 items-center py-0.5", className)}
      aria-label="MEDI·QUEUE home"
    >
      <BrandLogo size={size} priority={size === "nav"} />
    </LocaleLink>
  );
}
