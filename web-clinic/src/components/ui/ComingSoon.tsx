import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Yakında" etiketi — premium SaaS panellerindeki gibi, backend'i henüz hazır
 * olmayan modülleri işaretler. Mevcut tasarım diliyle (primary / slate) uyumlu.
 */
function SoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary",
        className
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Yakında
    </span>
  );
}

/**
 * Bağımsız "Yakında aktif edilecek" kartı. Sahte veri gösteren bir kartın
 * yerine, aynı ızgara (grid) yuvasına oturacak şekilde tasarlanmıştır.
 * KpiCard ile aynı `rounded-2xl` gövde ölçüsünü korur.
 */
export function ComingSoonCard({
  title,
  description,
  icon: Icon,
  className,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 transition-colors hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-300">
            —
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-300 ring-1 ring-slate-200">
          {Icon ? (
            <Icon className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Sparkles className="h-5 w-5" strokeWidth={2} />
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <SoonPill />
        {description ? (
          <span className="text-xs text-slate-400">{description}</span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Mevcut bir modülün (örn. sahte veri içeren grafik) üzerine yerleştirilen
 * cam efektli katman. Alttaki içerik SİLİNMEZ; hafifçe bulanıklaştırılıp
 * etkileşim dışı bırakılır ve ortaya şık bir "Yakında aktif edilecek"
 * mesajı gelir. Katman `absolute inset-0` olduğundan mizanpajı bozmaz.
 */
export function ComingSoonOverlay({
  children,
  title = "Yakında Aktif Edilecek",
  description = "Bu modül canlı verilerle çok yakında hizmetinizde olacak.",
  className,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Alttaki gerçek modül — görünür ama bulanık ve etkileşim dışı. */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none blur-[3px] saturate-[0.85] opacity-60"
      >
        {children}
      </div>

      {/* Cam efektli örtü + mesaj. */}
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/40 p-6 backdrop-blur-[1px]">
        <div className="flex max-w-sm flex-col items-center rounded-2xl border border-slate-100 bg-white/90 px-6 py-6 text-center shadow-lg shadow-slate-900/5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Sparkles className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
          <SoonPill className="mt-4" />
        </div>
      </div>
    </div>
  );
}
