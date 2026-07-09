/**
 * Pre-consultation inbox — mock-only (no backend endpoint yet).
 */
import {
  consultationRequests as mockConsultations,
  type ConsultationRequest,
} from "@/lib/clinic-mock";
import { useApi } from "@/lib/services/shared";

export async function fetchConsultationRequests(): Promise<
  ConsultationRequest[]
> {
  if (!useApi()) {
    return mockConsultations;
  }
  // Backend endpoint not yet available — return mock until integrated.
  return mockConsultations;
}

export async function updateConsultationQuote(
  id: string,
  quote: { quotedPrice: number; packageName: string }
): Promise<ConsultationRequest[]> {
  const current = await fetchConsultationRequests();
  return current.map((item) =>
    item.id === id
      ? { ...item, ...quote, status: "quoted" as const }
      : item
  );
}
