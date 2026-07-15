"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Languages,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import type { ChatMessage, ChatThread } from "@/types";
import {
  formatMessageDateLabel,
  formatMessageTime,
  getInitials,
  groupMessagesByDate,
} from "@/lib/message-utils";
import { countryCodeToFlagEmoji, cn } from "@/lib/utils";

const LANG_LABEL: Record<string, string> = {
  AR: "Arapça",
  DE: "Almanca",
  EN: "İngilizce",
  TR: "Türkçe",
  RU: "Rusça",
  FR: "Fransızca",
};

const DEMO_REPLY: Record<string, (tr: string) => string> = {
  AR: (tr) => `〔AR〕 ${tr}`,
  DE: (tr) => `〔DE〕 ${tr}`,
  EN: (tr) => `[EN] ${tr}`,
};

export function ChatWindow({
  thread,
  onBack,
}: {
  thread: ChatThread;
  onBack?: () => void;
}) {
  const [messages, setMessages] = useState(thread.messages);
  const [draft, setDraft] = useState("");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const patientLang = thread.patientLanguage;
  const langName = LANG_LABEL[patientLang] ?? patientLang;

  const groups = groupMessagesByDate(messages);

  useEffect(() => {
    setMessages(thread.messages);
  }, [thread]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function sendMessage() {
    if (!draft.trim()) return;
    const text = draft.trim();
    setMessages((prev) => [
      ...prev,
      {
        id: `M-${Date.now()}`,
        sender: "doctor" as const,
        content: text,
        timestamp: new Date().toISOString(),
        patientLanguage: patientLang,
        patientSeesText: DEMO_REPLY[patientLang]?.(text) ?? `[${langName}] ${text}`,
      },
    ]);
    setDraft("");
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#e8edf5]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(58 106 214 / 0.12) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 border-b border-white/60 bg-white/95 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Sohbet listesine dön"
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-sm font-bold text-white shadow-md shadow-primary/30">
              {getInitials(thread.patientName)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {countryCodeToFlagEmoji(thread.countryCode)} {thread.patientName}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              Hasta dili: {langName}
            </p>
          </div>

          <div
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5",
              autoTranslate
                ? "border-primary/25 bg-primary-light/60"
                : "border-slate-200 bg-white"
            )}
          >
            <Languages
              className={cn(
                "h-3.5 w-3.5",
                autoTranslate ? "text-primary" : "text-slate-400"
              )}
            />
            <span
              className={cn(
                "hidden text-[11px] font-semibold sm:inline",
                autoTranslate ? "text-primary" : "text-slate-500"
              )}
            >
              {patientLang} → TR
            </span>
            <ToggleSwitch
              checked={autoTranslate}
              onChange={setAutoTranslate}
              label={`${patientLang} dilinden Türkçeye otomatik çeviri`}
            />
          </div>

          <Link
            href={`/dashboard/patients/${thread.patientId}`}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:border-primary/30 hover:text-primary"
          >
            Profil
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
        {groups.map((group) => (
          <div key={group.date} className="animate-fade-in-up">
            <div className="mb-3 flex justify-center">
              <span className="rounded-full bg-slate-900/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90">
                {formatMessageDateLabel(group.date)}
              </span>
            </div>
            <div className="space-y-3">
              {group.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  patientName={thread.patientName}
                  autoTranslate={autoTranslate}
                />
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="relative z-10 border-t border-white/50 bg-white/85 p-3.5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-lg shadow-slate-900/5">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary"
            aria-label="Dosya ekle"
            title="Yakında"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={`Türkçe yazın → hasta ${langName} görür`}
            aria-label="Mesaj yaz"
            rows={1}
            className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-amber-500"
            aria-label="İfade"
            title="Yakında"
          >
            <Smile className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={sendMessage}
            disabled={!draft.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30 hover:brightness-110 disabled:opacity-35"
            aria-label="Gönder"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  patientName,
  autoTranslate,
}: {
  msg: ChatMessage;
  patientName: string;
  autoTranslate: boolean;
}) {
  const mine = msg.sender === "doctor";
  const showPatientOriginal =
    autoTranslate && !mine && Boolean(msg.originalText && msg.originalLanguage);
  const showPatientSees =
    autoTranslate && mine && Boolean(msg.patientSeesText && msg.patientLanguage);

  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      {!mine && (
        <div className="mr-2 mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-primary shadow-sm ring-1 ring-slate-100">
          {getInitials(patientName)}
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] px-3.5 py-2.5 text-sm shadow-sm",
          mine
            ? "rounded-2xl rounded-tr-sm bg-primary text-white shadow-primary/20"
            : "rounded-2xl rounded-tl-sm bg-slate-100 text-slate-800"
        )}
      >
        <p className="leading-relaxed">{msg.content}</p>

        {showPatientOriginal && (
          <p
            className="mt-1.5 border-t border-slate-200/80 pt-1.5 text-xs italic leading-relaxed text-slate-500"
            dir={msg.originalLanguage === "AR" ? "rtl" : "ltr"}
          >
            <span className="mr-1 not-italic font-semibold text-slate-400">
              ↳ Orijinal · {msg.originalLanguage}
            </span>
            {msg.originalText}
          </p>
        )}

        {showPatientSees && (
          <p
            className="mt-1.5 border-t border-white/25 pt-1.5 text-xs italic leading-relaxed text-white/80"
            dir={msg.patientLanguage === "AR" ? "rtl" : "ltr"}
          >
            <span className="mr-1 not-italic font-semibold text-white/55">
              ↳ Hasta görür · {msg.patientLanguage}
            </span>
            {msg.patientSeesText}
          </p>
        )}

        <p
          className={cn(
            "mt-1 text-right text-[10px] font-medium",
            mine ? "text-white/65" : "text-slate-400"
          )}
        >
          {formatMessageTime(msg.timestamp)}
        </p>
      </div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        checked ? "bg-primary" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}
