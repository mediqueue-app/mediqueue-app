"use client";

import type { ChatThread } from "@/types";
import {
  formatThreadTime,
  getInitials,
} from "@/lib/message-utils";
import { countryCodeToFlagEmoji, cn } from "@/lib/utils";

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
    <ul className="divide-y divide-slate-50">
      {threads.map((thread) => {
        const selected = selectedId === thread.id;
        const hasUnread = thread.unreadCount > 0;

        return (
          <li key={thread.id}>
            <button
              type="button"
              onClick={() => onSelect(thread.id)}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors",
                selected
                  ? "bg-primary-light/60"
                  : hasUnread
                    ? "bg-white hover:bg-slate-50"
                    : "hover:bg-slate-50"
              )}
            >
              <div className="relative shrink-0">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold",
                    selected
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {getInitials(thread.patientName)}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 text-sm leading-none">
                  {countryCodeToFlagEmoji(thread.countryCode)}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-sm",
                      hasUnread ? "font-bold text-slate-900" : "font-medium text-slate-800"
                    )}
                  >
                    {thread.patientName}
                  </p>
                  <span
                    className={cn(
                      "shrink-0 text-[10px]",
                      hasUnread ? "font-semibold text-primary" : "text-slate-400"
                    )}
                  >
                    {formatThreadTime(thread.lastMessageAt)}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "truncate text-xs",
                      hasUnread ? "font-medium text-slate-700" : "text-slate-500"
                    )}
                  >
                    {thread.lastMessage}
                  </p>
                  {hasUnread && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
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
