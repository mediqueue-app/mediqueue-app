import Link from "next/link";
import { Calendar, MessageSquare, Users } from "lucide-react";
import type { Appointment, DoctorProfile } from "@/types";

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
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
            {doctor.avatarInitials}
          </div>
          <div>
            <p className="text-sm text-slate-500">{dateLabel}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-[28px]">
              {greeting}, {doctor.title} {doctor.fullName.split(" ")[0]}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Bugün odaklanmanız gereken randevular ve mesajlar aşağıda.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <MetaChip
            icon={Calendar}
            label="Bugün"
            value={`${todayCount} randevu`}
          />
          <MetaChip
            icon={MessageSquare}
            label="Mesaj"
            value={`${pendingMessages} bekleyen`}
            href="/dashboard/messages"
          />
          {nextAppointment ? (
            <MetaChip
              icon={Users}
              label="Sıradaki"
              value={`${nextAppointment.time} · ${nextAppointment.patientName.split(" ")[0]}`}
              href={`/dashboard/patients/${nextAppointment.patientId}`}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function MetaChip({
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
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 transition-colors hover:border-slate-200 hover:bg-white">
      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}

export function getNextAppointment(
  appointments: Appointment[]
): Appointment | null {
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
