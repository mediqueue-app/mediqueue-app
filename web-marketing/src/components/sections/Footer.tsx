"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { useLocale } from "@/lib/locale";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-700">
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Brand & Tagline */}
          <div className="lg:col-span-4">
            <Logo size="footer" />
            <p className="mt-3 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-500">
              {t.footer.tagline}
            </p>
          </div>

          {/* Right Columns: 4 Organized Navigation Groups */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-8">
            {t.footer.groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold tracking-tight text-slate-900">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-slate-500 transition-colors hover:text-slate-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Copyright Line (Without Divider Line) */}
        <div className="mt-8 text-center text-xs font-medium text-slate-400">
          © {year} {t.footer.copyright}
        </div>
      </Container>
    </footer>
  );
}
