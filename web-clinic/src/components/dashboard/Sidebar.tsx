"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, HeartPulse, LogOut } from "lucide-react";
import {
  GROUP_ORDER,
  NAV_ITEMS,
  GROWTH_ENGINE_TAGLINE,
} from "@/lib/navigation";
import { logout } from "@/lib/auth";
import { getClinicUserSync } from "@/lib/services/clinic";
import { getPendingRequestCountSync } from "@/lib/services/requests";
import { useSidebar } from "@/components/shared/SidebarContext";
import { NavPremiumBadge } from "@/components/ui/NavPremiumBadge";
import { cn } from "@/lib/utils";

export function Sidebar({
  mobileOpen = false,
  onNavigate,
}: {
  mobileOpen?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, toggleCollapsed } = useSidebar();
  const user = getClinicUserSync();
  const pendingRequests = getPendingRequestCountSync();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  function inboxBadgeFor(href: string): number | undefined {
    if (href === "/dashboard/requests" && pendingRequests > 0)
      return pendingRequests;
    return undefined;
  }

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-slate-800/60 bg-slate-900 transition-all duration-200",
        "fixed inset-y-0 left-0 z-50 shadow-xl lg:relative lg:z-auto lg:shadow-none",
        collapsed ? "w-[76px]" : "w-[260px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-slate-800/60",
          collapsed ? "justify-center px-2" : "gap-2.5 px-5"
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
          <HeartPulse className="h-5 w-5" strokeWidth={2.25} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <span className="text-[15px] font-bold tracking-tight text-white">
              MEDI<span className="text-primary">·</span>QUEUE
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Büyüme Motoru
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Ana menü">
        {GROUP_ORDER.map((group) => {
          const items = NAV_ITEMS.filter((item) => item.group === group);
          if (items.length === 0) return null;

          const isGrowthGroup =
            group === "Büyüme & Pazarlama" || group === "Veri & Yapay Zeka";

          return (
            <div key={group} className="mb-4 last:mb-0">
              {!collapsed && (
                <div className="mb-2 flex items-center gap-1.5 px-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {group}
                  </p>
                  {isGrowthGroup && (
                    <GROWTH_ENGINE_TAGLINE.icon
                      className="h-3 w-3 text-amber-500/80"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  )}
                </div>
              )}
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                  const inboxBadge = inboxBadgeFor(item.href);

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
                            : "gap-2.5 px-3 py-2.5",
                          isActive
                            ? "bg-primary text-white shadow-sm shadow-primary/30"
                            : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                        )}
                      >
                        {isActive && !collapsed && (
                          <span
                            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white/60"
                            aria-hidden
                          />
                        )}
                        <item.icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0",
                            isActive
                              ? "text-white"
                              : "text-slate-500 group-hover:text-slate-200"
                          )}
                          strokeWidth={2}
                        />
                        {!collapsed && (
                          <span className="min-w-0 flex-1 truncate leading-snug">
                            {item.label}
                          </span>
                        )}
                        {!collapsed && item.badge && (
                          <NavPremiumBadge
                            type={item.badge}
                            active={isActive}
                          />
                        )}
                        {!collapsed && inboxBadge !== undefined && (
                          <span
                            className={cn(
                              "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-primary text-white"
                            )}
                          >
                            {inboxBadge}
                          </span>
                        )}
                        {collapsed && item.badge && (
                          <NavPremiumBadge
                            type={item.badge}
                            active={isActive}
                            collapsed
                          />
                        )}
                        {collapsed && inboxBadge !== undefined && (
                          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-slate-900" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-800/60 p-3">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-3 rounded-xl p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary ring-1 ring-primary/20">
                {user.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user.clinicName}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Çıkış Yap
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400"
            aria-label="Çıkış Yap"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        )}

        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "mt-2 hidden w-full items-center justify-center rounded-xl border border-slate-800 py-2 text-slate-400 transition-colors hover:bg-slate-800/70 lg:flex",
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
