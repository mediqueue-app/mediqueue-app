import { CalendarDays } from "lucide-react";
import type { Appointment } from "@/types";
import { countByStatus } from "@/lib/calendar-utils";

export function CalendarPageHeader({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const thisWeek = appointments.length;
  const confirmed = countByStatus(appointments, "ONAYLANDI");

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between lg:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">
              Takvim
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Randevularınızı görüntüleyin ve müsaitlik durumunuzu düzenleyin.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
            <p className="text-lg font-semibold text-slate-900">{thisWeek}</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Randevu
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-center">
            <p className="text-lg font-semibold text-emerald-700">{confirmed}</p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-600/70">
              Onaylı
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
