import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  FileText,
  MapPin,
} from "lucide-react";
import type { Patient } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  BRANCH_LABELS,
  STATUS_ACCENT,
  formatLastVisit,
  getTimelineProgress,
} from "@/lib/patient-utils";
import { countryCodeToFlagEmoji } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PatientCard({
  patient,
  variant = "list",
}: {
  patient: Patient;
  variant?: "list" | "grid";
}) {
  const progress = getTimelineProgress(patient);
  const branchLabel = BRANCH_LABELS[patient.branch];

  return (
    <Link
      href={`/dashboard/patients/${patient.id}`}
      className={cn(
        "group panel-lift block overflow-hidden rounded-[1.25rem] border border-white/80 bg-white/95 shadow-sm backdrop-blur-sm",
        "border-l-[3px]",
        STATUS_ACCENT[patient.treatmentStatus],
        variant === "grid" ? "p-4" : "p-5"
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          variant === "grid" ? "flex-col" : "flex-row items-center"
        )}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-2xl bg-primary-light font-bold text-primary transition-transform group-hover:scale-[1.02]",
              variant === "grid" ? "h-14 w-14 text-base" : "h-12 w-12 text-sm"
            )}
          >
            {patient.avatarInitials}
          </div>
          <span
            className="absolute -bottom-1 -right-1 text-lg leading-none"
            aria-label={patient.nationality}
          >
            {countryCodeToFlagEmoji(patient.countryCode)}
          </span>
        </div>

        {/* İçerik */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900 group-hover:text-primary">
                {patient.fullName}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">{patient.treatmentType}</p>
            </div>
            <StatusBadge status={patient.treatmentStatus} variant="treatment" />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              {branchLabel}
            </span>
            {patient.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-md bg-primary-light/60 px-1.5 py-0.5 text-[10px] font-bold text-primary"
              >
                {lang}
              </span>
            ))}
          </div>

          {patient.highlightNote && variant === "list" && (
            <p className="mt-2 line-clamp-1 text-xs text-slate-500 italic">
              {patient.highlightNote}
            </p>
          )}

          {/* Tedavi ilerlemesi */}
          <div className="mt-3">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[11px] font-medium text-slate-500">
                {progress.activeLabel || "Tedavi yolculuğu"}
              </p>
              <span className="shrink-0 text-[10px] font-semibold text-primary">
                %{progress.percent}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>

          {/* Meta */}
          <div
            className={cn(
              "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400",
              variant === "grid" && "flex-col items-start gap-1"
            )}
          >
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {patient.nationality}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Son ziyaret: {formatLastVisit(patient.lastVisitDate)}
            </span>
            {patient.documents.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {patient.documents.length} belge
              </span>
            )}
          </div>
        </div>

        {/* Ok — liste görünümü */}
        {variant === "list" && (
          <ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
        )}
      </div>
    </Link>
  );
}
