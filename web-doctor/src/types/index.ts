export type AppointmentStatus =
  | "ONAYLANDI"
  | "BEKLIYOR"
  | "BEKLEMEDE"
  | "TAMAMLANDI"
  | "IPTAL";

export type TreatmentStatus = "AKTIF" | "TAMAMLANDI" | "BEKLEMEDE";

export type PatientFilterTab = "AKTIF" | "GECMIS" | "TUMU";

export type TimelineStepStatus = "TAMAMLANDI" | "AKTIF" | "BEKLIYOR";

export type CalendarViewMode = "HAFTA" | "AY";

export type DocumentType =
  | "PASAPORT"
  | "TIBBI_RAPOR"
  | "RONTGEN"
  | "VIZE"
  | "FOTOĞRAF";

export type Language = "TR" | "EN" | "AR" | "RU" | "DE" | "FR" | "NL" | "ES";
export type LanguageCode = Language;

export type DoctorStatus = "MÜSAİT" | "KONSÜLTASYONDA" | "AMELİYATTA" | "İZİNLİ";

export type ScheduleSlotType = "MÜSAİT" | "DOLU" | "AMELİYAT" | "KONSÜLTASYON";

export interface ScheduleSlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ScheduleSlotType;
  label?: string;
  appointmentId?: string;
}

export interface WorkingHoursRange {
  day: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export type PatientBranch =
  | "dentistry"
  | "hair_transplant"
  | "aesthetic"
  | "ophthalmology"
  | "bariatric"
  | "orthopedics"
  | "ivf"
  | "cardiology";

export type ToothStatus = "healthy" | "treated" | "pending_treatment";

export type TreatmentRecordStatus = "completed" | "pending";

export type MedicalServiceType = "medical" | "cosmetic";

export interface ToothTreatmentRecord {
  id: string;
  date: string;
  condition: string;
  treatment: string;
  dentistName: string;
  status: TreatmentRecordStatus;
  pendingReason?: string;
  note?: string;
}

export interface ToothRecord {
  toothNumber: number;
  toothName?: string;
  status: ToothStatus;
  treatmentHistory: ToothTreatmentRecord[];
}

export interface MedicalRecord {
  patientId: string;
  serviceType: MedicalServiceType;
  teeth: ToothRecord[];
}

export type PatientDetailTab =
  | "info"
  | "appointments"
  | "next_treatment"
  | "medical_record";

export interface DoctorProfile {
  id: string;
  email: string;
  fullName: string;
  title: string;
  specialty: string;
  languages: Language[];
  bio: string;
  avatarInitials: string;
  rating: number;
  reviewCount: number;
  clinicId?: string;
  specialties?: string[];
  status?: DoctorStatus;
  roomNumber?: string;
  avatarUrl?: string;
  yearsOfExperience?: number;
  education?: string[];
  workingHours?: WorkingHoursRange[];
}

export interface PatientDocument {
  id: string;
  type: DocumentType;
  fileName?: string;
  uploadedAt?: string;
  fileSizeKb?: number;
  title?: string;
  date?: string;
  thumbnailUrl?: string;
}

export interface MedicalNote {
  id: string;
  content: string;
  createdAt: string;
  authorName: string;
}

export interface TimelineStep {
  id: number;
  label: string;
  description: string;
  status: TimelineStepStatus;
  completedAt?: string;
}

export interface PatientAppointment {
  id: string;
  date: string;
  time: string;
  treatmentType: string;
  status: AppointmentStatus;
  outcomeNote?: string;
}

export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  nationality: string;
  countryCode: string;
  address?: string;
  languages: Language[];
  phone: string;
  email: string;
  branch: PatientBranch;
  treatmentType: string;
  treatmentStatus: TreatmentStatus;
  lastVisitDate: string;
  avatarInitials: string;
  highlightNote?: string;
  timeline: TimelineStep[];
  documents: PatientDocument[];
  medicalNotes: MedicalNote[];
  appointmentHistory: PatientAppointment[];
  medicalRecord?: MedicalRecord;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  treatmentType: string;
  status: AppointmentStatus;
  durationMinutes: number;
  timeSlot?: string;
  patientAge?: number;
  countryCode?: string;
  spokenLanguage?: LanguageCode;
  branch?: string;
  chiefComplaint?: string;
  translatorNeeded?: boolean;
  documents?: PatientDocument[];
}

export interface QueuePatient {
  patientId: string;
  patientName: string;
  treatmentType: string;
  scheduledTime: string;
  minutesUntil: number;
}

export interface QuickStats {
  monthlyPatientCount: number;
  averageRating: number;
  pendingMessageCount: number;
  weeklyCompletedAppointments: number;
}

export interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: "message" | "appointment" | "document" | "note";
}

export interface ChatMessage {
  id: string;
  sender: "doctor" | "patient";
  /** Doktorun gördüğü metin (genelde TR çeviri veya TR yanıt) */
  content: string;
  timestamp: string;
  /** Hasta mesajı: orijinal dil kodu (AR, DE, EN…) */
  originalLanguage?: string;
  /** Hasta mesajı: çeviriden önceki orijinal metin */
  originalText?: string;
  /** Çevrildiği dil (genelde TR) */
  translatedTo?: string;
  /** Doktor yanıtı: hastanın dilinde göreceği metin */
  patientSeesText?: string;
  /** Doktor yanıtı: hastanın dili */
  patientLanguage?: string;
}

export interface ChatThread {
  id: string;
  patientId: string;
  patientName: string;
  countryCode: string;
  /** Hastanın konuştuğu dil (demo çeviri) */
  patientLanguage: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface AvailabilitySlot {
  dayOfWeek: number;
  label: string;
  slots: { hour: string; available: boolean }[];
}

export interface DoctorStats extends QuickStats {}
