"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Building2,
  Users,
  Stethoscope,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";
import type { Locale } from "@/content";

function LocaleToggle({
  locale,
  setLocale,
  t,
  compact = false,
}: {
  locale: string;
  setLocale: (loc: Locale) => void;
  t: { nav: { localeTr: string; localeEn: string } };
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1",
        compact ? "self-start" : ""
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("tr")}
        className={cn(
          "min-w-[2.75rem] rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
          locale === "tr"
            ? "bg-ink text-white shadow-sm"
            : "text-slate-500 hover:text-slate-900"
        )}
      >
        {t.nav.localeTr}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "min-w-[2.75rem] rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
          locale === "en"
            ? "bg-ink text-white shadow-sm"
            : "text-slate-500 hover:text-slate-900"
        )}
      >
        {t.nav.localeEn}
      </button>
    </div>
  );
}

const SOLUTION_ICONS = [Building2, Users, Stethoscope];

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const { openLead } = useLeadCapture();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tr = locale === "tr";
  const solutionsLabel = t.nav.solutionsLabel || (tr ? "Çözümler" : "Solutions");
  const solutions = t.nav.solutions || [
    {
      href: "/clinics",
      label: tr ? "Klinikler İçin" : "For Clinics",
      desc: tr ? "Sıfır riskli dönüşüm & hasta yönetimi" : "Risk-free lead management",
    },
    {
      href: "/patients",
      label: tr ? "Hastalar İçin" : "For Patients",
      desc: tr ? "Şeffaf klinik kıyaslama & doğrudan iletişim" : "Transparent comparison & direct chat",
    },
    {
      href: "/doctors",
      label: tr ? "Doktorlar İçin" : "For Doctors",
      desc: tr ? "Bugünün programı & günlük akış yönetimi" : "Daily schedule & single screen",
    },
  ];

  const isSolutionsActive =
    pathname.startsWith("/clinics") ||
    pathname.startsWith("/patients") ||
    pathname.startsWith("/doctors");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Fixed bar — sticky + nested fixed drawer broke mobile taps after scroll */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200",
          solid || open
            ? "border-b border-border bg-white/95 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-white/80 backdrop-blur-sm"
        )}
      >
        <nav
          className="relative z-10 mx-auto flex min-h-[3.75rem] max-w-7xl items-center justify-between gap-6 px-4 py-1.5 sm:px-6 lg:min-h-[4.25rem] lg:px-8 lg:py-2"
          aria-label="Primary"
        >
          <Logo />

          <ul className="hidden items-center gap-9 lg:flex xl:gap-12">
            <li>
              <Link
                href="/"
                className={cn(
                  "whitespace-nowrap text-[0.98rem] font-bold tracking-tight transition-colors",
                  pathname === "/" ? "text-primary" : "text-slate-800 hover:text-slate-950"
                )}
              >
                {tr ? "Ana Sayfa" : "Home"}
              </Link>
            </li>

            <li
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap text-[0.98rem] font-bold tracking-tight transition-colors focus:outline-none",
                  isSolutionsActive
                    ? "text-primary"
                    : "text-slate-800 hover:text-slate-950"
                )}
              >
                <span>{solutionsLabel}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform duration-200",
                    dropdownOpen && "rotate-180 text-primary"
                  )}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                    <div className="space-y-1.5">
                      {solutions.map((item, idx) => {
                        const Icon = SOLUTION_ICONS[idx] ?? Building2;
                        const active = pathname.startsWith(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className={cn(
                              "flex items-start gap-3 rounded-xl p-3 transition-colors",
                              active
                                ? "border border-primary/20 bg-primary-light/60"
                                : "hover:bg-slate-50"
                            )}
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                active
                                  ? "bg-primary text-white"
                                  : "bg-slate-100 text-slate-600"
                              )}
                            >
                              <Icon className="h-[18px] w-[18px]" />
                            </span>
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {item.label}
                              </p>
                              <p className="text-xs leading-snug text-slate-500">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </li>

            {t.nav.links
              .filter((l) => l.href !== "/")
              .map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "whitespace-nowrap text-[0.98rem] font-bold tracking-tight transition-colors",
                        active ? "text-primary" : "text-slate-800 hover:text-slate-950"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
          </ul>

          <div className="hidden items-center gap-6 lg:flex">
            <LocaleToggle locale={locale} setLocale={setLocale} t={t} />
            <Button
              onClick={() => openLead("patient")}
              className="whitespace-nowrap px-5 py-2.5 text-sm font-bold shadow-xs shadow-primary/20 xl:px-6"
            >
              {tr ? "Hemen Başlayın" : "Get Started"}
            </Button>
          </div>

          <button
            type="button"
            className="relative z-[120] inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-slate-900 lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Offset for fixed header */}
      <div className="h-[3.75rem] lg:h-[4.25rem]" aria-hidden />

      {/* Mobile menu — sibling fixed layer, not nested under sticky */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={tr ? "Menü" : "Menu"}
        >
          {/* Match header height so content starts below the real nav bar */}
          <div className="h-[3.75rem]" aria-hidden />
          <div className="h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain px-6 py-6 pb-10">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                {solutionsLabel}
              </p>
              <ul className="space-y-1">
                {solutions.map((item, idx) => {
                  const Icon = SOLUTION_ICONS[idx] ?? Building2;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-base font-bold text-slate-900 hover:bg-slate-50"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ul className="mb-4 flex flex-col gap-1 border-b border-slate-100 pb-4">
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-base font-bold text-slate-900 hover:bg-slate-50"
                >
                  {tr ? "Ana Sayfa" : "Home"}
                </Link>
              </li>
              {t.nav.links
                .filter((l) => l.href !== "/")
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-base font-bold text-slate-900 hover:bg-slate-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>

            <div className="flex flex-col items-start gap-4">
              <LocaleToggle locale={locale} setLocale={setLocale} t={t} compact />
              <Button
                size="lg"
                onClick={() => {
                  setOpen(false);
                  openLead("patient");
                }}
                className="w-full justify-center shadow-xs shadow-primary/20"
              >
                {tr ? "Hemen Başlayın" : "Get Started"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
