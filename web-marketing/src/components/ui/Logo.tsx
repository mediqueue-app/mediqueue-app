import Link from "next/link";
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
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center py-0.5", className)}
      aria-label="MEDI·QUEUE home"
    >
      <BrandLogo size={size} priority={size === "nav"} />
    </Link>
  );
}
