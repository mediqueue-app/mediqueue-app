"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";

export function HomeTrustStrip() {
  const { t } = useLocale();
  const items = [...t.home.trust, ...t.home.trust];

  return (
    <section
      className="border-y border-slate-200/80 bg-white py-4"
      aria-label={t.home.trustStripLabel}
    >
      <Container>
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-xs font-bold text-primary sm:flex">
            <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={2} />
            <span className="uppercase tracking-wider">{t.home.trustStripLabel}</span>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee gap-10 pr-10 motion-reduce:animate-none">
              {items.map((item, i) => (
                <div
                  key={`${item.label}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm font-bold text-slate-900">{item.label}</span>
                  <span className="text-sm text-slate-500">{item.detail}</span>
                  <span className="ml-4 text-slate-300" aria-hidden>
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
