"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SearchX, MapPin, ArrowUpDown, Map, X } from "lucide-react";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { cities, type Clinic } from "@/lib/mock-data";
import type { DataSource } from "@/lib/api/types";
import { fetchClinics } from "@/lib/services/clinics";
import { ClinicListCard } from "@/components/clinics/ClinicListCard";
import { ClinicMap } from "@/components/clinics/ClinicMap";
import { HybridBadge } from "@/components/common/HybridBadge";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { cn } from "@/lib/utils";
import { toUserError } from "@/lib/api/client";
import { useHistoryLayer } from "@/lib/history-layer";
import { useT } from "@/lib/i18n";

const SPECIALTIES = [
  "Tümü",
  "Estetik & Plastik Cerrahi",
  "Saç Ekimi",
  "Göz Sağlığı & Lazer",
  "Diş Tedavisi & İmplant",
  "Dermatoloji & Cilt Bakımı",
  "Ortopedi & Fizik Tedavi",
  "Kadın Doğum",
];

const FEATURES: { key: string; label: string; test: (c: Clinic) => boolean }[] =
  [
    { key: "jci", label: "JCI Akrediteli", test: (c) => /JCI/i.test(c.about) },
    {
      key: "airport",
      label: "Havaalanı Transferi",
      test: (c) => c.amenities.some((a) => a.includes("Havaalanı")),
    },
    {
      key: "stay",
      label: "Konaklama Desteği",
      test: (c) => c.amenities.some((a) => a.includes("Konaklama")),
    },
    {
      key: "lang",
      label: "Çok Dilli Ekip",
      test: (c) => c.amenities.some((a) => /Dilli|Danışman/i.test(a)),
    },
    {
      key: "parking",
      label: "Ücretsiz Otopark",
      test: (c) => c.amenities.some((a) => a.includes("Otopark")),
    },
  ];

const SORTS = [
  { key: "recommended", label: "Önerilen" },
  { key: "priceAsc", label: "Fiyat (artan)" },
  { key: "rating", label: "En yüksek puan" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

export function ClinicsExplorer() {
  const t = useT();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const router = useRouter();
  const pathname = usePathname();
  const [allClinics, setAllClinics] = useState<Clinic[]>([]);
  const [source, setSource] = useState<DataSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [specialty, setSpecialty] = useState("Tümü");
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [sortIndex, setSortIndex] = useState(0);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);
  const closeMap = useHistoryLayer(mobileMap, () => setMobileMap(false));

  const sort: SortKey = SORTS[sortIndex].key;

  useEffect(() => {
    const params = new URLSearchParams();
    const q = query.trim();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    const qs = params.toString();
    const href = qs ? `${pathname}?${qs}` : pathname;
    const current = `${pathname}${searchKey ? `?${searchKey}` : ""}`;
    if (href !== current) {
      router.replace(href, { scroll: false });
    }
  }, [query, city, pathname, router, searchKey]);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchClinics()
      .then((res) => {
        if (!cancelled) {
          setAllClinics(res.data);
          setSource(res.source);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(toUserError(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  function toggleFeature(key: string) {
    setFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = allClinics.filter((c) => {
      const matchesCity = !city || c.city === city;
      const matchesSpecialty =
        specialty === "Tümü" || c.specialties.includes(specialty);
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q));
      const matchesFeatures = [...features].every((key) => {
        const f = FEATURES.find((x) => x.key === key);
        return f ? f.test(c) : true;
      });
      return matchesCity && matchesSpecialty && matchesQuery && matchesFeatures;
    });

    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [allClinics, query, city, specialty, features, sort]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Filtre ve arama barı */}
      <div className="shrink-0 border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("clinic.searchPh")}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 lg:w-56">
            <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            >
              <option value="">Tüm şehirler</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setSortIndex((i) => (i + 1) % SORTS.length)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              sortIndex !== 0
                ? "border-primary bg-primary text-white"
                : "border-slate-200 text-slate-600 hover:border-primary/40"
            )}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {SORTS[sortIndex].label}
          </button>

          <span className="mx-1 shrink-0 self-center text-slate-200">|</span>

          {FEATURES.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => toggleFeature(f.key)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                features.has(f.key)
                  ? "border-primary bg-primary text-white"
                  : "border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
              )}
            >
              {f.label}
            </button>
          ))}

          <span className="mx-1 shrink-0 self-center text-slate-200">|</span>

          {SPECIALTIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpecialty(s)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                specialty === s
                  ? "border-primary bg-primary text-white"
                  : "border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Split-screen */}
      <div className="flex min-h-0 flex-1">
        <div className="w-full overflow-y-auto px-4 py-5 sm:px-6 lg:w-[55%]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">
                {loading ? "…" : results.length}
              </span>{" "}
              klinik bulundu
            </p>
            {source ? <HybridBadge source={source} /> : null}
          </div>

          {error ? (
            <PageLoadError
              message={error}
              onRetry={() => {
                setError(null);
                setLoading(true);
                setReloadKey((k) => k + 1);
              }}
            />
          ) : loading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
                />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-4">
              {results.map((clinic) => (
                <ClinicListCard
                  key={clinic.id}
                  clinic={clinic}
                  active={hoverId === clinic.id}
                  onHover={setHoverId}
                />
              ))}
            </div>
          ) : (
            <LocalizedEmpty
              copyKey="clinicSearch"
              icon={SearchX}
              compact
              onAction={() => {
                setQuery("");
                setCity("");
                setSpecialty("Tümü");
                setFeatures(new Set());
              }}
            />
          )}
        </div>

        <div className="hidden p-4 lg:block lg:w-[45%]">
          <ClinicMap
            clinics={results}
            activeId={hoverId}
            onHover={setHoverId}
          />
        </div>
      </div>

      {/* Mobil: Haritada Göster butonu */}
      <button
        type="button"
        onClick={() => setMobileMap(true)}
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover lg:hidden"
      >
        <Map className="h-4 w-4" />
        {t("common.showOnMap")}
      </button>

      {/* Mobil: tam ekran harita katmanı */}
      {mobileMap && (
        <div className="mq-overlay fixed inset-0 z-50 flex flex-col bg-surface text-foreground lg:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">
              {results.length} klinik — Harita
            </p>
            <button
              type="button"
              onClick={closeMap}
              className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-primary/40 hover:text-primary"
            >
              <X className="h-4 w-4" />
              Listeye Dön
            </button>
          </div>
          <div className="flex-1 p-4">
            <ClinicMap clinics={results} activeId={hoverId} onHover={setHoverId} />
          </div>
        </div>
      )}
    </div>
  );
}
