"use client";

import { FileText, IdCard, Image as ImageIcon, X } from "lucide-react";
import type { DocumentType, PatientDocument } from "@/types";
import { useHistoryLayer } from "@/lib/history-layer";
import { documentTypeLabels } from "@/lib/ui";

const documentIcons: Record<DocumentType, typeof FileText> = {
  TIBBI_RAPOR: FileText,
  "FOTOĞRAF": ImageIcon,
  PASAPORT: IdCard,
};

export function DocumentPreviewModal({
  document,
  onClose,
}: {
  document: PatientDocument;
  onClose: () => void;
}) {
  const close = useHistoryLayer(true, onClose);
  const Icon = documentIcons[document.type];

  return (
    <div className="mq-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <button
        aria-label="Kapat"
        onClick={close}
        className="absolute inset-0"
      />
      <div className="mq-panel relative w-full max-w-lg rounded-2xl bg-surface p-6 text-foreground shadow-xl">
        <button
          type="button"
          onClick={close}
          className="touch-target absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-9 w-9" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {documentTypeLabels[document.type]}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {document.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Yüklenme tarihi: {document.date}
            </p>
          </div>
          <p className="max-w-sm text-xs text-slate-400">
            Bu belge, hasta tarafından ön değerlendirme sürecinde MediQueue sistemine
            yüklenmiştir. Tam çözünürlüklü görüntüleme için klinik doküman arşivine
            bağlanılacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
