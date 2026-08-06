"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Globe2 } from "lucide-react";
import { CountryFlag } from "@/components/ui/CountryFlag";
import type { CountryPatientData } from "@/lib/patient-origins";
import { cn, formatNumber } from "@/lib/utils";

/**
 * Dünya WebGL kullanıyor; SSR'da `window` / canvas olmadığı için client-only
 * yükleniyor. Yüklenene kadar aynı ölçüde bir skeleton gösteriliyor ki kart
 * yüksekliği zıplamasın.
 */
const PatientOriginGlobe = dynamic(
  () => import("./PatientOriginGlobe").then((m) => m.PatientOriginGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full max-w-[540px]">
        <div className="skeleton h-full w-full rounded-full" />
      </div>
    ),
  }
);

export function PatientOriginCard({ data }: { data: CountryPatientData[] }) {
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const { sorted, total } = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.patientCount - a.patientCount);
    return {
      sorted,
      total: sorted.reduce((sum, country) => sum + country.patientCount, 0),
    };
  }, [data]);

  const maxCount = sorted[0]?.patientCount ?? 0;

  return (
    <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-6 py-5">
        <Globe2 className="h-5 w-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">
            Hastalarınızın Geldiği Ülkeler
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {total > 0
              ? `${formatNumber(total)} uluslararası hasta, ${sorted.length} farklı ülkeden başvurdu.`
              : "Uluslararası hasta dağılımınız burada haritalanır."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 p-6 lg:grid-cols-5 lg:gap-8">
        <div className="flex justify-center lg:col-span-3">
          <PatientOriginGlobe
            data={data}
            highlightedCode={activeCode}
            onHoverCountry={setActiveCode}
          />
        </div>

        <div className="lg:col-span-2">
          {sorted.length === 0 ? (
            <p className="text-sm text-slate-400">
              Ülke kırılımı, ilk uluslararası talepleriniz geldiğinde burada
              listelenecek.
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between px-3 pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Ülke
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Hasta
                </span>
              </div>
              <ul className="max-h-[460px] space-y-0.5 overflow-y-auto pr-1">
                {sorted.map((country) => {
                  const share = total > 0 ? (country.patientCount / total) * 100 : 0;
                  const isActive = country.countryCode === activeCode;

                  return (
                    <li key={country.countryCode}>
                      {/* Marker'a tıklanınca ülkeye göre filtrelenmiş talep
                          listesine yönlendirme burada eklenebilir:
                          router.push(`/dashboard/requests?country=${country.countryCode}`) */}
                      <div
                        onMouseEnter={() => setActiveCode(country.countryCode)}
                        onMouseLeave={() => setActiveCode(null)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
                          isActive ? "bg-primary-light/70" : "hover:bg-slate-50"
                        )}
                      >
                        <CountryFlag
                          code={country.countryCode}
                          countryName={country.countryName}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {country.countryName}
                            </p>
                            <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                              {country.patientCount}
                            </p>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={cn(
                                  "h-full rounded-full transition-all duration-200",
                                  isActive ? "bg-emerald-500" : "bg-primary"
                                )}
                                style={{
                                  width: `${
                                    maxCount > 0
                                      ? (country.patientCount / maxCount) * 100
                                      : 0
                                  }%`,
                                }}
                              />
                            </div>
                            <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-slate-400">
                              %{share.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
