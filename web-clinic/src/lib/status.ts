import type { LeadStatus, DoctorStatus } from "@/types";
import type { BadgeTone } from "@/components/ui/Badge";

export const LEAD_STATUS_OPTIONS: Array<{
  value: LeadStatus | "TÜMÜ";
  label: string;
}> = [
  { value: "TÜMÜ", label: "Tümü" },
  { value: "BEKLEMEDE", label: "Beklemede" },
  { value: "ONAYLANDI", label: "Onaylandı" },
  { value: "ALTERNATIF_TARIH", label: "Alternatif Tarih" },
  { value: "IPTAL_EDILDI", label: "İptal Edildi" },
  { value: "TAMAMLANDI", label: "Tamamlandı" },
];

export function leadStatusTone(status: LeadStatus): BadgeTone {
  switch (status) {
    case "BEKLEMEDE":
      return "amber";
    case "ONAYLANDI":
      return "emerald";
    case "ALTERNATIF_TARIH":
      return "blue";
    case "IPTAL_EDILDI":
      return "red";
    case "TAMAMLANDI":
      return "slate";
  }
}

export function leadStatusLabel(status: LeadStatus): string {
  switch (status) {
    case "BEKLEMEDE":
      return "Beklemede";
    case "ONAYLANDI":
      return "Onaylandı";
    case "ALTERNATIF_TARIH":
      return "Alternatif Tarih";
    case "IPTAL_EDILDI":
      return "İptal Edildi";
    case "TAMAMLANDI":
      return "Tamamlandı";
  }
}

export function doctorStatusTone(status: DoctorStatus): BadgeTone {
  switch (status) {
    case "MÜSAİT":
      return "emerald";
    case "MOLADA":
      return "amber";
    case "DOLU":
      return "red";
  }
}

export function doctorStatusLabel(status: DoctorStatus): string {
  switch (status) {
    case "MÜSAİT":
      return "Müsait";
    case "MOLADA":
      return "Molada";
    case "DOLU":
      return "Dolu";
  }
}
