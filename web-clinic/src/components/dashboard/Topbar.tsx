"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { getPageMeta } from "@/lib/navigation";
import { getClinicProfileSync, getPendingLeadCountSync } from "@/lib/services/clinic";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Yeni lead: Ahmed Al-Farsi",
    detail: "Tüp Bebek (IVF) talebi az önce geldi.",
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

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const meta = getPageMeta(pathname);
  const clinic = getClinicProfileSync();
  const pendingLeads = getPendingLeadCountSync();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/dashboard/patients?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/dashboard/patients");
    }
  }

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
            <span>Dashboard</span>
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

        <form
          onSubmit={handleSearch}
          className="relative ml-auto max-w-sm flex-1 lg:max-w-md"
        >
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hasta, lead veya doktor ara..."
            aria-label="Hasta ara"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </form>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100"
              aria-label={`Bildirimler${pendingLeads > 0 ? `, ${pendingLeads} bekleyen lead` : ""}`}
            >
              <Bell className="h-[18px] w-[18px]" />
              {pendingLeads > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                  {pendingLeads > 9 ? "9+" : pendingLeads}
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

          <Link
            href="/dashboard/settings"
            className={cn(
              "flex h-10 items-center gap-2 rounded-xl pl-1 pr-3 transition-colors hover:bg-slate-100",
              pathname.startsWith("/dashboard/settings") && "bg-primary-light"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
              {clinic.initials}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 md:block">
              {clinic.shortName.split(" ")[0]}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
