"use client";

import { Languages } from "lucide-react";
import type { ChatThread } from "@/types";
import {
  formatThreadTime,
  getInitials,
} from "@/lib/message-utils";
import { countryCodeToFlagEmoji, cn } from "@/lib/utils";

const LANG_SHORT: Record<string, string> = {
  AR: "AR→TR",
  DE: "DE→TR",
  EN: "EN→TR",
  RU: "RU→TR",
  FR: "FR→TR",
};

export function ChatList({
  threads,
  selectedId,
  onSelect,
}: {
  threads: ChatThread[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-1 p-2">
      {threads.map((thread) => {
        const selected = selectedId === thread.id;
        const hasUnread = thread.unreadCount > 0;
        const langBadge =
          LANG_SHORT[thread.patientLanguage] ??
          `${thread.patientLanguage}→TR`;

        return (
          <li key={thread.id}>
            <button
              type="button"
              onClick={() => onSelect(thread.id)}
              className={cn(
                "group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl px-3 py-3.5 text-left transition-all duration-200",
                selected
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-slate-200 hover:bg-white/5"
              )}
            >
              {selected && (
                <span
                  className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white/70"
                  aria-hidden
                />
              )}

              <div className="relative shrink-0">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold ring-2",
                    selected
                      ? "bg-white/20 text-white ring-white/30"
                      : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 ring-white/5"
                  )}
                >
                  {getInitials(thread.patientName)}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-slate-950 text-[11px] ring-2 ring-slate-950">
                  {countryCodeToFlagEmoji(thread.countryCode)}
                </span>
                {hasUnread && !selected && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-sm",
                      hasUnread || selected
                        ? "font-bold"
                        : "font-semibold text-slate-200",
                      selected ? "text-white" : hasUnread ? "text-white" : ""
                    )}
                  >
                    {thread.patientName}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 text-[10px] font-medium",
                      selected
                        ? "text-white/70"
                        : hasUnread
                          ? "text-primary"
                          : "text-slate-500"
                    )}
                  >
                    {formatThreadTime(thread.lastMessageAt)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                      selected
                        ? "bg-white/20 text-white"
                        : "bg-sky-500/15 text-sky-300"
                    )}
                  >
                    <Languages className="h-2.5 w-2.5" />
                    {langBadge}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-xs leading-snug",
                      selected
                        ? "text-white/75"
                        : hasUnread
                          ? "font-medium text-slate-300"
                          : "text-slate-500"
                    )}
                  >
                    {thread.lastMessage}
                  </p>
                  {hasUnread && (
                    <span
                      className={cn(
                        "flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                        selected
                          ? "bg-white text-primary"
                          : "bg-primary text-white"
                      )}
                    >
                      {thread.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
