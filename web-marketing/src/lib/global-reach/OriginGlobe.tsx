"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { type Arc, type Marker } from "cobe";
import { Globe2, MapPin, Minus, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { CountryFlag } from "./CountryFlag";
import type { CountryPatientData } from "./types";
import { PLATFORM_HUB } from "./types";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const GLOBE_RADIUS = 0.8;
const MARKER_ELEVATION = 0.02;

const BASE_COLOR: [number, number, number] = [0.96, 0.97, 1.0];
const GLOW_COLOR: [number, number, number] = [0.96, 0.98, 1.0];
const PRIMARY_MARKER: [number, number, number] = [0.23, 0.42, 0.84];
const ACTIVE_MARKER: [number, number, number] = [0.06, 0.73, 0.51];
const ARC_COLOR_DIM: [number, number, number] = [0.55, 0.68, 0.92];
const ARC_COLOR_BRIGHT: [number, number, number] = [0.23, 0.42, 0.84];

const HIT_RADIUS_PX = 22;
const HOVER_EASING = 0.18;
const MAX_ARCS = 8;

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 1.3;
const ZOOM_EASING = 0.2;
const REVEAL_MS = 900;

function phiForLongitude(lng: number): number {
  return (3 * Math.PI) / 2 - (lng * Math.PI) / 180;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function mixColor(
  from: [number, number, number],
  to: [number, number, number],
  t: number
): [number, number, number] {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
}

function projectMarker(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  width: number,
  height: number,
  scale: number
) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);
  const r = GLOBE_RADIUS + MARKER_ELEVATION;

  const ax = -cosLat * Math.cos(lngRad) * r;
  const ay = Math.sin(latRad) * r;
  const az = cosLat * Math.sin(lngRad) * r;

  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);

  const x = cosP * ax + sinP * az;
  const y = sinP * sinT * ax + cosT * ay - cosP * sinT * az;
  const z = -sinP * cosT * ax + sinT * ay + cosP * cosT * az;

  const aspect = height / width;
  return {
    x: ((x * aspect * scale + 1) / 2) * width,
    y: ((1 - y * scale) / 2) * height,
    visible: z >= 0,
  };
}

