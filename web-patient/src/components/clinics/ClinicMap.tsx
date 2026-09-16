"use client";

import Link from "next/link";
import { MapPin, Plus, Minus, Navigation } from "lucide-react";
import type { Clinic } from "@/lib/mock-data";
import { useLocationPermission } from "@/components/ui/permission-gate";
import { cn, formatPrice } from "@/lib/utils";

const POSITIONS = [
  { top: "22%", left: "28%" },
  { top: "38%", left: "62%" },
  { top: "58%", left: "34%" },
  { top: "30%", left: "48%" },
  { top: "68%", left: "58%" },
  { top: "48%", left: "20%" },
  { top: "72%", left: "40%" },
  { top: "18%", left: "70%" },
  { top: "54%", left: "74%" },
  { top: "80%", left: "26%" },
];

export function ClinicMap({
  clinics,
  activeId,
  onHover,
  className,
}: {
  clinics: Clinic[];
  activeId?: string | null;
  onHover?: (id: string | null) => void;
  className?: string;
}) {
  const location = useLocationPermission();

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl border border-border bg-neutral-light",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 right-6 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-2 w-1/2 -rotate-12 rounded-full bg-surface/70" />
      <div className="pointer-events-none absolute left-1/3 top-2/3 h-2 w-2/3 rotate-6 rounded-full bg-surface/60" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-1/2 w-2 rounded-full bg-surface/60" />

      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm ring-1 ring-foreground/5 backdrop-blur">
        <MapPin className="h-4 w-4 text-primary" />
        Harita görünümü
      </div>

      {clinics.map((clinic, i) => {
        const pos = POSITIONS[i % POSITIONS.length];
        const isActive = activeId === clinic.id;
        return (
          <Link
            key={clinic.id}
            href={`/clinics/${clinic.id}`}
            onMouseEnter={() => onHover?.(clinic.id)}
            onMouseLeave={() => onHover?.(null)}
            style={{ top: pos.top, left: pos.left }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
              isActive ? "z-20 scale-110" : "z-10 hover:z-20 hover:scale-105"
            )}
          >
            <span
              className={cn(
                "relative flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold shadow-md ring-1 transition-colors",
                isActive
                  ? "bg-primary text-white ring-primary"
                  : location.located
                    ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                    : "bg-surface text-primary ring-primary/25"
              )}
            >
              {formatPrice(clinic.priceFrom)}
              <span
                className={cn(
                  "absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45",
                  isActive ? "bg-primary" : "bg-white"
                )}
              />
            </span>
          </Link>
        );
      })}

      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <button
          type="button"
          className="touch-slop flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50"
          aria-label="Yakınlaştır"
        >
          <Plus className="h-4 w-4" />
        </button>
        <span className="h-px w-full bg-slate-200" />
        <button
          type="button"
          className="touch-slop flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50"
          aria-label="Uzaklaştır"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={location.ask}
        className="absolute bottom-4 left-4 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-primary shadow-sm ring-1 ring-black/5 backdrop-blur hover:bg-white"
      >
        <Navigation className="h-4 w-4" />
        Konumumu bul
      </button>
      {location.message ? (
        <p className="absolute bottom-20 left-4 max-w-[240px] rounded-xl bg-white/95 px-3 py-2 text-[11px] font-medium text-slate-600 shadow-sm ring-1 ring-black/5">
          {location.message}
        </p>
      ) : null}
      {location.primer}
    </div>
  );
}
