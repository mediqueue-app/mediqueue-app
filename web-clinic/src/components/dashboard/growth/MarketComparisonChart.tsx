"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PriceComparison } from "@/lib/growth-mock";

export function MarketComparisonChart({ data }: { data: PriceComparison[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Pazar Kıyaslaması
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Sizin değerleriniz vs bölgesel ortalama
        </p>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="category"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
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
              formatter={(value, name) => [
                name === "yours" ? Number(value).toLocaleString("tr-TR") : Number(value).toLocaleString("tr-TR"),
                name === "yours" ? "Sizin" : "Ortalama",
              ]}
            />
            <Legend
              iconType="circle"
              formatter={(value) => (value === "yours" ? "Sizin" : "Bölgesel Ortalama")}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <Bar dataKey="yours" fill="#3a6ad6" radius={[6, 6, 0, 0]} maxBarSize={36} />
            <Bar dataKey="average" fill="#c7d7f5" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
