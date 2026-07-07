import { DashboardHero, getNextAppointment } from "@/components/dashboard/DashboardHero";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { PatientQueue } from "@/components/dashboard/PatientQueue";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { fetchTodayAppointments } from "@/lib/services/appointments";
import {
  fetchQuickStats,
  fetchQueuePatient,
  fetchRecentActivities,
} from "@/lib/services/messages";
import { fetchCurrentDoctor } from "@/lib/services/doctor";

export default async function DashboardPage() {
  const [appointments, stats, queue, activities, doctor] = await Promise.all([
    fetchTodayAppointments(),
    fetchQuickStats(),
    fetchQueuePatient(),
    fetchRecentActivities(),
    fetchCurrentDoctor(),
  ]);

  const nextAppointment = getNextAppointment(appointments);

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <DashboardHero
        doctor={doctor}
        todayCount={appointments.length}
        pendingMessages={stats.pendingMessageCount}
        nextAppointment={nextAppointment}
      />

      <QuickStats {...stats} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:gap-6">
        <div className="xl:col-span-2">
          <TodaySchedule appointments={appointments} />
        </div>

        <div className="flex flex-col gap-5">
          <PatientQueue {...queue} />
          <QuickActions />
        </div>
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
