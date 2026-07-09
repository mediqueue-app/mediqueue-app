import { apiFetch } from "@/lib/api/client";
import {
  buildActivities,
  buildTrend,
  computeMetrics,
  mapAppointmentToLead,
  mapClinicToProfile,
} from "@/lib/api/mappers";
import type { AppointmentRead, ClinicRead, ClinicUpdate } from "@/lib/api/types";
import { getToken, requireClinicId } from "@/lib/auth";
import type {
  ActivityItem,
  ClinicMetrics,
  ClinicProfile,
  PatientLead,
  TrendPoint,
} from "@/types";
import {
  getClinicMetrics,
  getClinicProfile,
  getLeadTrend,
  getPatientLeads,
  getPendingLeadCount,
  getRecentActivities,
  getTodayLeads,
} from "@/lib/mock-data";

function useApi(): boolean {
  return Boolean(getToken());
}

let cachedProfile: ClinicProfile | null = null;
let cachedPendingCount = 0;

export function getClinicProfileSync(): ClinicProfile {
  return cachedProfile ?? getClinicProfile();
}

export function setClinicProfileCache(profile: ClinicProfile): void {
  cachedProfile = profile;
}

export function getPendingLeadCountSync(): number {
  if (useApi()) return cachedPendingCount;
  return getPendingLeadCount(getPatientLeads());
}

export async function fetchClinicProfile(): Promise<ClinicProfile> {
  if (!useApi()) {
    const profile = getClinicProfile();
    cachedProfile = profile;
    return profile;
  }

  const clinicId = requireClinicId();
  const clinic = await apiFetch<ClinicRead>(`/clinics/${clinicId}`, {
    token: getToken(),
  });
  const profile = mapClinicToProfile(clinic);
  cachedProfile = profile;
  return profile;
}

export async function updateClinicProfile(
  patch: ClinicUpdate
): Promise<ClinicProfile> {
  const clinicId = requireClinicId();
  const clinic = await apiFetch<ClinicRead>(`/clinics/${clinicId}`, {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify(patch),
  });
  const profile = mapClinicToProfile(clinic);
  cachedProfile = profile;
  return profile;
}

export async function fetchDashboardOverview(): Promise<{
  leads: PatientLead[];
  pendingLeads: PatientLead[];
  metrics: ClinicMetrics;
  trend: TrendPoint[];
  activities: ActivityItem[];
}> {
  if (!useApi()) {
    const leads = getPatientLeads();
    const pendingLeads = leads
      .filter(
        (l) => l.status === "BEKLEMEDE" || l.status === "ALTERNATIF_TARIH"
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return {
      leads,
      pendingLeads,
      metrics: getClinicMetrics(leads),
      trend: getLeadTrend(),
      activities: getRecentActivities(),
    };
  }

  const clinicId = requireClinicId();
  const token = getToken();
  const [appointments, doctors] = await Promise.all([
    apiFetch<AppointmentRead[]>(`/clinics/${clinicId}/appointments`, { token }),
    apiFetch<{ id: number; is_active: boolean }[]>(
      `/clinics/${clinicId}/doctors`,
      { token }
    ),
  ]);

  const leads = appointments.map(mapAppointmentToLead);
  const pendingLeads = leads
    .filter(
      (l) => l.status === "BEKLEMEDE" || l.status === "ALTERNATIF_TARIH"
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  cachedPendingCount = leads.filter(
    (l) => l.status === "BEKLEMEDE" || l.status === "ALTERNATIF_TARIH"
  ).length;

  const activeDoctors = doctors.filter((d) => d.is_active).length;

  return {
    leads,
    pendingLeads,
    metrics: computeMetrics(leads, activeDoctors),
    trend: buildTrend(leads),
    activities: buildActivities(leads),
  };
}

export { getTodayLeads };
