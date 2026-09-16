"use client";

import { useEffect, useState } from "react";
import { Download, FileText, Receipt } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageLoadError } from "@/components/ui/PageLoadError";
import type { FinanceSummary, InvoiceRow } from "@/lib/growth-mock";
import { fetchFinanceData } from "@/lib/services/growth";
import { toUserError } from "@/lib/api/client";
import { formatTRY } from "@/lib/utils";

export default function FinancePage() {
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchFinanceData()
      .then(({ summary: nextSummary, invoices: nextInvoices }) => {
        if (!cancelled) {
          setSummary(nextSummary);
          setInvoices(nextInvoices);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(toUserError(err));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  if (error) {
    return (
      <PageLoadError
        message={error}
        onRetry={() => {
          setError(null);
          setLoading(true);
          setReloadKey((k) => k + 1);
        }}
      />
    );
  }

  if (loading || !summary) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  const s = summary;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <PageHeader
        title="Finans & Komisyonlar"
        description="Platform komisyon oranları, beklenen gelir ve fatura özeti."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          label="Bu Ayki Toplam Hacim"
          value={formatTRY(s.totalVolume)}
          icon={Receipt}
          iconTone="primary"
          hint="platform üzerinden onaylanan tedaviler"
        />
        <KpiCard
          label="Kesilen Platform Komisyonu"
          value={formatTRY(s.commission)}
          icon={FileText}
          iconTone="amber"
          hint={`%${s.commissionRate} komisyon oranı`}
        />
        <KpiCard
          label="Net Gelir"
          value={formatTRY(s.netRevenue)}
          icon={Receipt}
          iconTone="emerald"
          hint="komisyon sonrası tahmini gelir"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Fatura & Komisyon Dökümü
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Geçmiş dönem faturalarını görüntüleyin ve PDF olarak indirin.
          </p>
        </div>
        <div className="overflow-x-auto">
          {invoices.length === 0 ? (
            <div className="p-4">
              <LocalizedEmpty copyKey="invoices" icon={Receipt} compact />
            </div>
          ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Dönem
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Toplam Hacim
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Komisyon
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Net Gelir
                </th>
                <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Durum
                </th>
                <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {inv.period}
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {formatTRY(inv.volume)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {formatTRY(inv.commission)}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {formatTRY(inv.net)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      label={inv.status === "paid" ? "Ödendi" : "Bekliyor"}
                      tone={inv.status === "paid" ? "success" : "warning"}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-primary/30 hover:bg-primary-light/40 hover:text-primary"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Faturayı İndir (PDF)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </section>
    </div>
  );
}
