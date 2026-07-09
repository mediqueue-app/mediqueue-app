"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { campaigns as seedCampaigns, type Campaign } from "@/lib/growth-mock";

export default function CampaignsPage() {
  const [items, setItems] = useState<Campaign[]>(seedCampaigns);

  function toggleActive(id: string) {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  }

  const activeCount = items.filter((c) => c.active).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Kampanya Yönetimi"
        description="Sezonsal indirim ve promosyon kampanyaları oluşturun, performansını ölçün."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Yeni Kampanya Oluştur
          </button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm">
          <span className="font-bold text-slate-900">{items.length}</span>
          <span className="text-sm text-slate-500">toplam kampanya</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-bold text-slate-900">{activeCount}</span>
          <span className="text-sm text-slate-500">aktif</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Kampanya Adı
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  İndirim
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Hedef Ülke
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Bitiş Tarihi
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Görüntülenme
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((c) => (
                <tr
                  key={c.id}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.leads} yeni talep</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-lg bg-primary-light px-2.5 py-1 text-sm font-bold text-primary">
                      %{c.discount}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-slate-700">
                      {c.flag} {c.targetCountry}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{c.endDate}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {c.views.toLocaleString("tr-TR")}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <ToggleSwitch
                        checked={c.active}
                        onChange={() => toggleActive(c.id)}
                        label={`${c.name} durumu`}
                      />
                      <StatusBadge
                        label={c.active ? "Aktif" : "Pasif"}
                        tone={c.active ? "success" : "neutral"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
