import { ApiError, errorFromResponseBody } from "@/lib/user-error";

export { ApiError, toUserError, isRetryableError, isTimeoutOrNetwork } from "@/lib/user-error";

const DEFAULT_BASE = "http://localhost:8000/v1";
const DEFAULT_TIMEOUT_MS = 12_000;

export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || DEFAULT_BASE
  );
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string | null; form?: boolean } = {}
): Promise<T> {
  const { token, form, headers: initHeaders, signal, ...rest } = options;
  const headers = new Headers(initHeaders);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (form) {
    // Body is URLSearchParams / FormData
  } else if (rest.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...rest,
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    if (typeof DOMException !== "undefined" && err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError(408, "TIMEOUT", [], path);
    }
    throw new ApiError(0, "NETWORK_ERROR", [], path);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    throw errorFromResponseBody(response.status, body, path);
  }

  return body as T;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<{ access_token: string; token_type: string }> {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);

  return apiFetch("/auth/login", {
    method: "POST",
    form: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}
