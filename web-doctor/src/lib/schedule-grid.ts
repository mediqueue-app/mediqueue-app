export const DAY_START_MIN = 9 * 60;
export const DAY_END_MIN = 19 * 60;
export const HOUR_LABELS = Array.from({ length: 11 }, (_, i) => 9 + i);

function toISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(isoDate: string, amount: number): string {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + amount);
  return toISODate(d);
}

export function addMonths(isoDate: string, amount: number): string {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setMonth(d.getMonth() + amount, 1);
  return toISODate(d);
}

export function getWeekDates(anchorIso: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDays(anchorIso, i));
}

// Pazartesi başlangıçlı, 6 satırlık (42 hücre) tam ay görünümü matrisi.
export function getMonthMatrix(anchorIso: string): string[] {
  const d = new Date(`${anchorIso}T00:00:00`);
  const firstOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // Pazartesi=0
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - firstWeekday);

  return Array.from({ length: 42 }, (_, i) => {
    const cellDate = new Date(gridStart);
    cellDate.setDate(cellDate.getDate() + i);
    return toISODate(cellDate);
  });
}

export function isSameMonth(isoDateA: string, isoDateB: string): boolean {
  return isoDateA.slice(0, 7) === isoDateB.slice(0, 7);
}
