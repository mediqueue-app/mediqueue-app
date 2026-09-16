import { cn } from "@/lib/utils";

/** Official MediQueue M tile. Use for chrome (nav, login, PWA). Not a Lucide stand-in. */
export function BrandMark({
  size = 36,
  className,
  alt = "MediQueue",
}: {
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/mediqueue-icon.png"
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-[22%]", className)}
      decoding="async"
    />
  );
}
