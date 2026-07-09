import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTr(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTimeTr(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeDay(dateKey: string, todayKey: string): string {
  const toDay = (key: string) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  };
  const diff = Math.round(
    (toDay(dateKey) - toDay(todayKey)) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Bugün";
  if (diff === 1) return "Yarın";
  if (diff === -1) return "Dün";
  return formatDateTr(dateKey);
}
