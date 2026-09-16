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
  Trash2,
  Paperclip,
} from "lucide-react";
import { formatTime as formatClock, parseInstant } from "@/lib/datetime";
import { toUserError } from "@/lib/api/client";
import type { Appointment, ChatMessage } from "@/lib/api/types";
import { deleteMessage, getMessages, sendMessage } from "@/lib/services/messages";
import { HybridBadge } from "@/components/common/HybridBadge";
import { LocalizedEmpty } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { FilePermissionTrigger, BrowserNotifyOptIn } from "@/components/ui/permission-gate";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

function formatMessageClock(iso: string): string {
  const d = parseInstant(iso);
  if (Number.isNaN(d.getTime())) return "";
  return formatClock(d);
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
  const t = useT();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [pendingDelete, setPendingDelete] = useState<ChatMessage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
          setError(toUserError(err));
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
      if (e.key === "Escape" && !pendingDelete) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, pendingDelete]);

  const handleSend = useCallback(async () => {
    const body = draft.trim();
    // Çift tıklama / boş mesaj koruması (race condition).
    if (!body || sending) return;

    setSending(true);
    setSendError(null);
    try {
      const created = await sendMessage(appointment.id, body);
      setMessages((prev) => [...prev, created]);
      setDraft("");
    } catch (err) {
      setSendError(toUserError(err));
    } finally {
      setSending(false);
    }
  }, [appointment.id, draft, sending]);

  async function runDelete() {
    if (!pendingDelete || deleting) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteMessage(appointment.id, pendingDelete.id);
      setMessages((prev) => prev.filter((item) => item.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(toUserError(err));
    } finally {
      setDeleting(false);
    }
  }

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
      aria-label={t("chat.aria")}
      className="mq-overlay fixed left-0 right-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      style={{
        top: "var(--vv-offset-top, 0px)",
        height: "var(--vv-height, 100dvh)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mq-panel flex h-full max-h-full w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-surface text-foreground shadow-2xl sm:h-[min(600px,100%)] sm:rounded-2xl"
      >
        {/* Başlık */}
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <MessagesSquare className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-slate-900">
                {appointment.branch}
              </h2>
              <p className="truncate text-xs text-slate-500">
                {appointment.doctor_name
                  ? appointment.doctor_name
                  : t("chat.withClinic")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HybridBadge
              source="mock"
              description={t("chat.demoTip")}
              className="hidden sm:inline-flex"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("chat.close")}
              className="touch-target shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
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
            <LocalizedEmpty
              copyKey="chat"
              icon={MessageSquare}
              compact
              className="h-full min-h-[220px] border-0 bg-transparent"
            />
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onDelete={
                  message.sender === "patient"
                    ? () => {
                        setDeleteError(null);
                        setPendingDelete(message);
                      }
                    : undefined
                }
              />
            ))
          )}
        </div>

        {/* Mesaj yazma alanı */}
        <div className="border-t border-border bg-surface px-3 py-3">
          {sendError ? (
            <p className="mb-2 text-xs text-red-600">{sendError}</p>
          ) : null}
          <div className="mb-2 flex justify-start">
            <BrowserNotifyOptIn hideWhenSettled />
          </div>
          <div className="flex items-end gap-2">
            <FilePermissionTrigger
              accept="image/*,.pdf,application/pdf"
              capture="environment"
              ariaLabel={t("chat.attachAria")}
              description={t("permission.cameraId")}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary disabled:opacity-50"
            >
              <Paperclip className="h-5 w-5" />
            </FilePermissionTrigger>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onComposerKeyDown}
              rows={1}
              placeholder={t("chat.placeholder")}
              disabled={loading || Boolean(error)}
              className="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-2xl border border-border bg-neutral-light px-4 py-3 text-sm text-foreground placeholder:text-slate-400 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!draft.trim() || sending || loading || Boolean(error)}
              aria-label={t("chat.send")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
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
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={t("confirm.messageTitle")}
        description={t("confirm.messageBody")}
        confirmLabel={t("confirm.messageAction")}
        busy={deleting}
        error={deleteError}
        onClose={() => {
          if (!deleting) setPendingDelete(null);
        }}
        onConfirm={() => void runDelete()}
      />
    </div>
  );
}

function MessageBubble({
  message,
  onDelete,
}: {
  message: ChatMessage;
  onDelete?: () => void;
}) {
  const t = useT();
  const isPatient = message.sender === "patient";
  return (
    <div
      className={cn(
        "group flex mq-list-item items-end gap-1.5",
        isPatient ? "justify-end" : "justify-start"
      )}
    >
      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          aria-label={t("chat.deleteAria")}
          className="touch-target mb-1 rounded-lg p-1 text-slate-400 opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ) : null}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
          isPatient
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md bg-surface text-foreground ring-1 ring-border"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.body}</p>
        <span
          className={cn(
            "mt-1 block text-right text-[10px]",
            isPatient ? "text-white/70" : "text-slate-400"
          )}
        >
          {formatMessageClock(message.created_at)}
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

function ChatError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const t = useT();
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h3 className="mt-5 text-base font-bold text-slate-900">
        {t("chat.loadFailed")}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-300 bg-surface px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <RefreshCw className="h-4 w-4" />
        {t("errors.retry")}
      </button>
    </div>
  );
}
