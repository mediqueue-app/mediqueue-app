"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import {
  GROUP_ORDER,
  GROUP_LABEL,
  NAV_ITEMS,
  GROWTH_ENGINE_TAGLINE,
} from "@/lib/navigation";
import { getPendingRequestCountSync } from "@/lib/services/requests";
import { useSidebar } from "@/components/shared/SidebarContext";
import { NavPremiumBadge } from "@/components/ui/NavPremiumBadge";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Sidebar({
  mobileOpen = false,
  onNavigate,
}: {
  mobileOpen?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const t = useT();
  const { collapsed, toggleCollapsed } = useSidebar();
  const pendingRequests = getPendingRequestCountSync();

  function inboxBadgeFor(href: string): number | undefined {
    if (href === "/dashboard/requests" && pendingRequests > 0)
      return pendingRequests;
    return undefined;
  }

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col overflow-hidden border-r border-slate-800/60 bg-slate-900 transition-[transform,width] duration-[220ms] ease-out",
        "fixed inset-y-0 left-0 z-50 shadow-xl lg:static lg:z-auto lg:shadow-none safe-top safe-bottom",
        collapsed ? "w-[92px]" : "w-[260px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-slate-800/60",
          collapsed ? "justify-center gap-1 px-2" : "gap-2.5 px-4"
        )}
      >
        <BrandMark size={36} className="h-9 w-9 shadow-sm shadow-primary/30" />
        {!collapsed && (
          <div className="min-w-0">
            <span className="text-[15px] font-bold tracking-tight text-white">
              MEDI<span className="text-primary">·</span>QUEUE
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {t("nav.brandSub")}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            "hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-white lg:flex",
            !collapsed && "ml-auto"
          )}
          aria-label={collapsed ? t("nav.expand") : t("nav.shrink")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label={t("nav.main")}>
        {GROUP_ORDER.map((group) => {
          const items = NAV_ITEMS.filter((item) => item.group === group);
          if (items.length === 0) return null;

          const isGrowthGroup = group === "growth" || group === "ai";

          return (
            <div key={group} className="mb-4 last:mb-0">
              {!collapsed && (
                <div className="mb-2 flex items-center gap-1.5 px-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t(GROUP_LABEL[group])}
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
                        title={collapsed ? t(item.labelKey) : undefined}
                        className={cn(
                          "group relative flex min-h-12 items-center rounded-xl text-sm font-medium transition-all duration-150",
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
                            {t(item.labelKey)}
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
    </aside>
  );
}
