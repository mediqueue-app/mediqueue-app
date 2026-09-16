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
import {
  appointmentSlotTime,
  formatAppointmentClock,
  formatDate,
  formatRelativePast,
} from "@/lib/datetime";

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
    requestedDate: formatDate(item.requested_date, { style: "medium" }),
    budget: "—",
    language: "—",
    status: STATUS_TO_REQUEST[item.status] ?? "pending",
    createdAt: formatRelativePast(item.created_at),
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
    .map((item) => {
      const dateKey = item.requested_date.slice(0, 10);
      const slot = appointmentSlotTime(item.requested_date, item.notes);
      const clock = formatAppointmentClock(dateKey, slot);
      return {
        id: String(item.id),
        time: clock.clinicTime ?? "—",
        dateLabel: clock.date,
        patient: item.patient_name,
        country: "—",
        treatment: item.branch,
        doctor: item.doctor_name ?? "—",
        mode: "Yüz yüze" as const,
      };
    });
}
