"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { ApiError } from "@/lib/api/client";
import { isAuthenticated } from "@/lib/auth";
import { createAppointment } from "@/lib/services/appointments";
import { cn, formatPrice } from "@/lib/utils";

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

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
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function BookingWidget({
  clinicId,
  doctorId,
  branch,
  title,
  subtitle,
  price,
  priceLabel = "Muayene ücreti",
}: {
  clinicId: number;
  doctorId?: number;
  branch: string;
  title: string;
  subtitle: string;
  price: number;
  priceLabel?: string;
}) {
  const router = useRouter();
  const [view, setView] = useState({ year: 2026, month: 6 }); // Temmuz 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(9);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState<string | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      router.push("/auth/login");
      return;
    }

    if (clinicId < 1) {
      setError("Bu klinik için çevrimiçi randevu henüz kullanılamıyor.");
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
      const notes = `Saat: ${time}`;

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
      const message =
        err instanceof ApiError
          ? err.detail
          : err instanceof Error
            ? err.message
            : "Randevu oluşturulamadı";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-md">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-3 text-lg font-bold text-slate-900">
          Randevu Talebiniz Alındı
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {selectedDay} {MONTHS[view.month]} {view.year} — {time}
        </p>
        {appointmentStatus ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">
            Talebiniz iletildi. Durum: {appointmentStatus}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-slate-500">
          Klinik en kısa sürede sizi arayarak randevunuzu onaylayacaktır.
        </p>
        <button
          type="button"
          onClick={() => {
            setConfirmed(false);
            setTime(null);
            setAppointmentStatus(null);
            setError(null);
          }}
          className="mt-4 text-sm font-semibold text-[#3a6ad6] hover:underline"
        >
          Yeni randevu oluştur
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs text-slate-400">{priceLabel}</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatPrice(price)}
              <span className="text-sm font-normal text-slate-400">
                {" "}
                &apos;den itibaren
              </span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Randevuya Açık
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
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#3a6ad6]"
            aria-label="Önceki ay"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold text-slate-900">
            {MONTHS[view.month]} {view.year}
          </p>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#3a6ad6]"
            aria-label="Sonraki ay"
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
                    "text-slate-700 hover:bg-[#eaf0fc] hover:text-[#3a6ad6]",
                  selected && "bg-[#3a6ad6] text-white shadow-sm"
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
            <Clock className="h-4 w-4" /> Uygun saatler
          </p>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTime(t);
                  setError(null);
                }}
                className={cn(
                  "rounded-lg border py-2 text-sm font-medium transition-colors",
                  time === t
                    ? "border-[#3a6ad6] bg-[#3a6ad6] text-white"
                    : "border-slate-200 text-slate-700 hover:border-[#3a6ad6]/50 hover:text-[#3a6ad6]"
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
          <p className="mb-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          disabled={!time || submitting}
          onClick={() => void handleSubmit()}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
            time && !submitting
              ? "bg-[#3a6ad6] text-white hover:bg-[#2f57b3]"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              {time ? "Randevu Talebi Oluştur" : "Tarih ve saat seçin"}
            </>
          )}
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Ödeme klinikte alınır — ön ödeme gerekmez
        </p>
      </div>
    </div>
  );
}
