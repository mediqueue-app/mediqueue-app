import Link from "next/link";
import { Calendar, ChevronRight, MessageSquare, Users } from "lucide-react";
import type { Appointment } from "@/types";
import type { DoctorProfile } from "@/types";
import { cn } from "@/lib/utils";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Günaydın";
  if (hour < 18) return "İyi günler";
  return "İyi akşamlar";
}

export function DashboardHero({
  doctor,
  todayCount,
  pendingMessages,
  nextAppointment,
}: {
  doctor: DoctorProfile;
  todayCount: number;
  pendingMessages: number;
  nextAppointment: Appointment | null;
}) {
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const dateLabel = now.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-primary via-primary to-[#2f57b3] p-6 text-white shadow-lg shadow-primary/20 lg:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 right-1/4 h-32 w-32 rounded-full bg-white/5 blur-xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold backdrop-blur-sm ring-1 ring-white/20">
            {doctor.avatarInitials}
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">{dateLabel}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight lg:text-[1.65rem]">
              {greeting}, {doctor.title} {doctor.fullName.split(" ")[0]}
            </h1>
            <p className="mt-1.5 max-w-lg text-sm text-white/75">
              {doctor.specialty.split(",")[0]} · Bugünkü programınız ve hasta
              özetiniz burada.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <HeroPill
            icon={Calendar}
            label="Bugün"
            value={`${todayCount} randevu`}
          />
          <HeroPill
            icon={MessageSquare}
            label="Mesaj"
            value={`${pendingMessages} bekleyen`}
            href="/dashboard/messages"
          />
          {nextAppointment ? (
            <HeroPill
              icon={Users}
              label="Sıradaki"
              value={`${nextAppointment.time} · ${nextAppointment.patientName.split(" ")[0]}`}
              href={`/dashboard/patients/${nextAppointment.patientId}`}
            />
          ) : (
            <HeroPill icon={Users} label="Sıradaki" value="Randevu yok" />
          )}
        </div>
      </div>
    </section>
  );
}

function HeroPill({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl bg-white/10 px-3.5 py-2.5 backdrop-blur-sm ring-1 ring-white/15 transition-colors",
        href && "hover:bg-white/15"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-white/80" />
      <div className="min-w-0 text-left">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60">
          {label}
        </p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
      {href && <ChevronRight className="h-4 w-4 shrink-0 text-white/50" />}
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}

function getNextAppointment(appointments: Appointment[]): Appointment | null {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const upcoming = appointments
    .filter((a) => a.status !== "IPTAL" && a.status !== "TAMAMLANDI")
    .filter((a) => {
      const [h, m] = a.time.split(":").map(Number);
      return h * 60 + m >= nowMinutes;
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  return upcoming[0] ?? null;
}

export { getNextAppointment };
