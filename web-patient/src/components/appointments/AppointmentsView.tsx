"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CalendarX2,
  Clock,
  Stethoscope,
  User,
  MapPin,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  LogIn,
  MessageSquare,
} from "lucide-react";
import { ApiError } from "@/lib/api/client";
import { isAuthenticated } from "@/lib/auth";
import { fetchMyAppointments } from "@/lib/services/appointments";
import type { Appointment, AppointmentStatus } from "@/lib/api/types";
import { HybridBadge } from "@/components/common/HybridBadge";
import { AppointmentChat } from "@/components/appointments/AppointmentChat";
import { getDemoAppointments } from "@/lib/demo/demo-script";
import { cn, formatDate } from "@/lib/utils";

/** Mesajlaşmanın açık olduğu (randevunun onaylandığı) durumlar. */
const MESSAGEABLE_STATUSES: ReadonlySet<AppointmentStatus> = new Set([
  "confirmed",
  "arrived",
  "completed",
]);

const STATUS_META: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Onay Bekliyor",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  confirmed: {
    label: "Onaylandı",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  alternative_date: {
    label: "Alternatif Tarih Önerildi",
    className: "bg-[#eaf0fc] text-[#3a6ad6] ring-[#3a6ad6]/20",
  },
  cancelled: {
    label: "İptal Edildi",
    className: "bg-red-50 text-red-600 ring-red-200",
  },
  arrived: {
    label: "Giriş Yapıldı",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  completed: {
    label: "Tamamlandı",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  },
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const meta = STATUS_META[status] ?? {
    label: status,
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        meta.className
      )}
    >
      {meta.label}
    </span>
  );
}

export function AppointmentsView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needAuth, setNeedAuth] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [reloadKey, setReloadKey] = useState(0);

  // Randevuları yükle. Yeniden deneme `reloadKey` artırılarak tetiklenir;
  // yükleyici effect içinde tanımlıdır (idiomatik async-effect deseni).
  useEffect(() => {
    let ignore = false;

    async function load() {
      // Demo akışı — gerçek API geldiğinde bu satır kaldırılabilir (decoupled).
      const demoAppointments = getDemoAppointments();

      // Ne gerçek oturum ne de demo varsa giriş iste.
      if (!isAuthenticated() && demoAppointments.length === 0) {
        if (!ignore) {
          setNeedAuth(true);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      setNeedAuth(false);

      try {
        // Oturum varsa gerçek randevuları çek; yalnızca demo ise onları göster.
        const data = isAuthenticated() ? await fetchMyAppointments() : [];
        if (ignore) return;
        // En yeni randevu en üstte olsun (demo randevusu dahil).
        const sorted = [...demoAppointments, ...data].sort((a, b) =>
          b.requested_date.localeCompare(a.requested_date)
        );
        setAppointments(sorted);
      } catch (err) {
        if (ignore) return;
        // Gerçek API hata verse bile demo randevusu görünmeye devam etsin.
        if (demoAppointments.length > 0) {
          setAppointments(demoAppointments);
        } else {
          const message =
            err instanceof ApiError
              ? err.detail
              : err instanceof Error
                ? err.message
                : "Randevular yüklenirken bir hata oluştu";
          setError(message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    void load();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf0fc] px-3 py-1 text-xs font-semibold text-[#3a6ad6]">
            <CalendarDays className="h-3.5 w-3.5" />
            Randevu Takibi
          </span>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Randevularım
            </h1>
            {!loading && !error && !needAuth ? (
              <HybridBadge
                source="api"
                description="Randevularınız canlı API'den çekilmektedir."
              />
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Oluşturduğunuz randevu taleplerini ve güncel durumlarını buradan
            takip edebilirsiniz.
          </p>
        </header>

        {loading ? (
          <LoadingState />
        ) : needAuth ? (
          <AuthState />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => setReloadKey((k) => k + 1)}
          />
        ) : appointments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const [chatOpen, setChatOpen] = useState(false);
  const canMessage = MESSAGEABLE_STATUSES.has(appointment.status);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900">
            <Stethoscope className="h-4 w-4 shrink-0 text-[#3a6ad6]" />
            <span className="truncate">{appointment.branch}</span>
          </h3>
          {appointment.doctor_name ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <User className="h-4 w-4 shrink-0 text-slate-400" />
              {appointment.doctor_name}
            </p>
          ) : null}
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-[#3a6ad6]" />
          {formatDate(appointment.requested_date)}
        </span>
        {appointment.alternative_date ? (
          <span className="flex items-center gap-1.5 text-[#3a6ad6]">
            <Clock className="h-4 w-4" />
            Alternatif: {formatDate(appointment.alternative_date)}
          </span>
        ) : null}
        <div className="ml-auto flex items-center gap-3">
          {canMessage ? (
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf0fc] px-3 py-1.5 text-xs font-semibold text-[#3a6ad6] transition-colors hover:bg-[#dbe6fb]"
            >
              <MessageSquare className="h-4 w-4" />
              Mesajlaş
            </button>
          ) : null}
          <Link
            href={`/clinics/${appointment.clinic_id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#3a6ad6] hover:underline"
          >
            <MapPin className="h-4 w-4" />
            Kliniği Gör
          </Link>
        </div>
      </div>

      {appointment.notes ? (
        <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
          {appointment.notes}
        </p>
      ) : null}

      {chatOpen ? (
        <AppointmentChat
          appointment={appointment}
          onClose={() => setChatOpen(false)}
        />
      ) : null}
    </article>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-full space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="h-6 w-24 shrink-0 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4">
            <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf0fc] text-[#3a6ad6]">
        <CalendarX2 className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Henüz randevunuz bulunmuyor
      </h2>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Hemen bir klinik seçip randevu oluşturabilirsiniz.
      </p>
      <Link
        href="/clinics"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3a6ad6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2f57b3]"
      >
        Klinikleri İncele
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Randevular yüklenirken bir hata oluştu
      </h2>
      <p className="mt-1 max-w-sm text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <RefreshCw className="h-4 w-4" />
        Tekrar Dene
      </button>
    </div>
  );
}

function AuthState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf0fc] text-[#3a6ad6]">
        <LogIn className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Randevularınızı görmek için giriş yapın
      </h2>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Randevu geçmişinize ve güncel durumlarına erişmek için hesabınıza giriş
        yapmanız gerekir.
      </p>
      <Link
        href="/auth/login"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3a6ad6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2f57b3]"
      >
        Giriş Yap
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
