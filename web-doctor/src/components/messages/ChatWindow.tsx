"use client";

import { useState } from "react";
import type { ChatThread } from "@/types";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatWindow({ thread }: { thread: ChatThread }) {
  const [messages, setMessages] = useState(thread.messages);
  const [draft, setDraft] = useState("");

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
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-4 py-3">
        <p className="font-semibold text-slate-900">{thread.patientName}</p>
        <p className="text-xs text-slate-500">Çevrimiçi · güvenli kanal</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.sender === "doctor" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                msg.sender === "doctor"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-800"
              )}
            >
              <p>{msg.content}</p>
              <p
                className={cn(
                  "mt-1 text-[10px]",
                  msg.sender === "doctor" ? "text-white/70" : "text-slate-400"
                )}
              >
                {new Date(msg.timestamp).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Mesajınızı yazın..."
            aria-label="Mesaj yaz"
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          <button
            type="button"
            onClick={sendMessage}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Send className="h-4 w-4" />
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
