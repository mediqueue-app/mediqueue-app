import type { ChatThread } from "@/types";

export function getUnreadCount(threads: ChatThread[]): number {
  return threads.reduce((sum, t) => sum + t.unreadCount, 0);
}

export function formatMessageTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatThreadTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return formatMessageTime(iso);
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth();

  if (isYesterday) return "Dün";

  return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}

export function formatMessageDateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function groupMessagesByDate(
  messages: ChatThread["messages"]
): { date: string; messages: ChatThread["messages"] }[] {
  const groups: { date: string; messages: ChatThread["messages"] }[] = [];
  let currentDate = "";

  for (const msg of messages) {
    const dateKey = new Date(msg.timestamp).toDateString();
    if (dateKey !== currentDate) {
      currentDate = dateKey;
      groups.push({ date: msg.timestamp, messages: [msg] });
    } else {
      groups[groups.length - 1].messages.push(msg);
    }
  }

  return groups;
}

export function filterThreads(threads: ChatThread[], query: string): ChatThread[] {
  if (!query.trim()) return threads;
  const q = query.trim().toLowerCase();
  return threads.filter(
    (t) =>
      t.patientName.toLowerCase().includes(q) ||
      t.lastMessage.toLowerCase().includes(q)
  );
}

/** Okunmamış önce, sonra son mesaj zamanına göre. */
export function sortThreads(threads: ChatThread[]): ChatThread[] {
  return [...threads].sort((a, b) => {
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (b.unreadCount > 0 && a.unreadCount === 0) return 1;
    return b.lastMessageAt.localeCompare(a.lastMessageAt);
  });
}
