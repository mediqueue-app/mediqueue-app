import type { ChatMessage } from "@/lib/api/types";
import type { Sourced } from "@/lib/services/clinics";

/**
 * Hasta ↔ klinik mesajlaşma servisi.
 *
 * Backend mesaj uçları (`/appointments/{id}/messages`) henüz tam bağlı
 * olmadığından, bu katman Promise tabanlı yapay gecikmeli bir MOCK olarak
 * çalışır. API hazır olduğunda yalnızca `getMessages` / `sendMessage`
 * gövdeleri `apiFetch` çağrılarıyla değiştirilecek; bileşen arayüzü ve
 * `Sourced<T>` sözleşmesi aynı kalacaktır.
 */

const READ_DELAY = 550;
const SEND_DELAY = 450;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Oturum boyunca kalıcı, randevu bazlı bellek-içi sohbet deposu.
 * Gönderilen mesajlar aynı oturumda tekrar açıldığında korunur.
 */
const store = new Map<number, ChatMessage[]>();

/** Yeni mesajlar için artan kimlik üreticisi. */
let nextId = 1000;

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

/**
 * Bazı randevular için örnek bir açılış sohbeti üretir; böylece dolu
 * durum da (mesaj balonları) test edilebilir. Kalanlar boş başlar ve
 * "Empty State" akışını tetikler.
 */
function seedConversation(appointmentId: number): ChatMessage[] {
  // Çift kimlikli randevularda örnek sohbet, teklerde boş başlangıç.
  if (appointmentId % 2 !== 0) return [];

  return [
    {
      id: nextId++,
      appointment_id: appointmentId,
      sender: "clinic",
      body: "Merhaba, randevunuz onaylandı. Herhangi bir sorunuz olursa buradan bize yazabilirsiniz.",
      created_at: minutesAgo(180),
    },
    {
      id: nextId++,
      appointment_id: appointmentId,
      sender: "clinic",
      body: "Randevu gününde lütfen kimliğinizi yanınızda bulundurun.",
      created_at: minutesAgo(179),
    },
  ];
}

function ensureConversation(appointmentId: number): ChatMessage[] {
  let conversation = store.get(appointmentId);
  if (!conversation) {
    conversation = seedConversation(appointmentId);
    store.set(appointmentId, conversation);
  }
  return conversation;
}

/**
 * Bir randevuya ait mesaj geçmişini kronolojik sırada getirir.
 * Backend bağlanınca: `apiFetch("/appointments/{id}/messages", { token })`.
 */
export async function getMessages(
  appointmentId: number
): Promise<Sourced<ChatMessage[]>> {
  await delay(READ_DELAY);
  const conversation = ensureConversation(appointmentId);
  // Tüketiciyi bellek referansından yalıtmak için kopya döndür.
  return { data: [...conversation], source: "mock" };
}

/**
 * Hasta adına yeni bir mesaj gönderir ve oluşturulan mesajı döndürür.
 * Backend bağlanınca: `apiFetch("/appointments/{id}/messages", { method: "POST", ... })`.
 */
export async function sendMessage(
  appointmentId: number,
  body: string
): Promise<ChatMessage> {
  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Boş mesaj gönderilemez.");
  }

  await delay(SEND_DELAY);

  const message: ChatMessage = {
    id: nextId++,
    appointment_id: appointmentId,
    sender: "patient",
    body: trimmed,
    created_at: new Date().toISOString(),
  };

  ensureConversation(appointmentId).push(message);
  return message;
}

/**
 * Klinik ağzından senkron bir mesaj ekler (gecikmesiz). Otomatik
 * karşılama mesajları / demo akışı gibi senaryolar içindir.
 */
export function seedClinicMessage(
  appointmentId: number,
  body: string
): ChatMessage {
  const message: ChatMessage = {
    id: nextId++,
    appointment_id: appointmentId,
    sender: "clinic",
    body,
    created_at: new Date().toISOString(),
  };
  ensureConversation(appointmentId).push(message);
  return message;
}

/** Bir randevunun bellek-içi sohbet geçmişindeki mesaj sayısı (senkron). */
export function peekConversationLength(appointmentId: number): number {
  return store.get(appointmentId)?.length ?? 0;
}

/** Bir randevuya ait sohbet geçmişini temizler. */
export function clearConversation(appointmentId: number): void {
  store.delete(appointmentId);
}
