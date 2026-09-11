"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale";

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
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
        className="mx-auto flex min-h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:min-h-[5.5rem] lg:px-8"
        aria-label="Primary"
      >
        <Logo />
        <ul className="hidden items-center gap-6 lg:flex xl:gap-9">
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
                    "whitespace-nowrap text-[0.95rem] font-bold transition-colors xl:text-[1.05rem]",
                    active ? "text-primary" : "text-slate-900 hover:text-primary"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center gap-3.5 lg:flex">
          <LocaleToggle locale={locale} setLocale={setLocale} t={t} />
          <Button href="/clinics" className="whitespace-nowrap px-5 py-2.5 text-sm font-bold xl:px-6 xl:text-[0.95rem]">
            {t.nav.clinicCta}
          </Button>
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
        <div className="fixed inset-0 top-16 z-40 bg-white lg:top-[4.25rem] lg:hidden">
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
              <Button href="/clinics" size="lg" className="w-full">
                {t.nav.clinicCta}
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
  t: { nav: { localeEn: string; localeTr: string } };
}) {
  return (
    <div
      className="inline-flex rounded-full border border-border p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={cn(
          "min-h-8 rounded-full px-2.5",
          locale === "tr" ? "bg-ink text-white" : "text-slate-500"
        )}
        onClick={() => setLocale("tr")}
        aria-pressed={locale === "tr"}
      >
        {t.nav.localeTr}
      </button>
      <button
        type="button"
        className={cn(
          "min-h-8 rounded-full px-2.5",
          locale === "en" ? "bg-ink text-white" : "text-slate-500"
        )}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        {t.nav.localeEn}
      </button>
    </div>
  );
}
