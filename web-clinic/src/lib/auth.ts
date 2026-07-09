import type { UserRead } from "@/lib/api/types";
import { apiFetch, loginRequest } from "@/lib/api/client";

export const AUTH_TOKEN_KEY = "mq-clinic-token";
export const AUTH_USER_KEY = "mq-clinic-user";

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
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function login(email: string, password: string): Promise<UserRead> {
  const token = await loginRequest(email, password);
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
