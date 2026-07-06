"use client";

import { X, Download, Eye, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/mock-data";
import { DOCUMENT_TYPE_ICON, DOCUMENT_TYPE_LABEL } from "@/lib/documents";
import type { PatientLead } from "@/types";
import { cn } from "@/lib/utils";

export function PatientDrawer({
  lead,
  onClose,
}: {
  lead: PatientLead | null;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-[2px] transition-opacity",
          lead ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-40 flex h-screen w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300",
          lead ? "translate-x-0" : "translate-x-full"
        )}
      >
        {lead && (
          <>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-medium text-slate-400">{lead.id}</p>
                <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                  {lead.fullName}
                </h2>
                <div className="mt-2">
                  <Badge tone={leadStatusTone(lead.status)}>
                    {lead.status}
                  </Badge>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  İletişim
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {lead.phone}
                  </div>
                </div>
              </section>

              <section className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Talep Bilgileri
                </h3>
                <dl className="mt-3 grid grid-cols-2 gap-y-3 text-sm">
                  <dt className="text-slate-400">Ülke</dt>
                  <dd className="text-slate-700">
                    {countryCodeToFlagEmoji(lead.countryCode)} {lead.country}
                  </dd>
                  <dt className="text-slate-400">Branş</dt>
                  <dd className="text-slate-700">{lead.branch}</dd>
                  <dt className="text-slate-400">Talep Tarihi</dt>
                  <dd className="text-slate-700">{lead.requestedDate}</dd>
                  {lead.assignedDoctor && (
                    <>
                      <dt className="text-slate-400">Atanan Doktor</dt>
                      <dd className="text-slate-700">{lead.assignedDoctor}</dd>
                    </>
                  )}
                </dl>
              </section>

              <section className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Belgeler ({lead.documents.length})
                </h3>
                <div className="mt-3 space-y-2">
                  {lead.documents.map((doc) => {
                    const Icon = DOCUMENT_TYPE_ICON[doc.type];
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {DOCUMENT_TYPE_LABEL[doc.type]}
                            </p>
                            <p className="text-xs text-slate-400">
                              {doc.fileName} · {doc.fileSizeKb} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            title="Önizle"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            title="İndir"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {lead.documents.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
                      Hasta henüz belge yüklemedi.
                    </p>
                  )}
                </div>
              </section>

              {lead.notes && (
                <section className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Notlar
                  </h3>
                  <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
                    {lead.notes}
                  </p>
                </section>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 px-6 py-4">
              <button className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
                Randevuya Dönüştür
              </button>
              <button className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
                Reddet
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
