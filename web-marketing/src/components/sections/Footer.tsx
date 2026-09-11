"use client";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/locale";
import Link from "next/link";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-band">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,0.8fr))]">
          <div>
            <Logo size="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {t.footer.tagline}
            </p>
            <p className="mt-3 text-xs text-slate-500">{t.footer.privacyNote}</p>
          </div>
          {t.footer.groups.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-700 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-slate-500">
          {t.footer.medicalDisclaimer}
        </p>
        <p className="mt-6 border-t border-border pt-6 text-xs text-slate-500">
          © {year} {t.footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
