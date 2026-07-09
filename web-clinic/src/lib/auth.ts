export const AUTH_TOKEN_KEY = "mq-clinic-token";
export const AUTH_USER_KEY = "mq-clinic-user";

export type ClinicUser = {
  name: string;
  clinicName: string;
  email: string;
  role: "clinic";
  initials: string;
};

export const DEMO_CLINIC_USER: ClinicUser = {
  name: "Dr. Elif Demir",
  clinicName: "Estetik International Hospital",
  email: "clinic@mediqueue.com",
  role: "clinic",
  initials: "ED",
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(): ClinicUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ClinicUser;
  } catch {
    return null;
  }
}

export function getCurrentClinicUser(): ClinicUser {
  return getStoredUser() ?? DEMO_CLINIC_USER;
}

export function setSession(user: ClinicUser): void {
  sessionStorage.setItem(AUTH_TOKEN_KEY, `demo-${Date.now()}`);
  sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

/**
 * Demo authentication. The clinic host panel ships with a seeded clinic
 * account; any non-empty credentials sign you in as that account.
 */
export async function login(email: string, password: string): Promise<ClinicUser> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  if (!email.trim() || !password.trim()) {
    throw new Error("E-posta ve şifre zorunludur.");
  }
  const user: ClinicUser = { ...DEMO_CLINIC_USER, email: email.trim() };
  setSession(user);
  return user;
}

export function logout(): void {
  clearSession();
}
