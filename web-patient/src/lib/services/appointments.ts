import { apiFetch } from "@/lib/api/client";
import type { Appointment } from "@/lib/api/types";
import { getToken } from "@/lib/auth";
import { ensurePatientProfile } from "@/lib/services/patients";

export type CreateAppointmentInput = {
  clinicId: number;
  doctorId?: number;
  branch: string;
  requestedDate: string;
  notes?: string;
};

/**
 * Giriş yapmış hastanın kendi randevularını getirir.
 * GET /v1/patients/me/appointments (Bearer token ile).
 */
export async function fetchMyAppointments(): Promise<Appointment[]> {
  const token = getToken();
  if (!token) {
    throw new Error("Oturum gerekli. Lütfen giriş yapın.");
  }

  return apiFetch<Appointment[]>("/patients/me/appointments", { token });
}

export async function cancelAppointment(id: number): Promise<Appointment> {
  const token = getToken();
  if (!token) {
    throw new Error("Oturum gerekli. Lütfen giriş yapın.");
  }

  return apiFetch<Appointment>(`/appointments/${id}/cancel`, {
    method: "POST",
    token,
  });
}

export async function createAppointment(
  input: CreateAppointmentInput
): Promise<Appointment> {
  const token = getToken();
  if (!token) {
    throw new Error("Oturum gerekli. Lütfen giriş yapın.");
  }

  const patient = await ensurePatientProfile();

  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    token,
    body: JSON.stringify({
      patient_id: patient.id,
      clinic_id: input.clinicId,
      doctor_id: input.doctorId ?? null,
      branch: input.branch,
      requested_date: input.requestedDate,
      notes: input.notes ?? null,
    }),
  });
}
