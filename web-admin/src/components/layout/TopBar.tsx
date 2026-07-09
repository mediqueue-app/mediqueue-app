"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { getPageMeta } from "@/lib/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getPendingApplicationCountSync } from "@/lib/services/applications";
import { getOpenTicketCountSync } from "@/lib/services/feedback";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Yeni klinik başvurusu",
    detail: "Estetik International Hospital onay bekliyor.",
  },
  {
    id: 2,
    title: "Yüksek öncelikli destek talebi",
    detail: "Ahmed Al-Farsi: Randevu onayı gelmedi.",
  },
  {
    id: 3,
    title: "Aylık gelir rekoru",
    detail: "Ağustos komisyon geliri ₺341.580'e ulaştı.",
  },
];

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const meta = getPageMeta(pathname);
  const admin = getCurrentAdmin();

  const alerts =
    getPendingApplicationCountSync() + getOpenTicketCountSync();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Menüyü aç"
          className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 lg:hidden">
          <p className="truncate text-sm font-semibold text-slate-900">
            {meta.title}
          </p>
        </div>

        <div className="hidden min-w-0 flex-col lg:flex">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Yönetim</span>
            {pathname !== "/dashboard" && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-slate-600">{meta.title}</span>
              </>
            )}
          </div>
          {meta.description && (
            <p className="truncate text-[11px] text-slate-400">
              {meta.description}
            </p>
          )}
        </div>

        <div className="relative ml-auto hidden max-w-sm flex-1 sm:block lg:max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Klinik, hasta veya başvuru ara..."
            aria-label="Ara"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100"
              aria-label="Bildirimler"
            >
              <Bell className="h-[18px] w-[18px]" />
              {alerts > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                  {alerts > 9 ? "9+" : alerts}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <button
                  type="button"
                  aria-label="Bildirimleri kapat"
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
                        i !== NOTIFICATIONS.length - 1 &&
                          "border-b border-slate-100"
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

          <div className="flex h-10 items-center gap-2 rounded-xl pl-1 pr-2 sm:pr-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
              {admin.initials}
            </div>
            <div className="hidden leading-tight md:block">
              <p className="text-sm font-medium text-slate-700">
                {admin.name.split(" ")[0]}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Süperadmin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
