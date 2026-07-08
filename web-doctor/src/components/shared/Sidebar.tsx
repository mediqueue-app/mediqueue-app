"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, Stethoscope } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";
import { getQuickStatsSync } from "@/lib/services/messages";
import { getCurrentDoctorSync } from "@/lib/services/doctor";
import { clearDemoAuthenticated } from "@/lib/demo-auth";
import { useSidebar } from "@/components/shared/SidebarContext";
import { cn } from "@/lib/utils";

export function Sidebar({
  mobileOpen = false,
  onNavigate,
}: {
  mobileOpen?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const doctor = getCurrentDoctorSync();
  const unreadMessages = getQuickStatsSync().pendingMessageCount;
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-slate-200/80 bg-white transition-all duration-200",
        "fixed inset-y-0 left-0 z-50 shadow-xl lg:relative lg:z-auto lg:shadow-none",
        collapsed ? "w-[76px]" : "w-[260px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-slate-100",
          collapsed ? "justify-center px-2" : "gap-2.5 px-5"
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/20">
          <Stethoscope className="h-5 w-5" strokeWidth={2.25} />
        </div>
        {!collapsed && (
          <div>
            <span className="text-[15px] font-bold tracking-tight text-slate-900">
              MEDI<span className="text-primary">·</span>QUEUE
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Doctor
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-5" aria-label="Ana menü">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Menü
          </p>
        )}
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            const badge =
              item.href === "/dashboard/messages" && unreadMessages > 0
                ? unreadMessages
                : undefined;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group relative flex items-center rounded-xl text-sm font-medium transition-all duration-150",
                    collapsed
                      ? "justify-center px-0 py-2.5"
                      : "gap-3 px-3 py-2.5",
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-600"
                    )}
                    strokeWidth={2}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {badge !== undefined && (
                        <span
                          className={cn(
                            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-primary text-white"
                          )}
                        >
                          {badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-100 p-3">
        {!collapsed ? (
          <>
            <Link
              href="/dashboard/profile"
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                {doctor.avatarInitials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {doctor.title} {doctor.fullName.split(" ")[0]}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {doctor.specialty.split(",")[0]}
                </p>
              </div>
            </Link>
            <Link
              href="/login"
              onClick={() => {
                clearDemoAuthenticated();
                onNavigate?.();
              }}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Çıkış Yap
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            onClick={() => {
              clearDemoAuthenticated();
              onNavigate?.();
            }}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600"
            aria-label="Çıkış Yap"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </Link>
        )}

        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "mt-2 hidden w-full items-center justify-center rounded-xl border border-slate-200 py-2 text-slate-500 transition-colors hover:bg-slate-50 lg:flex",
            collapsed && "px-0"
          )}
          aria-label={collapsed ? "Menüyü genişlet" : "Menüyü daralt"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1 text-xs font-medium">Daralt</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
