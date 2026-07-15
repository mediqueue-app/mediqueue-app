import { apiFetch, ApiError } from "@/lib/api/client";
import { mapAppointmentsToPatients } from "@/lib/api/mappers";
import type { AppointmentRead } from "@/lib/api/types";
import { clearSession, getToken, requireDoctorId } from "@/lib/auth";
import { getPatients } from "@/lib/mock-data";
import type { Patient, PatientFilterTab } from "@/types";

function useApi(): boolean {
  return Boolean(getToken());
}

export async function fetchPatients(
  filter: PatientFilterTab = "TUMU",
  search = ""
): Promise<Patient[]> {
  let result: Patient[];

  if (!useApi()) {
    result = getPatients();
  } else {
    try {
      const doctorId = requireDoctorId();
      const appointments = await apiFetch<AppointmentRead[]>(
        `/doctors/${doctorId}/appointments`,
        { token: getToken() }
      );
      result = mapAppointmentsToPatients(appointments);
      if (result.length === 0) {
        result = getPatients();
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearSession();
      }
      result = getPatients();
    }
  }

  if (filter === "AKTIF") {
    result = result.filter((p) => p.treatmentStatus === "AKTIF");
  } else if (filter === "GECMIS") {
    result = result.filter((p) => p.treatmentStatus === "TAMAMLANDI");
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((p) => p.fullName.toLowerCase().includes(q));
  }

  return result;
}

export async function fetchPatientById(id: string): Promise<Patient | null> {
  const patients = await fetchPatients("TUMU", "");
  return patients.find((p) => p.id === id) ?? null;
}
