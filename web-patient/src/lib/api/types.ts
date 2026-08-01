export type UserRole = "admin" | "clinic" | "doctor" | "patient";

/** Bir ekrandaki verinin nereden geldiğini belirtir (HybridBadge için). */
export type DataSource = "api" | "mock" | "hybrid";

export interface Token {
  access_token: string;
  token_type: string;
}

export interface UserRead {
  id: number;
  email: string;
  full_name: string | null;
  role: UserRole;
  clinic_id: number | null;
  doctor_id: number | null;
  is_active: boolean;
  created_at: string;
}

export interface ClinicRead {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  city: string | null;
  languages: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DoctorRead {
  id: number;
  full_name: string;
  specialty: string | null;
  bio: string | null;
  city: string | null;
  languages: string[] | null;
  price: number | null;
  rating: number | null;
  experience: number | null;
  ai_source_id: number | null;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: number;
  user_id: number | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  country_code: string | null;
  preferred_language: string | null;
  has_health_history: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "alternative_date"
  | "cancelled"
  | "arrived"
  | "completed";

export interface Appointment {
  id: number;
  patient_id: number;
  clinic_id: number;
  doctor_id: number | null;
  branch: string;
  requested_date: string;
  alternative_date: string | null;
  status: AppointmentStatus;
  notes: string | null;
  patient_name: string;
  doctor_name: string | null;
  created_at: string;
  updated_at: string;
}

/** Bir mesajın kimin tarafından gönderildiğini belirtir. */
export type MessageSender = "patient" | "clinic";

/** Hasta ↔ klinik sohbetindeki tekil mesaj. */
export interface ChatMessage {
  id: number;
  appointment_id: number;
  sender: MessageSender;
  body: string;
  created_at: string;
}
