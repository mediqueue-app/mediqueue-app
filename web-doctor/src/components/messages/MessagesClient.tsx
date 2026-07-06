"use client";

import { useState } from "react";
import type { ChatThread } from "@/types";
import { ChatList } from "@/components/messages/ChatList";
import { ChatWindow } from "@/components/messages/ChatWindow";

export function MessagesClient({ threads }: { threads: ChatThread[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    threads[0]?.id ?? null
  );

  const selected = threads.find((t) => t.id === selectedId) ?? null;

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="w-80 shrink-0 overflow-y-auto">
        <ChatList
          threads={threads}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
      <div className="min-w-0 flex-1">
        {selected ? (
          <ChatWindow key={selected.id} thread={selected} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Bir sohbet seçin
          </div>
        )}
      </div>
    </div>
  );
}
