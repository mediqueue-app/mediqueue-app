import type {
  AppointmentRead,
  AppointmentStatusApi,
  ClinicRead,
  DoctorRead,
} from "@/lib/api/types";
import type {
  AppointmentRequest,
  ClinicProfile,
  DashboardSummary,
  Doctor,
  RequestStatus,
  UpcomingAppointment,
} from "@/lib/clinic-mock";

const DOCTOR_TONES = [
  "from-sky-400 to-blue-500",
  "from-teal-400 to-emerald-500",
  "from-indigo-400 to-violet-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

const STATUS_TO_REQUEST: Record<AppointmentStatusApi, RequestStatus> = {
  pending: "pending",
  confirmed: "approved",
  alternative_date: "pending",
  cancelled: "rejected",
  arrived: "approved",
  completed: "approved",
};

const REQUEST_TO_STATUS: Record<RequestStatus, AppointmentStatusApi> = {
  pending: "pending",
  approved: "confirmed",
  rejected: "cancelled",
};

export function requestStatusToApi(status: RequestStatus): AppointmentStatusApi {
  return REQUEST_TO_STATUS[status];
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatApiDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Az önce";
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.floor(hours / 24);
  return `${days} gün önce`;
}

export function mapAppointmentToRequest(item: AppointmentRead): AppointmentRequest {
  return {
    id: String(item.id),
    patient: item.patient_name || `Hasta #${item.patient_id}`,
    initials: initials(item.patient_name || "H"),
    age: 0,
    gender: "Erkek",
    country: "—",
    city: "—",
    treatment: item.branch,
    symptom: item.notes ?? "—",
    requestedDate: formatApiDate(item.requested_date),
    budget: "—",
    language: "—",
    status: STATUS_TO_REQUEST[item.status] ?? "pending",
    createdAt: relativeTime(item.created_at),
  };
}

export function mapDoctorReadToUi(doctor: DoctorRead, index = 0): Doctor {
  const name = doctor.full_name.startsWith("Dr.")
    ? doctor.full_name
    : `Dr. ${doctor.full_name}`;

  return {
    id: String(doctor.id),
    name,
    initials: initials(doctor.full_name) || "DR",
    specialty: doctor.specialty || "—",
    experienceYears: doctor.experience ?? 0,
    startingPrice: doctor.price ?? 0,
    currency: "€",
    rating: doctor.rating ?? 0,
    reviewCount: 0,
    languages: doctor.languages?.length ? doctor.languages : ["Türkçe"],
    status: doctor.is_active ? "active" : "pending",
    tone: DOCTOR_TONES[index % DOCTOR_TONES.length],
  };
}

export function mapClinicReadToProfile(
  clinic: ClinicRead,
  base: ClinicProfile
): ClinicProfile {
  return {
    ...base,
    name: clinic.name,
    city: clinic.city || base.city,
    about: clinic.description || base.about,
    completion: base.completion,
    missingItems: base.missingItems,
  };
}

export function computeDashboardSummary(
  requests: AppointmentRequest[]
): DashboardSummary {
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;

  return {
    newRequests: pending,
    newRequestsDelta: 0,
    activePatients: approved,
    activePatientsDelta: 0,
    profileViews: 0,
    profileViewsDelta: 0,
    expectedRevenue: 0,
    expectedRevenueDelta: 0,
  };
}

export function mapAppointmentsToUpcoming(
  items: AppointmentRead[]
): UpcomingAppointment[] {
  return items
    .filter((item) => item.status === "confirmed" || item.status === "arrived")
    .slice(0, 5)
    .map((item) => ({
      id: String(item.id),
      time: new Date(item.requested_date).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      dateLabel: formatApiDate(item.requested_date),
      patient: item.patient_name,
      country: "—",
      treatment: item.branch,
      doctor: item.doctor_name ?? "—",
      mode: "Yüz yüze" as const,
    }));
}
