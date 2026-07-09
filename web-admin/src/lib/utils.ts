import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTr(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("tr-TR", {
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

export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "az önce";
  if (min < 60) return `${min} dk önce`;
  const hours = Math.round(min / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} gün önce`;
  return formatDateTr(iso);
}

const tryFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export function formatTRY(value: number): string {
  return tryFormatter.format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
