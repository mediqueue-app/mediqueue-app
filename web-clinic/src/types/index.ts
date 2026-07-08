export type LeadStatus =
  | "BEKLEMEDE"
  | "ONAYLANDI"
  | "ALTERNATIF_TARIH"
  | "IPTAL_EDILDI"
  | "TAMAMLANDI";

export type DoctorStatus = "MÜSAİT" | "MOLADA" | "DOLU";

export type Language = "EN" | "AR" | "RU" | "DE" | "TR" | "FR" | "ES";

export type DocumentType = "PASAPORT" | "TIBBI_RAPOR" | "VIZE" | "SIGORTA";

export type Specialty =
  | "Estetik Cerrahi"
  | "Saç Ekimi"
  | "Diş Tedavisi"
  | "Tüp Bebek (IVF)"
  | "Bariatrik Cerrahi"
  | "Ortopedi"
  | "Göz (LASIK)"
  | "Kardiyoloji";

export interface PatientDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: string;
  fileSizeKb: number;
}

export interface ContactMessage {
  id: string;
  direction: "INBOUND" | "OUTBOUND";
  channel: "EMAIL" | "WHATSAPP" | "PORTAL";
  preview: string;
  sentAt: string;
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
  responseTimeHours?: number;
  contactHistory?: ContactMessage[];
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
  rating: number;
  reviewCount: number;
  isActive: boolean;
  assignedPatientIds: string[];
}

export interface ClinicMetrics {
  monthlyLeads: number;
  monthlyLeadsDelta: number;
  approvalRate: number;
  approvalRateDelta: number;
  avgResponseHours: number;
  avgResponseDelta: number;
  activeDoctors: number;
  activeDoctorsDelta: number;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  tone: "primary" | "success" | "warning" | "neutral";
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

export interface TreatmentDemand {
  branch: string;
  count: number;
}

export interface PatientReview {
  id: string;
  patientName: string;
  countryCode: string;
  rating: number;
  comment: string;
  createdAt: string;
  doctorName: string;
  service: string;
}

export interface AiReviewSummary {
  positivePercentage: number;
  topKeyword: string;
  sampleSize: number;
  themes: string[];
}

export interface PlanFeature {
  title: string;
  description: string;
  free: string;
  premium: string;
}

export interface ClinicProfile {
  name: string;
  shortName: string;
  initials: string;
  managerRole: string;
  city: string;
  phone: string;
  address: string;
}

export interface NotificationPreferences {
  emailLeads: boolean;
  emailReviews: boolean;
  inAppLeads: boolean;
  inAppReviews: boolean;
}
