"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Send, UserRound } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { fetchTickets } from "@/lib/services/feedback";
import type { Ticket, TicketPriority, TicketStatus } from "@/types";
import { cn, formatRelative } from "@/lib/utils";

const PRIORITY_META: Record<TicketPriority, { label: string; tone: BadgeTone }> = {
  high: { label: "Yüksek", tone: "danger" },
  medium: { label: "Orta", tone: "warning" },
  low: { label: "Düşük", tone: "neutral" },
};

const STATUS_META: Record<TicketStatus, { label: string; tone: BadgeTone }> = {
  open: { label: "Açık", tone: "info" },
  pending: { label: "Beklemede", tone: "warning" },
  resolved: { label: "Çözüldü", tone: "success" },
};

type FilterKey = "all" | TicketStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "open", label: "Açık" },
  { key: "pending", label: "Beklemede" },
  { key: "resolved", label: "Çözüldü" },
];

export default function FeedbackPage() {
  const [items, setItems] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string>("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchTickets()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setSelectedId(data[0]?.id ?? "");
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("İnternet bağlantını kontrol et ve tekrar dene.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const filtered = useMemo(
    () => items.filter((t) => filter === "all" || t.status === filter),
    [items, filter]
  );

  const selected = items.find((t) => t.id === selectedId) ?? filtered[0];

  function setStatus(id: string, status: TicketStatus) {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  function sendReply() {
    if (!selected || !reply.trim()) return;
    setStatus(selected.id, "resolved");
    setReply("");
  }

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

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Destek Talepleri"
        description="Hastalardan ve kliniklerden gelen destek talepleri (ticket) — yanıtlayın ve durumu güncelleyin."
      />

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const count =
            f.key === "all"
              ? items.length
              : items.filter((t) => t.status === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                filter === f.key
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                  filter === f.key
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
        <div className="flex flex-col gap-2.5">
          {filtered.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedId(ticket.id)}
              className={cn(
                "rounded-2xl border bg-white p-4 text-left shadow-sm transition-all",
                selected?.id === ticket.id
                  ? "border-primary/40 ring-1 ring-primary/20"
                  : "border-slate-100 hover:border-slate-200"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  {ticket.subject}
                </p>
                <StatusBadge
                  label={PRIORITY_META[ticket.priority].label}
                  tone={PRIORITY_META[ticket.priority].tone}
                  dot={false}
                />
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                {ticket.message}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  {ticket.requesterType === "patient" ? (
                    <UserRound className="h-3.5 w-3.5" />
                  ) : (
                    <Building2 className="h-3.5 w-3.5" />
                  )}
                  {ticket.requesterName}
                </span>
                <StatusBadge
                  label={STATUS_META[ticket.status].label}
                  tone={STATUS_META[ticket.status].tone}
                />
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-16 text-center text-sm text-slate-500">
              Bu durumda talep yok.
            </div>
          )}
        </div>

        {selected ? (
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {selected.subject}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selected.id} · {selected.category} ·{" "}
                    {formatRelative(selected.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge
                    label={PRIORITY_META[selected.priority].label}
                    tone={PRIORITY_META[selected.priority].tone}
                    dot={false}
                  />
                  <StatusBadge
                    label={STATUS_META[selected.status].label}
                    tone={STATUS_META[selected.status].tone}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  {selected.requesterType === "patient" ? (
                    <UserRound className="h-5 w-5" />
                  ) : (
                    <Building2 className="h-5 w-5" />
                  )}
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {selected.requesterName}
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      {selected.requesterType === "patient" ? "Hasta" : "Klinik"}
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {selected.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Durum:
                </span>
                {(["open", "pending", "resolved"] as TicketStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(selected.id, st)}
                    className={cn(
                      "min-h-12 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                      selected.status === st
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    )}
                  >
                    {STATUS_META[st].label}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={2}
                  placeholder="Yanıtınızı yazın..."
                  className="flex-1 resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
                <button
                  type="button"
                  onClick={sendReply}
                  disabled={!reply.trim()}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  Gönder
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-16 text-sm text-slate-500 shadow-sm">
            Görüntülemek için bir talep seçin.
          </div>
        )}
      </div>
    </div>
  );
}
