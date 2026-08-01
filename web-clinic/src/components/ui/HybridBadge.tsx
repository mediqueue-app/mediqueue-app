import type { ReactNode } from "react";
import type { DataSource } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type SourceConfig = {
  label: string;
  tip: string;
  badge: string;
  dot: ReactNode;
};

const CONFIG: Record<DataSource, SourceConfig> = {
  api: {
    label: "Canlı API",
    tip: "Bu veriler canlı API sunucusundan alınmaktadır.",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
    ),
  },
  mock: {
    label: "Demo Veri",
    tip: "Bu veriler demo amaçlı örnek (mock) verilerdir.",
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: <span className="h-2 w-2 rounded-full bg-amber-400" />,
  },
  hybrid: {
    label: "Hibrit Veri",
    tip: "Canlı API verisi demo içerikle zenginleştirilmiştir.",
    badge: "bg-primary-light text-primary ring-primary/20",
    dot: <span className="h-2 w-2 rounded-full bg-primary" />,
  },
};

/**
 * Verinin kaynağını (canlı API / demo mock / hibrit) şeffafça belirten,
 * mevcut tasarım diliyle uyumlu küçük bir rozet. Salt görsel bir göstergedir;
 * mizanpajı, kaydırmayı veya mobil uyumluluğu etkilemez.
 */
export function HybridBadge({
  source,
  description,
  className,
}: {
  source: DataSource;
  /** Rozetin varsayılan açıklamasını (tooltip) geçersiz kılar. */
  description?: string;
  className?: string;
}) {
  const cfg = CONFIG[source];
  const tip = description ?? cfg.tip;

  return (
    <span className={cn("group relative inline-flex", className)}>
      <span
        title={tip}
        className={cn(
          "inline-flex cursor-default select-none items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
          cfg.badge
        )}
      >
        {cfg.dot}
        {cfg.label}
      </span>

      {/* Şık tooltip — akıştan bağımsız (absolute + pointer-events-none),
          bu yüzden mizanpajı/scroll'u bozmaz. Mobilde title fallback devreye girer. */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:block"
      >
        {tip}
        <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
}
