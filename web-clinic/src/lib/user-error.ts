import { tNow } from "@/lib/i18n-core";

export type FieldIssue = {
  field: string;
};

export class ApiError extends Error {
  status: number;
  code: string;
  fields: FieldIssue[];

  constructor(
    status: number,
    code: string,
    fields: FieldIssue[] = [],
    path = ""
  ) {
    super(toUserMessage(status, code, fields, path));
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

const FIELD_KEYS = [
  "email",
  "password",
  "full_name",
  "username",
  "phone",
  "requested_date",
  "alternative_date",
  "clinic_id",
  "doctor_id",
  "patient_id",
  "specialty",
  "language",
  "budget",
  "notes",
  "branch",
  "status",
] as const;

function fieldLabel(raw: string): string {
  if ((FIELD_KEYS as readonly string[]).includes(raw)) {
    return tNow(`fields.${raw}`);
  }
  return raw.replace(/_/g, " ");
}

function formatValidation(fields: FieldIssue[]): string {
  const labels = [...new Set(fields.map((f) => fieldLabel(f.field)).filter(Boolean))];
  if (labels.length === 0) {
    return tNow("errors.validationEmpty");
  }
  if (labels.length === 1) {
    return tNow("errors.validationOne", { field: labels[0] });
  }
  const last = labels[labels.length - 1];
  const rest = labels.slice(0, -1).join(", ");
  return tNow("errors.validationMany", { rest, last });
}

export function toUserMessage(
  status: number,
  code: string,
  fields: FieldIssue[] = [],
  path = ""
): string {
  if (status === 0 || status === 408) {
    return tNow("errors.network");
  }
  if (status === 401) {
    if (path.includes("/auth/login")) {
      return tNow("errors.loginBad");
    }
    return tNow("errors.session");
  }
  if (status === 403) {
    return tNow("errors.forbidden");
  }
  if (status === 404) {
    return tNow("errors.notFound");
  }
  if (code === "EMAIL_TAKEN") {
    return tNow("errors.emailTaken");
  }
  if (code === "DUPLICATE_APPOINTMENT") {
    return tNow("errors.dupAppt");
  }
  if (code === "DOCTOR_DATE_CONFLICT") {
    return tNow("errors.doctorConflict");
  }
  if (status === 409) {
    return tNow("errors.conflict");
  }
  if (status === 422 || code === "VALIDATION_ERROR") {
    return formatValidation(fields);
  }
  if (status === 429) {
    return tNow("errors.rateLimit");
  }
  if (status >= 500) {
    return tNow("errors.server");
  }
  return tNow("errors.generic");
}

export function toUserError(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (typeof DOMException !== "undefined" && err instanceof DOMException && err.name === "AbortError") {
    return toUserMessage(408, "TIMEOUT");
  }
  return toUserMessage(0, "NETWORK_ERROR");
}

export function isRetryableError(err: unknown): boolean {
  if (err instanceof ApiError) {
    return err.status === 0 || err.status === 408 || err.status >= 500;
  }
  return true;
}

export function isTimeoutOrNetwork(err: unknown): boolean {
  return err instanceof ApiError && (err.status === 0 || err.status === 408);
}

export function parseFieldIssues(details: unknown): FieldIssue[] {
  if (!Array.isArray(details)) return [];
  const fields: FieldIssue[] = [];
  for (const item of details) {
    if (!item || typeof item !== "object") continue;
    const loc = (item as { loc?: unknown }).loc;
    if (!Array.isArray(loc)) continue;
    const last = [...loc]
      .reverse()
      .find((part) => typeof part === "string" && part !== "body");
    if (typeof last === "string") fields.push({ field: last });
  }
  return fields;
}

export function errorFromResponseBody(
  status: number,
  body: unknown,
  path: string
): ApiError {
  let code = `HTTP_${status}`;
  let details: unknown;
  if (body && typeof body === "object") {
    const rec = body as Record<string, unknown>;
    const nested = rec.error;
    if (nested && typeof nested === "object") {
      const err = nested as Record<string, unknown>;
      if (typeof err.code === "string") code = err.code;
      details = err.details;
    } else if (Array.isArray(rec.detail)) {
      code = "VALIDATION_ERROR";
      details = rec.detail;
    }
  }
  return new ApiError(status, code, parseFieldIssues(details), path);
}
