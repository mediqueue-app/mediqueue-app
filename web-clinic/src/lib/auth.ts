import type { UserRead } from "@/lib/api/types";
import { ApiError, apiFetch, loginRequest } from "@/lib/api/client";

export const AUTH_TOKEN_KEY = "mq-clinic-token";
export const AUTH_USER_KEY = "mq-clinic-user";
export const MOCK_SESSION_KEY = "mq-clinic-mock";

const DEMO_CLINIC_EMAIL = "clinic@mediqueue.com";
const DEMO_CLINIC_PASSWORD = "Demo1234!";

export type ClinicUser = {
  name: string;
  clinicName: string;
  email: string;
  role: "clinic";
  initials: string;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(): UserRead | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserRead;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: UserRead): void {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(MOCK_SESSION_KEY);
}

function mockClinicLogin(email: string, password: string): UserRead {
  const normalized = email.trim().toLowerCase();
  if (normalized !== DEMO_CLINIC_EMAIL || password !== DEMO_CLINIC_PASSWORD) {
    throw new Error(
      `Backend kapalıyken demo giriş: ${DEMO_CLINIC_EMAIL} / ${DEMO_CLINIC_PASSWORD}`
    );
  }

  const user: UserRead = {
    id: 1,
    email: normalized,
    full_name: "Demo Klinik Yöneticisi",
    role: "clinic",
    clinic_id: 1,
    doctor_id: null,
    is_active: true,
    created_at: new Date().toISOString(),
  };

  setSession("mock-local-dev-token", user);
  sessionStorage.setItem(MOCK_SESSION_KEY, "1");
  return user;
}

export function isMockSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(MOCK_SESSION_KEY) === "1";
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function login(email: string, password: string): Promise<UserRead> {
  try {
    const token = await loginRequest(email, password);
    sessionStorage.removeItem(MOCK_SESSION_KEY);
    const user = await apiFetch<UserRead>("/auth/me", {
      token: token.access_token,
    });

    if (user.role !== "clinic" && user.role !== "admin") {
      throw new Error("Bu portal yalnızca klinik hesapları içindir.");
    }
    if (user.role === "clinic" && user.clinic_id == null) {
      throw new Error("Klinik hesabına clinic_id atanmamış.");
    }

    setSession(token.access_token, user);
    return user;
  } catch (err) {
    if (
      err instanceof ApiError &&
      (err.status === 0 || err.status === 408 || err.status >= 500)
    ) {
      return mockClinicLogin(email, password);
    }
    throw err;
  }
}

export function logout(): void {
  clearSession();
}

export function requireClinicId(): number {
  const user = getStoredUser();
  if (user?.clinic_id != null) return user.clinic_id;
  throw new Error("Oturumda clinic_id yok. Tekrar giriş yapın.");
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function mapUserToClinicUser(
  user: UserRead,
  clinicName = "Klinik"
): ClinicUser {
  const displayName = user.full_name?.trim() || user.email.split("@")[0];
  return {
    name: displayName,
    clinicName,
    email: user.email,
    role: "clinic",
    initials: initials(displayName) || "KL",
  };
}

export function getCurrentClinicUser(): ClinicUser {
  const stored = getStoredUser();
  if (stored) {
    return mapUserToClinicUser(stored);
  }
  return {
    name: "Klinik Yöneticisi",
    clinicName: "Klinik",
    email: "",
    role: "clinic",
    initials: "KL",
  };
}
