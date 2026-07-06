import { CalendarView } from "@/components/calendar/CalendarView";
import { fetchCalendarAppointments } from "@/lib/services/appointments";

export default async function CalendarPage() {
  const appointments = await fetchCalendarAppointments();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Takvim
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Randevularınızı görüntüleyin ve müsaitlik durumunuzu düzenleyin.
        </p>
      </div>
      <CalendarView appointments={appointments} />
    </div>
  );
}
