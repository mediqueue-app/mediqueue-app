import type {
  AppointmentRead,
  AppointmentStatusApi,
  ClinicRead,
  DoctorRead,
  ReviewRead,
} from "@/lib/api/types";
import type {
  ActivityItem,
  ClinicMetrics,
  ClinicProfile,
  Doctor,
  Language,
  LeadStatus,
  PatientLead,
  PatientReview,
  TrendPoint,
} from "@/types";

const STATUS_TO_LEAD: Record<AppointmentStatusApi, LeadStatus> = {
  pending: "BEKLEMEDE",
  confirmed: "ONAYLANDI",
  alternative_date: "ALTERNATIF_TARIH",
  cancelled: "IPTAL_EDILDI",
  arrived: "ONAYLANDI",
  completed: "TAMAMLANDI",
};

const LEAD_TO_STATUS: Partial<Record<LeadStatus, AppointmentStatusApi>> = {
  BEKLEMEDE: "pending",
  ONAYLANDI: "confirmed",
  ALTERNATIF_TARIH: "alternative_date",
  IPTAL_EDILDI: "cancelled",
  TAMAMLANDI: "completed",
};

export function leadStatusToApi(status: LeadStatus): AppointmentStatusApi {
  return LEAD_TO_STATUS[status] ?? "pending";
}

export function mapAppointmentToLead(item: AppointmentRead): PatientLead {
  return {
    id: String(item.id),
    fullName: item.patient_name || `Hasta #${item.patient_id}`,
    country: "—",
    countryCode: "XX",
    branch: item.branch,
    requestedDate: item.requested_date,
    createdAt: item.created_at,
    status: STATUS_TO_LEAD[item.status] ?? "BEKLEMEDE",
    documents: [],
    phone: "—",
    email: "—",
    assignedDoctor: item.doctor_name ?? undefined,
    notes: item.notes ?? undefined,
  };
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function shortName(name: string): string {
  return name.length > 22 ? `${name.slice(0, 20)}…` : name;
}

const LANGUAGE_MAP: Record<string, Language> = {
  tr: "TR",
  turkish: "TR",
  türkçe: "TR",
  en: "EN",
  english: "EN",
  ar: "AR",
  arabic: "AR",
  arapça: "AR",
  ru: "RU",
  russian: "RU",
  de: "DE",
  german: "DE",
  almanca: "DE",
  fr: "FR",
  french: "FR",
  es: "ES",
  spanish: "ES",
};

export function mapLanguages(values: string[] | null | undefined): Language[] {
  if (!values?.length) return ["TR"];
  const mapped = values
    .map((value) => LANGUAGE_MAP[value.trim().toLowerCase()])
    .filter((value): value is Language => Boolean(value));
  return mapped.length ? Array.from(new Set(mapped)) : ["TR"];
}

export function mapClinicToProfile(clinic: ClinicRead): ClinicProfile {
  return {
    name: clinic.name,
    shortName: shortName(clinic.name),
    initials: initials(clinic.name) || "MQ",
    managerRole: "Klinik Yöneticisi",
    city: clinic.city || "—",
    phone: clinic.phone || "—",
    address: clinic.address || "—",
  };
}

export function mapDoctorRead(doctor: DoctorRead): Doctor {
  return {
    id: String(doctor.id),
    fullName: doctor.full_name,
    title: "Dr.",
    specialty: doctor.specialty || "—",
    languages: mapLanguages(doctor.languages),
    status: doctor.is_active ? "MÜSAİT" : "MOLADA",
    workingHours: { start: "09:00", end: "17:00" },
    patientsToday: 0,
    yearsExperience: doctor.experience ?? 0,
    avatarInitials: initials(doctor.full_name) || "DR",
    rating: doctor.rating ?? 0,
    reviewCount: 0,
    isActive: doctor.is_active,
    assignedPatientIds: [],
  };
}

export function mapReviewRead(review: ReviewRead): PatientReview {
  return {
    id: String(review.id),
    patientName: `Hasta #${review.patient_id}`,
    countryCode: "XX",
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at,
    doctorName: review.doctor_id ? `Doktor #${review.doctor_id}` : "—",
    service: "—",
  };
}

export function computeMetrics(
  leads: PatientLead[],
  activeDoctors: number
): ClinicMetrics {
  const approved = leads.filter(
    (l) => l.status === "ONAYLANDI" || l.status === "TAMAMLANDI"
  ).length;
  const approvalRate =
    leads.length === 0 ? 0 : Math.round((approved / leads.length) * 100);

  return {
    monthlyLeads: leads.length,
    monthlyLeadsDelta: 0,
    approvalRate,
    approvalRateDelta: 0,
    avgResponseHours: 0,
    avgResponseDelta: 0,
    activeDoctors,
    activeDoctorsDelta: 0,
  };
}

export function buildTrend(leads: PatientLead[]): TrendPoint[] {
  const buckets = new Map<string, number>();
  for (const lead of leads) {
    const key = lead.createdAt.slice(0, 10);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .map(([label, value]) => ({ label: label.slice(5), value }));
}

export function buildActivities(leads: PatientLead[]): ActivityItem[] {
  return [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8)
    .map((lead) => ({
      id: `act-${lead.id}`,
      title: lead.fullName,
      description: `${lead.branch} · ${lead.status}`,
      timestamp: lead.createdAt,
      tone:
        lead.status === "BEKLEMEDE"
          ? "warning"
          : lead.status === "ONAYLANDI" || lead.status === "TAMAMLANDI"
            ? "success"
            : "neutral",
    }));
}
