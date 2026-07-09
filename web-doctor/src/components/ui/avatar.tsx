import { getInitials } from "@/lib/ui";

const sizeStyles = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
} as const;

export function Avatar({
  name,
  size = "md",
  className = "",
}: {
  name: string;
  size?: keyof typeof sizeStyles;
  className?: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ring-1 ring-primary/15 ${sizeStyles[size]} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
