"use client";

import { useEffect, useState } from "react";
import { Check, Eye, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageLoadError } from "@/components/ui/PageLoadError";
import type { SponsorshipPackage } from "@/lib/growth-mock";
import { fetchSponsorshipData } from "@/lib/services/growth";
import { toUserError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

const TIER_LABELS = {
  standard: "Standart",
  pro: "Pro",
  elite: "Elite",
} as const;

export default function SponsorshipPage() {
  const [visibilityScore, setVisibilityScore] = useState<
    Awaited<ReturnType<typeof fetchSponsorshipData>>["visibility"] | null
  >(null);
  const [sponsorshipPackages, setSponsorshipPackages] = useState<
    SponsorshipPackage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchSponsorshipData()
      .then(({ visibility, packages }) => {
        if (!cancelled) {
          setVisibilityScore(visibility);
          setSponsorshipPackages(packages);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(toUserError(err));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  if (error) {
    return (
      <PageLoadError
        message={error}
        onRetry={() => {
          setError(null);
          setLoading(true);
          setReloadKey((k) => k + 1);
        }}
      />
    );
  }

  if (loading || !visibilityScore) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  const pct = (visibilityScore.score / visibilityScore.max) * 100;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Vitrin & Sponsorluk"
        description="Arama sonuçlarında ve kategori listelerinde üst sıralara çıkın."
        action={<StatusBadge label="Premium" tone="warning" dot={false} />}
      />

      {/* Görünürlük skoru */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-slate-900">
                Mevcut Görünürlük Skoru
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {visibilityScore.rank} kategorisinde{" "}
              <span className="font-semibold text-slate-700">
                {visibilityScore.position}. sırada
              </span>{" "}
              ({visibilityScore.totalClinics} klinik arasında)
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-4xl font-bold tracking-tight text-slate-900">
                  {visibilityScore.score}
                  <span className="text-lg font-semibold text-slate-400">
                    /{visibilityScore.max}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  +{visibilityScore.change} bu ay
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-hover transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Sponsorluk paketi ile skorunuzu %90+ seviyesine çıkarabilirsiniz.
              </p>
            </div>
          </div>

          {/* Dairesel gösterge */}
          <div className="relative mx-auto flex h-40 w-40 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#3a6ad6"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${pct * 3.27} 327`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">
                {visibilityScore.score}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Skor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Paketler */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Sponsorluk Paketleri
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {sponsorshipPackages.length === 0 ? (
            <div className="lg:col-span-3">
              <LocalizedEmpty copyKey="sponsorship" icon={Sparkles} />
            </div>
          ) : (
            sponsorshipPackages.map((pkg) => (
            <article
              key={pkg.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md",
                pkg.highlighted
                  ? "border-primary/40 ring-1 ring-primary/20"
                  : "border-slate-100"
              )}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  En Popüler
                </span>
              )}
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {TIER_LABELS[pkg.tier]}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{pkg.description}</p>
              </div>
              <p className="mb-5">
                <span className="text-3xl font-bold text-slate-900">
                  €{pkg.price.toLocaleString("tr-TR")}
                </span>
                <span className="text-sm text-slate-400">/{pkg.period}</span>
              </p>
              <ul className="mb-6 flex-1 space-y-2.5">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={cn(
                  "w-full rounded-xl py-3 text-sm font-semibold transition-colors",
                  pkg.highlighted
                    ? "bg-primary text-white shadow-sm shadow-primary/25 hover:bg-primary-hover"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                )}
              >
                {pkg.tier === "elite" ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    Elite&apos;e Yükselt
                  </span>
                ) : (
                  "Satın Al"
                )}
              </button>
            </article>
          ))
          )}
        </div>
      </div>
    </div>
  );
}
