"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Calendar,
  MessageSquare,
  UserCircle,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentDoctor } from "@/lib/mock-data";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Özet", icon: LayoutGrid },
  { href: "/dashboard/patients", label: "Hastalarım", icon: Users },
  { href: "/dashboard/calendar", label: "Takvim", icon: Calendar },
  { href: "/dashboard/messages", label: "Mesajlar", icon: MessageSquare },
  { href: "/dashboard/profile", label: "Profil", icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
          <Stethoscope className="h-4.5 w-4.5" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-slate-900">
          MEDI<span className="text-primary">·</span>QUEUE
          <span className="ml-1 font-medium text-slate-400">DOCTOR</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Ana menü">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-light text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px]",
                  isActive ? "text-primary" : "text-slate-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
            {currentDoctor.avatarInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              {currentDoctor.title} {currentDoctor.fullName}
            </p>
            <p className="truncate text-xs text-slate-500">
              {currentDoctor.specialty.split(",")[0]}
            </p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Çıkış Yap
        </Link>
      </div>
    </aside>
  );
}
