"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { type Arc, type Marker } from "cobe";
import { Globe2, MapPin, Minus, Plus, TrendingDown, TrendingUp } from "lucide-react";
import {
  CLINIC_ORIGIN,
  type CountryPatientData,
} from "@/lib/patient-origins";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

/**
 * Nokta matrisi dünya — hastaların geldiği ülkeleri gösterir.
 *
 * `cobe` kendi render döngüsünü çalıştırmaz; her karede `globe.update()` çağırıp
 * phi/theta'yı biz sürüyoruz. Dünya kendi kendine dönmez — yalnızca kullanıcı
 * sürükledikçe döner. Hover için marker'ların ekran projeksiyonunu cobe'nin
 * marker vertex shader'ıyla birebir aynı formülle hesaplıyoruz
 * (bkz. `projectMarker`), sonra fare konumuna olan mesafeyi ölçüyoruz.
 *
 * Bu bileşen WebGL kullandığı için yalnızca client'ta çalışır; sayfaya
 * `dynamic(..., { ssr: false })` ile bağlanır (bkz. PatientOriginCard).
 */

/* --- cobe sabitleri (shader ile aynı olmalı) --- */
const GLOBE_RADIUS = 0.8;
const MARKER_ELEVATION = 0.02;

/* --- Açık tema paleti (beyaz / gri / mavi) ---
 * cobe'nin küre fragment shader'ı şunu hesaplar:
 *   renk = baseColor * (mix((1-q) * i^0.4, q, dark) + 0.1) + (1-i)^4 * glowColor
 *   q    = karaMaskesi * noktaMaskesi * i^diffuse * mapBrightness
 * `dark: 0` ile terim (1-q)*i^0.4 olur, yani beyaz küre üzerinde koyu noktalar.
 *
 * Asıl vurgu kıtalarda olsun istiyoruz, kürenin kendisinde değil:
 * - Nokta maskesi merkezden kenara yumuşadığı için noktanın *görünen* gövdesi
 *   maskenin ~0.55 bandına denk geliyor. Slate-600 koyuluğu (faktör ~0.32) için
 *   o bantta q ≈ 0.78 gerekiyor → mapBrightness ≈ 1.6.
 * - diffuse yalnızca noktaların kenara doğru sönümünü kontrol ediyor; düşük
 *   tutunca kıtalar limbe kadar okunur kalıyor.
 * - glowColor neredeyse beyaz: hem `baseColor*0.1`e düşen küre kenarını
 *   nötrleyip koyu halkayı engelliyor, hem de kürenin dışındaki haleyi beyaz
 *   kartın içinde eritiyor. Böylece "parlak cam bilye" görüntüsü kalmıyor. */
const BASE_COLOR: [number, number, number] = [0.96, 0.97, 1.0]; // küre zemini — mavi tınılı beyaz
const GLOW_COLOR: [number, number, number] = [0.96, 0.98, 1.0]; // kartın beyazına karışan yumuşak kenar
const PRIMARY_MARKER: [number, number, number] = [0.23, 0.42, 0.84]; // --color-primary #3a6ad6
const ACTIVE_MARKER: [number, number, number] = [0.06, 0.73, 0.51]; // --color-success #10b981
const ARC_COLOR: [number, number, number] = [0.45, 0.58, 0.85];

/* --- etkileşim --- */
const HIT_RADIUS_PX = 22;
const HOVER_EASING = 0.18; // ~170 ms'de tamamlanan büyüme geçişi
const MAX_ARCS = 5;

/* --- yakınlaştırma --- */
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.2; // 3 adım; daha fazlası küreyi aşırı kırpıyor
const ZOOM_STEP = 1.3; // çarpımsal adım — her tıklamada eşit oranda yaklaşır
const ZOOM_EASING = 0.2;

/** Verilen boylamı ekranın ortasına getiren phi değeri. */
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

/**
 * Marker'ın canvas üzerindeki CSS piksel konumu.
 * cobe'nin marker vertex shader'ındaki dönüşümün birebir JS karşılığı.
 */
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

  // Shader'daki `scale` uniform'u NDC'yi doğrudan ölçeklediği için hover
  // isabet hesabının da aynı çarpanı uygulaması şart.
  const aspect = height / width;
  return {
    x: ((x * aspect * scale + 1) / 2) * width,
    y: ((1 - y * scale) / 2) * height,
    visible: z >= 0, // arka yarıküredeki marker'lar hover edilemez
  };
}

