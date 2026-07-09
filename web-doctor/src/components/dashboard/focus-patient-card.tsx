import Link from "next/link";
import { Languages, ArrowUpRight, FileText, MessageSquareWarning } from "lucide-react";
import type { Appointment } from "@/types";
import { AppointmentStatusBadge } from "@/components/ui/status-badge";
import { countryCodeToFlagEmoji, languageNames } from "@/lib/ui";

export function FocusPatientCard({ appointment }: { appointment: Appointment | undefined }) {
  if (!appointment) {
    return (
      <div className="card-surface flex flex-col items-center justify-center gap-2 p-10 text-center">
        <p className="text-base font-medium text-slate-700">
          Bugün için sırada bekleyen hasta bulunmuyor
        </p>
        <p className="text-sm text-slate-400">
          Tüm randevularınız tamamlandı, harika bir gün geçirdiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface relative overflow-hidden border-l-4 border-l-primary p-6 sm:p-7">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="text-5xl leading-none">
            {countryCodeToFlagEmoji(appointment.countryCode)}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Sırada Bekleyen Hasta · {appointment.timeSlot}
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {appointment.patientName}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">
              {appointment.patientAge} yaş · {appointment.branch}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <AppointmentStatusBadge status={appointment.status} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                <Languages className="h-3.5 w-3.5" />
                {languageNames[appointment.spokenLanguage]}
              </span>
              {appointment.translatorNeeded && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/60 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                  <MessageSquareWarning className="h-3.5 w-3.5" />
                  Çevirmen Gerekli
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:max-w-xs lg:border-l lg:border-slate-200/80 lg:pl-6">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <FileText className="h-3.5 w-3.5" />
            Ana Şikayet Özeti
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {appointment.chiefComplaint}
          </p>
          <Link
            href={`/dashboard/patients?patient=${appointment.id}`}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Tıbbi Dosyayı Aç
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
