import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Klinik detay rotasını üretir. Backend numeric id'si (apiId) varsa onu
 * tercih eder — böylece seed klinik güvenle `/clinics/1` rotasına gider.
 */
export function clinicHref(clinic: { apiId?: number; id: string }): string {
  return `/clinics/${clinic.apiId ?? clinic.id}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPrice(amount: number, currency = "₺"): string {
  return `${currency}${amount.toLocaleString("tr-TR")}`;
}

export function formatPriceRange(
  min: number,
  max: number,
  currency = "₺"
): string {
  return `${formatPrice(min, currency)} – ${formatPrice(max, currency)}`;
}

export function initials(name: string): string {
  return name
    .replace(/^(Dr\.|Prof\.|Doç\.|Op\. Dr\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