export function PatientOriginGlobe({
  data,
  highlightedCode,
  onHoverCountry,
  className,
}: {
  data: CountryPatientData[];
  /** Listeden gelen vurgu — marker'ı büyütür ama tooltip açmaz. */
  highlightedCode?: string | null;
  onHoverCountry?: (countryCode: string | null) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const highlightRef = useRef<string | null>(null);
  const onHoverRef = useRef(onHoverCountry);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Hedef zoom state'te (butonların disabled durumu için), render döngüsü ise
  // ref üzerinden okuyup yumuşak geçiş yapıyor.
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
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || data.length === 0) return;

    const maxCount = Math.max(...data.map((c) => c.patientCount), 1);
    const baseSizes = data.map(
      // Hasta sayısıyla orantılı; karekök ile büyük ülkeler ekranı ezmiyor.
      (c) => 0.026 + 0.038 * Math.sqrt(c.patientCount / maxCount)
    );
    /** Her marker için 0 → 1 arası hover ilerlemesi. */
    const hoverProgress = data.map(() => 0);

    const buildMarkers = (): Marker[] =>
      data.map((country, i) => ({
        location: [country.lat, country.lng],
        size: baseSizes[i] * (1 + 0.6 * hoverProgress[i]),
        color: mixColor(PRIMARY_MARKER, ACTIVE_MARKER, hoverProgress[i]),
      }));

    const arcs: Arc[] = data.slice(0, MAX_ARCS).map((country) => ({
      from: [CLINIC_ORIGIN.lat, CLINIC_ORIGIN.lng],
      to: [country.lat, country.lng],
    }));

    let size = Math.max(container.clientWidth, 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let phi = phiForLongitude(25);
    let theta = 0.32;
    let scale = zoomTargetRef.current;

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
      arcColor: ARC_COLOR,
      arcWidth: 0.35,
      arcHeight: 0.28,
      markerElevation: MARKER_ELEVATION,
      opacity: 1,
      scale,
      offset: [0, 0],
      markers: buildMarkers(),
      arcs,
    });

    /* --- pointer durumu (state değil ki her karede yeniden render olmasın) --- */
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

      // Uzun sürükleme seanslarında float32 hassasiyetini korumak için sarıyoruz.
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
      // Dokunmatikte pointerleave, parmak kalkınca hemen tetiklenir; tooltip'in
      // tap sonrası açık kalabilmesi için konumu koruyoruz.
      if (event.pointerType === "touch") return;
      pointer = null;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    /* --- render döngüsü --- */
    let frameId = 0;

    const render = () => {
      frameId = requestAnimationFrame(render);

      // 1) Zoom'u hedefe doğru yumuşat.
      scale += (zoomTargetRef.current - scale) * ZOOM_EASING;
      if (Math.abs(zoomTargetRef.current - scale) < 0.001) {
        scale = zoomTargetRef.current;
      }

      // 2) Hover testi — sürükleme sırasında kapalı. Marker'lar zoom ile
      //    birlikte büyüdüğü için isabet yarıçapı da ölçekleniyor.
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

      // 3) Aktif marker: canvas hover'ı yoksa listeden gelen vurgu.
      const highlighted = highlightRef.current;
      const activeIndex =
        hitIndex ??
        (highlighted
          ? data.findIndex((c) => c.countryCode === highlighted)
          : -1);

      // 4) Marker büyüme/renk geçişi. (Otomatik dönüş yok — dünya yalnızca
      //    kullanıcı sürüklediğinde döner.)
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

      globe.update(
        markersDirty
          ? { phi, theta, scale, markers: buildMarkers() }
          : { phi, theta, scale }
      );

      // 5) Tooltip'i marker ile birlikte taşı (React render'ı olmadan).
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

    /* --- kart genişliğine göre yeniden boyutlandır --- */
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
      globe.destroy(); // WebGL buffer/program'larını serbest bırakır
    };
  }, [data]);

  if (data.length === 0) {
    return (
      <LocalizedEmpty
        copyKey="origins"
        icon={Globe2}
        className={cn("aspect-square w-full max-w-[540px]", className)}
      />
    );
  }

  const hovered = hoveredIndex === null ? null : data[hoveredIndex];

  return (
    <div
      ref={containerRef}
      className={cn("relative aspect-square w-full max-w-[540px]", className)}
    >
      {/* Küreyi beyaz zeminde oturtan çok hafif mavi ambiyans. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(58,106,214,0.05),transparent_60%)]"
      />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Hastaların geldiği ${data.length} ülkeyi gösteren döndürülebilir dünya`}
        className="h-full w-full cursor-grab select-none"
        style={{ touchAction: "none" }}
      />

      {/* Zoom — minimal, kartın kenar/gölge diliyle aynı */}
      <div className="absolute bottom-2 right-2 z-10 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
        <button
          type="button"
          onClick={() => applyZoom(ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Yakınlaştır"
          className="touch-slop flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary disabled:pointer-events-none disabled:text-slate-300"
        >
          <Plus className="h-4 w-4" strokeWidth={2.25} />
        </button>
        <span aria-hidden className="h-px bg-slate-200" />
        <button
          type="button"
          onClick={() => applyZoom(1 / ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Uzaklaştır"
          className="touch-slop flex h-8 w-8 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary disabled:pointer-events-none disabled:text-slate-300"
        >
          <Minus className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>

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
                    hovered.trendPercent >= 0
                      ? "text-emerald-600"
                      : "text-red-600"
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

export default PatientOriginGlobe;
