import type { Appointment, ClinicRead, DoctorRead, Patient } from "@/lib/api/types";
import type { Clinic, Doctor, Gender } from "@/lib/mock-data";

const CLINIC_COVER_PLACEHOLDER =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80";

const DOCTOR_PHOTO_PLACEHOLDER =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&facepad=2.5&w=700&h=880&q=80";

function slugify(name: string, id: number): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return base || `clinic-${id}`;
}

export function mapClinicReadToUi(
  clinic: ClinicRead,
  fallback?: Clinic
): Clinic {
  const apiId = clinic.id;
  return {
    id: String(apiId),
    apiId,
    name: clinic.name,
    slug: fallback?.slug ?? slugify(clinic.name, apiId),
    city: clinic.city ?? fallback?.city ?? "İstanbul",
    district: fallback?.district ?? clinic.city ?? "—",
    address: clinic.address ?? fallback?.address ?? "—",
    rating: fallback?.rating ?? 4.8,
    reviewCount: fallback?.reviewCount ?? 0,
    coverImage: fallback?.coverImage ?? CLINIC_COVER_PLACEHOLDER,
    gallery: fallback?.gallery ?? [CLINIC_COVER_PLACEHOLDER],
    specialties: fallback?.specialties ?? ["Genel Sağlık"],
    priceFrom: fallback?.priceFrom ?? 1000,
    priceTo: fallback?.priceTo ?? fallback?.priceFrom ?? 5000,
    about: clinic.description ?? fallback?.about ?? "",
    amenities:
      fallback?.amenities ??
      (clinic.languages?.length
        ? [`${clinic.languages.join(", ")} dilli ekip`]
        : []),
    doctorIds: fallback?.doctorIds ?? [],
    reviews: fallback?.reviews ?? [],
  };
}

export function mapDoctorReadToUi(
  doctor: DoctorRead,
  clinicId: number,
  index = 0
): Doctor {
  const apiId = doctor.id;
  const name = doctor.full_name.startsWith("Dr.")
    ? doctor.full_name
    : `Dr. ${doctor.full_name}`;
  const gender: Gender = index % 2 === 0 ? "male" : "female";

  return {
    id: String(apiId),
    apiId,
    clinicApiId: clinicId,
    name,
    gender,
    title: doctor.specialty ?? "Uzman Hekim",
    specialty: doctor.specialty ?? "Genel",
    photo: DOCTOR_PHOTO_PLACEHOLDER,
    rating: doctor.rating ?? 4.8,
    reviewCount: 0,
    experienceYears: doctor.experience ?? 0,
    city: doctor.city ?? "İstanbul",
    clinicId: String(clinicId),
    languages: doctor.languages?.length ? doctor.languages : ["Türkçe"],
    education: [],
    about: doctor.bio ?? "",
    focusAreas: doctor.specialty ? [doctor.specialty] : [],
    priceFrom: doctor.price ?? 0,
    nextAvailable: "Yakında",
    reviews: [],
  };
}

export function mapPatientReadToUi(_patient: Patient): unknown {
  return null;
}

export function mapAppointmentReadToUi(_appointment: Appointment): unknown {
  return null;
}
