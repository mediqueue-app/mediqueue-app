import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { fetchDashboardOverview } from "@/lib/services/clinic";

export default async function DashboardOverviewPage() {
  const { leads, pendingLeads, metrics, trend, activities } =
    await fetchDashboardOverview();

  return (
    <DashboardOverview
      initialLeads={leads}
      initialPendingLeads={pendingLeads}
      initialMetrics={metrics}
      trend={trend}
      activities={activities}
    />
  );
}
