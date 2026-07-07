"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Lock,
  Send,
  Shield,
} from "lucide-react";
import type { ChatThread } from "@/types";
import {
  formatMessageDateLabel,
  formatMessageTime,
  getInitials,
  groupMessagesByDate,
} from "@/lib/message-utils";
import { cn } from "@/lib/utils";

export function ChatWindow({
  thread,
  onBack,
}: {
  thread: ChatThread;
  onBack?: () => void;
}) {
  const [messages, setMessages] = useState(thread.messages);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const groups = groupMessagesByDate(messages);

  function sendMessage() {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `M-${Date.now()}`,
        sender: "doctor" as const,
        content: draft.trim(),
        timestamp: new Date().toISOString(),
      },
    ]);
    setDraft("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="flex h-full flex-col bg-slate-50/30">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Sohbet listesine dön"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
          {getInitials(thread.patientName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{thread.patientName}</p>
          <p className="flex items-center gap-1 text-[11px] text-emerald-600">
            <Lock className="h-3 w-3" />
            Uçtan uca güvenli kanal
          </p>
        </div>

        <Link
          href={`/dashboard/patients/${thread.patientId}`}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Profil
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Mesajlar */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-slate-400 shadow-sm ring-1 ring-slate-100">
            <Shield className="h-3 w-3" />
            Mesajlar yalnızca sizinle paylaşılır
          </span>
        </div>

        {groups.map((group) => (
          <div key={group.date}>
            <div className="mb-3 flex justify-center">
              <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 shadow-sm">
                {formatMessageDateLabel(group.date)}
              </span>
            </div>
            <div className="space-y-2.5">
              {group.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "doctor" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                      msg.sender === "doctor"
                        ? "rounded-br-md bg-primary text-white"
                        : "rounded-bl-md border border-slate-100 bg-white text-slate-800"
                    )}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                    <p
                      className={cn(
                        "mt-1.5 text-right text-[10px]",
                        msg.sender === "doctor" ? "text-white/60" : "text-slate-400"
                      )}
                    >
                      {formatMessageTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Giriş */}
      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Mesajınızı yazın..."
            aria-label="Mesaj yaz"
            rows={1}
            className="max-h-28 min-h-[42px] flex-1 resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!draft.trim()}
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-40"
            aria-label="Gönder"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-400">
          Enter ile gönder · Shift+Enter yeni satır
        </p>
      </div>
    </div>
  );
}
