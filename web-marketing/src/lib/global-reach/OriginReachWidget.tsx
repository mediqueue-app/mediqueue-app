"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronUp, Globe2 } from "lucide-react";
import { CountryFlag } from "./CountryFlag";
import { cityLabel, countryLabel, formatNumber } from "./format";
import type { CountryPatientData, OriginReachScope } from "./types";
import { PLATFORM_HUB } from "./types";
import { useLocale } from "@/lib/locale";
import { DemoCaptionPill } from "@/components/ui/DemoCaptionPill";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const OriginGlobe = dynamic(
  () => import("./OriginGlobe").then((m) => m.OriginGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px]">
        <div className="h-full w-full animate-pulse rounded-full bg-slate-100" />
      </div>
    ),
  }
);

export type OriginReachWidgetProps = {
  scope: OriginReachScope;
  data: CountryPatientData[];
  title: string;
  subtitle: string;
  countryColumnLabel?: string;
  patientColumnLabel?: string;
  emptyListText?: string;
  demoCaption?: string;
  revealOnScroll?: boolean;
  variant?: "card" | "section";
  origin?: { lat: number; lng: number };
  className?: string;
  showListScrollControls?: boolean;
};

export function OriginReachWidget({
  scope,
  data,
  title,
  subtitle,
  countryColumnLabel = "Ülke",
  patientColumnLabel = "Hasta",
  emptyListText = "Ülke kırılımı burada listelenecek.",
  demoCaption,
  revealOnScroll = false,
  variant = "card",
  origin = PLATFORM_HUB,
  className,
  showListScrollControls = false,
}: OriginReachWidgetProps) {
  const { locale } = useLocale();
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(!revealOnScroll);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!revealOnScroll || reducedMotion) {
      setRevealed(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [revealOnScroll, reducedMotion]);

  const { sorted, total } = useMemo(() => {
    const sorted = [...data]
      .sort((a, b) => b.patientCount - a.patientCount)
      .map((country) => ({
        ...country,
        countryName: countryLabel(country.countryCode, country.countryName, locale),
        topCity: cityLabel(country.topCity, locale),
      }));
    return {
      sorted,
      total: sorted.reduce((sum, country) => sum + country.patientCount, 0),
    };
  }, [data, locale]);

  const maxCount = sorted[0]?.patientCount ?? 0;

  const scrollList = (direction: "up" | "down") => {
    const node = listRef.current;
    if (!node) return;
    node.scrollBy({ top: direction === "down" ? 120 : -120, behavior: "smooth" });
  };

  const shellClass =
    variant === "card"
      ? "rounded-2xl border border-slate-100 bg-white shadow-sm"
      : "rounded-3xl border border-border bg-white shadow-sm shadow-slate-900/[0.04]";

  return (
    <div ref={sectionRef} className={cn(shellClass, className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3 sm:px-5">
        <Globe2 className="h-4.5 w-4.5 shrink-0 text-primary" />
        <div className="min-w-0">
          <h2
            className={cn(
              "font-semibold text-ink",
              variant === "section" ? "text-lg sm:text-xl" : "text-base"
            )}
          >
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 p-3.5 sm:p-4 lg:grid-cols-5 lg:gap-6">
        <div className="flex justify-center lg:col-span-3">
          <OriginGlobe
            data={sorted}
            origin={origin}
            highlightedCode={activeCode}
            onHoverCountry={setActiveCode}
            revealed={revealed}
            reducedMotion={reducedMotion}
            showZoomControls
            ariaLabel={
              scope === "preview"
                ? locale === "en"
                  ? `Demo globe showing ${sorted.length} countries in a sample clinic panel`
                  : `Örnek klinik panelinde ${sorted.length} ülkeyi gösteren demo dünya haritası`
                : undefined
            }
          />
        </div>

        <div className="lg:col-span-2">
          {sorted.length === 0 ? (
            <p className="text-sm text-slate-400">{emptyListText}</p>
          ) : (
            <>
              <div className="flex items-center justify-between px-2.5 pb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {countryColumnLabel}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {patientColumnLabel}
                  </span>
                  {showListScrollControls && sorted.length > 5 && (
                    <div className="flex overflow-hidden rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => scrollList("up")}
                        aria-label={
                          locale === "en" ? "Scroll list up" : "Listeyi yukarı kaydır"
                        }
                        className="flex h-5 w-5 items-center justify-center text-slate-400 transition-colors hover:bg-slate-50 hover:text-primary"
                      >
                        <ChevronUp className="h-3 w-3" strokeWidth={2.25} />
                      </button>
                      <span aria-hidden className="w-px bg-slate-200" />
                      <button
                        type="button"
                        onClick={() => scrollList("down")}
                        aria-label={
                          locale === "en" ? "Scroll list down" : "Listeyi aşağı kaydır"
                        }
                        className="flex h-5 w-5 items-center justify-center text-slate-400 transition-colors hover:bg-slate-50 hover:text-primary"
                      >
                        <ChevronDown className="h-3 w-3" strokeWidth={2.25} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <ul
                ref={listRef}
                className="max-h-[220px] space-y-0.5 overflow-y-auto pr-1 sm:max-h-[250px]"
              >
                {sorted.map((country) => {
                  const share =
                    total > 0 ? (country.patientCount / total) * 100 : 0;
                  const isActive = country.countryCode === activeCode;

                  return (
                    <li key={country.countryCode}>
                      <div
                        onMouseEnter={() => setActiveCode(country.countryCode)}
                        onMouseLeave={() => setActiveCode(null)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-150",
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
                              {formatNumber(country.patientCount, locale)}
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

      {demoCaption && (
        <div className="border-t border-slate-100/80 px-5 py-3.5 sm:px-6">
          <DemoCaptionPill className="mt-0">{demoCaption}</DemoCaptionPill>
        </div>
      )}
    </div>
  );
}
