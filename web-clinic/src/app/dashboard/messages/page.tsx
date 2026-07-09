"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Globe,
  Languages,
  Paperclip,
  Send,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import type { ChatMessage } from "@/lib/growth-mock";
import { fetchChatMessages, fetchMessageThreads } from "@/lib/services/growth";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [messageThreads, setThreads] = useState<Awaited<ReturnType<typeof fetchMessageThreads>>>([]);
  const [selectedId, setSelectedId] = useState("");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchMessageThreads(), fetchChatMessages()])
      .then(([nextThreads, nextMessages]) => {
        if (cancelled) return;
        setThreads(nextThreads);
        setMessages(nextMessages);
        setSelectedId(nextThreads[0]?.id ?? "");
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
        time: new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setDraft("");
  }

  if (loading || !selected) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasta Mesajları"
        description="Otomatik çeviri destekli, platform içi hasta iletişim merkezi."
      />

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
                    onClick={() => setSelectedId(thread.id)}
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
            {threadMessages.map((msg) => {
              const isClinic = msg.from === "clinic";
              return (
                <div
                  key={msg.id}
                  className={cn("flex", isClinic ? "justify-end" : "justify-start")}
                >
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
            })}
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="flex items-end gap-2">
              <button
                type="button"
                aria-label="Dosya ekle"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
              >
                <Paperclip className="h-5 w-5" />
              </button>
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
                className="min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!draft.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/25 transition-colors hover:bg-primary-hover disabled:opacity-50"
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
    </div>
  );
}
