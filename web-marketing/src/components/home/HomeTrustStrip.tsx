"use client";

import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

export function HomeTrustStrip() {
  const { t } = useLocale();
  const items = [...t.home.trust, ...t.home.trust];

  return (
    <section
      className="border-y border-border bg-white py-5"
      aria-label={t.home.trust[0]?.label}
    >
      <Container>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-mist px-3 py-1.5 text-xs font-semibold text-ink sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            <span className="uppercase tracking-wide">{t.home.trustStripLabel}</span>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee gap-8 pr-8 motion-reduce:animate-none">
              {items.map((item, i) => (
                <div
                  key={`${item.label}-${i}`}
                  className="flex shrink-0 items-baseline gap-3 whitespace-nowrap"
                >
                  <span className="text-sm font-semibold text-ink">{item.label}</span>
                  <span className="text-sm text-slate-500">{item.detail}</span>
                  <span className="text-slate-300" aria-hidden>
                    ·
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
