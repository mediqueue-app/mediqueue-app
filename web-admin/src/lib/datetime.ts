/**
 * Civil dates and appointment clocks.
 *
 * - English UI uses en-GB so numeric dates are DD/MM/YYYY (never US MM/DD/YYYY).
 * - Clinic slots are Europe/Istanbul wall-clock (Turkey is UTC+3 year-round).
 * - Patients see Istanbul time plus their local time when the zone differs.
 */

export const CLINIC_TIMEZONE = "Europe/Istanbul";
/** Turkey abolished DST in 2016; Istanbul is permanently UTC+3. */
const CLINIC_OFFSET = "+03:00";

export type DateUiLocale = "tr" | "en";

export function intlLocale(ui: DateUiLocale = "tr"): string {
  return ui === "en" ? "en-GB" : "tr-TR";
}

export function getDateUiLocale(): DateUiLocale {
  if (typeof window === "undefined") return "tr";
  try {
    const stored = window.localStorage.getItem("mq-ui-locale");
    if (stored === "en" || stored === "tr") return stored;
  } catch {
    /* private mode */
  }
  const html = document.documentElement.lang?.toLowerCase() ?? "";
  if (html.startsWith("en")) return "en";
  if (html.startsWith("tr")) return "tr";
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  if (nav.startsWith("en")) return "en";
  return "tr";
}

export function viewerTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || CLINIC_TIMEZONE;
  } catch {
    return CLINIC_TIMEZONE;
  }
}

/** YYYY-MM-DD as a calendar date (not UTC midnight). */
export function parseDateKey(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (m) {
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0);
  }
  return new Date(value);
}

/** Instant from a timezone-aware ISO timestamp. Naive `YYYY-MM-DDTHH:MM` is Istanbul wall-clock. */
export function parseInstant(iso: string): Date {
  const trimmed = iso.trim();
  const naive =
    /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::(\d{2}))?(?:\.\d+)?$/.exec(trimmed);
  if (naive) {
    const sec = naive[3] ?? "00";
    return new Date(`${naive[1]}T${naive[2]}:${sec}${CLINIC_OFFSET}`);
  }
  return new Date(iso);
}

function coerceDisplayDate(value: string | Date): Date {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (/T\d{2}:/.test(trimmed)) return parseInstant(trimmed);
  return parseDateKey(trimmed);
}

export function toDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: CLINIC_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

/** Today's civil date in Europe/Istanbul (clinic operations). */
export function clinicTodayKey(): string {
  return toDateKey(new Date());
}

/** Interpret HH:MM on a calendar date as Istanbul clinic time. */
export function clinicInstant(dateKey: string, timeHHMM: string): Date {
  const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateKey.trim());
  const [rawH, rawM] = timeHHMM.split(":");
  const hh = String(Number(rawH)).padStart(2, "0");
  const mm = String(Number(rawM)).padStart(2, "0");
  if (!ymd) {
    return new Date(`${dateKey}T${hh}:${mm}:00${CLINIC_OFFSET}`);
  }
  return new Date(`${ymd[1]}-${ymd[2]}-${ymd[3]}T${hh}:${mm}:00${CLINIC_OFFSET}`);
}

export function extractAppointmentTime(notes?: string | null): string | null {
  if (!notes) return null;
  const m = notes.match(/(?:Saat|Time)\s*:\s*(\d{1,2}:\d{2})/i);
  if (!m) return null;
  const [h, min] = m[1].split(":");
  return `${String(Number(h)).padStart(2, "0")}:${min}`;
}

export function formatDate(
  value: string | Date,
  opts?: { locale?: DateUiLocale; style?: "short" | "long" | "medium" }
): string {
  const locale = intlLocale(opts?.locale ?? getDateUiLocale());
  const d = coerceDisplayDate(value);
  if (Number.isNaN(d.getTime())) return typeof value === "string" ? value : "";
  const style = opts?.style ?? "long";
  if (style === "short") {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  }
  if (style === "medium") {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  }
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatTime(
  value: Date,
  opts?: { locale?: DateUiLocale; timeZone?: string }
): string {
  const locale = intlLocale(opts?.locale ?? getDateUiLocale());
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: opts?.timeZone,
  }).format(value);
}

export function formatDateTime(
  iso: string,
  opts?: { locale?: DateUiLocale; timeZone?: string }
): string {
  const d = parseInstant(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const locale = intlLocale(opts?.locale ?? getDateUiLocale());
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: opts?.timeZone,
  }).format(d);
}

