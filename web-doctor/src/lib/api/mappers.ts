import type {
  AppointmentRead,
  AppointmentStatusApi,
  DoctorRead,
} from "@/lib/api/types";
import type {
  Appointment,
  AppointmentStatus,
  DoctorProfile,
  Language,
  Patient,
  PatientBranch,
  TreatmentStatus,
} from "@/types";

const STATUS_MAP: Record<AppointmentStatusApi, AppointmentStatus> = {
  pending: "BEKLIYOR",
  confirmed: "ONAYLANDI",
  alternative_date: "BEKLIYOR",
  cancelled: "IPTAL",
  arrived: "ONAYLANDI",
  completed: "TAMAMLANDI",
};

const LANGUAGE_MAP: Record<string, Language> = {
  tr: "TR",
  turkish: "TR",
  türkçe: "TR",
  en: "EN",
  english: "EN",
  ar: "AR",
  arabic: "AR",
  ru: "RU",
  russian: "RU",
  de: "DE",
  german: "DE",
  fr: "FR",
  french: "FR",
};

const BRANCH_MAP: Record<string, PatientBranch> = {
  dentistry: "dentistry",
  diş: "dentistry",
  "diş tedavisi": "dentistry",
  dental: "dentistry",
  hair_transplant: "hair_transplant",
  "saç ekimi": "hair_transplant",
  aesthetic: "aesthetic",
  "estetik cerrahi": "aesthetic",
  ophthalmology: "ophthalmology",
  "göz (lasik)": "ophthalmology",
  bariatric: "bariatric",
  "bariatrik cerrahi": "bariatric",
  orthopedics: "orthopedics",
  ortopedi: "orthopedics",
  ivf: "ivf",
  "tüp bebek (ivf)": "ivf",
  cardiology: "cardiology",
  kardiyoloji: "cardiology",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function mapLanguages(values: string[] | null | undefined): Language[] {
  if (!values?.length) return ["TR"];
  const mapped = values
    .map((value) => LANGUAGE_MAP[value.trim().toLowerCase()])
    .filter((value): value is Language => Boolean(value));
  return mapped.length ? Array.from(new Set(mapped)) : ["TR"];
}

export function mapDoctorProfile(
  doctor: DoctorRead,
  email: string
): DoctorProfile {
  return {
    id: String(doctor.id),
    email,
    fullName: doctor.full_name,
    title: "Dr.",
    specialty: doctor.specialty || "—",
    languages: mapLanguages(doctor.languages),
    bio: doctor.bio || "",
    avatarInitials: initials(doctor.full_name) || "DR",
    rating: doctor.rating ?? 0,
    reviewCount: 0,
  };
}

export function mapAppointment(item: AppointmentRead): Appointment {
  const date = item.requested_date.slice(0, 10);
  const time =
    item.requested_date.length > 10
      ? item.requested_date.slice(11, 16) || "09:00"
      : "09:00";

  return {
    id: String(item.id),
    patientId: String(item.patient_id),
    patientName: item.patient_name || `Hasta #${item.patient_id}`,
    date,
    time,
    treatmentType: item.branch,
    status: STATUS_MAP[item.status] ?? "BEKLIYOR",
    durationMinutes: 30,
  };
}

function mapBranch(branch: string): PatientBranch {
  return BRANCH_MAP[branch.trim().toLowerCase()] ?? "aesthetic";
}

function treatmentStatusFromAppointments(
  items: AppointmentRead[]
): TreatmentStatus {
  if (items.some((item) => item.status === "pending" || item.status === "confirmed" || item.status === "arrived")) {
    return "AKTIF";
  }
  if (items.some((item) => item.status === "completed")) {
    return "TAMAMLANDI";
  }
  return "BEKLEMEDE";
}

export function mapAppointmentsToPatients(
  appointments: AppointmentRead[]
): Patient[] {
  const byPatient = new Map<number, AppointmentRead[]>();
  for (const item of appointments) {
    const list = byPatient.get(item.patient_id) ?? [];
    list.push(item);
    byPatient.set(item.patient_id, list);
  }

  return Array.from(byPatient.entries()).map(([patientId, items]) => {
    const latest = [...items].sort((a, b) =>
      b.requested_date.localeCompare(a.requested_date)
    )[0];
    const name = latest.patient_name || `Hasta #${patientId}`;

    return {
      id: String(patientId),
      fullName: name,
      age: 0,
      gender: "—",
      nationality: "—",
      countryCode: "XX",
      languages: ["TR"],
      phone: "—",
      email: "—",
      branch: mapBranch(latest.branch),
      treatmentType: latest.branch,
      treatmentStatus: treatmentStatusFromAppointments(items),
      lastVisitDate: latest.requested_date.slice(0, 10),
      avatarInitials: initials(name) || "H",
      timeline: [],
      documents: [],
      medicalNotes: [],
      appointmentHistory: items.map((item) => ({
        id: String(item.id),
        date: item.requested_date.slice(0, 10),
        time: "09:00",
        treatmentType: item.branch,
        status: STATUS_MAP[item.status] ?? "BEKLIYOR",
        outcomeNote: item.notes ?? undefined,
      })),
    };
  });
}
