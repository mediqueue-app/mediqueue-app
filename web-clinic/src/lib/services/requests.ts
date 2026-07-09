/**
 * Appointment requests — hybrid: GET/PATCH /clinics/.../appointments when JWT present.
 */
import { apiFetch } from "@/lib/api/client";
import {
  mapAppointmentToRequest,
  requestStatusToApi,
} from "@/lib/api/mappers";
import type { AppointmentRead } from "@/lib/api/types";
import { getToken, requireClinicId } from "@/lib/auth";
import {
  appointmentRequests as mockRequests,
  type AppointmentRequest,
  type RequestStatus,
} from "@/lib/clinic-mock";
import { useApi } from "@/lib/services/shared";

let cachedRequests: AppointmentRequest[] | null = null;

export function getAppointmentRequestsSync(): AppointmentRequest[] {
  return cachedRequests ?? mockRequests;
}

export function getPendingRequestCountSync(): number {
  const requests = getAppointmentRequestsSync();
  return requests.filter((r) => r.status === "pending").length;
}

export async function fetchAppointmentRequests(): Promise<AppointmentRequest[]> {
  if (!useApi()) {
    cachedRequests = mockRequests;
    return mockRequests;
  }

  const clinicId = requireClinicId();
  const appointments = await apiFetch<AppointmentRead[]>(
    `/clinics/${clinicId}/appointments`,
    { token: getToken() }
  );
  const requests = appointments.map(mapAppointmentToRequest);
  cachedRequests = requests;
  return requests;
}

export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
): Promise<AppointmentRequest> {
  if (!useApi()) {
    const current = getAppointmentRequestsSync();
    const updated = current.map((item) =>
      item.id === requestId ? { ...item, status } : item
    );
    cachedRequests = updated;
    const found = updated.find((item) => item.id === requestId);
    if (!found) throw new Error("Talep bulunamadı");
    return found;
  }

  const updated = await apiFetch<AppointmentRead>(
    `/appointments/${requestId}/status`,
    {
      method: "PATCH",
      token: getToken(),
      body: JSON.stringify({ status: requestStatusToApi(status) }),
    }
  );
  const mapped = mapAppointmentToRequest(updated);
  cachedRequests = (cachedRequests ?? mockRequests).map((item) =>
    item.id === requestId ? mapped : item
  );
  return mapped;
}
