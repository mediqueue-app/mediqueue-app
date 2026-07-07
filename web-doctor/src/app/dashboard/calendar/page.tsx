import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarPageHeader } from "@/components/calendar/CalendarPageHeader";
import { fetchCalendarAppointments } from "@/lib/services/appointments";

export default async function CalendarPage() {
  const appointments = await fetchCalendarAppointments();

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <CalendarPageHeader appointments={appointments} />
      <CalendarView appointments={appointments} />
    </div>
  );
}
