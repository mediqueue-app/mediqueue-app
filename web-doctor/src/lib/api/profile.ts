import type { UserRead } from "@/lib/api/types";
import type { DoctorProfile, Language } from "@/types";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Backend'de GET /doctors/{id} yokken /auth/me ile profil kur. */
export function mapUserToDoctorProfile(user: UserRead): DoctorProfile {
  const fullName = user.full_name?.trim() || user.email.split("@")[0] || "Doktor";
  return {
    id: String(user.doctor_id ?? user.id),
    email: user.email,
    fullName,
    title: "Dr.",
    specialty: "—",
    languages: ["TR"] as Language[],
    bio: "",
    avatarInitials: initials(fullName) || "DR",
    rating: 0,
    reviewCount: 0,
  };
}
