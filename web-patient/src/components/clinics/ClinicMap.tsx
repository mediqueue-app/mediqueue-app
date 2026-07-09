"use client";

import Link from "next/link";
import { MapPin, Plus, Minus, Navigation } from "lucide-react";
import type { Clinic } from "@/lib/mock-data";
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
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#eef2f9]",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#dbe3f0 1px, transparent 1px), linear-gradient(90deg, #dbe3f0 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#3a6ad6]/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 right-6 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-2 w-1/2 -rotate-12 rounded-full bg-white/70" />
      <div className="pointer-events-none absolute left-1/3 top-2/3 h-2 w-2/3 rotate-6 rounded-full bg-white/60" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-1/2 w-2 rounded-full bg-white/60" />

      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-black/5 backdrop-blur">
        <MapPin className="h-4 w-4 text-[#3a6ad6]" />
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
                  ? "bg-[#3a6ad6] text-white ring-[#3a6ad6]"
                  : "bg-white text-[#3a6ad6] ring-[#3a6ad6]/25"
              )}
            >
              {formatPrice(clinic.priceFrom)}
              <span
                className={cn(
                  "absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45",
                  isActive ? "bg-[#3a6ad6]" : "bg-white"
                )}
              />
            </span>
          </Link>
        );
      })}

      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50"
          aria-label="Yakınlaştır"
        >
          <Plus className="h-4 w-4" />
        </button>
        <span className="h-px w-full bg-slate-200" />
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50"
          aria-label="Uzaklaştır"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-[#3a6ad6] shadow-sm ring-1 ring-black/5 backdrop-blur hover:bg-white"
      >
        <Navigation className="h-4 w-4" />
        Konumumu bul
      </button>
    </div>
  );
}
