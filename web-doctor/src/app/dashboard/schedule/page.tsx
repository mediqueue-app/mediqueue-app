"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ScheduleSlot, ScheduleSlotType } from "@/types";
import { scheduleSlots as initialSlots, TODAY_ISO } from "@/lib/mock-doctor";
import {
  formatDateLong,
  formatDateRangeShort,
  formatMonthYear,
  getDayNumber,
  getWeekdayShort,
  slotTypeStyles,
} from "@/lib/ui";
import {
  addDays,
  addMonths,
  getWeekDates,
  HOUR_LABELS,
  isSameMonth,
} from "@/lib/schedule-grid";
import { SlotBlock } from "@/components/schedule/slot-block";
import { MonthView } from "@/components/schedule/month-view";

const GRID_HEIGHT_PX = 960;

type ViewMode = "GÜN" | "HAFTA" | "AY";

const legendItems: { type: ScheduleSlotType; label: string }[] = [
  { type: "KONSÜLTASYON", label: "Onaylı Randevu" },
  { type: "AMELİYAT", label: "Ameliyat" },
  { type: "MÜSAİT", label: "Müsait" },
  { type: "DOLU", label: "Bloklandı" },
];

function toggleSlotType(slot: ScheduleSlot): ScheduleSlot {
  if (slot.type === "MÜSAİT") {
    return { ...slot, type: "DOLU", label: "Bloklandı - Dolu" };
  }
  return { ...slot, type: "MÜSAİT", label: undefined };
}

