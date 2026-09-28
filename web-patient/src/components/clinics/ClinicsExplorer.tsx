"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SearchX, Map, X } from "lucide-react";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import type { Clinic } from "@/lib/mock-data";
import { fetchClinics } from "@/lib/services/clinics";
import { ClinicListCard } from "@/components/clinics/ClinicListCard";
import { ClinicMap } from "@/components/clinics/ClinicMap";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { cn } from "@/lib/utils";
import { toUserError } from "@/lib/api/client";
import { useHistoryLayer } from "@/lib/history-layer";
import { useT } from "@/lib/i18n";

type SortKey = "name" | "priceAsc";

function BarSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.value === value)?.label ?? value;

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative min-w-0", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full flex-col justify-center px-5 py-2.5 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:outline-none"
      >
        <span className="text-[11px] font-semibold tracking-tight text-slate-900">{label}</span>
        <span className="mt-0.5 flex items-center justify-between gap-3">
          <span className="truncate text-sm text-slate-600">{current}</span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-slate-400 transition-transform", open && "rotate-180")}
          />
        </span>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute left-3 right-3 top-[calc(100%+8px)] z-50 max-h-64 overflow-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full px-3 py-2 text-left text-sm",
                    selected
                      ? "bg-primary-light font-medium text-primary"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

/** Geçici: klinik listesinde harita kapalı. Geri açmak için true yap. */
const SHOW_CLINIC_MAP = false;

export function ClinicsExplorer() {
  const t = useT();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const router = useRouter();
  const pathname = usePathname();
  const [allClinics, setAllClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [specialty, setSpecialty] = useState("Tümü");
  const [sort, setSort] = useState<SortKey>("name");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [mobileMap, setMobileMap] = useState(false);
  const closeMap = useHistoryLayer(mobileMap, () => setMobileMap(false));

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

  const citiesInList = useMemo(() => {
    return [...new Set(allClinics.map((c) => c.city).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "tr")
    );
  }, [allClinics]);

  const specialties = useMemo(() => {
    const names = new Set<string>();
    for (const clinic of allClinics) {
      for (const name of clinic.specialties) {
        if (name) names.add(name);
      }
    }
    return [...names].sort((a, b) => a.localeCompare(b, "tr"));
  }, [allClinics]);

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
      return matchesCity && matchesSpecialty && matchesQuery;
    });

    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.priceFrom - b.priceFrom);
    else sorted.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    return sorted;
  }, [allClinics, query, city, specialty, sort]);

  return (
    <div
      className={cn(
        "flex flex-col",
        SHOW_CLINIC_MAP ? "h-[calc(100vh-4rem)]" : "min-h-[calc(100vh-4rem)]"
      )}
    >
      {/* Filtre ve arama barı */}
      <div
        className={cn(
          "shrink-0 bg-white",
          !SHOW_CLINIC_MAP && "sticky top-16 z-30"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 pb-2 pt-4 sm:px-6">
          <div className="mq-search-bar flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] lg:flex-row lg:rounded-full">
            <label className="flex min-w-0 flex-1 flex-col justify-center px-5 py-2.5 transition-colors focus-within:bg-slate-50 lg:rounded-l-full">
              <span className="text-[11px] font-semibold tracking-tight text-slate-900">Ara</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("clinic.searchPh")}
                className="w-full truncate bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:outline-none"
              />
            </label>
            <span className="hidden w-px self-stretch bg-slate-200 lg:my-3 lg:block" />
            <BarSelect
              label="Şehir"
              value={city}
              onChange={setCity}
              className="border-t border-slate-100 lg:w-44 lg:border-t-0"
              options={[
                { value: "", label: "Tümü" },
                ...citiesInList.map((name) => ({ value: name, label: name })),
              ]}
            />
            <span className="hidden w-px self-stretch bg-slate-200 lg:my-3 lg:block" />
            <BarSelect
              label="Tedavi"
              value={specialty}
              onChange={setSpecialty}
              className="border-t border-slate-100 lg:w-56 lg:border-t-0"
              options={[
                { value: "Tümü", label: "Tümü" },
                ...specialties.map((name) => ({ value: name, label: name })),
              ]}
            />
            <span className="hidden w-px self-stretch bg-slate-200 lg:my-3 lg:block" />
            <BarSelect
              label="Sıra"
              value={sort}
              onChange={(next) => setSort(next as SortKey)}
              className="border-t border-slate-100 lg:w-48 lg:rounded-r-full lg:border-t-0"
              options={[
                { value: "name", label: "Ada göre" },
                { value: "priceAsc", label: "Başlangıç fiyatı" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Split-screen */}
      <div className="flex min-h-0 flex-1">
        <div
          className={cn(
            "w-full px-4 pb-5 pt-2 sm:px-6",
            SHOW_CLINIC_MAP
              ? "overflow-y-auto lg:w-[55%]"
              : "mx-auto max-w-7xl"
          )}
        >
          <p className="mb-4 text-right text-sm text-slate-500">
            <span className="font-semibold text-slate-900">
              {loading ? "…" : results.length}
            </span>{" "}
            klinik bulundu
          </p>

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
            <div className={cn("grid gap-4", !SHOW_CLINIC_MAP && "lg:grid-cols-2")}>
              {Array.from({ length: SHOW_CLINIC_MAP ? 4 : 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
                />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className={cn("grid gap-4", !SHOW_CLINIC_MAP && "lg:grid-cols-2")}>
              {results.map((clinic) => (
                <ClinicListCard
                  key={clinic.id}
                  clinic={clinic}
                  layout={SHOW_CLINIC_MAP ? "row" : "grid"}
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
              }}
            />
          )}
        </div>

        {SHOW_CLINIC_MAP ? (
          <div className="hidden p-4 lg:block lg:w-[45%]">
            <ClinicMap
              clinics={results}
              activeId={hoverId}
              onHover={setHoverId}
            />
          </div>
        ) : null}
      </div>

      {SHOW_CLINIC_MAP ? (
      <button
        type="button"
        onClick={() => setMobileMap(true)}
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover lg:hidden"
      >
        <Map className="h-4 w-4" />
        {t("common.showOnMap")}
      </button>
      ) : null}

      {SHOW_CLINIC_MAP && mobileMap && (
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
