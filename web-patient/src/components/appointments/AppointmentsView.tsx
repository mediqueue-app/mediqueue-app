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
  LogIn,
  MessageSquare,
} from "lucide-react";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toUserError } from "@/lib/api/client";
import { isAuthenticated } from "@/lib/auth";
import { cancelAppointment, fetchMyAppointments } from "@/lib/services/appointments";
import type { Appointment, AppointmentStatus } from "@/lib/api/types";
import { HybridBadge } from "@/components/common/HybridBadge";
import { AppointmentChat } from "@/components/appointments/AppointmentChat";
import {
  cancelDemoAppointment,
  DEMO_APPOINTMENT_ID,
  getDemoAppointments,
} from "@/lib/demo/demo-script";
import { useHistoryLayer } from "@/lib/history-layer";
import { cn, formatDate } from "@/lib/utils";
import { extractAppointmentTime, formatAppointmentClock } from "@/lib/datetime";
import { useT } from "@/lib/i18n";

/** Mesajlaşmanın açık olduğu (randevunun onaylandığı) durumlar. */
const MESSAGEABLE_STATUSES: ReadonlySet<AppointmentStatus> = new Set([
  "confirmed",
  "arrived",
  "completed",
]);

const CANCELLABLE_STATUSES: ReadonlySet<AppointmentStatus> = new Set([
  "pending",
  "alternative_date",
  "confirmed",
]);

const STATUS_META: Record<
  AppointmentStatus,
  { labelKey: string; className: string }
> = {
  pending: {
    labelKey: "appointments.status.pending",
    className: "bg-warning-light text-warning ring-warning/20",
  },
  confirmed: {
    labelKey: "appointments.status.confirmed",
    className: "bg-success-light text-success ring-success/20",
  },
  alternative_date: {
    labelKey: "appointments.status.alternative_date",
    className: "bg-warning-light text-warning ring-warning/20",
  },
  cancelled: {
    labelKey: "appointments.status.cancelled",
    className: "bg-error-light text-error ring-error/20",
  },
  arrived: {
    labelKey: "appointments.status.arrived",
    className: "bg-secondary-light text-secondary ring-secondary/20",
  },
  completed: {
    labelKey: "appointments.status.completed",
    className: "bg-neutral-light text-neutral ring-border",
  },
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const t = useT();
  const meta = STATUS_META[status] ?? {
    labelKey: status,
    className: "bg-neutral-light text-neutral ring-border",
  };
  const label = STATUS_META[status] ? t(meta.labelKey) : status;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        meta.className
      )}
    >
        {label}
    </span>
  );
}

export function AppointmentsView() {
  const t = useT();
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
          setError(toUserError(err));
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
            <CalendarDays className="h-3.5 w-3.5" />
            {t("appointments.eyebrow")}
          </span>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {t("appointments.title")}
            </h1>
            {!loading && !error && !needAuth ? (
              <HybridBadge
                source="api"
                description={t("appointments.liveTip")}
              />
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {t("appointments.lead")}
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
          <LocalizedEmpty
            copyKey="appointments"
            icon={CalendarX2}
            actionHref="/clinics"
          />
        ) : (
          <div className="flex flex-col gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onUpdated={(updated) =>
                  setAppointments((prev) =>
                    prev.map((item) => (item.id === updated.id ? updated : item))
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentCard({
  appointment,
  onUpdated,
}: {
  appointment: Appointment;
  onUpdated: (appointment: Appointment) => void;
}) {
  const t = useT();
  const [chatOpen, setChatOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const closeChat = useHistoryLayer(chatOpen, () => setChatOpen(false));
  const canMessage = MESSAGEABLE_STATUSES.has(appointment.status);
  const canCancel = CANCELLABLE_STATUSES.has(appointment.status);

  async function runCancel() {
    if (cancelling) return;
    setCancelling(true);
    setCancelError(null);
    try {
      if (appointment.id === DEMO_APPOINTMENT_ID) {
        const updated = cancelDemoAppointment();
        if (updated) onUpdated(updated);
      } else {
        const updated = await cancelAppointment(appointment.id);
        onUpdated(updated);
      }
      setConfirmOpen(false);
    } catch (err) {
      setCancelError(toUserError(err));
    } finally {
      setCancelling(false);
    }
  }

  return (
    <article className="mq-list-item rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-[220ms] ease-out hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900">
            <Stethoscope className="h-4 w-4 shrink-0 text-primary" />
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
        <span className="flex min-w-0 items-start gap-1.5">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <AppointmentWhen
            date={appointment.requested_date}
            notes={appointment.notes}
          />
        </span>
        {appointment.alternative_date ? (
          <span className="flex items-center gap-1.5 text-primary">
            <Clock className="h-4 w-4" />
            {t("appointments.alternative", {
              date: formatDate(appointment.alternative_date),
            })}
          </span>
        ) : null}
        <div className="ml-auto flex flex-wrap items-center gap-3">
          {canMessage ? (
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
            >
              <MessageSquare className="h-4 w-4" />
              {t("appointments.chat")}
            </button>
          ) : null}
          {canCancel ? (
            <button
              type="button"
              onClick={() => {
                setCancelError(null);
                setConfirmOpen(true);
              }}
              className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              {t("appointments.cancel")}
            </button>
          ) : null}
          <Link
            href={`/clinics/${appointment.clinic_id}`}
            className="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            <MapPin className="h-4 w-4" />
            {t("appointments.viewClinic")}
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
          onClose={closeChat}
        />
      ) : null}

      <ConfirmDialog
        open={confirmOpen}
        title={t("confirm.appointmentTitle")}
        description={t("confirm.appointmentBody")}
        confirmLabel={t("confirm.appointmentAction")}
        busy={cancelling}
        error={cancelError}
        onClose={() => {
          if (!cancelling) setConfirmOpen(false);
        }}
        onConfirm={() => void runCancel()}
      />
    </article>
  );
}

function AppointmentWhen({
  date,
  notes,
}: {
  date: string;
  notes?: string | null;
}) {
  const t = useT();
  const clock = formatAppointmentClock(date, extractAppointmentTime(notes));
  return (
    <span className="leading-snug">
      {clock.date}
      {clock.clinicTime ? (
        <>
          {" · "}
          {clock.clinicTime} {t("datetime.istanbul")}
          {clock.dual && clock.localTime ? (
            <>
              {" · "}
              {clock.localTime} {t("datetime.yourTime")}
            </>
          ) : null}
        </>
      ) : null}
    </span>
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

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {t("appointments.loadFailed")}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <RefreshCw className="h-4 w-4" />
        {t("errors.retry")}
      </button>
    </div>
  );
}

function AuthState() {
  return (
    <LocalizedEmpty
      copyKey="appointmentsAuth"
      icon={LogIn}
      actionHref="/auth/login?next=%2Fappointments"
    />
  );
}
