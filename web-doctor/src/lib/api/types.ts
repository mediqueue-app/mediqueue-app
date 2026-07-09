export type UserRole = "admin" | "clinic" | "doctor" | "patient";

export interface TokenResponse {
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

export type AppointmentStatusApi =
  | "pending"
  | "confirmed"
  | "alternative_date"
  | "cancelled"
  | "arrived"
  | "completed";

export interface AppointmentRead {
  id: number;
  patient_id: number;
  clinic_id: number;
  doctor_id: number | null;
  branch: string;
  requested_date: string;
  alternative_date: string | null;
  status: AppointmentStatusApi;
  notes: string | null;
  patient_name: string;
  doctor_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface DoctorUpdate {
  full_name?: string;
  specialty?: string | null;
  bio?: string | null;
  languages?: string[] | null;
}
