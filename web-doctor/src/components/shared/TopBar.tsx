"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { getPageMeta } from "@/lib/navigation";
import { currentDoctor, quickStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const meta = getPageMeta(pathname);

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

        {/* Breadcrumb / sayfa başlığı — mobilde görünür */}
        <div className="min-w-0 lg:hidden">
          <p className="truncate text-sm font-semibold text-slate-900">{meta.title}</p>
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
            <p className="truncate text-[11px] text-slate-400">{meta.description}</p>
          )}
        </div>

        <form onSubmit={handleSearch} className="relative ml-auto max-w-sm flex-1 lg:max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hasta ara..."
            aria-label="Hasta ara"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
        </form>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/dashboard/messages"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100"
            aria-label={`Bildirimler, ${quickStats.pendingMessageCount} okunmamış`}
          >
            <Bell className="h-[18px] w-[18px]" />
            {quickStats.pendingMessageCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                {quickStats.pendingMessageCount}
              </span>
            )}
          </Link>

          <Link
            href="/dashboard/profile"
            className={cn(
              "flex h-10 items-center gap-2 rounded-xl pl-1 pr-3 transition-colors hover:bg-slate-100",
              pathname.startsWith("/dashboard/profile") && "bg-primary-light"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
              {currentDoctor.avatarInitials}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 md:block">
              {currentDoctor.fullName.split(" ")[0]}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
