import { getToken } from "@/lib/auth";

/**
 * Hybrid API gate: returns true when a JWT exists in sessionStorage.
 *
 * - Real endpoints (login, /auth/me, clinics, appointments, doctors) call the
 *   backend when this is true.
 * - Modules without backend support always return mock data from clinic-mock /
 *   growth-mock regardless of this flag (see services/growth.ts, consultations.ts).
 */
export function useApi(): boolean {
  return Boolean(getToken());
}
