"use client";

import { useMemo, useState } from "react";
import { MessageSquare, Search } from "lucide-react";
import type { ChatThread } from "@/types";
import { ChatList } from "@/components/messages/ChatList";
import { ChatWindow } from "@/components/messages/ChatWindow";
import { filterThreads, sortThreads } from "@/lib/message-utils";
import { cn } from "@/lib/utils";

export function MessagesClient({ threads }: { threads: ChatThread[] }) {
  const sorted = useMemo(() => sortThreads(threads), [threads]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    sorted[0]?.id ?? null
  );

  const filtered = useMemo(
    () => filterThreads(sorted, search),
    [sorted, search]
  );

  const selected =
    filtered.find((t) => t.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="flex h-[calc(100vh-11rem)] min-h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Sol panel */}
      <div
        className={cn(
          "flex w-full shrink-0 flex-col border-r border-slate-200 lg:w-[320px] xl:w-[360px]",
          selectedId ? "hidden lg:flex" : "flex"
        )}
      >
        <div className="border-b border-slate-100 p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sohbet ara..."
              aria-label="Sohbet ara"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <MessageSquare className="h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-600">
                Sohbet bulunamadı
              </p>
            </div>
          ) : (
            <ChatList
              threads={filtered}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
            />
          )}
        </div>
      </div>

      {/* Sağ panel */}
      <div
        className={cn(
          "min-w-0 flex-1",
          !selectedId ? "hidden lg:block" : "block"
        )}
      >
        {selected ? (
          <ChatWindow
            key={selected.id}
            thread={selected}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}

function EmptyChatState() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-slate-50/40 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
        <MessageSquare className="h-7 w-7 text-slate-300" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700">Bir sohbet seçin</p>
      <p className="mt-1 max-w-xs text-xs text-slate-400">
        Soldaki listeden bir hasta seçerek mesajlaşmaya başlayın.
      </p>
    </div>
  );
}
