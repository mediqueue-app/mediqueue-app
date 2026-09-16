import { apiFetch } from "@/lib/api/client";

export type AccountErasureRead = {
  status: "erased";
  erased_at: string;
  cancelled_appointments: number;
  redacted_messages: number;
};

export function requestAccountErasure(token: string): Promise<AccountErasureRead> {
  return apiFetch<AccountErasureRead>("/account/erasure", {
    method: "POST",
    token,
  });
}
