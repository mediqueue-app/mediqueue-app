import { apiFetch } from "@/lib/api/client";
import {
  leadStatusToApi,
  mapAppointmentToLead,
} from "@/lib/api/mappers";
import type { AppointmentRead } from "@/lib/api/types";
import { getToken, requireClinicId } from "@/lib/auth";
import { getPatientLeads } from "@/lib/mock-data";
import type { LeadStatus, PatientLead } from "@/types";

function useApi(): boolean {
  return Boolean(getToken());
}

export async function fetchPatientLeads(): Promise<PatientLead[]> {
  if (!useApi()) {
    return getPatientLeads();
  }

  const clinicId = requireClinicId();
  const appointments = await apiFetch<AppointmentRead[]>(
    `/clinics/${clinicId}/appointments`,
    { token: getToken() }
  );
  return appointments.map(mapAppointmentToLead);
}

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
  alternativeDate?: string
): Promise<PatientLead> {
  if (!useApi()) {
    const lead = getPatientLeads().find((item) => item.id === leadId);
    if (!lead) throw new Error("Lead bulunamadı");
    return { ...lead, status };
  }

  const body: { status: string; alternative_date?: string } = {
    status: leadStatusToApi(status),
  };
  if (status === "ALTERNATIF_TARIH") {
    body.alternative_date =
      alternativeDate || new Date().toISOString().slice(0, 10);
  }

  const updated = await apiFetch<AppointmentRead>(
    `/appointments/${leadId}/status`,
    {
      method: "PATCH",
      token: getToken(),
      body: JSON.stringify(body),
    }
  );
  return mapAppointmentToLead(updated);
}