export default function SchedulePage() {
  const [slots, setSlots] = useState<ScheduleSlot[]>(initialSlots);
  const [viewMode, setViewMode] = useState<ViewMode>("HAFTA");
  const [anchorDate, setAnchorDate] = useState(TODAY_ISO);

  const weekDates = useMemo(() => getWeekDates(anchorDate), [anchorDate]);

  function handleToggle(slot: ScheduleSlot) {
    setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? toggleSlotType(s) : s))
    );
  }

  function goToStep(direction: 1 | -1) {
    if (viewMode === "GÜN") setAnchorDate((d) => addDays(d, direction));
    else if (viewMode === "HAFTA") setAnchorDate((d) => addDays(d, direction * 7));
    else setAnchorDate((d) => addMonths(d, direction));
  }

  const headerTitle =
    viewMode === "GÜN"
      ? formatDateLong(anchorDate)
      : viewMode === "HAFTA"
        ? formatDateRangeShort(weekDates[0], weekDates[6])
        : formatMonthYear(anchorDate);

  const visibleAppointmentCount = useMemo(() => {
    if (viewMode === "GÜN") {
      return slots.filter((s) => s.date === anchorDate && s.appointmentId).length;
    }
    if (viewMode === "HAFTA") {
      return slots.filter((s) => weekDates.includes(s.date) && s.appointmentId).length;
    }
    return slots.filter((s) => isSameMonth(s.date, anchorDate) && s.appointmentId).length;
  }, [slots, viewMode, anchorDate, weekDates]);

  return (
    <div className="flex flex-col gap-6">
      {/* Üst navigasyon ve kontrol bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {headerTitle}
          </h2>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {visibleAppointmentCount} Randevu
          </span>

          <div className="ml-1 inline-flex items-center overflow-hidden rounded-lg border border-slate-200/80 bg-white">
            <button
              type="button"
              onClick={() => goToStep(-1)}
              aria-label="Önceki"
              className="touch-slop flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setAnchorDate(TODAY_ISO)}
              className="border-x border-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              Bugün
            </button>
            <button
              type="button"
              onClick={() => goToStep(1)}
              aria-label="Sonraki"
              className="touch-slop flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 self-start rounded-lg bg-slate-100/70 p-1">
          {(["GÜN", "HAFTA", "AY"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-all ${
                viewMode === mode
                  ? "bg-slate-200/70 text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {mode === "GÜN" ? "Gün" : mode === "HAFTA" ? "Hafta" : "Ay"}
            </button>
          ))}
        </div>
      </div>

      {/* Renk lejantı */}
      <div className="flex flex-wrap items-center gap-4">
        {legendItems.map((item) => {
          const styles = slotTypeStyles[item.type];
          return (
            <span
              key={item.type}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"
            >
              <span className={`h-2.5 w-2.5 rounded-sm border-l-2 ${styles.accent} ${styles.bg}`} />
              {item.label}
            </span>
          );
        })}
      </div>

      <div className="card-surface overflow-x-auto p-6">
        {viewMode === "AY" ? (
          <MonthView
            anchorDate={anchorDate}
            slots={slots}
            onSelectDay={(date) => {
              setAnchorDate(date);
              setViewMode("GÜN");
            }}
          />
        ) : viewMode === "HAFTA" ? (
          <div className="flex min-w-[900px] flex-col gap-3">
            <div className="flex">
              <div className="w-14 shrink-0" />
              <div className="grid flex-1 grid-cols-7 gap-3">
                {weekDates.map((date) => (
                  <DayHeader key={date} date={date} isToday={date === TODAY_ISO} />
                ))}
              </div>
            </div>
            <div className="flex">
              <HourLabelColumn />
              <div className="grid flex-1 grid-cols-7 gap-3">
                {weekDates.map((date) => (
                  <DayGrid
                    key={date}
                    slots={slots.filter((s) => s.date === date)}
                    onToggle={handleToggle}
                    isToday={date === TODAY_ISO}
                    dense
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-w-[320px] flex-col gap-3">
            <div className="flex">
              <HourLabelColumn />
              <div className="flex-1">
                <DayGrid
                  slots={slots.filter((s) => s.date === anchorDate)}
                  onToggle={handleToggle}
                  isToday={anchorDate === TODAY_ISO}
                  dense={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Mavi kartlar onaylı hasta randevularınızdır; üzerine tıklayarak tıbbi dosyayı
        açabilirsiniz. Müsait veya boş bıraktığınız saatlere tıklayarak hızlıca
        bloklayabilir, tekrar tıklayarak müsait hale getirebilirsiniz.
      </p>
    </div>
  );
}

function HourLabelColumn() {
  return (
    <div className="relative w-14 shrink-0 pr-3" style={{ height: GRID_HEIGHT_PX }}>
      {HOUR_LABELS.map((hour, i) => (
        <span
          key={hour}
          style={{ top: `${(i / (HOUR_LABELS.length - 1)) * 100}%` }}
          className="absolute -translate-y-1/2 text-xs font-medium text-slate-400"
        >
          {String(hour).padStart(2, "0")}:00
        </span>
      ))}
    </div>
  );
}

function DayHeader({ date, isToday }: { date: string; isToday: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-1">
      <p className={`text-xs font-semibold ${isToday ? "text-primary" : "text-slate-500"}`}>
        {getWeekdayShort(date)}
      </p>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
          isToday ? "bg-primary text-white" : "text-slate-700"
        }`}
      >
        {getDayNumber(date)}
      </span>
    </div>
  );
}

function DayGrid({
  slots,
  onToggle,
  isToday,
  dense,
}: {
  slots: ScheduleSlot[];
  onToggle: (slot: ScheduleSlot) => void;
  isToday: boolean;
  dense: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl ${
        isToday ? "bg-primary/[0.03] ring-1 ring-primary/15" : "bg-slate-50/50"
      }`}
      style={{ height: GRID_HEIGHT_PX }}
    >
      {HOUR_LABELS.map((hour, i) => (
        <div
          key={hour}
          style={{ top: `${(i / (HOUR_LABELS.length - 1)) * 100}%` }}
          className="absolute left-0 right-0 border-t border-dashed border-slate-200/70"
        />
      ))}
      {slots.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-slate-300">
          Program bulunmuyor
        </p>
      )}
      {slots.map((slot) => (
        <SlotBlock key={slot.id} slot={slot} onToggle={onToggle} dense={dense} />
      ))}
    </div>
  );
}
