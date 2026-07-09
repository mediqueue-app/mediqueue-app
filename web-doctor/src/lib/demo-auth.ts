export const DEMO_AUTH_KEY = "mq-demo-auth";

export function setDemoAuthenticated(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(DEMO_AUTH_KEY, "1");
  }
}

export function clearDemoAuthenticated(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(DEMO_AUTH_KEY);
  }
}

export function isDemoAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(DEMO_AUTH_KEY) === "1";
}
