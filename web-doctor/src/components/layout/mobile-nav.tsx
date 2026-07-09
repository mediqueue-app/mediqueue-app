"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-around border-t border-slate-200/80 bg-white/95 px-2 py-2 backdrop-blur-sm lg:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-medium ${
              isActive ? "text-primary" : "text-slate-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
