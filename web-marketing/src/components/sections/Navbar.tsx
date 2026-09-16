"use client";

import { useEffect, useState } from "react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  Stethoscope,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";
import { stripLocalePath } from "@/lib/locale-path";
import type { Locale } from "@/content";

function LocaleToggle({
  locale,
  setLocale,
  t,
  compact = false,
}: {
  locale: string;
  setLocale: (loc: Locale) => void;
  t: { nav: { localeTr: string; localeEn: string; languageAria: string } };
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1",
        compact ? "self-start" : ""
      )}
      role="group"
      aria-label={t.nav.languageAria}
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
  const pathname = stripLocalePath(usePathname() ?? "/");
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const solutionsLabel = t.nav.solutionsLabel;
  const solutions = t.nav.solutions;
  const homeLabel = t.nav.links.find((l) => l.href === "/")?.label ?? "";

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
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 safe-top",
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
              <LocaleLink
                href="/"
                className={cn(
                  "whitespace-nowrap text-[0.98rem] font-bold tracking-tight transition-colors",
                  pathname === "/" ? "text-primary" : "text-slate-800 hover:text-slate-950"
                )}
              >
                {homeLabel}
              </LocaleLink>
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
                          <LocaleLink
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
                          </LocaleLink>
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
                    <LocaleLink
                      href={link.href}
                      className={cn(
                        "whitespace-nowrap text-[0.98rem] font-bold tracking-tight transition-colors",
                        active ? "text-primary" : "text-slate-800 hover:text-slate-950"
                      )}
                    >
                      {link.label}
                    </LocaleLink>
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
              {t.nav.getStarted}
            </Button>
          </div>

          <button
            type="button"
            className="relative z-[120] inline-flex h-12 w-12 touch-manipulation items-center justify-center rounded-xl text-slate-900 lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Offset for fixed header */}
      <div
        className="h-[calc(3.75rem+env(safe-area-inset-top,0px))] lg:h-[calc(4.25rem+env(safe-area-inset-top,0px))]"
        aria-hidden
      />

      {/* Mobile menu — Industry Standard full-screen modal drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[150] flex flex-col bg-surface text-foreground lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
        >
          {/* Industry Standard Top Header: Logo on left, X close on right */}
          <div className="safe-top shrink-0 border-b border-slate-100">
            <div className="flex h-16 items-center justify-between px-5">
            <Logo size="nav" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="touch-target flex items-center justify-center rounded-full bg-slate-100/80 text-slate-700 transition-colors hover:bg-slate-200 active:scale-95"
              aria-label={t.nav.closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
            </div>
          </div>

          {/* Scrollable Clean List Menu */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            {/* Solutions Section */}
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                {solutionsLabel}
              </p>
              <div className="space-y-1">
                {solutions.map((item, idx) => {
                  const Icon = SOLUTION_ICONS[idx] ?? Building2;
                  return (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 active:bg-slate-100"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform group-hover:scale-105">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-base font-semibold text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                    </LocaleLink>
                  );
                })}
              </div>
            </div>

            {/* Main Navigation Pages */}
            <div className="border-t border-slate-100 pt-6">
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                {t.nav.pages}
              </p>
              <div className="space-y-1">
                <LocaleLink
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  <span>{homeLabel}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </LocaleLink>
                {t.nav.links
                  .filter((l) => l.href !== "/")
                  .map((link) => (
                    <LocaleLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </LocaleLink>
                  ))}
              </div>
            </div>
          </div>

          {/* Industry Standard Bottom Action Footer */}
          <div className="shrink-0 border-t border-slate-100 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">
                {t.nav.language}
              </span>
              <LocaleToggle locale={locale} setLocale={setLocale} t={t} compact />
            </div>
            <Button
              size="lg"
              onClick={() => {
                setOpen(false);
                openLead("patient");
              }}
              className="w-full justify-center shadow-lg shadow-primary/25 text-base font-bold py-3.5"
            >
              {t.nav.getStarted}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
