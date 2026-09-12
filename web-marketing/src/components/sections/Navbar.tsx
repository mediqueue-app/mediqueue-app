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
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

function LocaleToggle({
  locale,
  setLocale,
  t,
}: {
  locale: string;
  setLocale: (loc: any) => void;
  t: any;
}) {
  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-bold text-slate-600">
      <button
        type="button"
        onClick={() => setLocale("tr")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-all",
          locale === "tr" ? "bg-ink text-white shadow-2xs" : "hover:text-slate-900"
        )}
      >
        {t.nav.localeTr}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-all",
          locale === "en" ? "bg-ink text-white shadow-2xs" : "hover:text-slate-900"
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        solid
          ? "border-b border-border bg-white/90 backdrop-blur-md shadow-2xs"
          : "border-b border-transparent bg-white/70"
      )}
    >
      <nav
        className="mx-auto flex min-h-[5.25rem] max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:min-h-[6.5rem] lg:px-8"
        aria-label="Primary"
      >
        <Logo />

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-12 lg:flex xl:gap-16">
          {/* Home Link */}
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

          {/* Solutions Dropdown Menu */}
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
                  "h-4 w-4 transition-transform duration-200 text-slate-400",
                  dropdownOpen && "rotate-180 text-primary"
                )}
              />
            </button>

            {/* Dropdown Menu Card */}
            {dropdownOpen && (
              <div className="absolute left-1/2 top-full pt-2 -translate-x-1/2 w-80">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span>{tr ? "Platform Çözümleri" : "Platform Solutions"}</span>
                  </div>
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
                              ? "bg-primary-light/60 border border-primary/20"
                              : "hover:bg-slate-50"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg mt-0.5",
                              active
                                ? "bg-primary text-white"
                                : "bg-slate-100 text-slate-600"
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {item.label}
                            </p>
                            <p className="text-xs text-slate-500 leading-snug">
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

          {/* Other Nav Links */}
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

        {/* Action Buttons Right */}
        <div className="hidden items-center gap-6 lg:flex">
          <LocaleToggle locale={locale} setLocale={setLocale} t={t} />
          <Button
            onClick={() => openLead("patient")}
            className="whitespace-nowrap px-5 py-2.5 text-sm font-bold shadow-xs shadow-primary/20 xl:px-6"
          >
            {tr ? "Hemen Başlayın" : "Get Started"}
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-900 lg:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-white overflow-y-auto lg:hidden">
          <div className="flex flex-col px-6 py-6 pb-20">
            {/* Solutions Accordion Group */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
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

            {/* General Nav Links */}
            <ul className="flex flex-col gap-1 border-b border-slate-100 pb-4 mb-4">
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

            {/* Mobile Actions */}
            <div className="flex flex-col gap-3">
              <LocaleToggle locale={locale} setLocale={setLocale} t={t} />
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
    </header>
  );
}
