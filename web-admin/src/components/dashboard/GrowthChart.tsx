"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { GrowthPoint } from "@/types";

export function GrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Platform Büyümesi
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Aylık toplam hasta ve onaylı klinik sayısı
          </p>
        </div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="patientsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a6ad6" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#3a6ad6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="clinicsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
              }}
              formatter={(value, name) => [
                Number(value).toLocaleString("tr-TR"),
                name === "patients" ? "Hasta" : "Klinik",
              ]}
            />
            <Legend
              iconType="circle"
              formatter={(value) => (value === "patients" ? "Hasta" : "Klinik")}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="patients"
              stroke="#3a6ad6"
              strokeWidth={2.5}
              fill="url(#patientsFill)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="clinics"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#clinicsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
