"use client";

import { useState } from "react";
import { Search, Bell, ShieldCheck, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Yeni lead: Ahmed Al-Farsi",
    detail: "Tüp Bebek (IVF) talebi 2 dk önce geldi.",
  },
  {
    id: 2,
    title: "Belge yüklendi",
    detail: "Amina Haddad sigorta belgesini yükledi.",
  },
  {
    id: 3,
    title: "Doktor müsaitlik değişti",
    detail: "Op. Dr. Burak Demir 'Dolu' durumuna geçti.",
  },
];

export function Topbar() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
      <div className="relative max-w-sm flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Hasta, lead veya doktor ara..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100 md:flex">
          <Clock3 className="h-3.5 w-3.5" />
          Anlık Sıra: 12 Dk
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-100 lg:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          JCI Akredite Klinik
        </div>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Bildirimler"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Bildirimler
                </p>
                {NOTIFICATIONS.map((n, i) => (
                  <div
                    key={n.id}
                    className={cn(
                      "rounded-lg px-2 py-2 hover:bg-slate-50",
                      i !== NOTIFICATIONS.length - 1 && "border-b border-slate-100"
                    )}
                  >
                    <p className="text-sm font-medium text-slate-800">
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-500">{n.detail}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          AK
        </div>
      </div>
    </header>
  );
}
