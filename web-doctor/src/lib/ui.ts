import type {
  AppointmentStatus,
  DoctorStatus,
  LanguageCode,
  ScheduleSlotType,
} from "@/types";
import {
  formatDateLong as formatDateLongDt,
  formatDateRange,
  formatDateShort as formatDateShortDt,
  formatMonthYear as formatMonthYearDt,
  formatWeekdayShort,
  getDateUiLocale,
  intlLocale,
  parseDateKey,
} from "@/lib/datetime";

export function formatDateLong(isoDate: string): string {
  return formatDateLongDt(isoDate);
}

export function formatDateShort(isoDate: string): string {
  return formatDateShortDt(isoDate);
}

export function formatMonthYear(isoDate: string): string {
  return formatMonthYearDt(isoDate);
}

export function formatDateRangeShort(startIso: string, endIso: string): string {
  return formatDateRange(startIso, endIso);
}

export function getWeekday(isoDate: string): string {
  return new Intl.DateTimeFormat(intlLocale(getDateUiLocale()), {
    weekday: "long",
  }).format(parseDateKey(isoDate));
}

export function getWeekdayShort(isoDate: string): string {
  return formatWeekdayShort(isoDate);
}

export function countryCodeToFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const languageNames: Record<LanguageCode, string> = {
  EN: "İngilizce",
  DE: "Almanca",
  RU: "Rusça",
  AR: "Arapça",
  FR: "Fransızca",
  TR: "Türkçe",
  NL: "Hollandaca",
  ES: "İspanyolca",
};

export const doctorStatusStyles: Record<
  DoctorStatus,
  { bg: string; text: string; dot: string; ring: string; border: string }
> = {
  "MÜSAİT": { bg: "bg-success-light", text: "text-success", dot: "bg-success", ring: "ring-success/20", border: "border-success/30" },
  "AMELİYATTA": { bg: "bg-error-light", text: "text-error", dot: "bg-error", ring: "ring-error/20", border: "border-error/30" },
  "KONSÜLTASYONDA": { bg: "bg-warning-light", text: "text-warning", dot: "bg-warning", ring: "ring-warning/20", border: "border-warning/30" },
  "İZİNLİ": { bg: "bg-neutral-light", text: "text-neutral", dot: "bg-neutral-muted", ring: "ring-border", border: "border-border" },
};

export const appointmentStatusStyles: Record<
  AppointmentStatus,
  { bg: string; text: string; border: string }
> = {
  "BEKLEMEDE": { bg: "bg-warning-light", text: "text-warning", border: "border-warning/30" },
  "ONAYLANDI": { bg: "bg-success-light", text: "text-success", border: "border-success/30" },
  "TAMAMLANDI": { bg: "bg-neutral-light", text: "text-neutral", border: "border-border" },
};

export const slotTypeStyles: Record<
  ScheduleSlotType,
  { bg: string; text: string; accent: string; dashedOutline?: string }
> = {
  "MÜSAİT": {
    bg: "bg-emerald-50/60 hover:bg-emerald-50",
    text: "text-emerald-700",
    accent: "border-l-emerald-400",
    dashedOutline: "border-t border-r border-b border-dashed border-emerald-200",
  },
  "DOLU": {
    bg: "bg-slate-100 hover:bg-slate-100/70",
    text: "text-slate-600",
    accent: "border-l-slate-400",
  },
  "AMELİYAT": {
    bg: "bg-rose-50/70 hover:bg-rose-50",
    text: "text-rose-700",
    accent: "border-l-rose-500",
  },
  "KONSÜLTASYON": {
    bg: "bg-primary-light/80 hover:bg-primary-light",
    text: "text-primary",
    accent: "border-l-primary",
  },
};

export function getDayNumber(isoDate: string): number {
  return parseDateKey(isoDate).getDate();
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export const countryNames: Record<string, string> = {
  DE: "Almanya",
  GB: "Birleşik Krallık",
  RU: "Rusya",
  KW: "Kuveyt",
  AE: "Birleşik Arap Emirlikleri",
  IE: "İrlanda",
  FR: "Fransa",
  NL: "Hollanda",
  ES: "İspanya",
  IT: "İtalya",
  CH: "İsviçre",
  BG: "Bulgaristan",
};

export function getCountryName(countryCode: string): string {
  return countryNames[countryCode] ?? countryCode;
}

export const documentTypeLabels: Record<string, string> = {
  TIBBI_RAPOR: "Tıbbi Rapor",
  "FOTOĞRAF": "Fotoğraf",
  PASAPORT: "Pasaport",
};
