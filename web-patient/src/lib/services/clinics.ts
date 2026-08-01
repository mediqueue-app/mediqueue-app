import { apiFetch } from "@/lib/api/client";
import type { ClinicRead, DataSource, DoctorRead } from "@/lib/api/types";
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

/** Veri ile birlikte kaynağını (api/mock) taşıyan sarmalayıcı. */
export type Sourced<T> = { data: T; source: DataSource };

export async function fetchClinics(): Promise<Sourced<Clinic[]>> {
  const token = getToken();
  if (!token) return { data: mockClinics, source: "mock" };

  try {
    const rows = await apiFetch<ClinicRead[]>("/clinics", { token });
    const data = rows.map((row) => {
      const fallback = mockClinicByNumericId(row.id);
      return mapClinicReadToUi(row, fallback);
    });
    return { data, source: "api" };
  } catch {
    return { data: mockClinics, source: "mock" };
  }
}

export async function fetchClinic(id: number): Promise<Sourced<Clinic | null>> {
  const token = getToken();
  if (!token) return { data: mockClinicByNumericId(id) ?? null, source: "mock" };

  try {
    const row = await apiFetch<ClinicRead>(`/clinics/${id}`, { token });
    const fallback = mockClinicByNumericId(id);
    return { data: mapClinicReadToUi(row, fallback), source: "api" };
  } catch {
    return { data: mockClinicByNumericId(id) ?? null, source: "mock" };
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
