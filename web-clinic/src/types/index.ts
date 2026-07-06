export type LeadStatus = "BEKLEMEDE" | "ONAYLANDI" | "REDDEDİLDİ";

export type DoctorStatus = "MÜSAİT" | "MOLADA" | "DOLU";

export type Language = "EN" | "AR" | "RU" | "DE" | "TR" | "FR" | "ES";

export type DocumentType = "PASAPORT" | "TIBBI_RAPOR" | "VIZE" | "SIGORTA";

export interface PatientDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: string;
  fileSizeKb: number;
}

export interface PatientLead {
  id: string;
  fullName: string;
  country: string;
  countryCode: string;
  branch: string;
  requestedDate: string;
  createdAt: string;
  status: LeadStatus;
  documents: PatientDocument[];
  phone: string;
  email: string;
  assignedDoctor?: string;
  notes?: string;
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface Doctor {
  id: string;
  fullName: string;
  title: string;
  specialty: string;
  languages: Language[];
  status: DoctorStatus;
  workingHours: WorkingHours;
  patientsToday: number;
  yearsExperience: number;
  avatarInitials: string;
}

export interface ClinicMetrics {
  todayLeads: number;
  approvedCount: number;
  activeDoctors: number;
  conversionRate: number;
}

export interface FunnelStage {
  label: string;
  value: number;
  suffix?: string;
  isRate?: boolean;
}

export interface RegionalComparison {
  region: string;
  period: string;
  clinicForeignPatients: number;
  regionAverageForeignPatients: number;
  percentAboveAverage: number;
}

export interface OriginShare {
  country: string;
  countryCode: string;
  percentage: number;
}

export interface BranchRevenueShare {
  branch: string;
  percentage: number;
}

export interface AiReviewSummary {
  positivePercentage: number;
  topKeyword: string;
  sampleSize: number;
}

export interface PlanFeature {
  title: string;
  description: string;
  free: string;
  premium: string;
}
