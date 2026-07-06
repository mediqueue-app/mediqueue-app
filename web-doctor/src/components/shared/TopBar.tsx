"use client";

import { Bell, Search } from "lucide-react";
import { currentDoctor } from "@/lib/mock-data";
import { quickStats } from "@/lib/mock-data";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
      <div className="relative max-w-md flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Hasta veya randevu ara..."
          aria-label="Hasta veya randevu ara"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
          aria-label={`Bildirimler, ${quickStats.pendingMessageCount} okunmamış`}
        >
          <Bell className="h-[18px] w-[18px]" />
          {quickStats.pendingMessageCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
              {quickStats.pendingMessageCount}
            </span>
          )}
        </button>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
          aria-hidden
        >
          {currentDoctor.avatarInitials}
        </div>
        <span className="sr-only">
          {currentDoctor.title} {currentDoctor.fullName}
        </span>
      </div>
    </header>
  );
}
