import type { ActivityItem, ChatThread, QuickStats } from "@/types";
import {
  getChatThreads,
  getQuickStats,
  getRecentActivities,
  queuePatient,
} from "@/lib/mock-data";

export async function fetchQuickStats(): Promise<QuickStats> {
  await delay(40);
  return getQuickStats();
}

export async function fetchQueuePatient() {
  await delay(40);
  return { ...queuePatient };
}

export async function fetchRecentActivities(): Promise<ActivityItem[]> {
  await delay(50);
  return getRecentActivities();
}

export async function fetchChatThreads(): Promise<ChatThread[]> {
  await delay(70);
  return getChatThreads();
}

export async function fetchChatThreadById(
  id: string
): Promise<ChatThread | null> {
  await delay(50);
  return getChatThreads().find((t) => t.id === id) ?? null;
}

export function getQuickStatsSync(): QuickStats {
  return getQuickStats();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
