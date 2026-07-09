/**
 * Clinic profile & dashboard — hybrid: API when JWT present, clinic-mock fallback.
 */
import { apiFetch } from "@/lib/api/client";
import {
  computeDashboardSummary,
  mapAppointmentsToUpcoming,
  mapClinicReadToProfile,
} from "@/lib/api/mappers";
import type { ClinicRead, ClinicUpdate, UserRead } from "@/lib/api/types";
import {
  getCurrentClinicUser,
  getStoredUser,
  getToken,
  mapUserToClinicUser,
  requireClinicId,
  setSession,
  type ClinicUser,
} from "@/lib/auth";
import {
  clinicProfile as mockClinicProfile,
  dashboardSummary as mockDashboardSummary,
  upcomingAppointments as mockUpcomingAppointments,
  type ClinicProfile,
  type DashboardSummary,
  type UpcomingAppointment,
} from "@/lib/clinic-mock";
import { useApi } from "@/lib/services/shared";

let cachedProfile: ClinicProfile | null = null;
let cachedClinicUser: ClinicUser | null = null;
let cachedPendingCount = 0;

export function getClinicProfileSync(): ClinicProfile {
  return cachedProfile ?? mockClinicProfile;
}

export function getClinicUserSync(): ClinicUser {
  return cachedClinicUser ?? getCurrentClinicUser();
}

export function getPendingRequestCountSync(): number {
  return cachedPendingCount;
}

export async function fetchClinicProfile(): Promise<ClinicProfile> {
  if (!useApi()) {
    cachedProfile = mockClinicProfile;
    return mockClinicProfile;
  }

  const clinicId = requireClinicId();
  const token = getToken();
  let user = getStoredUser();

  try {
    user = await apiFetch<UserRead>("/auth/me", { token });
    if (user) setSession(token!, user);
  } catch {
    // Continue with stored user if /auth/me fails transiently.
  }

  const clinic = await apiFetch<ClinicRead>(`/clinics/${clinicId}`, { token });
  const profile = mapClinicReadToProfile(clinic, mockClinicProfile);
  cachedProfile = profile;

  if (user) {
    cachedClinicUser = mapUserToClinicUser(user, clinic.name);
  }

  return profile;
}

export async function updateClinicProfile(
  patch: ClinicUpdate
): Promise<ClinicProfile> {
  if (!useApi()) {
    const profile = { ...getClinicProfileSync(), ...patch };
    cachedProfile = profile as ClinicProfile;
    return cachedProfile;
  }

  const clinicId = requireClinicId();
  const clinic = await apiFetch<ClinicRead>(`/clinics/${clinicId}`, {
    method: "PATCH",
    token: getToken(),
    body: JSON.stringify(patch),
  });
  const profile = mapClinicReadToProfile(clinic, mockClinicProfile);
  cachedProfile = profile;
  return profile;
}

export async function getClinicStats(): Promise<DashboardSummary> {
  if (!useApi()) {
    return mockDashboardSummary;
  }

  const { requests } = await import("@/lib/services/requests").then((m) =>
    m.fetchAppointmentRequests().then((requests) => ({ requests }))
  );
  return computeDashboardSummary(requests);
}

export async function fetchDashboardOverview(): Promise<{
  summary: DashboardSummary;
  profile: ClinicProfile;
  upcoming: UpcomingAppointment[];
  pendingCount: number;
}> {
  if (!useApi()) {
    const pending = (
      await import("@/lib/clinic-mock").then((m) => m.appointmentRequests)
    ).filter((r) => r.status === "pending").length;
    cachedPendingCount = pending;
    cachedProfile = mockClinicProfile;
    return {
      summary: mockDashboardSummary,
      profile: mockClinicProfile,
      upcoming: mockUpcomingAppointments,
      pendingCount: pending,
    };
  }

  const profile = await fetchClinicProfile();
  const requestsModule = await import("@/lib/services/requests");
  const requests = await requestsModule.fetchAppointmentRequests();
  cachedPendingCount = requests.filter((r) => r.status === "pending").length;

  const clinicId = requireClinicId();
  const appointments = await apiFetch<
    import("@/lib/api/types").AppointmentRead[]
  >(`/clinics/${clinicId}/appointments`, { token: getToken() });

  return {
    summary: computeDashboardSummary(requests),
    profile,
    upcoming: mapAppointmentsToUpcoming(appointments),
    pendingCount: cachedPendingCount,
  };
}
