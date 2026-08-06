"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCheck,
  Inbox,
  Languages,
  Loader2,
  MapPin,
  MessageSquare,
  RefreshCw,
  Send,
  Stethoscope,
  Tag,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { HybridBadge } from "@/components/ui/HybridBadge";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import { Toast, type ToastMessage } from "@/components/ui/Toast";
import type { DataSource } from "@/lib/api/types";
import type { AppointmentRequest, RequestStatus } from "@/lib/clinic-mock";
import {
  fetchAppointmentRequests,
  updateRequestStatus,
} from "@/lib/services/requests";
import { useApi } from "@/lib/services/shared";
import { cn } from "@/lib/utils";

type FilterKey = "all" | RequestStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "pending", label: "Bekleyen" },
  { key: "approved", label: "Onaylanan" },
  { key: "rejected", label: "Reddedilen" },
  { key: "all", label: "Tümü" },
];

const STATUS_META: Record<RequestStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: "Bekliyor", tone: "warning" },
  approved: { label: "Onaylandı", tone: "success" },
  rejected: { label: "Reddedildi", tone: "danger" },
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [source, setSource] = useState<DataSource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>("pending");
  const [selectedId, setSelectedId] = useState<string>("");
  const [message, setMessage] = useState("");
  // Aktif API isteği: aynı butona tekrar tıklamayı (race condition) engeller.
  const [actionId, setActionId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<RequestStatus | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAppointmentRequests();
      setRequests(data);
      setSource(useApi() ? "api" : "mock");
      setSelectedId(
        data.find((r) => r.status === "pending")?.id ?? data[0]?.id ?? ""
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Talepler yüklenirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      filter === "all" ? requests : requests.filter((r) => r.status === filter),
    [requests, filter]
  );

  const selected =
    requests.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  function showToast(text: string, tone: ToastMessage["tone"]) {
    setToast({ id: Date.now(), message: text, tone });
  }

  async function handleAction(req: AppointmentRequest, status: RequestStatus) {
    // Zaten bir işlem sürüyorsa yeni tıklamaları yoksay.
    if (actionId) return;

    setActionId(req.id);
    setActionType(status);
    setMessage("");

    try {
      const updated = await updateRequestStatus(req.id, status);

      // Optimistic update: talebin durumunu güncelle; "Bekleyen" filtresinde
      // otomatik olarak listeden düşer. Sıradaki bekleyen talebe geç.
      setRequests((prev) => {
        const next = prev.map((r) => (r.id === req.id ? updated : r));
        const nextPending = next.find(
          (r) => r.id !== req.id && r.status === "pending"
        );
        setSelectedId(nextPending?.id ?? "");
        return next;
      });

      showToast(
        status === "approved"
          ? "Randevu başarıyla onaylandı."
          : "Randevu reddedildi.",
        status === "approved" ? "success" : "info"
      );
    } catch {
      showToast(
        "İşlem gerçekleştirilemedi. Lütfen tekrar deneyin.",
        "danger"
      );
    } finally {
      setActionId(null);
      setActionType(null);
    }
  }

  const counts = useMemo(
    () => ({
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      approved: requests.filter((r) => r.status === "approved").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    }),
    [requests]
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Randevu Talepleri"
        description="MediQueue pazar yerinden gelen hasta taleplerini değerlendirin, onaylayın veya reddedin."
        action={source ? <HybridBadge source={source} /> : undefined}
      />

      {loading ? (
        <RequestsSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={() => void load()} />
      ) : requests.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Filtreler */}
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
                      active
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {counts[f.key]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Gelen kutusu listesi */}
            <div className="flex flex-col gap-3 lg:col-span-2">
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                  Bu filtrede talep bulunmuyor.
                </div>
              )}
              {filtered.map((req) => {
                const active = selected?.id === req.id;
                const meta = STATUS_META[req.status];
                const busy = actionId === req.id;
                return (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(req.id);
                      setMessage("");
                    }}
                    className={cn(
                      "w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all",
                      active
                        ? "border-primary/40 ring-1 ring-primary/20"
                        : "border-slate-100 hover:border-slate-200 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                        {req.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {req.patient}
                          </p>
                          {busy ? (
                            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                          ) : (
                            <StatusBadge label={meta.label} tone={meta.tone} />
                          )}
                        </div>
                        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {req.city}, {req.country}
                        </p>
                        <p className="mt-1.5 truncate text-xs font-medium text-slate-700">
                          {req.treatment}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detay paneli */}
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
                        <p className="text-sm text-slate-500">
                          {selected.age} yaşında · {selected.gender} ·{" "}
                          <span className="text-slate-400">
                            {selected.createdAt}
                          </span>
                        </p>
                      </div>
                    </div>
                    <StatusBadge
                      label={STATUS_META[selected.status].label}
                      tone={STATUS_META[selected.status].tone}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                    <DetailRow
                      icon={<Stethoscope className="h-4 w-4" />}
                      label="Talep Edilen Tedavi"
                      value={selected.treatment}
                    />
                    <DetailRow
                      icon={<CalendarDays className="h-4 w-4" />}
                      label="İstenen Tarih"
                      value={selected.requestedDate}
                    />
                    <DetailRow
                      icon={<MapPin className="h-4 w-4" />}
                      label="Şehir / Ülke"
                      value={`${selected.city}, ${selected.country}`}
                    />
                    <DetailRow
                      icon={<Tag className="h-4 w-4" />}
                      label="Bütçe Aralığı"
                      value={selected.budget}
                    />
                    <DetailRow
                      icon={<Languages className="h-4 w-4" />}
                      label="Konuştuğu Diller"
                      value={selected.language}
                    />
                  </div>

                  <div className="px-6 pb-6">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Semptom / Not
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {selected.symptom}
                      </p>
                    </div>
                  </div>

                  {/* Aksiyonlar */}
                  <div className="border-t border-slate-100 p-6">
                    {selected.status === "rejected" ? (
                      <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        <X className="h-4 w-4" />
                        Bu talep reddedildi.
                      </div>
                    ) : selected.status === "approved" ? (
                      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        <CheckCheck className="h-4 w-4" />
                        Bu talep onaylandı.
                      </div>
                    ) : (
                      <>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Hastaya Mesaj
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          placeholder="Merhaba, talebiniz için teşekkürler. Uygun randevu tarihlerimiz ve tedavi planı için sizinle iletişime geçeceğiz..."
                          className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                        />
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <ActionButton
                            variant="approve"
                            busy={
                              actionId === selected.id &&
                              actionType === "approved"
                            }
                            disabled={actionId === selected.id}
                            onClick={() => handleAction(selected, "approved")}
                          />
                          <ActionButton
                            variant="reject"
                            busy={
                              actionId === selected.id &&
                              actionType === "rejected"
                            }
                            disabled={actionId === selected.id}
                            onClick={() => handleAction(selected, "rejected")}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500">
                  Detayları görüntülemek için bir talep seçin.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

function ActionButton({
  variant,
  busy,
  disabled,
  onClick,
}: {
  variant: "approve" | "reject";
  busy: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const isApprove = variant === "approve";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        isApprove
          ? "bg-primary text-white shadow-sm shadow-primary/25 hover:bg-primary-hover"
          : "border border-red-200 bg-white text-red-600 hover:bg-red-50"
      )}
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isApprove ? (
        <Send className="h-4 w-4" />
      ) : (
        <X className="h-4 w-4" />
      )}
      {busy
        ? isApprove
          ? "Onaylanıyor…"
          : "Reddediliyor…"
        : isApprove
          ? "Onayla ve Mesaj Gönder"
          : "Reddet"}
    </button>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Inbox className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Şu an bekleyen randevu talebiniz bulunmuyor.
      </h2>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Pazar yerinden yeni bir hasta talebi geldiğinde burada görünecek ve
        anında değerlendirebileceksiniz.
      </p>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Talepler yüklenirken bir hata oluştu
      </h2>
      <p className="mt-1 max-w-sm text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <RefreshCw className="h-4 w-4" />
        Tekrar Dene
      </button>
    </div>
  );
}

function RequestsSkeleton() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-24 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-3 lg:col-span-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-1/2 rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                  <div className="skeleton h-3 w-1/3 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="skeleton h-14 w-14 shrink-0 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-1/3 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-12 rounded-xl" />
              ))}
            </div>
            <div className="skeleton mt-6 h-24 rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
