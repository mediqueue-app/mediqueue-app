import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { PatientQueue } from "@/components/dashboard/PatientQueue";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { fetchTodayAppointments } from "@/lib/services/appointments";
import {
  fetchQuickStats,
  fetchQueuePatient,
  fetchRecentActivities,
} from "@/lib/services/messages";
import { currentDoctor } from "@/lib/mock-data";

export default async function DashboardPage() {
  const [appointments, stats, queue, activities] = await Promise.all([
    fetchTodayAppointments(),
    fetchQuickStats(),
    fetchQueuePatient(),
    fetchRecentActivities(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Hoş geldiniz, {currentDoctor.title} {currentDoctor.fullName}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Bugünkü programınız ve hasta özetiniz.
        </p>
      </div>

      <QuickStats {...stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodaySchedule appointments={appointments} />
        </div>
        <PatientQueue {...queue} />
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
