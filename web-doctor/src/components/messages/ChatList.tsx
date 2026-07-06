"use client";

import type { ChatThread } from "@/types";
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
    <ul className="divide-y divide-slate-100 border-r border-slate-200">
      {threads.map((thread) => (
        <li key={thread.id}>
          <button
            type="button"
            onClick={() => onSelect(thread.id)}
            className={cn(
              "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50",
              selectedId === thread.id && "bg-primary-light/50"
            )}
          >
            <span className="text-lg" aria-hidden>
              {countryCodeToFlagEmoji(thread.countryCode)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-medium text-slate-900">
                  {thread.patientName}
                </p>
                {thread.unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {thread.unreadCount}
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-slate-500">{thread.lastMessage}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
