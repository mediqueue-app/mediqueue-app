"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function FaqSection({ className }: { className?: string }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(0);

  return (
    <section id="sss" className={cn("bg-white py-16 md:py-20", className)}>
      <Container className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          {t.faq.eyebrow}
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t.faq.title}
        </h2>
        <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
          {t.faq.items.map((item, index) => {
            const expanded = open === index;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-ink sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-slate-400 transition-transform",
                      expanded && "rotate-180"
                    )}
                  />
                </button>
                {expanded ? (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
