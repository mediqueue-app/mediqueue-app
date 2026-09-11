"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, CalendarDays, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ClinicRequestsPreview } from "@/components/product/ClinicRequestsPreview";
import { ComparePreview } from "@/components/patients/journey/ComparePreview";
import { DoctorSchedulePreview } from "@/components/product/DoctorSchedulePreview";
import { useLocale } from "@/lib/locale";

const ICONS = {
  clinic: Building2,
  patient: Search,
  doctor: CalendarDays,
} as const;

function DoorPreview({ type }: { type: "clinic" | "patient" | "doctor" }) {
  if (type === "clinic") {
    return (
      <div className="pointer-events-none origin-top scale-[0.95] opacity-95 transition-transform duration-500 group-hover:scale-[0.97]">
        <ClinicRequestsPreview compact />
      </div>
    );
  }
  if (type === "patient") {
    return (
      <div className="pointer-events-none origin-top scale-[0.95] opacity-95 transition-transform duration-500 group-hover:scale-[0.97]">
        <ComparePreview />
      </div>
    );
  }
  return (
    <div className="pointer-events-none origin-top scale-[0.95] opacity-95 transition-transform duration-500 group-hover:scale-[0.97]">
      <DoctorSchedulePreview />
    </div>
  );
}

export function HomeDoors() {
  const { t } = useLocale();
  const h = t.home;

  return (
    <section className="bg-mist py-20 md:py-24">
      <Container>
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {h.doorsEyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {h.doorsTitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {h.doors.map((door) => {
            const Icon = ICONS[door.preview];
            return (
              <Link
                key={door.href}
                href={door.href}
                className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white p-6 shadow-sm transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(12,26,61,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/[0.04] group-hover:via-transparent group-hover:to-accent/[0.06] group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform duration-500 group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-primary" />
                </div>

                <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {door.eyebrow}
                </p>
                <h3 className="relative mt-2 text-xl font-bold tracking-tight text-ink">
                  {door.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                  {door.body}
                </p>

                <div className="relative -mx-2 -mb-2 mt-6 overflow-hidden rounded-xl">
                  <DoorPreview type={door.preview} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
