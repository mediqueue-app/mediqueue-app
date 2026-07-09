import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarCheck,
  ClipboardList,
  LifeBuoy,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { fetchDashboardData } from "@/lib/services/dashboard";
import { fetchClinicApplications } from "@/lib/services/applications";
import { fetchTickets } from "@/lib/services/feedback";
import { formatNumber, formatRelative, formatTRY } from "@/lib/utils";

const PRIORITY_TONE = {
  high: "danger",
  medium: "warning",
  low: "neutral",
} as const;

export default async function DashboardPage() {
  const [{ summary: s, growthData, revenueData, specialtyDemand }, clinicApplications, tickets] =
    await Promise.all([
      fetchDashboardData(),
      fetchClinicApplications(),
      fetchTickets(),
    ]);
  const pendingApps = clinicApplications
    .filter((a) => a.status === "pending")
    .slice(0, 4);
  const recentTickets = tickets.filter((t) => t.status !== "resolved").slice(0, 4);
  const maxDemand = Math.max(...specialtyDemand.map((d) => d.value));

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Genel Bakış"
        description="MediQueue pazar yerinin canlı sağlık durumu — hasta tabanı, klinik onayları, gelir ve operasyon."
        action={
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm sm:flex">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Tüm sistemler aktif</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Toplam Hasta"
          value={formatNumber(s.totalPatients)}
          icon={Users}
          delta={s.patientDelta}
          iconTone="primary"
        />
        <KpiCard
          label="Bekleyen Başvuru"
          value={s.pendingApplications}
          icon={ClipboardList}
          delta={s.applicationDelta}
          deltaSuffix=""
          deltaLabel="geçen haftaya göre"
          iconTone="amber"
        />
        <KpiCard
          label="Platform Geliri"
          value={formatTRY(s.platformRevenue)}
          icon={Banknote}
          delta={s.revenueDelta}
          iconTone="emerald"
        />
        <KpiCard
          label="Aktif Randevu"
          value={formatNumber(s.activeAppointments)}
          icon={CalendarCheck}
          delta={s.appointmentDelta}
          deltaLabel={`${formatNumber(s.completedAppointments)} tamamlandı`}
          iconTone="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <GrowthChart data={growthData} />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Talep Dağılımı
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Uzmanlık alanına göre hasta talebi
          </p>
          <ul className="mt-5 space-y-4">
            {specialtyDemand.map((item) => (
              <li key={item.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.name}</span>
                  <span className="font-semibold text-slate-900">
                    %{item.value}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(item.value / maxDemand) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart data={revenueData} />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Bekleyen Başvurular
            </h2>
            <Link
              href="/dashboard/applications"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Tümü
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2.5">
            {pendingApps.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/dashboard/applications/${app.id}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:border-primary/30 hover:bg-primary-light/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {app.clinicName}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {app.city} · {formatRelative(app.submittedAt)}
                    </p>
                  </div>
                  <StatusBadge label="İnceleme" tone="warning" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-900">
              Son Destek Talepleri
            </h2>
          </div>
          <Link
            href="/dashboard/feedback"
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
          >
            Tümü
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {recentTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  {ticket.subject}
                </p>
                <StatusBadge
                  label={
                    ticket.priority === "high"
                      ? "Yüksek"
                      : ticket.priority === "medium"
                        ? "Orta"
                        : "Düşük"
                  }
                  tone={PRIORITY_TONE[ticket.priority]}
                  dot={false}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {ticket.requesterName} ·{" "}
                {ticket.requesterType === "patient" ? "Hasta" : "Klinik"} ·{" "}
                {formatRelative(ticket.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
