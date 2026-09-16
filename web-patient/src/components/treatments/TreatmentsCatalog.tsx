"use client";

import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { treatments } from "@/lib/mock-data";
import { TreatmentIcon } from "@/components/ui/TreatmentIcon";
import { SmartImage } from "@/components/ui/SmartImage";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function TreatmentsCatalog() {
  const t = useT();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("treatmentsPage.title")}
        </h1>
        <p className="mt-2 text-slate-500">{t("treatmentsPage.lead")}</p>
      </header>

      {treatments.length === 0 ? (
        <LocalizedEmpty
          copyKey="treatments"
          icon={LayoutGrid}
          actionHref="/clinics"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((item) => (
            <div
              key={item.id}
              id={item.slug}
              className="group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-lg ring-1 ring-black/5">
                  <TreatmentIcon name={item.icon} className="h-6 w-6" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {item.category}
                </p>
                <h2 className="mt-0.5 font-semibold text-slate-900 group-hover:text-primary">
                  {item.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("treatmentsPage.starting")}
                    </p>
                    <p className="font-bold text-slate-900">
                      {formatPrice(item.priceFrom)}
                    </p>
                  </div>
                  <Link
                    href={`/clinics?q=${encodeURIComponent(item.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                  >
                    {t("treatmentsPage.findClinic")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
