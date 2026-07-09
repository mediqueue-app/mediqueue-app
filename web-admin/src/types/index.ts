export type ApplicationStatus = "pending" | "approved" | "rejected";
export type EntityStatus = "active" | "passive";
export type PatientStatus = "active" | "inactive" | "banned";
export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "low" | "medium" | "high";
export type DocumentStatus = "verified" | "unverified";

export type ClinicDocument = {
  id: string;
  label: string;
  type: "tax" | "accreditation" | "license" | "insurance" | "identity";
  fileName: string;
  fileSizeKb: number;
  status: DocumentStatus;
};

export type ClinicApplication = {
  id: string;
  clinicName: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  countryCode: string;
  specialties: string[];
  taxId: string;
  bedCount: number;
  foundedYear: number;
  website: string;
  about: string;
  submittedAt: string;
  status: ApplicationStatus;
  documents: ClinicDocument[];
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  status: EntityStatus;
  rating: number;
};

export type Clinic = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  specialties: string[];
  doctorCount: number;
  rating: number;
  reviewCount: number;
  monthlyPatients: number;
  completedAppointments: number;
  revenueContribution: number;
  status: EntityStatus;
  featured: boolean;
  joinedAt: string;
  accreditation: string[];
  doctors: Doctor[];
};

export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  status: PatientStatus;
  appointments: number;
  totalSpend: number;
  joinedAt: string;
  lastActiveAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  requesterName: string;
  requesterType: "patient" | "clinic";
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  message: string;
};

export type GrowthPoint = {
  label: string;
  patients: number;
  clinics: number;
};

export type RevenuePoint = {
  label: string;
  revenue: number;
  commission: number;
};

export type DashboardSummary = {
  totalPatients: number;
  patientDelta: number;
  pendingApplications: number;
  applicationDelta: number;
  platformRevenue: number;
  revenueDelta: number;
  activeAppointments: number;
  completedAppointments: number;
  appointmentDelta: number;
  activeClinics: number;
  openTickets: number;
};
