"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";
import { useLeadCapture } from "@/lib/lead-capture";

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const { openLead } = useLeadCapture();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primaryIsClinic = locale === "tr";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        solid
          ? "border-b border-border bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-white/70"
      )}
    >
      <nav
        className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:min-h-[5.25rem] lg:px-8"
        aria-label="Primary"
      >
        <Logo />
        <ul className="hidden items-center gap-6 lg:flex">
          {t.nav.links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    active ? "text-primary" : "text-slate-600 hover:text-slate-900"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <LocaleToggle locale={locale} setLocale={setLocale} t={t} />
          {primaryIsClinic ? (
            <Button onClick={() => openLead("clinic")}>{t.nav.clinicCta}</Button>
          ) : (
            <Button onClick={() => openLead("patient")}>{t.nav.patientCta}</Button>
          )}
        </div>
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
      {open && (
        <div className="fixed inset-0 top-[4.25rem] z-40 bg-white sm:top-[4.75rem] lg:top-[5.25rem] lg:hidden">
          <div className="flex h-full flex-col px-6 py-8">
            <ul className="flex flex-col gap-1">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block min-h-12 rounded-xl px-3 py-3 text-lg font-medium text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <LocaleToggle locale={locale} setLocale={setLocale} t={t} />
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  openLead(primaryIsClinic ? "clinic" : "patient");
                }}
              >
                {primaryIsClinic ? t.nav.clinicCta : t.nav.patientCta}
              </Button>
              <Button
                size="lg"
                variant="ink"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  openLead(primaryIsClinic ? "patient" : "clinic");
                }}
              >
                {primaryIsClinic ? t.nav.patientCta : t.nav.clinicCta}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
  t,
}: {
  locale: "en" | "tr";
  setLocale: (l: "en" | "tr") => void;
  t: { nav: { localeEn: string; localeTr: string; localeLabel: string } };
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border-2 border-ink/15 bg-white p-1 shadow-sm"
      role="group"
      aria-label={t.nav.localeLabel}
    >
      <span className="hidden pl-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:inline">
        {t.nav.localeLabel}
      </span>
      <button
        type="button"
        className={cn(
          "min-h-9 rounded-full px-3 text-xs font-bold",
          locale === "en" ? "bg-ink text-white" : "text-slate-500 hover:text-slate-800"
        )}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        {t.nav.localeEn}
      </button>
      <button
        type="button"
        className={cn(
          "min-h-9 rounded-full px-3 text-xs font-bold",
          locale === "tr" ? "bg-ink text-white" : "text-slate-500 hover:text-slate-800"
        )}
        onClick={() => setLocale("tr")}
        aria-pressed={locale === "tr"}
      >
        {t.nav.localeTr}
      </button>
    </div>
  );
}
