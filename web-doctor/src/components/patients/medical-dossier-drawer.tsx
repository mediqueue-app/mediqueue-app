"use client";

import { useState } from "react";
import {
  FileText,
  IdCard,
  Image as ImageIcon,
  Languages,
  MessageSquareWarning,
  X,
} from "lucide-react";
import type { Appointment, DocumentType, PatientDocument } from "@/types";
import { AppointmentStatusBadge } from "@/components/ui/status-badge";
import {
  countryCodeToFlagEmoji,
  documentTypeLabels,
  formatDateLong,
  getCountryName,
  languageNames,
} from "@/lib/ui";
import { DocumentPreviewModal } from "@/components/patients/document-preview-modal";

const documentIcons: Record<DocumentType, typeof FileText> = {
  TIBBI_RAPOR: FileText,
  "FOTOĞRAF": ImageIcon,
  PASAPORT: IdCard,
};

export function MedicalDossierDrawer({
  appointment,
  onClose,
}: {
  appointment: Appointment;
  onClose: () => void;
}) {
  const [previewDoc, setPreviewDoc] = useState<PatientDocument | null>(null);

  return (
    <>
      <div className="mq-overlay fixed inset-0 z-40 flex justify-end bg-slate-900/40">
        <button aria-label="Kapat" onClick={onClose} className="absolute inset-0" />

        <aside className="mq-panel relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface text-foreground shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-200/80 px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl leading-none">
                {countryCodeToFlagEmoji(appointment.countryCode)}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {appointment.patientName}
                </h2>
                <p className="text-sm text-slate-500">
                  {appointment.patientAge} yaş · {getCountryName(appointment.countryCode)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="touch-target rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-6 px-6 py-6">
            <div className="flex flex-wrap items-center gap-2">
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

            <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200/80 p-4 text-sm">
              <div>
                <p className="text-xs font-medium text-slate-400">Branş</p>
                <p className="mt-0.5 font-medium text-slate-800">{appointment.branch}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Randevu</p>
                <p className="mt-0.5 font-medium text-slate-800">
                  {formatDateLong(appointment.date)} · {appointment.timeSlot}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Ana Şikayet
              </p>
              <p className="mt-2 rounded-xl bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-700">
                {appointment.chiefComplaint}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Tıbbi Raporlar ve Fotoğraflar ({appointment.documents.length})
              </p>
              <div className="flex flex-col gap-2">
                {appointment.documents.map((doc) => {
                  const Icon = documentIcons[doc.type];
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setPreviewDoc(doc)}
                      className="flex items-center gap-3 rounded-xl border border-slate-200/80 p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {doc.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {documentTypeLabels[doc.type]} · {doc.date}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {previewDoc && (
        <DocumentPreviewModal document={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}
    </>
  );
}
