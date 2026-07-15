import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";
import type { Appointment, DoctorProfile } from "@/types";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Günaydın";
  if (hour < 18) return "İyi günler";
  return "İyi akşamlar";
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80";

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
  });

  return (
    <div className="flex flex-col gap-5">
      <section className="relative isolate min-h-[280px] overflow-hidden rounded-[1.75rem] sm:min-h-[320px] lg:min-h-[360px]">
        <Image
          src={HERO_IMAGE}
          alt="Klinik ortamı"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1440px) 100vw, 1440px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

        <div className="relative flex h-full min-h-[280px] flex-col justify-between p-6 sm:min-h-[320px] sm:p-8 lg:min-h-[360px] lg:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md">
              <Stethoscope className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-[15px] font-bold tracking-tight text-white">
                MEDI<span className="text-primary">·</span>QUEUE
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Doktor Portalı
              </p>
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-sm font-medium text-white/65">{dateLabel}</p>
            <h1 className="font-display mt-2 text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {greeting}, {doctor.title} {doctor.fullName.split(" ")[0]}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Bugünün programı hazır. Onaylı randevularınızı yönetin, müsaitliği
              güncelleyin, hastalarınıza odaklanın.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard/calendar"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-light"
              >
                Takvimi Aç
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/patients"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Hastalarım
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <PulseTile
          icon={Calendar}
          label="Bugün"
          value={`${todayCount} randevu`}
          hint="Program yükü"
          tone="primary"
        />
        <PulseTile
          icon={MessageSquare}
          label="Mesaj"
          value={`${pendingMessages} bekleyen`}
          hint="Yanıt bekliyor"
          href="/dashboard/messages"
          tone="violet"
        />
        <PulseTile
          icon={Users}
          label="Sıradaki"
          value={
            nextAppointment
              ? `${nextAppointment.time} · ${nextAppointment.patientName.split(" ")[0]}`
              : "Boş slot"
          }
          hint={nextAppointment ? "Hasta detayı" : "Takvimden ekle"}
          href={
            nextAppointment
              ? `/dashboard/patients/${nextAppointment.patientId}`
              : "/dashboard/calendar"
          }
          tone="emerald"
          live={Boolean(nextAppointment)}
        />
      </div>
    </div>
  );
}

function PulseTile({
  icon: Icon,
  label,
  value,
  hint,
  href,
  tone,
  live,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  hint: string;
  href?: string;
  tone: "primary" | "violet" | "emerald";
  live?: boolean;
}) {
  const tones = {
    primary: "from-primary/15 to-transparent text-primary",
    violet: "from-violet-500/15 to-transparent text-violet-600",
    emerald: "from-emerald-500/15 to-transparent text-emerald-600",
  };

  const inner = (
    <div className="panel-lift group relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tones[tone]} opacity-80`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {label}
            </p>
            {live && (
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            )}
          </div>
          <p className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">
            {value}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
          <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
        </div>
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
