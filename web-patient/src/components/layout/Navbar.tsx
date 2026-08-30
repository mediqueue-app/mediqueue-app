"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/treatments", label: "Tedaviler" },
  { href: "/clinics", label: "Klinikler" },
  { href: "/doctors", label: "Doktorlar" },
  { href: "/appointments", label: "Randevularım" },
  { href: "/how-it-works", label: "Nasıl Çalışır?" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center py-1">
          <Image
            src="/mediqueue-logo.png"
            alt="MEDI·QUEUE"
            width={428}
            height={90}
            className="h-14 w-auto object-contain object-left sm:h-[4.25rem]"
            priority
          />
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
