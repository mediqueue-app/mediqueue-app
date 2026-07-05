"use client";

import { Clock, Languages, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { doctorStatusLabel, doctorStatusTone } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { Doctor, DoctorStatus, WorkingHours } from "@/types";

const STATUS_OPTIONS: DoctorStatus[] = ["MÜSAİT", "MOLADA", "DOLU"];

export function DoctorCard({
  doctor,
  onStatusChange,
  onHoursChange,
}: {
  doctor: Doctor;
  onStatusChange: (status: DoctorStatus) => void;
  onHoursChange: (hours: WorkingHours) => void;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
          {doctor.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {doctor.title} {doctor.fullName}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <Stethoscope className="h-3 w-3 shrink-0" />
            <span className="truncate">{doctor.specialty}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-slate-400">
        <Languages className="h-3.5 w-3.5" />
        <div className="flex flex-wrap gap-1">
          {doctor.languages.map((lang) => (
            <Badge key={lang} tone="slate">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
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
            className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-slate-700 focus:border-primary focus:outline-none"
          />
          <span>–</span>
          <input
            type="time"
            value={doctor.workingHours.end}
            onChange={(e) =>
              onHoursChange({ ...doctor.workingHours, end: e.target.value })
            }
            className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-slate-700 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{doctor.yearsExperience} yıl tecrübe</span>
        <span>Bugün {doctor.patientsToday} hasta</span>
      </div>

      <div className="mt-4 flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
        {STATUS_OPTIONS.map((status) => {
          const isActive = doctor.status === status;
          const tone = doctorStatusTone(status);
          const activeClass =
            tone === "emerald"
              ? "bg-emerald-600 text-white"
              : tone === "amber"
                ? "bg-amber-500 text-white"
                : "bg-red-600 text-white";

          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={cn(
                "flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors",
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
