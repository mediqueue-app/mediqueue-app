import Link from "next/link";
import { treatments } from "@/lib/mock-data";
import { TreatmentIcon } from "@/components/ui/TreatmentIcon";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatPrice } from "@/lib/utils";

export function TreatmentGrid() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {treatments.map((t) => (
        <Link
          key={t.id}
          href={`/treatments#${t.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/60"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <SmartImage
              src={t.image}
              alt={t.name}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-lg ring-1 ring-black/5">
              <TreatmentIcon name={t.icon} className="h-6 w-6" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              {t.category}
            </p>
            <h3 className="mt-0.5 font-semibold text-slate-900 group-hover:text-primary">
              {t.name}
            </h3>
            <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500">
              {t.description}
            </p>
            <div className="mt-4 flex items-baseline gap-1 border-t border-slate-100 pt-3">
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                itibaren
              </span>
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(t.priceFrom)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
