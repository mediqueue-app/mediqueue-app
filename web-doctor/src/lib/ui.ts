import type {
  AppointmentStatus,
  DoctorStatus,
  LanguageCode,
  ScheduleSlotType,
} from "@/types";

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
  "MÜSAİT": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-600/20", border: "border-emerald-200/60" },
  "AMELİYATTA": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", ring: "ring-rose-600/20", border: "border-rose-200/60" },
  "KONSÜLTASYONDA": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", ring: "ring-amber-600/20", border: "border-amber-200/60" },
  "İZİNLİ": { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", ring: "ring-slate-500/20", border: "border-slate-200/60" },
};

export const appointmentStatusStyles: Record<
  AppointmentStatus,
  { bg: string; text: string; border: string }
> = {
  "BEKLEMEDE": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200/60" },
  "ONAYLANDI": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60" },
  "TAMAMLANDI": { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200/60" },
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

const turkishWeekdays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const turkishWeekdaysShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const turkishMonths = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function formatDateLong(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return `${d.getDate()} ${turkishMonths[d.getMonth()]} ${d.getFullYear()}, ${turkishWeekdays[d.getDay()]}`;
}

export function formatDateShort(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return `${d.getDate()} ${turkishMonths[d.getMonth()]}`;
}

export function formatMonthYear(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return `${turkishMonths[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateRangeShort(startIso: string, endIso: string): string {
  const start = formatDateShort(startIso);
  const end = new Date(`${endIso}T00:00:00`);
  return `${start} – ${end.getDate()} ${turkishMonths[end.getMonth()]} ${end.getFullYear()}`;
}

export function getWeekday(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return turkishWeekdays[d.getDay()];
}

export function getWeekdayShort(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return turkishWeekdaysShort[d.getDay()];
}

export function getDayNumber(isoDate: string): number {
  return new Date(`${isoDate}T00:00:00`).getDate();
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