export function formatWeekdayLong(
  value: string | Date,
  locale?: DateUiLocale
): string {
  const d = coerceDisplayDate(value);
  return new Intl.DateTimeFormat(intlLocale(locale ?? getDateUiLocale()), {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

export function formatMonthYear(value: string | Date, locale?: DateUiLocale): string {
  const d = coerceDisplayDate(value);
  return new Intl.DateTimeFormat(intlLocale(locale ?? getDateUiLocale()), {
    month: "long",
    year: "numeric",
  }).format(d);
}

export type AppointmentClock = {
  date: string;
  clinicTime: string | null;
  localTime: string | null;
  dual: boolean;
};

export function formatAppointmentClock(
  dateKey: string,
  timeHHMM: string | null,
  locale?: DateUiLocale
): AppointmentClock {
  const ui = locale ?? getDateUiLocale();
  const date = formatDate(dateKey, { locale: ui, style: "short" });
  if (!timeHHMM) {
    return { date, clinicTime: null, localTime: null, dual: false };
  }
  const instant = clinicInstant(dateKey, timeHHMM);
  if (Number.isNaN(instant.getTime())) {
    return { date, clinicTime: timeHHMM, localTime: null, dual: false };
  }
  const clinicTime = formatTime(instant, { locale: ui, timeZone: CLINIC_TIMEZONE });
  const localTz = viewerTimeZone();
  const localTime = formatTime(instant, { locale: ui, timeZone: localTz });
  return {
    date,
    clinicTime,
    localTime,
    dual: localTz !== CLINIC_TIMEZONE && clinicTime !== localTime,
  };
}

export function dateKeyFromParts(
  year: number,
  monthIndex: number,
  day: number
): string {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

/**
 * Slot clock for an appointment. Notes (`Saat:` / `Time:`) win; otherwise a
 * non-midnight ISO time is used. Date-only values must not be treated as 00:00 UTC.
 */
export function appointmentSlotTime(
  requestedDate: string,
  notes?: string | null
): string | null {
  const fromNotes = extractAppointmentTime(notes);
  if (fromNotes) return fromNotes;
  const m = /T(\d{2}):(\d{2})/.exec(requestedDate);
  if (m && !(m[1] === "00" && m[2] === "00")) {
    return `${m[1]}:${m[2]}`;
  }
  return null;
}

export function formatDateLong(
  value: string | Date,
  locale?: DateUiLocale
): string {
  const d = coerceDisplayDate(value);
  if (Number.isNaN(d.getTime())) return typeof value === "string" ? value : "";
  return new Intl.DateTimeFormat(intlLocale(locale ?? getDateUiLocale()), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateShort(
  value: string | Date,
  locale?: DateUiLocale
): string {
  const d = coerceDisplayDate(value);
  if (Number.isNaN(d.getTime())) return typeof value === "string" ? value : "";
  return new Intl.DateTimeFormat(intlLocale(locale ?? getDateUiLocale()), {
    day: "numeric",
    month: "long",
  }).format(d);
}

export function formatWeekdayShort(
  value: string | Date,
  locale?: DateUiLocale
): string {
  const d = coerceDisplayDate(value);
  return new Intl.DateTimeFormat(intlLocale(locale ?? getDateUiLocale()), {
    weekday: "short",
  }).format(d);
}

export function formatDayLong(
  value: string | Date,
  locale?: DateUiLocale
): string {
  return formatWeekdayLong(value, locale);
}

export function formatDateRange(
  start: string | Date,
  end: string | Date,
  locale?: DateUiLocale
): string {
  const ui = locale ?? getDateUiLocale();
  const a = coerceDisplayDate(start);
  const b = coerceDisplayDate(end);
  return new Intl.DateTimeFormat(intlLocale(ui), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatRange(a, b);
}

export function formatCalendarParts(
  value: string | Date,
  locale?: DateUiLocale
): { day: string; month: string } {
  const d = coerceDisplayDate(value);
  const loc = intlLocale(locale ?? getDateUiLocale());
  return {
    day: new Intl.DateTimeFormat(loc, { day: "2-digit" }).format(d),
    month: new Intl.DateTimeFormat(loc, { month: "short" }).format(d),
  };
}

export function formatRelativePast(
  iso: string,
  locale?: DateUiLocale
): string {
  const d = parseInstant(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const ui = locale ?? getDateUiLocale();
  const diffMin = Math.round((d.getTime() - Date.now()) / 60_000);
  const rtf = new Intl.RelativeTimeFormat(intlLocale(ui), { numeric: "auto" });
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
  return formatDate(d, { locale: ui, style: "medium" });
}

export function formatThreadStamp(
  iso: string,
  locale?: DateUiLocale
): string {
  const d = parseInstant(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const ui = locale ?? getDateUiLocale();
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startThat = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (startThat.getTime() - startToday.getTime()) / 86_400_000
  );
  if (diffDays === 0) return formatTime(d, { locale: ui });
  if (diffDays === -1 || diffDays === 1) {
    return new Intl.RelativeTimeFormat(intlLocale(ui), {
      numeric: "auto",
    }).format(diffDays, "day");
  }
  return formatDate(d, { locale: ui, style: "medium" });
}

export function formatAppointmentRange(
  dateKey: string,
  timeHHMM: string,
  durationMinutes = 60,
  locale?: DateUiLocale
): string {
  const ui = locale ?? getDateUiLocale();
  const start = clinicInstant(dateKey, timeHHMM);
  if (Number.isNaN(start.getTime())) {
    return `${formatDate(dateKey, { locale: ui, style: "medium" })} ${timeHHMM}`;
  }
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const loc = intlLocale(ui);
  const day = new Intl.DateTimeFormat(loc, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: CLINIC_TIMEZONE,
  }).format(start);
  const t1 = formatTime(start, { locale: ui, timeZone: CLINIC_TIMEZONE });
  const t2 = formatTime(end, { locale: ui, timeZone: CLINIC_TIMEZONE });
  return `${day}, ${t1}–${t2}`;
}

/** Monday-first weekday labels for calendar headers (Intl, never a hardcoded list). */
export function formatWeekdayHeaders(locale?: DateUiLocale): string[] {
  const loc = intlLocale(locale ?? getDateUiLocale());
  return Array.from({ length: 7 }, (_, i) => {
    const instant = new Date(Date.UTC(2026, 6, 6 + i, 12, 0, 0));
    return new Intl.DateTimeFormat(loc, {
      weekday: "short",
      timeZone: "UTC",
    }).format(instant);
  });
}
