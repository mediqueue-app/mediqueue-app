import { ApiError, apiFetch } from "@/lib/api/client";
import type { Patient } from "@/lib/api/types";
import { getStoredUser, getToken } from "@/lib/auth";

export async function ensurePatientProfile(): Promise<Patient> {
  const token = getToken();
  if (!token) {
    throw new Error("Oturum gerekli. Lütfen giriş yapın.");
  }

  try {
    return await apiFetch<Patient>("/patients/me", { token });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      const user = getStoredUser();
      if (!user) {
        throw new Error("Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.");
      }

      const fullName = user.full_name?.trim() || user.email.split("@")[0];

      return apiFetch<Patient>("/patients", {
        method: "POST",
        token,
        body: JSON.stringify({
          full_name: fullName,
          email: user.email,
        }),
      });
    }
    throw err;
  }
}
