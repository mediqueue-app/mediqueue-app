"use client";

import Image from "next/image";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import type { Appointment } from "@/types";
import { HybridSourceBadge } from "@/components/shared/HybridSourceBadge";
import { countByStatus } from "@/lib/calendar-utils";
import { getToken } from "@/lib/auth";

const HERO =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1800&q=80";

export function CalendarPageHeader({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const thisWeek = appointments.length;
  const confirmed = countByStatus(appointments, "ONAYLANDI");
  const source = getToken() ? "api" : "mock";

  return (
    <section className="relative isolate min-h-[200px] overflow-hidden rounded-[1.75rem] sm:min-h-[220px]">
      <Image
        src={HERO}
        alt=""
        fill
        className="object-cover object-[center_35%]"
        sizes="(max-width: 1440px) 100vw, 1440px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-emerald-900/30" />

      <div className="relative flex h-full min-h-[200px] flex-col justify-between gap-6 p-6 sm:min-h-[220px] sm:p-8 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 ring-1 ring-white/20 backdrop-blur">
              Program
            </span>
            <HybridSourceBadge source={source} />
          </div>
          <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
            Takvim
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Randevularınızı görün, müsaitliği kalıcı kaydedin.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-white backdrop-blur-md">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/65">
              <CalendarDays className="h-3.5 w-3.5" />
              Randevu
            </div>
            <p className="mt-1 text-2xl font-bold">{thisWeek}</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/90 px-5 py-3 text-white shadow-lg shadow-emerald-900/20 backdrop-blur">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/80">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Onaylı
            </div>
            <p className="mt-1 text-2xl font-bold">{confirmed}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
