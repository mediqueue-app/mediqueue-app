import type { Appointment } from "@/types";
import {
  getCalendarAppointments,
  getTodayAppointments,
} from "@/lib/mock-data";

export async function fetchTodayAppointments(): Promise<Appointment[]> {
  await delay(60);
  return getTodayAppointments().sort((a, b) => a.time.localeCompare(b.time));
}

export async function fetchCalendarAppointments(): Promise<Appointment[]> {
  await delay(80);
  return getCalendarAppointments();
}

export async function fetchAppointmentsByDate(
  date: string
): Promise<Appointment[]> {
  await delay(50);
  return getCalendarAppointments().filter((a) => a.date === date);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
