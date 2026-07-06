import type { ActivityItem, ChatThread, QuickStats } from "@/types";
import {
  chatThreads,
  quickStats,
  queuePatient,
  recentActivities,
} from "@/lib/mock-data";

export async function fetchQuickStats(): Promise<QuickStats> {
  await delay(40);
  return { ...quickStats };
}

export async function fetchQueuePatient() {
  await delay(40);
  return { ...queuePatient };
}

export async function fetchRecentActivities(): Promise<ActivityItem[]> {
  await delay(50);
  return [...recentActivities];
}

export async function fetchChatThreads(): Promise<ChatThread[]> {
  await delay(70);
  return [...chatThreads];
}

export async function fetchChatThreadById(
  id: string
): Promise<ChatThread | null> {
  await delay(50);
  return chatThreads.find((t) => t.id === id) ?? null;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