export function OriginGlobe({
  data,
  origin = PLATFORM_HUB,
  highlightedCode,
  onHoverCountry,
  revealed = true,
  reducedMotion = false,
  showZoomControls = true,
  emptyTitle = "Henüz yurt dışı hasta kaydı yok",
  emptyBody = "İlk uluslararası talebiniz ulaştığında hastalarınızın geldiği ülkeler burada haritalanacak.",
  ariaLabel,
  className,
}: {
  data: CountryPatientData[];
  origin?: { lat: number; lng: number };
  highlightedCode?: string | null;
  onHoverCountry?: (countryCode: string | null) => void;
  revealed?: boolean;
  reducedMotion?: boolean;
  showZoomControls?: boolean;
  emptyTitle?: string;
  emptyBody?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const highlightRef = useRef<string | null>(null);
  const onHoverRef = useRef(onHoverCountry);
  const revealedRef = useRef(revealed);
  const reducedMotionRef = useRef(reducedMotion);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [zoom, setZoom] = useState(MIN_ZOOM);
  const zoomTargetRef = useRef(MIN_ZOOM);

  const applyZoom = (factor: number) => {
    const next = clamp(zoomTargetRef.current * factor, MIN_ZOOM, MAX_ZOOM);
    zoomTargetRef.current = next;
    setZoom(next);
  };

  useEffect(() => {
    highlightRef.current = highlightedCode ?? null;
  }, [highlightedCode]);

  useEffect(() => {
    onHoverRef.current = onHoverCountry;
  }, [onHoverCountry]);

  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || data.length === 0) return;

    const sortedForArcs = [...data].sort((a, b) => b.patientCount - a.patientCount);
    const arcSource = sortedForArcs.slice(0, MAX_ARCS);
    const maxCount = Math.max(...data.map((c) => c.patientCount), 1);

    const baseSizes = data.map(
      (c) => 0.026 + 0.038 * Math.sqrt(c.patientCount / maxCount)
    );
    const hoverProgress = data.map(() => 0);

    const buildMarkers = (markerReveal = 1): Marker[] =>
      data.map((country, i) => ({
        location: [country.lat, country.lng],
        size: baseSizes[i] * (1 + 0.6 * hoverProgress[i]) * markerReveal,
        color: mixColor(PRIMARY_MARKER, ACTIVE_MARKER, hoverProgress[i]),
      }));

    const buildArcs = (visibleCount: number, revealT: number): Arc[] =>
      arcSource.slice(0, visibleCount).map((country) => {
        const ratio = country.patientCount / maxCount;
        const color = mixColor(ARC_COLOR_DIM, ARC_COLOR_BRIGHT, ratio * revealT);
        return {
          from: [origin.lat, origin.lng],
          to: [country.lat, country.lng],
          color,
        };
      });

    let size = Math.max(container.clientWidth, 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let phi = phiForLongitude(25);
    let theta = 0.32;
    let scale = zoomTargetRef.current;
    let revealStart: number | null = null;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi,
      theta,
      dark: 0,
      diffuse: 0.25,
      mapSamples: 16000,
      mapBrightness: 1.6,
      baseColor: BASE_COLOR,
      markerColor: PRIMARY_MARKER,
      glowColor: GLOW_COLOR,
      arcColor: ARC_COLOR_DIM,
      arcWidth: 0.28,
      arcHeight: 0.28,
      markerElevation: MARKER_ELEVATION,
      opacity: 1,
      scale,
      offset: [0, 0],
      markers: buildMarkers(reducedMotionRef.current || revealedRef.current ? 1 : 0.01),
      arcs: buildArcs(
        reducedMotionRef.current || revealedRef.current ? arcSource.length : 0,
        1
      ),
    });

    let pointer: { x: number; y: number } | null = null;
    let dragging = false;
    let dragOrigin: { x: number; y: number } | null = null;
    let currentHover: number | null = null;

    const setPointerFromEvent = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      dragOrigin = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      setPointerFromEvent(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
      setPointerFromEvent(event);
      if (!dragging || !dragOrigin) return;

      const dx = event.clientX - dragOrigin.x;
      const dy = event.clientY - dragOrigin.y;
      dragOrigin = { x: event.clientX, y: event.clientY };

      phi = (phi + dx * 0.005) % (2 * Math.PI);
      theta = clamp(theta + dy * 0.004, -0.55, 0.55);
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      dragOrigin = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      canvas.style.cursor = currentHover === null ? "grab" : "pointer";
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = null;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    let frameId = 0;

    const render = () => {
      frameId = requestAnimationFrame(render);

      scale += (zoomTargetRef.current - scale) * ZOOM_EASING;
      if (Math.abs(zoomTargetRef.current - scale) < 0.001) {
        scale = zoomTargetRef.current;
      }

      let markerReveal = 1;
      let arcCount = arcSource.length;
      let arcRevealT = 1;
      let arcWidth = 0.28;

      const isRevealed = revealedRef.current;
      const isReduced = reducedMotionRef.current;

      if (isRevealed && !isReduced) {
        if (revealStart === null) revealStart = performance.now();
        const elapsed = performance.now() - revealStart;
        const t = Math.min(1, elapsed / REVEAL_MS);
        arcCount = Math.max(1, Math.ceil(t * arcSource.length));
        arcRevealT = t;
        markerReveal = 0.35 + t * 0.65;
        arcWidth = 0.18 + t * 0.14 + (arcSource[0]?.patientCount ?? 0) / maxCount * 0.08;
      } else if (!isRevealed && !isReduced) {
        markerReveal = 0.01;
        arcCount = 0;
        arcRevealT = 0;
        arcWidth = 0.18;
      } else {
        arcWidth =
          0.22 +
          (arcSource.reduce((sum, c) => sum + c.patientCount, 0) /
            (arcCount * maxCount || 1)) *
            0.12;
      }

      let hitIndex: number | null = null;
      if (pointer && !dragging) {
        let bestDistance = HIT_RADIUS_PX * scale;
        for (let i = 0; i < data.length; i++) {
          const projected = projectMarker(
            data[i].lat,
            data[i].lng,
            phi,
            theta,
            size,
            size,
            scale
          );
          if (!projected.visible) continue;
          const distance = Math.hypot(
            projected.x - pointer.x,
            projected.y - pointer.y
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            hitIndex = i;
          }
        }
      }

      if (hitIndex !== currentHover) {
        currentHover = hitIndex;
        setHoveredIndex(hitIndex);
        onHoverRef.current?.(hitIndex === null ? null : data[hitIndex].countryCode);
        if (!dragging) {
          canvas.style.cursor = hitIndex === null ? "grab" : "pointer";
        }
      }

      const highlighted = highlightRef.current;
      const activeIndex =
        hitIndex ??
        (highlighted
          ? data.findIndex((c) => c.countryCode === highlighted)
          : -1);

      let markersDirty = false;
      for (let i = 0; i < hoverProgress.length; i++) {
        const target = i === activeIndex ? 1 : 0;
        const next = hoverProgress[i] + (target - hoverProgress[i]) * HOVER_EASING;
        if (Math.abs(target - next) < 0.005) {
          if (hoverProgress[i] !== target) {
            hoverProgress[i] = target;
            markersDirty = true;
          }
        } else {
          hoverProgress[i] = next;
          markersDirty = true;
        }
      }

      globe.update({
        phi,
        theta,
        scale,
        arcWidth,
        arcs: buildArcs(arcCount, arcRevealT),
        ...(markersDirty || isRevealed
          ? { markers: buildMarkers(markerReveal) }
          : {}),
      });

      if (hitIndex !== null && tooltipRef.current) {
        const projected = projectMarker(
          data[hitIndex].lat,
          data[hitIndex].lng,
          phi,
          theta,
          size,
          size,
          scale
        );
        tooltipRef.current.style.transform = `translate3d(${projected.x}px, ${
          projected.y - 14
        }px, 0)`;
      }
    };

    frameId = requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(() => {
      const next = Math.max(container.clientWidth, 1);
      if (next === size) return;
      size = next;
      globe.update({ width: size, height: size });
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      globe.destroy();
    };
  }, [data, origin.lat, origin.lng]);

  if (data.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-square w-full max-w-[540px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 px-6 text-center",
          className
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Globe2 className="h-6 w-6" />
        </span>
        <p className="text-sm font-semibold text-slate-700">{emptyTitle}</p>
        <p className="max-w-[15rem] text-xs leading-relaxed text-slate-400">{emptyBody}</p>
      </div>
    );
  }

  const hovered = hoveredIndex === null ? null : data[hoveredIndex];
  const label =
    ariaLabel ?? `${data.length} ülkeyi gösteren döndürülebilir dünya`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[540px]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(58,106,214,0.05),transparent_60%)]"
      />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="h-full w-full cursor-grab select-none"
        style={{ touchAction: "none" }}
      />

      {showZoomControls && (
        <div className="absolute bottom-2 right-2 z-10 hidden flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm sm:flex">
          <button
            type="button"
            onClick={() => applyZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Yakınlaştır"
            className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary disabled:pointer-events-none disabled:text-slate-300"
          >
            <Plus className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <span aria-hidden className="h-px bg-slate-200" />
          <button
            type="button"
            onClick={() => applyZoom(1 / ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Uzaklaştır"
            className="flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary disabled:pointer-events-none disabled:text-slate-300"
          >
            <Minus className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
      )}

      {hovered && (
        <div
          ref={tooltipRef}
          className="pointer-events-none absolute left-0 top-0 z-10 will-change-transform"
        >
          <div className="-translate-x-1/2 -translate-y-full rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg shadow-slate-900/10">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CountryFlag
                code={hovered.countryCode}
                countryName={hovered.countryName}
              />
              <span className="text-sm font-semibold text-slate-900">
                {hovered.countryName}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs font-medium text-slate-600">
                {hovered.patientCount} hasta
              </span>
              {hovered.trendPercent !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[11px] font-semibold",
                    hovered.trendPercent >= 0 ? "text-emerald-600" : "text-red-600"
                  )}
                >
                  {hovered.trendPercent >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  %{Math.abs(hovered.trendPercent)}
                </span>
              )}
            </div>
            {hovered.topCity && (
              <p className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-[11px] text-slate-500">
                <MapPin className="h-3 w-3" />
                En çok: {hovered.topCity}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OriginGlobe;
