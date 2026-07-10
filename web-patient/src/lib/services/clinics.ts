import { apiFetch } from "@/lib/api/client";
import type { ClinicRead, DoctorRead } from "@/lib/api/types";
import { getToken } from "@/lib/auth";
import { mapClinicReadToUi, mapDoctorReadToUi } from "@/lib/mappers";
import {
  clinics as mockClinics,
  getClinic as getMockClinic,
  getDoctorsForClinic as getMockDoctorsForClinic,
  type Clinic,
  type Doctor,
} from "@/lib/mock-data";

function mockClinicByNumericId(id: number): Clinic | undefined {
  return (
    getMockClinic(`c-${id}`) ??
    getMockClinic(String(id)) ??
    mockClinics.find((c) => c.apiId === id)
  );
}

function mockDoctorsByNumericClinicId(id: number): Doctor[] {
  return (
    getMockDoctorsForClinic(`c-${id}`) ??
    getMockDoctorsForClinic(String(id)) ??
    []
  );
}

export async function fetchClinics(): Promise<Clinic[]> {
  const token = getToken();
  if (!token) return mockClinics;

  try {
    const rows = await apiFetch<ClinicRead[]>("/clinics", { token });
    return rows.map((row) => {
      const fallback = mockClinicByNumericId(row.id);
      return mapClinicReadToUi(row, fallback);
    });
  } catch {
    return mockClinics;
  }
}

export async function fetchClinic(id: number): Promise<Clinic | null> {
  const token = getToken();
  if (!token) return mockClinicByNumericId(id) ?? null;

  try {
    const row = await apiFetch<ClinicRead>(`/clinics/${id}`, { token });
    const fallback = mockClinicByNumericId(id);
    return mapClinicReadToUi(row, fallback);
  } catch {
    return mockClinicByNumericId(id) ?? null;
  }
}

export async function fetchClinicDoctors(id: number): Promise<Doctor[]> {
  const token = getToken();
  if (!token) return mockDoctorsByNumericClinicId(id);

  try {
    const rows = await apiFetch<DoctorRead[]>(`/clinics/${id}/doctors`, {
      token,
    });
    return rows.map((row, index) => mapDoctorReadToUi(row, id, index));
  } catch {
    return mockDoctorsByNumericClinicId(id);
  }
}
