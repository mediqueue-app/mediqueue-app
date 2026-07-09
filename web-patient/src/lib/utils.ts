import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
