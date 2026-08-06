const DEFAULT_BASE = "http://localhost:8000/v1";

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || DEFAULT_BASE
  );
}

function extractDetail(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((item) =>
          item && typeof item === "object" && "msg" in item
            ? String((item as { msg: unknown }).msg)
            : JSON.stringify(item)
        )
        .join("; ");
    }
    return JSON.stringify(detail);
  }
  return fallback;
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
    // Body is URLSearchParams / FormData — do not set JSON Content-Type.
  } else if (rest.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const timeoutMs = 12_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
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
    clearTimeout(timer);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError(408, "İstek zaman aşımına uğradı (backend yanıt vermiyor)");
    }
    throw err;
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
      body = text;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      extractDetail(body, response.statusText || `HTTP ${response.status}`)
    );
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
