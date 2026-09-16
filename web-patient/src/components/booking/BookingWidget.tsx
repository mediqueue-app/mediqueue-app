"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useHistoryLayer } from "@/lib/history-layer";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { toUserError } from "@/lib/api/client";
import { isAuthenticated } from "@/lib/auth";
import { createAppointment } from "@/lib/services/appointments";
import { useI18n } from "@/lib/i18n";
import { translateList } from "@/lib/i18n-core";
import { BrowserNotifyOptIn } from "@/components/ui/permission-gate";
import {
  dateKeyFromParts,
  formatAppointmentClock,
  formatMonthYear,
} from "@/lib/datetime";
import { cn, formatPrice } from "@/lib/utils";

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "16:00",
  "17:30",
];

// Demo "bugün" — sistem tarihi 9 Temmuz 2026
const TODAY = new Date(2026, 6, 9);

function startOfMonthMondayOffset(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay(); // 0=Paz
  return (day + 6) % 7; // Pazartesi = 0
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function isBeforeToday(year: number, month: number, day: number): boolean {
  const d = new Date(year, month, day);
  return d < new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
}

function formatRequestedDate(year: number, month: number, day: number): string {
  return dateKeyFromParts(year, month, day);
}

export function BookingWidget({
  clinicId,
  doctorId,
  branch,
  title,
  subtitle,
  price,
  priceLabel,
}: {
  clinicId: number;
  doctorId?: number;
  branch: string;
  title: string;
  subtitle: string;
  price: number;
  priceLabel?: string;
}) {
  const { t, locale } = useI18n();
  const WEEKDAYS = translateList(locale, "booking.weekdays");
  const feeLabel = priceLabel ?? t("booking.consultFee");
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState({ year: 2026, month: 6 }); // Temmuz 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(9);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState<string | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tek history katmanı: saat seçimi → başarı ekranı geçişinde ekstra
  // pushState birikmesin. Geri: başarıdan forma (saat kalır seçili değil),
  // saat adımından takvime (tarih silinmez).
  const dismissBookingStep = useHistoryLayer(Boolean(time) || confirmed, () => {
    if (confirmed) {
      setConfirmed(false);
      setTime(null);
      setAppointmentStatus(null);
      setError(null);
      return;
    }
    setTime(null);
  });

  const cells = useMemo(() => {
    const offset = startOfMonthMondayOffset(view.year, view.month);
    const total = daysInMonth(view.year, view.month);
    const arr: (number | null)[] = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= total; d++) arr.push(d);
    return arr;
  }, [view]);

  function changeMonth(delta: number) {
    setView((prev) => {
      let m = prev.month + delta;
      let y = prev.year;
      if (m < 0) {
        m = 11;
        y -= 1;
      } else if (m > 11) {
        m = 0;
        y += 1;
      }
      return { year: y, month: m };
    });
    setSelectedDay(null);
    setTime(null);
    setError(null);
  }

  async function handleSubmit() {
    if (!time || selectedDay === null || submitting) return;

    if (!isAuthenticated()) {
      router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (clinicId < 1) {
      setError(t("booking.unavailable"));
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const requestedDate = formatRequestedDate(
        view.year,
        view.month,
        selectedDay
      );
      const notes = t("booking.notes", { time });

      const appointment = await createAppointment({
        clinicId,
        doctorId,
        branch,
        requestedDate,
        notes,
      });

      setAppointmentStatus(appointment.status);
      setConfirmed(true);
    } catch (err) {
      setError(toUserError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    const dateKey =
      selectedDay != null
        ? dateKeyFromParts(view.year, view.month, selectedDay)
        : "";
    const clock = formatAppointmentClock(dateKey, time);
    return (
      <div
        data-testid="booking-success"
        className="mq-panel rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-md"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-3 text-lg font-bold text-slate-900">
          {t("booking.successTitle")}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
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
        </p>
        {appointmentStatus ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">
            {t("booking.statusLine", { status: appointmentStatus })}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-slate-500">
          {t("booking.clinicWillCall")}
        </p>
        <div className="mt-4 flex justify-center">
          <BrowserNotifyOptIn
            hideWhenSettled
            className="border border-emerald-200 bg-white px-3"
          />
        </div>
        <button
          type="button"
          onClick={dismissBookingStep}
          className="mt-4 text-sm font-semibold text-primary hover:underline"
        >
          {t("booking.newBooking")}
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs text-slate-400">{feeLabel}</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatPrice(price)}
              <span className="text-sm font-normal text-slate-400">
                {" "}
                {t("booking.fromPrice")}
              </span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("booking.open")}
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="touch-slop flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
            aria-label={t("booking.prevMonth")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold text-slate-900">
            {formatMonthYear(new Date(view.year, view.month, 1), locale)}
          </p>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="touch-slop flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
            aria-label={t("booking.nextMonth")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span
              key={w}
              className="py-1 text-[11px] font-semibold uppercase text-slate-400"
            >
              {w}
            </span>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <span key={`e-${i}`} />;
            const past = isBeforeToday(view.year, view.month, day);
            const selected = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                data-testid={`booking-day-${day}`}
                disabled={past}
                onClick={() => {
                  setSelectedDay(day);
                  setTime(null);
                  setError(null);
                }}
                className={cn(
                  "flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  past && "cursor-not-allowed text-slate-300 line-through",
                  !past &&
                    !selected &&
                    "text-slate-700 hover:bg-primary-light hover:text-primary",
                  selected && "bg-primary text-white shadow-sm"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay !== null && (
        <div className="border-t border-slate-100 px-5 pb-2">
          <p className="mb-2 mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Clock className="h-4 w-4" /> {t("booking.slots")}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                data-testid={`booking-time-${t}`}
                onClick={() => {
                  setTime(t);
                  setError(null);
                }}
                className={cn(
                  "rounded-lg border py-2 text-sm font-medium transition-colors",
                  time === t
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 text-slate-700 hover:border-primary/50 hover:text-primary"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-5 pt-3">
        {error ? (
          <p className="mq-feedback mb-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          data-testid="booking-submit"
          disabled={!time || submitting}
          onClick={() => void handleSubmit()}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
            time && !submitting
              ? "bg-primary text-white hover:bg-primary-hover"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("booking.submitting")}
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              {time ? t("booking.submit") : t("booking.pickSlot")}
            </>
          )}
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          {t("booking.noDeposit")}
        </p>
      </div>
    </div>
  );
}
