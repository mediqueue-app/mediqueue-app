"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserRound } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { useHistoryLayer } from "@/lib/history-layer";
import { isAuthenticated } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const closeMenu = useHistoryLayer(open, () => setOpen(false));
  const loginHref = pathname.startsWith("/auth")
    ? "/auth/login"
    : `/auth/login?next=${encodeURIComponent(pathname)}`;

  useEffect(() => {
    setSignedIn(isAuthenticated());
  }, [pathname]);

  const navLinks = [
    { href: "/treatments", label: t("nav.treatments") },
    { href: "/clinics", label: t("nav.clinics") },
    { href: "/doctors", label: t("nav.doctors") },
    { href: "/appointments", label: t("nav.appointments") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
    ...(signedIn ? [{ href: "/account", label: t("nav.account") }] : []),
  ];

  return (
    <header className="safe-top sticky top-0 z-50 w-full border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label={t("nav.homeAria")}>
          <BrandMark size={36} className="h-9 w-9 shadow-sm" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Medi<span className="text-primary">Queue</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-slate-600 transition-colors hover:text-primary",
                  active && "text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div
            className="inline-flex rounded-full border border-slate-200 p-0.5 text-xs font-semibold"
            role="group"
            aria-label={t("nav.language")}
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-full px-2.5 py-1",
                locale === "en" ? "bg-primary text-white" : "text-slate-500"
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={cn(
                "rounded-full px-2.5 py-1",
                locale === "tr" ? "bg-primary text-white" : "text-slate-500"
              )}
            >
              TR
            </button>
          </div>
          {!signedIn ? (
            <Link
              href={loginHref}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {t("nav.signIn")}
            </Link>
          ) : null}
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            <UserRound className="h-4 w-4" />
            {t("nav.book")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => (open ? closeMenu() : setOpen(true))}
          className="touch-target inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={t("nav.menu")}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-3">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold",
                  locale === "en" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("tr")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold",
                  locale === "tr" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                )}
              >
                TR
              </button>
            </div>
            <Link
              href="/clinics"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              {t("nav.book")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
