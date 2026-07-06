"use client";

import { ChevronRight, Plus } from "lucide-react";
import type { Patient } from "@/types";

const ORAL_HYGIENE_MOCK = [
  { q: "Günde kaç kez dişlerinizi fırçalarsınız?", a: "2 kez" },
  { q: "Diş ipi kullanıyor musunuz?", a: "Haftada 2-3 kez" },
  { q: "Son diş hekimi ziyaretiniz ne zaman?", a: "3 ay önce" },
  { q: "Dişlerinizde hassasiyet var mı?", a: "Evet, soğuk içeceklerde" },
  { q: "Sigara veya tütün kullanıyor musunuz?", a: "Hayır" },
];

export function LeftPanelOralHygiene() {
  return (
    <div className="flex h-full flex-col overflow-y-auto pr-1">
      <button
        type="button"
        className="mb-4 flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-800"
      >
        Ağız Hijyeni Alışkanlıkları
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>

      <div className="space-y-3">
        {ORAL_HYGIENE_MOCK.map((item, i) => (
          <div
            key={item.q}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-xs text-slate-400">{item.q}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LeftPanelAttachments({ patient }: { patient: Patient }) {
  const images = patient.documents.filter((d) => d.type === "RONTGEN");

  return (
    <div className="flex h-full flex-col overflow-y-auto pr-1">
      <button
        type="button"
        className="mb-4 flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-800"
      >
        Ekler
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>

      <div className="grid grid-cols-2 gap-3">
        {images.length > 0 ? (
          images.map((doc) => (
            <div
              key={doc.id}
              className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-primary/10" />
                  <p className="text-[10px] font-medium text-slate-500">
                    Klinik Görüntü
                  </p>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-slate-700">
                  {doc.fileName}
                </p>
                <button
                  type="button"
                  className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary"
                >
                  <Plus className="h-3 w-3" />
                  Not ekle
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 py-8 text-center text-sm text-slate-400">
            Henüz ek dosya yok.
          </p>
        )}
      </div>
    </div>
  );
}
