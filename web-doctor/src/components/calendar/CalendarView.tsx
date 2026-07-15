"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Settings2,
  X,
} from "lucide-react";
import type { Appointment, AvailabilitySlot, CalendarViewMode } from "@/types";
import { AvailabilityEditor } from "@/components/calendar/AvailabilityEditor";
import { DayAgendaPanel } from "@/components/calendar/DayAgendaPanel";
import { MonthGrid } from "@/components/calendar/MonthGrid";
import { WeekTimeGrid } from "@/components/calendar/WeekTimeGrid";
import { useDemoToast } from "@/components/ui/DemoToast";
import {
  fetchAvailabilitySlots,
  getInitialAvailabilitySlots,
  saveAvailabilitySlots,
  type DataSource,
} from "@/lib/services/calendar";
import {
  countByStatus,
  formatMonthYear,
  getMonthWeeks,
  getWeekDays,
  getWeekStart,
  groupAppointmentsByDate,
  toDateKey,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

const STATUS_LEGEND = [
  { label: "Onaylandı", className: "bg-emerald-500" },
  { label: "Bekliyor", className: "bg-amber-500" },
  { label: "Tamamlandı", className: "bg-blue-500" },
  { label: "İptal", className: "bg-red-400" },
] as const;

export function CalendarView({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const today = useMemo(() => new Date(), []);
  const todayKey = toDateKey(today);
  const { show, Toast } = useDemoToast();

  const [viewMode, setViewMode] = useState<CalendarViewMode>("HAFTA");
  const [focusDate, setFocusDate] = useState(() => new Date(today));
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] =
    useState<AvailabilitySlot[]>(() => getInitialAvailabilitySlots());
  const [availabilitySource, setAvailabilitySource] =
    useState<DataSource>("mock");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAvailabilitySlots()
      .then(({ slots, source }) => {
        if (!cancelled) {
          setAvailability(slots);
          setAvailabilitySource(source);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAvailability(getInitialAvailabilitySlots());
          setAvailabilitySource("mock");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSaveAvailability() {
    setSaving(true);
    setSaveError(null);
    try {
      const { slots, source } = await saveAvailabilitySlots(availability);
      setAvailability(slots);
      setAvailabilitySource(source);
      setShowAvailability(false);
      show(
        source === "api"
          ? "Müsaitlik kalıcı olarak kaydedildi"
          : "Mock oturum — API yokken kalıcı değil"
      );
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Müsaitlik kaydedilemedi"
      );
    } finally {
      setSaving(false);
    }
  }

  const appointmentsByDate = useMemo(
    () => groupAppointmentsByDate(appointments),
    [appointments]
  );

  const weekStart = useMemo(() => getWeekStart(focusDate), [focusDate]);
  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);
  const monthWeeks = useMemo(
    () => getMonthWeeks(focusDate.getFullYear(), focusDate.getMonth()),
    [focusDate]
  );

  const weekAppointments = useMemo(() => {
    const keys = new Set(weekDays.map(toDateKey));
    return appointments.filter((a) => keys.has(a.date));
  }, [appointments, weekDays]);

  const selectedAppointments = appointmentsByDate.get(selectedDate) ?? [];

  function navigate(delta: number) {
    setFocusDate((prev) => {
      const next = new Date(prev);
      if (viewMode === "HAFTA") {
        next.setDate(prev.getDate() + delta * 7);
      } else {
        next.setMonth(prev.getMonth() + delta);
      }
      return next;
    });
  }

  function goToToday() {
    setFocusDate(new Date(today));
    setSelectedDate(todayKey);
  }

  return (
    <div className="flex flex-col gap-5">
      {Toast}
      {/* Üst toolbar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Önceki"
              className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Sonraki"
              className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {viewMode === "HAFTA"
                ? `${formatMonthYear(weekDays[0])} — Hafta`
                : formatMonthYear(focusDate)}
            </h2>
            <p className="text-xs text-slate-500">
              {weekAppointments.length} randevu
              {viewMode === "HAFTA" && " bu hafta"}
              {" · "}
              {countByStatus(weekAppointments, "ONAYLANDI")} onaylı
              {" · "}
              {countByStatus(weekAppointments, "BEKLIYOR")} beklemede
            </p>
          </div>

          <button
            type="button"
            onClick={goToToday}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Bugün
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            {(["HAFTA", "AY"] as CalendarViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  viewMode === mode
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {mode === "HAFTA" ? "Haftalık" : "Aylık"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAvailability(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-hover"
          >
            <Settings2 className="h-3.5 w-3.5" />
            Müsaitlik
          </button>
        </div>
      </div>

      {/* Durum göstergesi */}
      <div className="flex flex-wrap items-center gap-3 px-1">
        <CalendarDays className="h-4 w-4 text-slate-400" />
        {STATUS_LEGEND.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500"
          >
            <span className={cn("h-2 w-2 rounded-full", item.className)} />
            {item.label}
          </span>
        ))}
      </div>

      {/* Ana içerik */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <div>
          {viewMode === "HAFTA" ? (
            <WeekTimeGrid
              weekDays={weekDays}
              appointmentsByDate={appointmentsByDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          ) : (
            <MonthGrid
              weeks={monthWeeks}
              focusDate={focusDate}
              appointmentsByDate={appointmentsByDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>

        <DayAgendaPanel
          selectedDate={selectedDate}
          appointments={selectedAppointments}
        />
      </div>

      {/* Müsaitlik modal */}
      {showAvailability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Müsaitlik Düzenle
                </h2>
                <p className="text-xs text-slate-500">
                  Haftalık çalışma saatlerinizi belirleyin
                  {availabilitySource === "api"
                    ? " · kalıcı kayıt"
                    : " · mock oturum"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAvailability(false)}
                aria-label="Kapat"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-4">
              <AvailabilityEditor
                slots={availability}
                onChange={setAvailability}
                persistHint={
                  availabilitySource === "api"
                    ? "Kaydet sonrası sunucuda saklanır"
                    : "Mock mod — yenilemede varsayılana döner"
                }
              />
              {saveError && (
                <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {saveError}
                </p>
              )}
            </div>
            <div className="border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                disabled={saving}
                onClick={() => void handleSaveAvailability()}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
              >
                {saving ? "Kaydediliyor…" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
