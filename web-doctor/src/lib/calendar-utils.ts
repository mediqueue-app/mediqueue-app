import type { Appointment, AppointmentStatus } from "@/types";

export const CALENDAR_START_HOUR = 8;
export const CALENDAR_END_HOUR = 19;
export const HOUR_ROW_PX = 60;

const TR_DAY_NAMES = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"] as const;
const TR_MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
] as const;

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateKey(key: string): Date {
  return new Date(`${key}T12:00:00`);
}

export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} sa ${m} dk` : `${h} sa`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Haftanın pazartesi gününü döndürür (TR locale). */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(12, 0, 0, 0);
  return d;
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b);
}

export function isToday(date: Date, today = new Date()): boolean {
  return isSameDay(date, today);
}

export function formatWeekdayShort(date: Date): string {
  const day = date.getDay();
  return TR_DAY_NAMES[day === 0 ? 6 : day - 1];
}

export function formatMonthYear(date: Date): string {
  return `${TR_MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDayLong(date: Date): string {
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Ay takvim ızgarası — haftalar satır, pazartesi ile başlar. */
export function getMonthWeeks(year: number, month: number): (Date | null)[][] {
  const first = new Date(year, month, 1, 12);
  const last = new Date(year, month + 1, 0, 12);
  const startOffset = first.getDay() === 0 ? 6 : first.getDay() - 1;

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: last.getDate() }, (_, i) => new Date(year, month, i + 1, 12)),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export function appointmentEndMinutes(apt: Appointment): number {
  return parseTimeToMinutes(apt.time) + apt.durationMinutes;
}

export function getAppointmentStyle(apt: Appointment): {
  top: number;
  height: number;
} {
  const start = parseTimeToMinutes(apt.time);
  const gridStart = CALENDAR_START_HOUR * 60;
  const gridEnd = CALENDAR_END_HOUR * 60;
  const clampedStart = Math.max(start, gridStart);
  const end = Math.min(appointmentEndMinutes(apt), gridEnd);
  const top = ((clampedStart - gridStart) / 60) * HOUR_ROW_PX;
  const rawHeight = ((end - clampedStart) / 60) * HOUR_ROW_PX;
  const height = Math.max(rawHeight - 1, 22);
  return { top, height };
}

export interface PositionedAppointment {
  appointment: Appointment;
  top: number;
  height: number;
  columnIndex: number;
  columnCount: number;
}

/** Çakışan randevuları yan yana sütunlara yerleştirir. */
export function layoutDayAppointments(
  appointments: Appointment[]
): PositionedAppointment[] {
  if (appointments.length === 0) return [];

  type Event = {
    appointment: Appointment;
    top: number;
    height: number;
    start: number;
    end: number;
    columnIndex: number;
  };

  const events: Event[] = appointments
    .map((apt) => {
      const { top, height } = getAppointmentStyle(apt);
      return {
        appointment: apt,
        top,
        height,
        start: parseTimeToMinutes(apt.time),
        end: appointmentEndMinutes(apt),
        columnIndex: 0,
      };
    })
    .sort((a, b) => a.start - b.start || b.end - a.end);

  const clusters: Event[][] = [];
  for (const ev of events) {
    const last = clusters[clusters.length - 1];
    if (!last) {
      clusters.push([ev]);
      continue;
    }
    const clusterEnd = Math.max(...last.map((e) => e.end));
    if (ev.start < clusterEnd) {
      last.push(ev);
    } else {
      clusters.push([ev]);
    }
  }

  const result: PositionedAppointment[] = [];

  for (const cluster of clusters) {
    const columnEnds: number[] = [];

    for (const ev of cluster) {
      let placed = false;
      for (let col = 0; col < columnEnds.length; col++) {
        if (columnEnds[col] <= ev.start) {
          ev.columnIndex = col;
          columnEnds[col] = ev.end;
          placed = true;
          break;
        }
      }
      if (!placed) {
        ev.columnIndex = columnEnds.length;
        columnEnds.push(ev.end);
      }
    }

    const columnCount = Math.max(columnEnds.length, 1);
    for (const ev of cluster) {
      result.push({
        appointment: ev.appointment,
        top: ev.top,
        height: ev.height,
        columnIndex: ev.columnIndex,
        columnCount,
      });
    }
  }

  return result;
}

export function groupAppointmentsByDate(
  appointments: Appointment[]
): Map<string, Appointment[]> {
  const map = new Map<string, Appointment[]>();
  for (const apt of appointments) {
    const list = map.get(apt.date) ?? [];
    list.push(apt);
    map.set(apt.date, list);
  }
  for (const [, list] of map) {
    list.sort((a, b) => a.time.localeCompare(b.time));
  }
  return map;
}

export function countByStatus(
  appointments: Appointment[],
  status: AppointmentStatus
): number {
  return appointments.filter((a) => a.status === status).length;
}

export const STATUS_DOT: Record<AppointmentStatus, string> = {
  ONAYLANDI: "bg-emerald-500",
  BEKLIYOR: "bg-amber-500",
  TAMAMLANDI: "bg-blue-500",
  IPTAL: "bg-red-400",
};

export const HOUR_LABELS = Array.from(
  { length: CALENDAR_END_HOUR - CALENDAR_START_HOUR },
  (_, i) => CALENDAR_START_HOUR + i
);
