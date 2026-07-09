"use client";

import { useMemo, useState } from "react";
import {
  CheckCheck,
  FileText,
  ImageIcon,
  MapPin,
  Package,
  Send,
  Stethoscope,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import {
  consultationRequests,
  type ConsultationRequest,
  type ConsultationStatus,
} from "@/lib/clinic-mock";
import { cn } from "@/lib/utils";

type FilterKey = "all" | ConsultationStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "new", label: "Yeni" },
  { key: "quoted", label: "Teklif Verildi" },
  { key: "accepted", label: "Kabul Edildi" },
  { key: "expired", label: "Süresi Doldu" },
];

const STATUS_META: Record<
  ConsultationStatus,
  { label: string; tone: BadgeTone }
> = {
  new: { label: "Yeni", tone: "warning" },
  quoted: { label: "Teklif Verildi", tone: "info" },
  accepted: { label: "Kabul Edildi", tone: "success" },
  expired: { label: "Süresi Doldu", tone: "neutral" },
};

export default function ConsultationsPage() {
  const [items, setItems] = useState<ConsultationRequest[]>(consultationRequests);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string>(consultationRequests[0].id);
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const filtered = useMemo(
    () =>
      filter === "all" ? items : items.filter((r) => r.status === filter),
    [items, filter]
  );

  const selected =
    items.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  const counts = useMemo(
    () => ({
      all: items.length,
      new: items.filter((r) => r.status === "new").length,
      quoted: items.filter((r) => r.status === "quoted").length,
      accepted: items.filter((r) => r.status === "accepted").length,
      expired: items.filter((r) => r.status === "expired").length,
    }),
    [items]
  );

  function selectItem(id: string) {
    setSelectedId(id);
    setSent(false);
    const item = items.find((r) => r.id === id);
    if (item?.status === "quoted" || item?.status === "accepted") {
      setPackageName(item.packageName ?? "");
      setPrice(item.quotedPrice?.toString() ?? "");
    } else {
      setPackageName("");
      setPrice("");
    }
    setNote("");
  }

  function handleSendQuote() {
    if (!selected || !price.trim()) return;
    setItems((prev) =>
      prev.map((r) =>
        r.id === selected.id
          ? {
              ...r,
              status: "quoted" as const,
              quotedPrice: Number(price),
              packageName: packageName.trim() || "Özel Paket",
            }
          : r
      )
    );
    setSent(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ön Konsültasyon & Teklifler"
        description="Hastaların gönderdiği fotoğraf ve belgelere hızlıca fiyat teklifi verin."
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                  active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                )}
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Sol liste */}
        <div className="flex flex-col gap-3 lg:col-span-2">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              Bu filtrede konsültasyon bulunmuyor.
            </div>
          )}
          {filtered.map((item) => {
            const active = selected?.id === item.id;
            const meta = STATUS_META[item.status];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectItem(item.id)}
                className={cn(
                  "w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all",
                  active
                    ? "border-primary/40 ring-1 ring-primary/20"
                    : "border-slate-100 hover:border-slate-200 hover:shadow-md"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                    {item.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.patient}
                      </p>
                      <StatusBadge label={meta.label} tone={meta.tone} />
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {item.country}
                    </p>
                    <p className="mt-1.5 truncate text-xs font-medium text-slate-700">
                      {item.treatment}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                      <ImageIcon className="h-3 w-3" />
                      {item.attachments.length} dosya · {item.createdAt}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sağ detay */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
                    {selected.initials}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {selected.patient}
                    </h2>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Stethoscope className="h-3.5 w-3.5" />
                      {selected.treatment}
                      <span className="text-slate-400">· {selected.createdAt}</span>
                    </p>
                  </div>
                </div>
                <StatusBadge
                  label={STATUS_META[selected.status].label}
                  tone={STATUS_META[selected.status].tone}
                />
              </div>

              {/* Hasta notu */}
              <div className="border-b border-slate-100 px-6 py-5">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Hasta Notu
                </p>
                <p className="text-sm leading-relaxed text-slate-700">
                  {selected.note}
                </p>
              </div>

              {/* Fotoğraf / belgeler */}
              <div className="border-b border-slate-100 px-6 py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Yüklenen Dosyalar ({selected.attachments.length})
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selected.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                    >
                      <div
                        className={cn(
                          "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br",
                          att.tone
                        )}
                      >
                        {att.type === "document" ? (
                          <FileText className="h-8 w-8 text-white/80" />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-white/80" />
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2">
                        <p className="truncate text-[11px] font-medium text-white">
                          {att.label}
                        </p>
                        <p className="text-[10px] text-white/70">
                          {att.type === "document" ? "Belge" : "Fotoğraf"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teklif formu */}
              <div className="p-6">
                {selected.status === "accepted" ? (
                  <div className="rounded-xl bg-emerald-50 px-4 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      <CheckCheck className="h-4 w-4" />
                      Teklif kabul edildi — randevu talebine dönüştürülebilir
                    </div>
                    <p className="mt-2 text-sm text-emerald-600">
                      {selected.packageName}: {selected.currency}
                      {selected.quotedPrice?.toLocaleString("tr-TR")}
                    </p>
                  </div>
                ) : selected.status === "expired" ? (
                  <div className="rounded-xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                    Bu teklifin geçerlilik süresi doldu. Yeniden teklif
                    göndermek için hastayla iletişime geçin.
                  </div>
                ) : sent && selected.status === "quoted" ? (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    <CheckCheck className="h-4 w-4" />
                    Fiyat teklifi hastaya gönderildi.
                  </div>
                ) : (
                  <>
                    <p className="mb-4 text-sm font-semibold text-slate-900">
                      Fiyat Teklifi Oluştur
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="block sm:col-span-2">
                        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Package className="h-4 w-4 text-slate-400" />
                          Paket Adı
                        </span>
                        <input
                          value={packageName}
                          onChange={(e) => setPackageName(e.target.value)}
                          placeholder="Örn: DHI Premium Paket (3500 greft)"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-slate-700">
                          Teklif Fiyatı ({selected.currency})
                        </span>
                        <input
                          type="number"
                          min={0}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="2800"
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-slate-700">
                          Geçerlilik
                        </span>
                        <select className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10">
                          <option>7 gün</option>
                          <option>14 gün</option>
                          <option>30 gün</option>
                        </select>
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="mb-1.5 block text-sm font-medium text-slate-700">
                          Hastaya Not (opsiyonel)
                        </span>
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          rows={2}
                          placeholder="Pakete dahil olan hizmetler, konaklama, transfer vb."
                          className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendQuote}
                      disabled={!price.trim() || selected.status === "quoted"}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      {selected.status === "quoted"
                        ? "Teklif Zaten Gönderildi"
                        : "Teklif Gönder"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
              Detayları görüntülemek için bir konsültasyon seçin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
