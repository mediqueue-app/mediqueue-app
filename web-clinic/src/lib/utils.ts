import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDateTime, intlLocale, getDateUiLocale } from "@/lib/datetime";

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
  return formatDate(dateKey, { style: "long" });
}

export function formatDateTimeTr(iso: string): string {
  return formatDateTime(iso);
}

export function formatRelativeDay(dateKey: string, todayKey: string): string {
  const toDay = (key: string) => {
    const [y, m, d] = key.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  const diff = Math.round((toDay(dateKey) - toDay(todayKey)) / 86_400_000);
  return new Intl.RelativeTimeFormat(intlLocale(getDateUiLocale()), {
    numeric: "auto",
  }).format(diff, "day");
}
