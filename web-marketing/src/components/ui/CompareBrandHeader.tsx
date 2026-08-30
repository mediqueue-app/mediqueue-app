import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/cn";

export function CompareBrandHeader({
  prefix,
  suffix,
  className,
}: {
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-1.5 gap-y-1", className)}>
      {prefix ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
          {prefix}
        </span>
      ) : null}
      <BrandLogo size="md" />
      {suffix ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
