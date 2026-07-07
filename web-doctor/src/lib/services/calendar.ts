import type { AvailabilitySlot } from "@/types";
import { getAvailabilitySlots } from "@/lib/mock-data";

export async function fetchAvailabilitySlots(): Promise<AvailabilitySlot[]> {
  await delay(50);
  return getInitialAvailabilitySlots();
}

export function getInitialAvailabilitySlots(): AvailabilitySlot[] {
  return getAvailabilitySlots();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
