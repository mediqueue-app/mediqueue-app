import { apiFetch, ApiError } from "@/lib/api/client";
import { mapAppointment } from "@/lib/api/mappers";
import type { AppointmentRead } from "@/lib/api/types";
import { clearSession, getToken, requireDoctorId } from "@/lib/auth";
import {
  getCalendarAppointments,
  getTodayAppointments,
} from "@/lib/mock-data";
import type { Appointment } from "@/types";

function useApi(): boolean {
  return Boolean(getToken());
}

async function fetchAllAppointments(): Promise<Appointment[]> {
  if (!useApi()) {
    return getCalendarAppointments();
  }

  try {
    const doctorId = requireDoctorId();
    const items = await apiFetch<AppointmentRead[]>(
      `/doctors/${doctorId}/appointments`,
      { token: getToken() }
    );
    return items.map(mapAppointment);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      clearSession();
    }
    // Hybrid: API düşerse demo mock ile devam
    return getCalendarAppointments();
  }
}

export async function fetchTodayAppointments(): Promise<Appointment[]> {
  if (!useApi()) {
    return getTodayAppointments().sort((a, b) => a.time.localeCompare(b.time));
  }

  const today = new Date().toISOString().slice(0, 10);
  const all = await fetchAllAppointments();
  return all
    .filter((item) => item.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));
}

export async function fetchCalendarAppointments(): Promise<Appointment[]> {
  return fetchAllAppointments();
}

export async function fetchAppointmentsByDate(
  date: string
): Promise<Appointment[]> {
  const all = await fetchAllAppointments();
  return all.filter((item) => item.date === date);
}
