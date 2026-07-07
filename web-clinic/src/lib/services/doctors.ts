import type { Doctor } from "@/types";
import { getDoctors } from "@/lib/mock-data";

export async function fetchDoctors(): Promise<Doctor[]> {
  await delay(60);
  return getDoctors();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
