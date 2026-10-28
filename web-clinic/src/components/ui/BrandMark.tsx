import { cn } from "@/lib/utils";

/** Square M mark for the browser tab, app icon, and collapsed sidebar. */
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
