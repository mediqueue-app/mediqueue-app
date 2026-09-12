import Image from "next/image";
import { cn } from "@/lib/cn";

/** Wordmark aspect ratio ~4.75:1 — always scale via height + w-auto */
const SIZES = {
  xs: { width: 150, height: 35, className: "h-5 w-auto" },
  sm: { width: 190, height: 45, className: "h-6 w-auto" },
  md: { width: 238, height: 55, className: "h-8 w-auto" },
  lg: { width: 285, height: 65, className: "h-10 w-auto" },
  xl: { width: 333, height: 75, className: "h-12 w-auto" },
  nav: {
    width: 380,
    height: 90,
    className: "h-8.5 w-auto sm:h-9.5 lg:h-11 xl:h-12",
  },
  footer: {
    width: 180,
    height: 42,
    className: "h-6.5 w-auto sm:h-7.5 lg:h-8",
  },
} as const;

export function BrandLogo({
  size = "md",
  className,
  priority,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  priority?: boolean;
}) {
  const dim = SIZES[size];

  return (
    <Image
      src="/mediqueue-logo.png"
      alt="MEDI·QUEUE"
      width={dim.width}
      height={dim.height}
      className={cn("object-contain object-left", dim.className, className)}
      style={{ width: "auto" }}
      priority={priority}
    />
  );
}
