import type { DoctorStatus, LeadStatus } from "@/types";
import type { BadgeTone } from "@/components/ui/Badge";

export function leadStatusTone(status: LeadStatus): BadgeTone {
  switch (status) {
    case "BEKLEMEDE":
      return "amber";
    case "ONAYLANDI":
      return "emerald";
    case "REDDEDİLDİ":
      return "red";
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
      return "Dolu (Ameliyatta)";
  }
}
