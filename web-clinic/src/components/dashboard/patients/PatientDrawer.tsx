"use client";

import { useEffect } from "react";
import { CalendarClock, Download, Eye, Mail, Phone, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useDemoToast } from "@/components/ui/DemoToast";
import { leadStatusLabel, leadStatusTone } from "@/lib/status";
import { countryCodeToFlagEmoji } from "@/lib/country";
import { DOCUMENT_TYPE_ICON, DOCUMENT_TYPE_LABEL } from "@/lib/documents";
import { mockDateKey } from "@/lib/mock-date";
import { formatDateTimeTr, formatRelativeDay } from "@/lib/utils";
import type { PatientLead } from "@/types";
import { cn } from "@/lib/utils";

export function PatientDrawer({
  lead,
  onClose,
  onUpdateStatus,
}: {
  lead: PatientLead | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: PatientLead["status"]) => void;
}) {
  const { show, Toast } = useDemoToast();
  const todayKey = mockDateKey(0);

  useEffect(() => {
    if (!lead) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lead, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-[2px] transition-opacity",
          lead ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden={!lead}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={lead ? `${lead.fullName} hasta detayı` : undefined}
        className={cn(
          "fixed right-0 top-0 z-40 flex h-screen w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300",
          lead ? "translate-x-0" : "translate-x-full"
        )}
      >
        {lead && (
          <>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-6">
              <div>
                <p className="text-xs font-medium text-slate-400">{lead.id}</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {lead.fullName}
                </h2>
                <div className="mt-3">
                  <Badge tone={leadStatusTone(lead.status)}>
                    {leadStatusLabel(lead.status)}
                  </Badge>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
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
                  <dt className="text-slate-400">Tedavi</dt>
                  <dd className="text-slate-700">{lead.branch}</dd>
                  <dt className="text-slate-400">Talep Tarihi</dt>
                  <dd className="text-slate-700">
                    {formatRelativeDay(lead.requestedDate, todayKey)}
                  </dd>
                  <dt className="text-slate-400">Kayıt</dt>
                  <dd className="text-slate-700">
                    {formatDateTimeTr(lead.createdAt)}
                  </dd>
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
                  İletişim Geçmişi
                </h3>
                <div className="mt-3 space-y-2">
                  {(lead.contactHistory ?? []).map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                    >
                      <p className="text-xs font-medium text-slate-500">
                        {msg.channel} · {formatDateTimeTr(msg.sentAt)}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">{msg.preview}</p>
                    </div>
                  ))}
                </div>
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
                        className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-800">
                              {DOCUMENT_TYPE_LABEL[doc.type]}
                            </p>
                            <p className="truncate text-xs text-slate-400">
                              {doc.fileName}
                            </p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            title="Önizle"
                            onClick={() =>
                              show("Belge önizleme Ay 2'de eklenecek.")
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="İndir"
                            onClick={() =>
                              show("Belge indirme Ay 2'de eklenecek.")
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
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

            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(lead.id, "ONAYLANDI");
                  show(`${lead.fullName} onaylandı.`);
                }}
                disabled={lead.status === "ONAYLANDI" || lead.status === "TAMAMLANDI"}
                className="rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                Onayla
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(lead.id, "ALTERNATIF_TARIH");
                  show("Alternatif tarih önerisi gönderildi (demo).");
                }}
                disabled={lead.status === "ALTERNATIF_TARIH"}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <CalendarClock className="h-4 w-4" />
                Alternatif
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(lead.id, "IPTAL_EDILDI");
                  show(`${lead.fullName} iptal edildi.`);
                }}
                disabled={lead.status === "IPTAL_EDILDI"}
                className="rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                İptal
              </button>
            </div>
          </>
        )}
      </aside>
      {Toast}
    </>
  );
}
