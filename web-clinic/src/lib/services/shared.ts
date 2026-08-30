import { getToken, isMockSession } from "@/lib/auth";

/**
 * Hybrid API gate: returns true when a JWT exists in sessionStorage.
 *
 * - Real endpoints (login, /auth/me, clinics, appointments, doctors) call the
 *   backend when this is true.
 * - Mock/demo sessions (backend unavailable) always use clinic-mock data.
 * - Modules without backend support always return mock data from clinic-mock /
 *   growth-mock regardless of this flag (see services/growth.ts, consultations.ts).
 */
export function useApi(): boolean {
  if (isMockSession()) return false;
  return Boolean(getToken());
}
