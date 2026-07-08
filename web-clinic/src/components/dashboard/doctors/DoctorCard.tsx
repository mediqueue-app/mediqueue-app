"use client";

import { Clock, Languages, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { doctorStatusLabel, doctorStatusTone } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { Doctor, DoctorStatus, WorkingHours } from "@/types";

const STATUS_OPTIONS: DoctorStatus[] = ["MÜSAİT", "MOLADA", "DOLU"];

export function DoctorCard({
  doctor,
  onOpen,
  onStatusChange,
  onHoursChange,
  onActiveChange,
}: {
  doctor: Doctor;
  onOpen: () => void;
  onStatusChange: (status: DoctorStatus) => void;
  onHoursChange: (hours: WorkingHours) => void;
  onActiveChange: (isActive: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md",
        !doctor.isActive && "opacity-70"
      )}
    >
      <button type="button" onClick={onOpen} className="text-left">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-base font-bold text-primary">
            {doctor.avatarInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-900">
              {doctor.title} {doctor.fullName}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <Stethoscope className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{doctor.specialty}</span>
            </p>
            <div className="mt-2">
              <StarRating value={doctor.rating} showValue />
              <p className="mt-0.5 text-[11px] text-slate-400">
                {doctor.reviewCount} değerlendirme
              </p>
            </div>
          </div>
        </div>
      </button>

      <div className="mt-4 flex items-center gap-1.5 text-slate-400">
        <Languages className="h-3.5 w-3.5" />
        <div className="flex flex-wrap gap-1">
          {doctor.languages.map((lang) => (
            <Badge key={lang} tone="slate">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          Çalışma Saati
        </span>
        <div className="flex items-center gap-1">
          <input
            type="time"
            value={doctor.workingHours.start}
            onChange={(e) =>
              onHoursChange({ ...doctor.workingHours, start: e.target.value })
            }
            className="rounded-lg border border-slate-200 bg-white px-1.5 py-0.5 text-xs"
          />
          <span>–</span>
          <input
            type="time"
            value={doctor.workingHours.end}
            onChange={(e) =>
              onHoursChange({ ...doctor.workingHours, end: e.target.value })
            }
            className="rounded-lg border border-slate-200 bg-white px-1.5 py-0.5 text-xs"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{doctor.yearsExperience} yıl deneyim</span>
        <span>Bugün {doctor.patientsToday} hasta</span>
      </div>

      <div className="mt-4">
        <ToggleSwitch
          id={`active-${doctor.id}`}
          checked={doctor.isActive}
          onChange={onActiveChange}
          label="Aktif doktor"
          description="Pasif doktorlar hasta atamasında görünmez"
        />
      </div>

      <div className="mt-3 flex items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 p-1">
        {STATUS_OPTIONS.map((status) => {
          const isActive = doctor.status === status;
          const tone = doctorStatusTone(status);
          const activeClass =
            tone === "emerald"
              ? "bg-emerald-600 text-white"
              : tone === "amber"
                ? "bg-amber-500 text-white"
                : "bg-red-500 text-white";

          return (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={cn(
                "flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition-colors",
                isActive ? activeClass : "text-slate-500 hover:bg-white"
              )}
            >
              {doctorStatusLabel(status)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
