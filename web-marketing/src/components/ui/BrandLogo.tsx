import Image from "next/image";
import { cn } from "@/lib/cn";

/** Wordmark aspect ratio ~4.75:1 — always scale via height + w-auto */
const SIZES = {
  xs: { width: 190, height: 40, className: "h-10 w-auto" },
  sm: { width: 238, height: 50, className: "h-12 w-auto" },
  md: { width: 285, height: 60, className: "h-[3.75rem] w-auto" },
  lg: { width: 333, height: 70, className: "h-[4.375rem] w-auto" },
  xl: { width: 380, height: 80, className: "h-20 w-auto" },
  nav: {
    width: 320,
    height: 68,
    className: "h-11 w-auto sm:h-12 lg:h-14 xl:h-[3.75rem]",
  },
  footer: {
    width: 280,
    height: 60,
    className: "h-11 w-auto sm:h-13 lg:h-[3.5rem]",
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
