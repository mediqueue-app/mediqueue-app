import type { AvailabilitySlot } from "@/types";
import { apiFetch } from "@/lib/api/client";
import { getToken, requireDoctorId } from "@/lib/auth";
import { getAvailabilitySlots } from "@/lib/mock-data";

export type DataSource = "api" | "mock";

interface AvailabilityDayApi {
  day_of_week: number;
  label: string;
  slots: { hour: string; available: boolean }[];
}

interface AvailabilityReadApi {
  days: AvailabilityDayApi[];
}

function useApi(): boolean {
  return Boolean(getToken());
}

export function isAvailabilityApi(): boolean {
  return useApi();
}

function mapFromApi(days: AvailabilityDayApi[]): AvailabilitySlot[] {
  return days.map((day) => ({
    dayOfWeek: day.day_of_week,
    label: day.label,
    slots: day.slots.map((slot) => ({
      hour: slot.hour,
      available: slot.available,
    })),
  }));
}

function mapToApi(slots: AvailabilitySlot[]): AvailabilityDayApi[] {
  return slots.map((day) => ({
    day_of_week: day.dayOfWeek,
    label: day.label,
    slots: day.slots.map((slot) => ({
      hour: slot.hour,
      available: slot.available,
    })),
  }));
}

/** Sync mock seed — used only as initial state before async load. */
export function getInitialAvailabilitySlots(): AvailabilitySlot[] {
  return getAvailabilitySlots();
}

export async function fetchAvailabilitySlots(): Promise<{
  slots: AvailabilitySlot[];
  source: DataSource;
}> {
  if (!useApi()) {
    return { slots: getAvailabilitySlots(), source: "mock" };
  }

  const doctorId = requireDoctorId();
  const data = await apiFetch<AvailabilityReadApi>(
    `/doctors/${doctorId}/availability`,
    { token: getToken() }
  );
  return { slots: mapFromApi(data.days), source: "api" };
}

export async function saveAvailabilitySlots(
  slots: AvailabilitySlot[]
): Promise<{ slots: AvailabilitySlot[]; source: DataSource }> {
  if (!useApi()) {
    return { slots, source: "mock" };
  }

  const doctorId = requireDoctorId();
  const data = await apiFetch<AvailabilityReadApi>(
    `/doctors/${doctorId}/availability`,
    {
      method: "PUT",
      token: getToken(),
      body: JSON.stringify({ days: mapToApi(slots) }),
    }
  );
  return { slots: mapFromApi(data.days), source: "api" };
}
