"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastPoint } from "@/lib/growth-mock";

export function DemandForecastChart({ data }: { data: ForecastPoint[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          6 Aylık Talep Öngörüsü
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Platformdan gelen hasta talebi trendi (AI projeksiyon)
        </p>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a6ad6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3a6ad6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--foreground)",
                boxShadow: "0 8px 24px color-mix(in srgb, var(--foreground) 12%, transparent)",
              }}
              formatter={(value) => [
                `${value} talep`,
                "Beklenen talep",
              ]}
              labelFormatter={(label) => `${label} 2026`}
            />
            <Area
              type="monotone"
              dataKey="demand"
              stroke="#3a6ad6"
              strokeWidth={2.5}
              fill="url(#demandFill)"
              dot={{ fill: "#3a6ad6", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "#3a6ad6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Kesikli çizgi bölgesi AI tarafından projekte edilen gelecek ayları temsil eder.
      </p>
    </div>
  );
}
