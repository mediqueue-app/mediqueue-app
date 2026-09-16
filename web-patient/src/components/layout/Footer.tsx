"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  const groups = [
    {
      title: t("footer.services"),
      links: [
        { label: t("nav.treatments"), href: "/treatments" },
        { label: t("nav.clinics"), href: "/clinics" },
        { label: t("nav.doctors"), href: "/doctors" },
        { label: t("nav.howItWorks"), href: "/how-it-works" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/how-it-works" },
        { label: t("footer.addClinic"), href: "/clinics" },
        { label: t("footer.careers"), href: "/how-it-works" },
        { label: t("footer.contact"), href: "/how-it-works" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/how-it-works" },
        { label: t("footer.terms"), href: "/how-it-works" },
        { label: t("footer.kvkk"), href: "/how-it-works" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2" aria-label={t("nav.homeAria")}>
              <BrandMark size={36} className="h-9 w-9" />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Medi<span className="text-primary">Queue</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> contact@getmediqueue.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Düzce Teknopark Ön
                Kuluçka Merkezi, Düzce
              </p>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-slate-900">{group.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          {t("footer.copyright", { year })}
          <div className="mt-1">
            <Link
              href="/account"
              className="text-xs font-semibold text-red-600 underline-offset-2 hover:underline"
            >
              {t("footer.deleteAccount")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
