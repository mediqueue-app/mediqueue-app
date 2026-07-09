export const AUTH_TOKEN_KEY = "mq-admin-token";
export const AUTH_USER_KEY = "mq-admin-user";

export type AdminUser = {
  name: string;
  email: string;
  role: "superadmin";
  initials: string;
};

export const DEMO_ADMIN: AdminUser = {
  name: "Selin Yıldız",
  email: "admin@mediqueue.com",
  role: "superadmin",
  initials: "SY",
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function getCurrentAdmin(): AdminUser {
  return getStoredUser() ?? DEMO_ADMIN;
}

export function setSession(user: AdminUser): void {
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
 * Demo authentication. The admin marketplace panel ships with a seeded
 * super-admin account; any non-empty credentials sign you in as that account.
 */
export async function login(email: string, password: string): Promise<AdminUser> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  if (!email.trim() || !password.trim()) {
    throw new Error("E-posta ve şifre zorunludur.");
  }
  const user: AdminUser = { ...DEMO_ADMIN, email: email.trim() };
  setSession(user);
  return user;
}

export function logout(): void {
  clearSession();
}
