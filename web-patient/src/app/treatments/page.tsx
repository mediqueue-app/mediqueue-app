import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { treatments } from "@/lib/mock-data";
import { TreatmentIcon } from "@/components/ui/TreatmentIcon";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Tedaviler | MediQueue",
};

export default function TreatmentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Tedaviler
        </h1>
        <p className="mt-2 text-slate-500">
          İhtiyacınız olan tedaviyi seçin, ilgili klinik ve doktorları görün.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map((t) => (
          <div
            key={t.id}
            id={t.slug}
            className="group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-[#3a6ad6]/30 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <SmartImage
                src={t.image}
                alt={t.name}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#3a6ad6] shadow-lg ring-1 ring-black/5">
                <TreatmentIcon name={t.icon} className="h-6 w-6" />
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#3a6ad6]">
                {t.category}
              </p>
              <h2 className="mt-0.5 font-semibold text-slate-900 group-hover:text-[#3a6ad6]">
                {t.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {t.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Başlangıç</p>
                  <p className="font-bold text-slate-900">
                    {formatPrice(t.priceFrom)}
                  </p>
                </div>
                <Link
                  href={`/clinics?q=${encodeURIComponent(t.name)}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#3a6ad6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2f57b3]"
                >
                  Klinik Bul
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
