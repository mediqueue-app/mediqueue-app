"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  MessagesSquare,
  Send,
  X,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import type { Appointment, ChatMessage } from "@/lib/api/types";
import { getMessages, sendMessage } from "@/lib/services/messages";
import { HybridBadge } from "@/components/common/HybridBadge";
import { cn } from "@/lib/utils";

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Onaylanmış bir randevu için hasta ↔ klinik sohbet penceresi (modal).
 * Sabit konumlu (fixed) overlay olduğundan sayfanın mizanpajını,
 * kaydırmasını veya mobil uyumluluğunu etkilemez.
 */
export function AppointmentChat({
  appointment,
  onClose,
}: {
  appointment: Appointment;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Mesaj geçmişini yükle. Yeniden deneme `reloadKey` artırılarak tetiklenir;
  // yükleyici effect içinde tanımlıdır (idiomatik async-effect deseni).
  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getMessages(appointment.id);
        if (!ignore) setMessages(data);
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Mesajlar yüklenirken bir hata oluştu."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    void load();
    return () => {
      ignore = true;
    };
  }, [appointment.id, reloadKey]);

  // Yeni mesaj geldikçe / yüklendikçe en alta kaydır.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Escape ile kapat.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSend = useCallback(async () => {
    const body = draft.trim();
    // Çift tıklama / boş mesaj koruması (race condition).
    if (!body || sending) return;

    setSending(true);
    try {
      const created = await sendMessage(appointment.id, body);
      setMessages((prev) => [...prev, created]);
      setDraft("");
    } catch {
      // Taslağı koru ki hasta tekrar deneyebilsin.
    } finally {
      setSending(false);
    }
  }, [appointment.id, draft, sending]);

  const onComposerKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter gönderir, Shift+Enter satır atlar.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Klinik ile mesajlaşma"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in-up flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-[600px] sm:max-h-[85vh] sm:rounded-2xl"
      >
        {/* Başlık */}
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf0fc] text-[#3a6ad6]">
              <MessagesSquare className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-slate-900">
                {appointment.branch}
              </h2>
              <p className="truncate text-xs text-slate-500">
                {appointment.doctor_name
                  ? appointment.doctor_name
                  : "Klinik ile iletişim"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HybridBadge
              source="mock"
              description="Mesajlaşma demo verisiyle çalışmaktadır."
              className="hidden sm:inline-flex"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Sohbeti kapat"
              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Mesaj listesi */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-5"
          aria-live="polite"
        >
          {loading ? (
            <ChatSkeleton />
          ) : error ? (
            <ChatError
              message={error}
              onRetry={() => setReloadKey((k) => k + 1)}
            />
          ) : messages.length === 0 ? (
            <ChatEmpty />
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
        </div>

        {/* Mesaj yazma alanı */}
        <div className="border-t border-slate-100 bg-white px-3 py-3">
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onComposerKeyDown}
              rows={1}
              placeholder="Bir mesaj yazın…"
              disabled={loading || Boolean(error)}
              className="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#3a6ad6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3a6ad6]/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!draft.trim() || sending || loading || Boolean(error)}
              aria-label="Gönder"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3a6ad6] text-white shadow-sm transition-colors hover:bg-[#2f57b3] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isPatient = message.sender === "patient";
  return (
    <div
      className={cn(
        "flex animate-fade-in-up",
        isPatient ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
          isPatient
            ? "rounded-br-md bg-[#3a6ad6] text-white"
            : "rounded-bl-md bg-white text-slate-700 ring-1 ring-slate-200"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.body}</p>
        <span
          className={cn(
            "mt-1 block text-right text-[10px]",
            isPatient ? "text-white/70" : "text-slate-400"
          )}
        >
          {formatTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}

function ChatSkeleton() {
  const rows: Array<"left" | "right"> = ["left", "left", "right", "left"];
  return (
    <div className="space-y-3" aria-busy="true">
      {rows.map((side, i) => (
        <div
          key={i}
          className={cn(
            "flex",
            side === "right" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "h-12 animate-pulse rounded-2xl bg-slate-200/70",
              i % 3 === 0 ? "w-3/5" : "w-2/5"
            )}
          />
        </div>
      ))}
    </div>
  );
}

function ChatEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf0fc] text-[#3a6ad6]">
        <MessageSquare className="h-8 w-8" />
      </span>
      <h3 className="mt-5 text-base font-bold text-slate-900">
        Klinik ile sohbete başlayın
      </h3>
      <p className="mt-1 max-w-xs text-sm text-slate-500">
        Randevunuzla ilgili sorularınızı buradan iletebilirsiniz. İlk mesajı
        siz gönderin.
      </p>
    </div>
  );
}

function ChatError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h3 className="mt-5 text-base font-bold text-slate-900">
        Mesajlar yüklenemedi
      </h3>
      <p className="mt-1 max-w-xs text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <RefreshCw className="h-4 w-4" />
        Tekrar Dene
      </button>
    </div>
  );
}
