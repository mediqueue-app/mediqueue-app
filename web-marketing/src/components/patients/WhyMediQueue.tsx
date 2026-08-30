"use client";

import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CompareBrandHeader } from "@/components/ui/CompareBrandHeader";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function WhyMediQueue() {
  const { t } = useLocale();
  const p = t.patients;

  return (
    <section id="neden" className="scroll-mt-24 bg-band py-16 md:py-20">
      <Container>
        <FadeIn>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            <span>{p.whyEyebrow}</span>
            <CompareBrandHeader className="normal-case tracking-normal" />
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {p.whyTitle}
          </h2>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
          {/* Desktop / tablet table */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-white md:block">
            <div className="-mx-0 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-band/80">
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {p.whyCriteriaLabel}
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-400/90">
                      {p.whyBeforeLabel}
                    </th>
                    <th className="bg-primary-light/50 px-5 py-4 text-primary">
                      <CompareBrandHeader suffix={p.whyAfterLabel} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.whyRows.map((row) => (
                    <tr
                      key={row.title}
                      className="border-b border-border last:border-b-0 transition-colors hover:bg-slate-50/80"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {row.title}
                      </td>
                      <td className="px-5 py-4">
                        <Cell negative>{row.before}</Cell>
                      </td>
                      <td className="bg-primary-light/35 px-5 py-4">
                        <Cell positive>{row.after}</Cell>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile stacked cards */}
          <div className="space-y-4 md:hidden">
            {p.whyRows.map((row) => (
              <article
                key={row.title}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="border-b border-border px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {row.title}
                  </h3>
                </div>
                <div className="space-y-0 divide-y divide-border">
                  <div className="px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-red-400/90">
                      {p.whyBeforeLabel}
                    </p>
                    <Cell negative className="mt-2">
                      {row.before}
                    </Cell>
                  </div>
                  <div className="bg-primary-light/35 px-4 py-3">
                    <CompareBrandHeader
                      suffix={p.whyAfterLabel}
                      className="text-primary"
                    />
                    <Cell positive className="mt-2">
                      {row.after}
                    </Cell>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function Cell({
  children,
  negative,
  positive,
  className,
}: {
  children: ReactNode;
  negative?: boolean;
  positive?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2.5", className)}>
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          negative && "bg-red-50 text-red-500",
          positive && "bg-primary/10 text-primary"
        )}
      >
        {negative ? (
          <X className="h-3 w-3" strokeWidth={2.5} />
        ) : (
          <Check className="h-3 w-3" strokeWidth={2.5} />
        )}
      </span>
      <p
        className={cn(
          "text-[14px] leading-relaxed",
          negative && "text-slate-500",
          positive && "text-slate-800"
        )}
      >
        {children}
      </p>
    </div>
  );
}
