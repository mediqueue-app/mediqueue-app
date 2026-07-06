"use client";

import type { ToothRecord, ToothStatus } from "@/types";
import {
  LOWER_LEFT_FDI,
  LOWER_RIGHT_FDI,
  UPPER_LEFT_FDI,
  UPPER_RIGHT_FDI,
} from "@/lib/dental";

const W = 24;
const H = 36;
const GAP = 3;
const MIDLINE = 12;
const BOW = 10;
const PAD = 16;
const STEP = W + GAP;
const SIDE_SPAN = 7 * STEP;
const VB_W = 2 * SIDE_SPAN + W + MIDLINE + 2 * PAD;
const VB_H = 220;
const CX = VB_W / 2;

const PALETTE = {
  healthy: { fill: "#FAFBFC", stroke: "#CBD5E1", text: "#475569" },
  treated: { fill: "#3A6AD6", stroke: "#2F57B3", text: "#FFFFFF" },
  pending: { fill: "#FFFBEB", stroke: "#D97706", text: "#92400E" },
  selected: "#10B981",
} as const;

function statusPalette(status: ToothStatus) {
  if (status === "treated") return PALETTE.treated;
  if (status === "pending_treatment") return PALETTE.pending;
  return PALETTE.healthy;
}

function curveOffset(
  index: number,
  total: number,
  isUpper: boolean,
  side: "right" | "left"
): number {
  const t =
    side === "right"
      ? index / (total - 1)
      : (total - 1 - index) / (total - 1);
  const curve = Math.sin(t * (Math.PI / 2));
  return isUpper ? curve * BOW : -curve * BOW;
}

function sidePositions(
  fdiList: readonly number[],
  side: "right" | "left",
  baseY: number,
  isUpper: boolean
): { num: number; x: number; y: number }[] {
  const n = fdiList.length;
  const inner =
    side === "right"
      ? CX - MIDLINE / 2 - W / 2
      : CX + MIDLINE / 2 + W / 2;

  return fdiList.map((num, i) => {
    const offset = side === "right" ? (n - 1 - i) * STEP : i * STEP;
    const x = side === "right" ? inner - offset : inner + offset;
    const y = baseY + curveOffset(i, n, isUpper, side);
    return { num, x, y };
  });
}

function allPositions(
  rightFdi: readonly number[],
  leftFdi: readonly number[],
  baseY: number,
  isUpper: boolean
) {
  return [
    ...sidePositions(rightFdi, "right", baseY, isUpper),
    ...sidePositions(leftFdi, "left", baseY, isUpper),
  ];
}

function ToothCell({
  tooth,
  x,
  y,
  selected,
  onSelect,
}: {
  tooth: ToothRecord;
  x: number;
  y: number;
  selected: boolean;
  onSelect: (n: number) => void;
}) {
  const p = statusPalette(tooth.status);
  const left = x - W / 2;
  const top = y - H / 2;

  return (
    <g
      className="cursor-pointer outline-none"
      onClick={() => onSelect(tooth.toothNumber)}
      role="button"
      tabIndex={0}
      aria-label={`${tooth.toothNumber} numaralı diş`}
      aria-pressed={selected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(tooth.toothNumber);
        }
      }}
    >
      {selected && (
        <rect
          x={left - 3}
          y={top - 3}
          width={W + 6}
          height={H + 6}
          rx={9}
          fill="none"
          stroke={PALETTE.selected}
          strokeWidth={2.5}
        />
      )}
      <rect
        x={left}
        y={top}
        width={W}
        height={H}
        rx={8}
        fill={p.fill}
        stroke={p.stroke}
        strokeWidth={1.5}
        filter="url(#tooth-shadow)"
        className="transition-all duration-150 hover:brightness-[0.97]"
      />
      {tooth.status === "healthy" && (
        <rect
          x={left + 2}
          y={top + 2}
          width={W - 4}
          height={H * 0.35}
          rx={4}
          fill="#FFFFFF"
          opacity={0.55}
          pointerEvents="none"
        />
      )}
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="700"
        fill={p.text}
        pointerEvents="none"
      >
        {tooth.toothNumber}
      </text>
    </g>
  );
}

export function Odontogram({
  teeth,
  selectedTooth,
  onSelectTooth,
}: {
  teeth: ToothRecord[];
  selectedTooth: number | null;
  onSelectTooth: (n: number) => void;
}) {
  const teethMap = new Map(teeth.map((t) => [t.toothNumber, t]));

  const upperY = 72;
  const lowerY = 148;
  const upperPts = allPositions(UPPER_RIGHT_FDI, UPPER_LEFT_FDI, upperY, true);
  const lowerPts = allPositions(LOWER_RIGHT_FDI, LOWER_LEFT_FDI, lowerY, false);

  const treated = teeth.filter((t) => t.status === "treated").length;
  const pending = teeth.filter((t) => t.status === "pending_treatment").length;

  const archY1 = (baseY: number, isUpper: boolean) =>
    isUpper ? baseY + BOW + H / 2 + 2 : baseY - BOW - H / 2 - 2;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Odontogram · FDI
        </p>
        {(treated > 0 || pending > 0) && (
          <p className="text-xs text-slate-400">
            {treated > 0 && <span className="text-primary">{treated} tedavi</span>}
            {treated > 0 && pending > 0 && " · "}
            {pending > 0 && (
              <span className="text-amber-600">{pending} bekleyen</span>
            )}
          </p>
        )}
      </div>

      <div className="overflow-x-auto bg-gradient-to-b from-slate-50/60 to-white px-3 py-2">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="mx-auto w-full min-w-[360px]"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Odontogram"
        >
          <defs>
            <filter id="tooth-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#0F172A" floodOpacity="0.08" />
            </filter>
          </defs>
          <text
            x={CX}
            y={18}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="#94A3B8"
          >
            ÜST ÇENE
          </text>
          <text
            x={CX}
            y={VB_H - 6}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="#94A3B8"
          >
            ALT ÇENE
          </text>

          <line
            x1={CX}
            y1={26}
            x2={CX}
            y2={VB_H - 16}
            stroke="#E2E8F0"
            strokeWidth="1"
          />

          <path
            d={`M ${PAD} ${archY1(upperY, true)} Q ${CX} ${upperY - 4} ${VB_W - PAD} ${archY1(upperY, true)}`}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <path
            d={`M ${PAD} ${archY1(lowerY, false)} Q ${CX} ${lowerY + 4} ${VB_W - PAD} ${archY1(lowerY, false)}`}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {upperPts.map(({ num, x, y }) => {
            const tooth = teethMap.get(num);
            if (!tooth) return null;
            return (
              <ToothCell
                key={num}
                tooth={tooth}
                x={x}
                y={y}
                selected={selectedTooth === num}
                onSelect={onSelectTooth}
              />
            );
          })}
          {lowerPts.map(({ num, x, y }) => {
            const tooth = teethMap.get(num);
            if (!tooth) return null;
            return (
              <ToothCell
                key={num}
                tooth={tooth}
                x={x}
                y={y}
                selected={selectedTooth === num}
                onSelect={onSelectTooth}
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-2 border-t border-slate-100 px-4 py-3">
        {(
          [
            { label: "Sağlıklı", swatch: "border border-slate-200 bg-white" },
            { label: "Tedavi görmüş", swatch: "bg-primary" },
            { label: "Bekleyen", swatch: "border border-amber-400 bg-amber-50" },
            { label: "Seçili", swatch: "border-2 border-emerald-500 bg-white" },
          ] as const
        ).map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600"
          >
            <span className={`h-3 w-3 rounded-sm ${item.swatch}`} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
