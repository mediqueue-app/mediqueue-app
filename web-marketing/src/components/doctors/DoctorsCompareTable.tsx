"use client";

import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CompareBrandHeader } from "@/components/ui/CompareBrandHeader";
import { FadeIn } from "@/components/clinics/FadeIn";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/cn";

export function DoctorsCompareTable() {
  const { t } = useLocale();
  const d = t.doctors;

  return (
    <section id="karsilastirma" className="scroll-mt-24 bg-band py-16 md:py-20">
      <Container>
        <FadeIn>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            <span>{d.compareEyebrow}</span>
            <CompareBrandHeader className="normal-case tracking-normal" />
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {d.compareTitle}
          </h2>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12">
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-white md:block">
            <div className="-mx-0 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-band/80">
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {d.compareCriteriaLabel}
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {d.compareBeforeLabel}
                    </th>
                    <th className="bg-primary-light/50 px-5 py-4 text-primary">
                      <CompareBrandHeader suffix={d.compareAfterLabel} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.compareRows.map((row) => (
                    <tr
                      key={row.title}
                      className={cn(
                        "border-b border-border last:border-b-0 transition-colors",
                        row.highlight
                          ? "bg-primary-light/25 hover:bg-primary-light/35"
                          : "hover:bg-slate-50/80"
                      )}
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {row.title}
                      </td>
                      <td className="bg-slate-50/60 px-5 py-4">
                        <Cell negative muted>
                          {row.before}
                        </Cell>
                      </td>
                      <td
                        className={cn(
                          "px-5 py-4",
                          row.highlight
                            ? "border-l-2 border-primary bg-primary-light/70"
                            : "bg-primary-light/35"
                        )}
                      >
                        <Cell positive highlight={row.highlight}>
                          {row.after}
                        </Cell>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 md:hidden">
            {d.compareRows.map((row) => (
              <article
                key={row.title}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white",
                  row.highlight ? "border-primary/25 shadow-md shadow-primary/5" : "border-border"
                )}
              >
                <div
                  className={cn(
                    "border-b px-4 py-3",
                    row.highlight
                      ? "border-primary/15 bg-primary-light/30"
                      : "border-border"
                  )}
                >
                  <h3 className="text-sm font-semibold text-slate-900">{row.title}</h3>
                </div>
                <div className="space-y-0 divide-y divide-border">
                  <div className="bg-slate-50/60 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {d.compareBeforeLabel}
                    </p>
                    <Cell negative muted className="mt-2">
                      {row.before}
                    </Cell>
                  </div>
                  <div
                    className={cn(
                      "px-4 py-3",
                      row.highlight ? "bg-primary-light/70" : "bg-primary-light/35"
                    )}
                  >
                    <CompareBrandHeader
                      suffix={d.compareAfterLabel}
                      className="text-primary"
                    />
                    <Cell positive highlight={row.highlight} className="mt-2">
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
  highlight,
  muted,
  className,
}: {
  children: ReactNode;
  negative?: boolean;
  positive?: boolean;
  highlight?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2.5", className)}>
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          negative && "bg-red-50 text-red-500",
          positive && !highlight && "bg-primary/10 text-primary",
          positive && highlight && "bg-primary/15 text-primary"
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
          negative && muted && "text-slate-500",
          positive && !highlight && "text-slate-800",
          positive && highlight && "font-medium text-slate-900"
        )}
      >
        {children}
      </p>
    </div>
  );
}
