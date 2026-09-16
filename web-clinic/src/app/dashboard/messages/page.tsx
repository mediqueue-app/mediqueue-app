"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Globe,
  Inbox,
  Languages,
  MessageSquare,
  Paperclip,
  Send,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { PageLoadError } from "@/components/ui/PageLoadError";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { FilePermissionTrigger } from "@/components/ui/permission-gate";
import type { ChatMessage } from "@/lib/growth-mock";
import { fetchChatMessages, fetchMessageThreads } from "@/lib/services/growth";
import { toUserError } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { formatTime } from "@/lib/datetime";

export default function MessagesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deepLinkId = useRef(searchParams.get("id"));
  const [messageThreads, setThreads] = useState<Awaited<ReturnType<typeof fetchMessageThreads>>>([]);
  const [selectedId, setSelectedId] = useState("");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [pendingDelete, setPendingDelete] = useState<ChatMessage | null>(null);
  const t = useT();

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchMessageThreads(), fetchChatMessages()])
      .then(([nextThreads, nextMessages]) => {
        if (cancelled) return;
        setThreads(nextThreads);
        setMessages(nextMessages);
        const fromUrl = deepLinkId.current;
        const match =
          fromUrl && nextThreads.some((t) => t.id === fromUrl) ? fromUrl : null;
        setSelectedId(match ?? nextThreads[0]?.id ?? "");
        setLoading(false);
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

  const selected = messageThreads.find((t) => t.id === selectedId) ?? messageThreads[0];
  const threadMessages = useMemo(
    () => messages.filter((m) => m.threadId === selectedId),
    [messages, selectedId]
  );

  function handleSend() {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        threadId: selectedId,
        from: "clinic",
        text: draft.trim(),
        time: formatTime(new Date()),
      },
    ]);
    setDraft("");
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
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

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasta Mesajları"
        description="Otomatik çeviri destekli, platform içi hasta iletişim merkezi."
      />

      {messageThreads.length === 0 || !selected ? (
        <LocalizedEmpty
          copyKey="messagesInbox"
          icon={Inbox}
          actionHref="/dashboard/requests"
        />
      ) : (

      <div className="grid h-[calc(100vh-220px)] min-h-[560px] grid-cols-1 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:grid-cols-5">
        {/* Sol — konuşma listesi */}
        <div className="flex flex-col border-b border-slate-100 lg:col-span-2 lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Gelen Kutusu
            </p>
            <p className="text-sm font-medium text-slate-700">
              {messageThreads.length} aktif konuşma
            </p>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {messageThreads.map((thread) => {
              const active = thread.id === selectedId;
              return (
                <li key={thread.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(thread.id);
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("id", thread.id);
                      router.replace(`${pathname}?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3.5 text-left transition-colors",
                      active ? "bg-primary-light/50" : "hover:bg-slate-50"
                    )}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                      {thread.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {thread.flag} {thread.patient}
                        </p>
                        <span className="shrink-0 text-[11px] text-slate-400">
                          {thread.lastAt}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {thread.country} · {thread.treatment}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {thread.lastMessage}
                      </p>
                    </div>
                    {thread.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                        {thread.unread}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sağ — mesajlaşma */}
        <div className="flex flex-col lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                {selected.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {selected.flag} {selected.patient}
                </p>
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  <Globe className="h-3 w-3" />
                  {selected.country} · {selected.language}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2">
              <Languages className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-slate-600">
                İngilizce&apos;ye Otomatik Çeviri
              </span>
              <ToggleSwitch
                checked={autoTranslate}
                onChange={setAutoTranslate}
                label="Otomatik çeviri"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {threadMessages.length === 0 ? (
              <LocalizedEmpty
                copyKey="messagesThread"
                icon={MessageSquare}
                compact
                className="h-full min-h-[240px] border-0 bg-transparent shadow-none"
              />
            ) : (
            threadMessages.map((msg) => {
              const isClinic = msg.from === "clinic";
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "group mq-list-item flex items-end gap-1.5",
                    isClinic ? "justify-end" : "justify-start"
                  )}
                >
                  {isClinic ? (
                    <button
                      type="button"
                      onClick={() => setPendingDelete(msg)}
                      aria-label={t("confirm.messageAria")}
                      className="touch-target mb-1 rounded-lg p-1 text-slate-400 opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3",
                      isClinic
                        ? "rounded-tr-sm bg-primary text-white"
                        : "rounded-tl-sm bg-slate-100 text-slate-800"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {autoTranslate && msg.translated && !isClinic && (
                      <p
                        className={cn(
                          "mt-1.5 border-t pt-1.5 text-xs italic",
                          "border-slate-200/80 text-slate-500"
                        )}
                      >
                        ↳ {msg.translated}
                      </p>
                    )}
                    <p
                      className={cn(
                        "mt-1 text-[10px]",
                        isClinic ? "text-white/70" : "text-slate-400"
                      )}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })
            )}
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="flex items-end gap-2">
              <FilePermissionTrigger
                accept="image/*,.pdf,application/pdf"
                ariaLabel="Dosya ekle"
                description={t("permission.cameraChat")}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
              >
                <Paperclip className="h-5 w-5" />
              </FilePermissionTrigger>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder="Mesajınızı yazın…"
                className="min-h-12 flex-1 resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:opacity-50"
                aria-label="Gönder"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Röntgen, fotoğraf ve belge ekleyebilirsiniz. Mesajlar platform üzerinden güvenli iletilir.
            </p>
          </div>
        </div>
      </div>
      )}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={t("confirm.messageTitle")}
        description={t("confirm.messageBody")}
        confirmLabel={t("confirm.messageAction")}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          setMessages((prev) => prev.filter((item) => item.id !== pendingDelete.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
