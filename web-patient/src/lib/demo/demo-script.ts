import type { Appointment } from "@/lib/api/types";
import {
  clearConversation,
  peekConversationLength,
  seedClinicMessage,
} from "@/lib/services/messages";

/**
 * ORTAK DEMO SCRIPT — book → confirm → message (hasta kısmı).
 *
 * Gerçek backend olmadan, uçtan uca "sağlıklı akış" demosunu simüle eder:
 *   a. Hasta "Demo Klinik" üzerinden randevu oluşturur (book).
 *   b. Randevu anında "confirmed" statüsüne geçer (confirm).
 *   c. Onaylı randevu üzerinden mesajlaşma açılabilir hale gelir (message).
 *   d. Klinikten otomatik "Hoş geldiniz, şikayetiniz nedir?" mesajı düşer.
 *
 * TAMAMEN DECOUPLED: Gerçek API entegrasyonu geldiğinde bu dosya ve onu
 * çağıran birkaç satır (DemoLauncher + AppointmentsView içindeki demo
 * merge'i) silinerek proje temiz kalır. Uygulamanın çekirdek mimarisine
 * (Sourced servisler, tipler) dokunmaz; yalnızca onun üzerine bir katman
 * ekler.
 */

/** Demo randevusunun sabit kimliği (gerçek randevularla çakışmayacak kadar yüksek). */
export const DEMO_APPOINTMENT_ID = 900_001;

/** Demonun kullandığı önceden tanımlı klinik. */
export const DEMO_CLINIC = {
  id: 1,
  name: "MediQueue Demo Kliniği",
  branch: "Genel Muayene",
  doctorName: "Dr. Demo Hekim",
  patientName: "Demo Hasta",
} as const;

/** Klinikten otomatik düşen ilk mesaj. */
const WELCOME_MESSAGE = "Hoş geldiniz, şikayetiniz nedir?";

const STORAGE_KEY = "mq-patient-demo-appointment";

/** Aynı sekmede demo durumu değiştiğinde yayılan olay adı. */
const DEMO_EVENT = "mq-demo-change";

/** Demo durumu değişince dinleyicileri (useSyncExternalStore) haberdar eder. */
function notifyChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DEMO_EVENT));
  }
}

/**
 * Demo durumundaki değişikliklere abone olur. `useSyncExternalStore` ile
 * kullanılmak üzere; aynı sekme (`DEMO_EVENT`) ve diğer sekmeler (`storage`)
 * için tetiklenir. Aboneliği kaldıran fonksiyonu döndürür.
 */
export function subscribeDemo(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(DEMO_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(DEMO_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function buildDemoAppointment(): Appointment {
  const now = new Date();
  // Randevu tarihini yarına al ki "yaklaşan" hissi versin.
  const requested = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const y = requested.getFullYear();
  const mo = String(requested.getMonth() + 1).padStart(2, "0");
  const da = String(requested.getDate()).padStart(2, "0");

  return {
    id: DEMO_APPOINTMENT_ID,
    patient_id: 0,
    clinic_id: DEMO_CLINIC.id,
    doctor_id: 0,
    branch: DEMO_CLINIC.branch,
    requested_date: `${y}-${mo}-${da}`,
    alternative_date: null,
    status: "confirmed", // (b) anında onaylandı
    notes: "Saat: 10:00 · Demo randevusu — uçtan uca akışı denemek için oluşturuldu.",
    patient_name: DEMO_CLINIC.patientName,
    doctor_name: DEMO_CLINIC.doctorName,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };
}

function persist(appointment: Appointment): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(appointment));
}

function readPersisted(): Appointment | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Appointment;
  } catch {
    return null;
  }
}

/** Karşılama mesajının (yalnızca yoksa) bir kez düşmesini garantiler — idempotent. */
function ensureWelcomeMessage(): void {
  if (peekConversationLength(DEMO_APPOINTMENT_ID) === 0) {
    seedClinicMessage(DEMO_APPOINTMENT_ID, WELCOME_MESSAGE); // (d)
  }
}

/**
 * (a → d) Demo akışını başlatır: randevuyu oluşturur, onaylı olarak
 * saklar ve klinik karşılama mesajını düşürür. Oluşturulan randevuyu
 * döndürür (çağıran taraf yönlendirme için kullanabilir).
 */
export function startDemoFlow(): Appointment {
  const appointment = buildDemoAppointment();
  persist(appointment);
  clearConversation(DEMO_APPOINTMENT_ID);
  seedClinicMessage(DEMO_APPOINTMENT_ID, WELCOME_MESSAGE); // (d)
  notifyChange();
  return appointment;
}

/**
 * Aktif demo randevularını döndürür (yoksa boş dizi). AppointmentsView
 * bunu gerçek randevularla birleştirir. Sohbet geçmişi bellekte olduğu
 * için (örn. sayfa yenilendiğinde) karşılama mesajını tekrar garanti eder.
 */
export function getDemoAppointments(): Appointment[] {
  const appointment = readPersisted();
  if (!appointment) return [];
  ensureWelcomeMessage();
  return [appointment];
}

/** Demo akışı şu an aktif mi? */
export function isDemoActive(): boolean {
  return readPersisted() !== null;
}

/** Demo randevusunu iptal eder (kalıcı; geri alınamaz). */
export function cancelDemoAppointment(): Appointment | null {
  const appointment = readPersisted();
  if (!appointment) return null;
  const cancelled: Appointment = {
    ...appointment,
    status: "cancelled",
    updated_at: new Date().toISOString(),
  };
  persist(cancelled);
  notifyChange();
  return cancelled;
}

/** Demo akışını tamamen temizler (randevu + sohbet geçmişi). */
export function clearDemoFlow(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
  clearConversation(DEMO_APPOINTMENT_ID);
  notifyChange();
}
