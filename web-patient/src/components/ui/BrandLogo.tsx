import { cn } from "@/lib/utils";

/** Official MEDI·QUEUE wordmark. The M tile is only the browser tab icon. */
export function BrandLogo({
  className,
  alt = "MEDI·QUEUE",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/mediqueue-logo.png"
      alt={alt}
      width={1024}
      height={241}
      className={cn("h-8 w-auto", className)}
      decoding="async"
    />
  );
}
