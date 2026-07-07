import type { Patient, PatientBranch, TreatmentStatus } from "@/types";

export const BRANCH_LABELS: Record<PatientBranch, string> = {
  dentistry: "Diş Tedavisi",
  hair_transplant: "Saç Ekimi",
  aesthetic: "Estetik Cerrahi",
  ophthalmology: "Göz",
  bariatric: "Bariatrik",
  orthopedics: "Ortopedi",
  ivf: "Tüp Bebek",
  cardiology: "Kardiyoloji",
};

export function getTimelineProgress(patient: Patient): {
  current: number;
  total: number;
  activeLabel: string;
  percent: number;
} {
  const total = patient.timeline.length;
  const activeStep = patient.timeline.find((s) => s.status === "AKTIF");
  const completed = patient.timeline.filter((s) => s.status === "TAMAMLANDI").length;
  const current = activeStep?.id ?? completed;
  const activeLabel = activeStep?.label ?? patient.timeline[total - 1]?.label ?? "";
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { current, total, activeLabel, percent };
}

export function countByTreatmentStatus(
  patients: Patient[],
  status: TreatmentStatus
): number {
  return patients.filter((p) => p.treatmentStatus === status).length;
}

export function formatLastVisit(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export type PatientSortKey = "name" | "lastVisit" | "status";

export function sortPatients(
  patients: Patient[],
  sortKey: PatientSortKey
): Patient[] {
  const list = [...patients];
  switch (sortKey) {
    case "name":
      return list.sort((a, b) => a.fullName.localeCompare(b.fullName, "tr"));
    case "lastVisit":
      return list.sort((a, b) => b.lastVisitDate.localeCompare(a.lastVisitDate));
    case "status": {
      const order: Record<TreatmentStatus, number> = {
        AKTIF: 0,
        BEKLEMEDE: 1,
        TAMAMLANDI: 2,
      };
      return list.sort(
        (a, b) => order[a.treatmentStatus] - order[b.treatmentStatus]
      );
    }
    default:
      return list;
  }
}

export const STATUS_ACCENT: Record<TreatmentStatus, string> = {
  AKTIF: "border-l-emerald-500",
  BEKLEMEDE: "border-l-amber-500",
  TAMAMLANDI: "border-l-slate-300",
};
