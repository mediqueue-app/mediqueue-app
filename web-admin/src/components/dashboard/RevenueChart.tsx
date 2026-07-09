"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenuePoint } from "@/types";
import { formatTRY } from "@/lib/utils";

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Gelir & Komisyon
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Aylık işlem hacmi ve platform komisyon geliri
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
            />
            <Tooltip
              cursor={{ fill: "#eaf0fc" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
              }}
              formatter={(value, name) => [
                formatTRY(Number(value)),
                name === "revenue" ? "İşlem Hacmi" : "Komisyon",
              ]}
            />
            <Bar
              dataKey="revenue"
              fill="#c7d7f5"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
            />
            <Line
              type="monotone"
              dataKey="commission"
              stroke="#3a6ad6"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#3a6ad6" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
