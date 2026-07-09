"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Menu, X, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/treatments", label: "Tedaviler" },
  { href: "/clinics", label: "Klinikler" },
  { href: "/doctors", label: "Doktorlar" },
  { href: "/how-it-works", label: "Nasıl Çalışır?" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3a6ad6] text-white shadow-sm">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Medi<span className="text-[#3a6ad6]">Queue</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-slate-600 transition-colors hover:text-[#3a6ad6]",
                  active && "text-[#3a6ad6]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#3a6ad6]"
          >
            Giriş Yap
          </Link>
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 rounded-full bg-[#3a6ad6] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2f57b3]"
          >
            <UserRound className="h-4 w-4" />
            Randevu Al
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Menü"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#3a6ad6]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/clinics"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#3a6ad6] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Randevu Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
