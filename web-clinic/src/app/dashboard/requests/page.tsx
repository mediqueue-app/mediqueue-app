"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCheck,
  Languages,
  MapPin,
  MessageSquare,
  Send,
  Stethoscope,
  Tag,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge, type BadgeTone } from "@/components/ui/StatusBadge";
import {
  appointmentRequests,
  type AppointmentRequest,
  type RequestStatus,
} from "@/lib/clinic-mock";
import { cn } from "@/lib/utils";

type FilterKey = "all" | RequestStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "pending", label: "Bekleyen" },
  { key: "approved", label: "Onaylanan" },
  { key: "rejected", label: "Reddedilen" },
];

const STATUS_META: Record<RequestStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: "Bekliyor", tone: "warning" },
  approved: { label: "Onaylandı", tone: "success" },
  rejected: { label: "Reddedildi", tone: "danger" },
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<AppointmentRequest[]>(appointmentRequests);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string>(appointmentRequests[0].id);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? requests
        : requests.filter((r) => r.status === filter),
    [requests, filter]
  );

  const selected = requests.find((r) => r.id === selectedId) ?? filtered[0] ?? null;

  function updateStatus(id: string, status: RequestStatus) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    setSent(false);
    setMessage("");
  }

  function handleSend() {
    if (!selected) return;
    updateStatus(selected.id, "approved");
    setSent(true);
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
      />

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
            return (
              <button
                key={req.id}
                type="button"
                onClick={() => {
                  setSelectedId(req.id);
                  setSent(false);
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
                      <StatusBadge label={meta.label} tone={meta.tone} />
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
                      <span className="text-slate-400">{selected.createdAt}</span>
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
                ) : selected.status === "approved" && sent ? (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    <CheckCheck className="h-4 w-4" />
                    Talep onaylandı ve hastaya mesajınız gönderildi.
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
                      <button
                        type="button"
                        onClick={handleSend}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover"
                      >
                        <Send className="h-4 w-4" />
                        Onayla ve Mesaj Gönder
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(selected.id, "rejected")}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                        Reddet
                      </button>
                      {selected.status === "approved" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <Check className="h-3.5 w-3.5" />
                          Onaylandı
                        </span>
                      )}
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
    </div>
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
