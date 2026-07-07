/** Demo mock tarihleri — her yüklemede bugüne göre üretilir. */

export function mockDateKey(dayOffset = 0): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function mockDateTime(dayOffset: number, time: string): string {
  const [hours, minutes] = time.split(":");
  return `${mockDateKey(dayOffset)}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
}
